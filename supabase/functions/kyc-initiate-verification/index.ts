import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InitiateVerificationRequest {
  userId: string;
  verificationType: 'light' | 'cdd' | 'edd';
  triggerReason: string;
  triggerValue?: number;
  returnUrl?: string;
}

// Mock vendor implementations - replace with actual vendor APIs
const VENDOR_CONFIGS = {
  onfido: {
    apiKey: Deno.env.get("ONFIDO_API_KEY"),
    baseUrl: "https://api.onfido.com/v3.6",
  },
  sumsub: {
    apiKey: Deno.env.get("SUMSUB_API_KEY"),
    baseUrl: "https://api.sumsub.com",
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { userId, verificationType, triggerReason, triggerValue = 0, returnUrl }: InitiateVerificationRequest = await req.json();

    // Get user info
    const { data: user, error: userError } = await supabase.auth.admin.getUserById(userId);
    if (userError || !user) {
      throw new Error("User not found");
    }

    // Check if verification is already in progress
    const { data: existingSession } = await supabase
      .from('kyc_sessions')
      .select('*')
      .eq('user_id', userId)
      .eq('session_type', verificationType)
      .in('status', ['initiated', 'in_progress'])
      .order('started_at', { ascending: false })
      .limit(1)
      .single();

    if (existingSession) {
      return new Response(
        JSON.stringify({
          success: true,
          sessionId: existingSession.id,
          vendorUrl: await generateVendorUrl(existingSession.vendor_session_id, verificationType),
          message: "Verification already in progress"
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create new KYC session
    const sessionId = crypto.randomUUID();
    const vendorSessionId = await createVendorSession(user, verificationType, returnUrl);

    const { data: kycSession, error: sessionError } = await supabase
      .from('kyc_sessions')
      .insert({
        id: sessionId,
        user_id: userId,
        session_type: verificationType,
        trigger_reason: triggerReason,
        trigger_value: triggerValue,
        vendor_session_id: vendorSessionId,
        status: 'initiated',
        metadata: {
          user_email: user.email,
          return_url: returnUrl,
          created_by: 'system'
        }
      })
      .select()
      .single();

    if (sessionError) {
      throw new Error(`Failed to create KYC session: ${sessionError.message}`);
    }

    // Update or create user KYC status
    await supabase
      .from('user_kyc_status')
      .upsert({
        user_id: userId,
        verification_level: verificationType,
        status: 'in_progress',
        vendor_session_id: vendorSessionId,
        metadata: {
          session_id: sessionId,
          started_at: new Date().toISOString()
        }
      }, {
        onConflict: 'user_id,verification_level'
      });

    const vendorUrl = await generateVendorUrl(vendorSessionId, verificationType);

    return new Response(
      JSON.stringify({
        success: true,
        sessionId,
        vendorSessionId,
        vendorUrl,
        verificationType,
        requirements: getVerificationRequirements(verificationType),
        estimatedTime: getEstimatedProcessingTime(verificationType)
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("KYC initiation error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

// Vendor integration functions (mock implementations)
async function createVendorSession(user: any, verificationType: string, returnUrl?: string): Promise<string> {
  // Mock vendor session creation
  // In production, replace with actual vendor API calls
  
  const vendorSessionId = `vendor_${crypto.randomUUID()}`;
  
  // Example Onfido integration (commented out - requires actual API key)
  /*
  if (VENDOR_CONFIGS.onfido.apiKey) {
    const onfidoResponse = await fetch(`${VENDOR_CONFIGS.onfido.baseUrl}/applicants`, {
      method: 'POST',
      headers: {
        'Authorization': `Token token=${VENDOR_CONFIGS.onfido.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: user.user_metadata?.first_name || 'Unknown',
        last_name: user.user_metadata?.last_name || 'User',
        email: user.email,
        dob: user.user_metadata?.date_of_birth,
        address: user.user_metadata?.address
      })
    });
    
    if (onfidoResponse.ok) {
      const onfidoData = await onfidoResponse.json();
      return onfidoData.id;
    }
  }
  */
  
  return vendorSessionId;
}

async function generateVendorUrl(vendorSessionId: string, verificationType: string): Promise<string> {
  // Mock vendor URL generation
  // In production, generate actual vendor verification URLs
  
  const baseUrl = "https://demo-kyc-vendor.com";
  const queryParams = new URLSearchParams({
    session_id: vendorSessionId,
    verification_type: verificationType,
    theme: "lostly",
    lang: "en"
  });
  
  return `${baseUrl}/verify?${queryParams.toString()}`;
}

function getVerificationRequirements(verificationType: string): string[] {
  const requirements = {
    light: [
      "Valid email address",
      "Phone number verification"
    ],
    cdd: [
      "Government-issued photo ID",
      "Proof of address (utility bill, bank statement)",
      "Selfie for identity verification",
      "Phone number verification"
    ],
    edd: [
      "Government-issued photo ID",
      "Proof of address (utility bill, bank statement)",
      "Enhanced background checks",
      "Source of funds documentation",
      "Biometric verification",
      "Additional identity verification steps"
    ]
  };
  
  return requirements[verificationType as keyof typeof requirements] || requirements.light;
}

function getEstimatedProcessingTime(verificationType: string): string {
  const timeEstimates = {
    light: "5-10 minutes",
    cdd: "24-48 hours",
    edd: "3-5 business days"
  };
  
  return timeEstimates[verificationType as keyof typeof timeEstimates] || timeEstimates.light;
}