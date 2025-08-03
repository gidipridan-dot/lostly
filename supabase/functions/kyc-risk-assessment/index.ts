import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RiskAssessmentRequest {
  userId: string;
  transactionValue?: number;
  transactionType: 'claim' | 'found_item' | 'reward_payout';
  metadata?: Record<string, any>;
}

interface RiskFactors {
  transactionValue: number;
  transactionType: string;
  userHistoryRisk: number;
  geographicRisk: number;
  frequencyRisk: number;
  deviceRisk: number;
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

    const { userId, transactionValue = 0, transactionType, metadata = {} }: RiskAssessmentRequest = await req.json();

    // KYC Thresholds (configurable)
    const CDD_THRESHOLD = 200;
    const EDD_THRESHOLD = 2000;

    // Calculate risk factors
    const riskFactors: RiskFactors = {
      transactionValue,
      transactionType,
      userHistoryRisk: await calculateUserHistoryRisk(supabase, userId),
      geographicRisk: await calculateGeographicRisk(supabase, userId, metadata),
      frequencyRisk: await calculateFrequencyRisk(supabase, userId),
      deviceRisk: await calculateDeviceRisk(metadata)
    };

    // Calculate overall risk score (0-100)
    const riskScore = calculateOverallRiskScore(riskFactors);

    // Determine required KYC level
    let requiredLevel: 'light' | 'cdd' | 'edd' = 'light';
    
    if (transactionValue >= EDD_THRESHOLD || riskScore >= 80) {
      requiredLevel = 'edd';
    } else if (transactionValue >= CDD_THRESHOLD || riskScore >= 50) {
      requiredLevel = 'cdd';
    }

    // Check if user meets current verification requirements
    const { data: currentStatus } = await supabase
      .from('user_kyc_status')
      .select('*')
      .eq('user_id', userId)
      .eq('verification_level', requiredLevel)
      .eq('status', 'approved')
      .order('verification_date', { ascending: false })
      .limit(1)
      .single();

    const isCompliant = !!currentStatus && new Date(currentStatus.expiry_date) > new Date();

    // Log risk assessment
    await supabase
      .from('risk_assessments')
      .insert({
        user_id: userId,
        assessment_type: transactionType,
        risk_factors: riskFactors,
        calculated_score: riskScore,
        recommended_level: requiredLevel
      });

    return new Response(
      JSON.stringify({
        success: true,
        riskScore,
        requiredLevel,
        isCompliant,
        triggers: identifyTriggers(riskFactors, transactionValue),
        recommendation: generateRecommendation(requiredLevel, isCompliant, riskScore)
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Risk assessment error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

// Risk calculation functions
async function calculateUserHistoryRisk(supabase: any, userId: string): Promise<number> {
  // Check for failed KYC attempts
  const { data: failedAttempts } = await supabase
    .from('user_kyc_status')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'failed');

  // Check for high-value claims in last 30 days
  const { data: recentHighValue } = await supabase
    .from('risk_assessments')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

  let risk = 0;
  risk += (failedAttempts?.length || 0) * 20; // 20 points per failed KYC
  risk += (recentHighValue?.length || 0) * 5;  // 5 points per recent high-value transaction
  
  return Math.min(risk, 100);
}

async function calculateGeographicRisk(supabase: any, userId: string, metadata: any): Promise<number> {
  // Simple geographic risk - check for unusual location patterns
  const currentLocation = metadata.location;
  if (!currentLocation) return 0;

  // Check user's typical locations from previous sessions
  const { data: recentSessions } = await supabase
    .from('kyc_sessions')
    .select('metadata')
    .eq('user_id', userId)
    .gte('started_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString());

  // Simplified geographic risk calculation
  // In production, use proper geolocation distance calculations
  return 0; // Placeholder
}

async function calculateFrequencyRisk(supabase: any, userId: string): Promise<number> {
  // Check for rapid succession of high-value transactions
  const { data: recentSessions } = await supabase
    .from('kyc_sessions')
    .select('*')
    .eq('user_id', userId)
    .gte('started_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  const sessionCount = recentSessions?.length || 0;
  
  if (sessionCount >= 5) return 80;  // Very high frequency
  if (sessionCount >= 3) return 50;  // High frequency
  if (sessionCount >= 2) return 25;  // Medium frequency
  
  return 0;
}

async function calculateDeviceRisk(metadata: any): Promise<number> {
  // Device fingerprinting risk (simplified)
  // In production, integrate with device intelligence services
  const isNewDevice = metadata.isNewDevice || false;
  const isTorOrVPN = metadata.isTorOrVPN || false;
  
  let risk = 0;
  if (isNewDevice) risk += 10;
  if (isTorOrVPN) risk += 30;
  
  return risk;
}

function calculateOverallRiskScore(factors: RiskFactors): number {
  const weights = {
    transactionValue: 0.3,
    userHistory: 0.25,
    geographic: 0.15,
    frequency: 0.20,
    device: 0.10
  };

  // Normalize transaction value risk (0-100)
  const valueRisk = Math.min((factors.transactionValue / 5000) * 100, 100);
  
  const weightedScore = 
    (valueRisk * weights.transactionValue) +
    (factors.userHistoryRisk * weights.userHistory) +
    (factors.geographicRisk * weights.geographic) +
    (factors.frequencyRisk * weights.frequency) +
    (factors.deviceRisk * weights.device);

  return Math.round(Math.min(weightedScore, 100));
}

function identifyTriggers(factors: RiskFactors, transactionValue: number): string[] {
  const triggers: string[] = [];
  
  if (transactionValue >= 2000) triggers.push('high_value_transaction');
  if (transactionValue >= 200) triggers.push('medium_value_transaction');
  if (factors.frequencyRisk > 50) triggers.push('frequent_activity');
  if (factors.userHistoryRisk > 30) triggers.push('suspicious_history');
  if (factors.geographicRisk > 20) triggers.push('geographic_anomaly');
  if (factors.deviceRisk > 20) triggers.push('device_risk');
  
  return triggers;
}

function generateRecommendation(level: string, isCompliant: boolean, riskScore: number): string {
  if (isCompliant) {
    return `User meets current ${level.toUpperCase()} verification requirements.`;
  }
  
  const recommendations = {
    light: "Email and phone verification required.",
    cdd: "Government ID and address verification required (24-48 hour processing).",
    edd: "Enhanced due diligence required including background checks (3-5 business days)."
  };
  
  return recommendations[level as keyof typeof recommendations] || recommendations.light;
}