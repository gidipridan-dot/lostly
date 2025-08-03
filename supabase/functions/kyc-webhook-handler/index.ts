import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-webhook-signature",
};

interface WebhookPayload {
  vendor: 'onfido' | 'sumsub' | 'veriff' | 'mock';
  event_type: string;
  session_id: string;
  status: 'approved' | 'failed' | 'manual_review';
  checks: VerificationCheck[];
  risk_score?: number;
  failure_reason?: string;
  metadata?: Record<string, any>;
}

interface VerificationCheck {
  type: 'document' | 'face_match' | 'address' | 'background';
  status: 'pass' | 'fail' | 'manual_review';
  confidence: number;
  details?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Verify webhook signature (vendor-specific)
    const signature = req.headers.get("x-webhook-signature");
    const body = await req.text();
    
    if (!verifyWebhookSignature(body, signature)) {
      return new Response("Invalid signature", { status: 401 });
    }

    const payload: WebhookPayload = JSON.parse(body);
    
    // Find the KYC session
    const { data: kycSession, error: sessionError } = await supabase
      .from('kyc_sessions')
      .select('*')
      .eq('vendor_session_id', payload.session_id)
      .single();

    if (sessionError || !kycSession) {
      console.error("KYC session not found:", payload.session_id);
      return new Response("Session not found", { status: 404 });
    }

    // Update KYC session status
    await supabase
      .from('kyc_sessions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        metadata: {
          ...kycSession.metadata,
          webhook_received: new Date().toISOString(),
          vendor_response: payload
        }
      })
      .eq('id', kycSession.id);

    // Store verification results
    for (const check of payload.checks) {
      await supabase
        .from('kyc_verification_results')
        .insert({
          user_id: kycSession.user_id,
          session_id: kycSession.id,
          check_type: check.type,
          status: check.status,
          confidence_score: check.confidence,
          vendor_check_id: `${payload.vendor}_${payload.session_id}_${check.type}`,
          summary: check.details || `${check.type} verification ${check.status}`
        });
    }

    // Calculate overall verification result
    const overallStatus = calculateOverallStatus(payload.checks, payload.status);
    const riskScore = payload.risk_score || calculateRiskScore(payload.checks);

    // Update user KYC status
    const { error: statusError } = await supabase
      .from('user_kyc_status')
      .update({
        status: overallStatus,
        risk_score: riskScore,
        verification_date: overallStatus === 'approved' ? new Date().toISOString() : null,
        expiry_date: overallStatus === 'approved' ? getExpiryDate(kycSession.session_type) : null,
        failure_reason: overallStatus === 'failed' ? payload.failure_reason : null,
        vendor_reference_id: payload.session_id,
        metadata: {
          verification_checks: payload.checks,
          risk_assessment: {
            score: riskScore,
            factors: extractRiskFactors(payload.checks)
          },
          last_updated: new Date().toISOString()
        }
      })
      .eq('user_id', kycSession.user_id)
      .eq('verification_level', kycSession.session_type);

    if (statusError) {
      console.error("Failed to update user KYC status:", statusError);
    }

    // Send notification to user (optional)
    if (overallStatus === 'approved') {
      await sendVerificationSuccessNotification(supabase, kycSession.user_id, kycSession.session_type);
    } else if (overallStatus === 'failed') {
      await sendVerificationFailureNotification(supabase, kycSession.user_id, payload.failure_reason);
    }

    // Update retry count if failed
    if (overallStatus === 'failed') {
      await supabase
        .from('user_kyc_status')
        .update({
          retry_count: (kycSession.retry_count || 0) + 1,
          last_retry_date: new Date().toISOString()
        })
        .eq('user_id', kycSession.user_id)
        .eq('verification_level', kycSession.session_type);
    }

    console.log(`KYC verification completed for user ${kycSession.user_id}: ${overallStatus}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        status: overallStatus,
        session_id: kycSession.id 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

function verifyWebhookSignature(body: string, signature: string | null): boolean {
  // Mock signature verification
  // In production, implement vendor-specific signature verification
  
  if (!signature) return false;
  
  // Example: HMAC-SHA256 verification for most vendors
  const webhookSecret = Deno.env.get("KYC_WEBHOOK_SECRET") || "default_secret";
  
  // Simplified verification - implement proper HMAC verification in production
  return signature.includes("sha256=") || signature.length > 10;
}

function calculateOverallStatus(checks: VerificationCheck[], vendorStatus: string): 'approved' | 'failed' | 'manual_review' {
  // If vendor already determined status, use it
  if (vendorStatus === 'manual_review') return 'manual_review';
  
  // Check if all critical checks passed
  const criticalChecks = checks.filter(c => ['document', 'face_match'].includes(c.type));
  const allCriticalPassed = criticalChecks.every(c => c.status === 'pass');
  
  if (!allCriticalPassed) {
    const anyManualReview = criticalChecks.some(c => c.status === 'manual_review');
    return anyManualReview ? 'manual_review' : 'failed';
  }
  
  // Check confidence scores
  const lowConfidenceChecks = checks.filter(c => c.confidence < 0.7);
  if (lowConfidenceChecks.length > 0) {
    return 'manual_review';
  }
  
  return vendorStatus as 'approved' | 'failed' | 'manual_review';
}

function calculateRiskScore(checks: VerificationCheck[]): number {
  let totalScore = 0;
  let checkCount = 0;
  
  for (const check of checks) {
    let checkScore = 0;
    
    switch (check.status) {
      case 'pass':
        checkScore = Math.max(0, 100 - (check.confidence * 100));
        break;
      case 'manual_review':
        checkScore = 50;
        break;
      case 'fail':
        checkScore = 100;
        break;
    }
    
    // Weight critical checks more heavily
    const weight = ['document', 'face_match'].includes(check.type) ? 2 : 1;
    totalScore += checkScore * weight;
    checkCount += weight;
  }
  
  return checkCount > 0 ? Math.round(totalScore / checkCount) : 0;
}

function extractRiskFactors(checks: VerificationCheck[]): Record<string, any> {
  const factors: Record<string, any> = {};
  
  for (const check of checks) {
    factors[`${check.type}_confidence`] = check.confidence;
    factors[`${check.type}_status`] = check.status;
  }
  
  return factors;
}

function getExpiryDate(verificationType: string): string {
  const now = new Date();
  const expiryPeriods = {
    light: 30,  // 30 days
    cdd: 365,   // 1 year
    edd: 730    // 2 years
  };
  
  const days = expiryPeriods[verificationType as keyof typeof expiryPeriods] || 365;
  now.setDate(now.getDate() + days);
  
  return now.toISOString();
}

async function sendVerificationSuccessNotification(supabase: any, userId: string, verificationType: string) {
  // Implement notification logic (email, in-app notification, etc.)
  console.log(`Sending success notification to user ${userId} for ${verificationType} verification`);
  
  // Example: Could trigger email via another edge function
  // await supabase.functions.invoke('send-email', {
  //   body: {
  //     to: userEmail,
  //     template: 'kyc_success',
  //     data: { verificationType }
  //   }
  // });
}

async function sendVerificationFailureNotification(supabase: any, userId: string, reason?: string) {
  // Implement failure notification logic
  console.log(`Sending failure notification to user ${userId}: ${reason}`);
}