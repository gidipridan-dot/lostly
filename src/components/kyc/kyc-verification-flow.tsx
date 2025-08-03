import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  User, 
  FileText, 
  Camera,
  MapPin,
  Banknote
} from 'lucide-react';

interface KYCVerificationFlowProps {
  userId: string;
  requiredLevel: 'light' | 'cdd' | 'edd';
  triggerReason: string;
  triggerValue?: number;
  onVerificationComplete?: (status: string) => void;
}

interface VerificationStatus {
  level: 'light' | 'cdd' | 'edd';
  status: 'none' | 'pending' | 'in_progress' | 'approved' | 'failed' | 'manual_review';
  progress: number;
  requirements: string[];
  estimatedTime: string;
  sessionId?: string;
  vendorUrl?: string;
}

export function KYCVerificationFlow({
  userId,
  requiredLevel,
  triggerReason,
  triggerValue,
  onVerificationComplete
}: KYCVerificationFlowProps) {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    level: requiredLevel,
    status: 'none',
    progress: 0,
    requirements: [],
    estimatedTime: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkCurrentVerificationStatus();
  }, [userId, requiredLevel]);

  const checkCurrentVerificationStatus = async () => {
    try {
      setIsLoading(true);
      
      // Check if user already has valid verification for this level
      const response = await fetch(`/api/kyc/status/${userId}/${requiredLevel}`);
      if (response.ok) {
        const data = await response.json();
        setVerificationStatus(prev => ({
          ...prev,
          status: data.status,
          progress: getProgressFromStatus(data.status)
        }));
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const initiateVerification = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/kyc/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          verificationType: requiredLevel,
          triggerReason,
          triggerValue,
          returnUrl: window.location.href
        })
      });

      if (!response.ok) {
        throw new Error('Failed to initiate verification');
      }

      const data = await response.json();
      
      setVerificationStatus(prev => ({
        ...prev,
        status: 'in_progress',
        progress: 25,
        requirements: data.requirements,
        estimatedTime: data.estimatedTime,
        sessionId: data.sessionId,
        vendorUrl: data.vendorUrl
      }));

      // Open vendor verification in new tab
      if (data.vendorUrl) {
        window.open(data.vendorUrl, '_blank');
      }

      toast({
        title: "Verification Started",
        description: "Please complete the verification process in the new tab.",
      });

    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Unable to start verification process. Please try again.",
        variant: "destructive",
      });
      console.error('Error initiating verification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressFromStatus = (status: string): number => {
    switch (status) {
      case 'none': return 0;
      case 'pending': return 10;
      case 'in_progress': return 50;
      case 'approved': return 100;
      case 'failed': return 0;
      case 'manual_review': return 75;
      default: return 0;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'manual_review':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'manual_review': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'light': return <User className="h-4 w-4" />;
      case 'cdd': return <FileText className="h-4 w-4" />;
      case 'edd': return <Shield className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getLevelDescription = (level: string) => {
    switch (level) {
      case 'light':
        return 'Basic verification with email and phone confirmation';
      case 'cdd':
        return 'Customer Due Diligence with government ID and address verification';
      case 'edd':
        return 'Enhanced Due Diligence with comprehensive background checks';
      default:
        return 'Identity verification required';
    }
  };

  const getRequirementIcon = (requirement: string) => {
    if (requirement.toLowerCase().includes('id')) return <FileText className="h-4 w-4" />;
    if (requirement.toLowerCase().includes('selfie') || requirement.toLowerCase().includes('photo')) return <Camera className="h-4 w-4" />;
    if (requirement.toLowerCase().includes('address')) return <MapPin className="h-4 w-4" />;
    if (requirement.toLowerCase().includes('funds')) return <Banknote className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  if (verificationStatus.status === 'approved') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <CardTitle className="text-green-800">Verification Complete</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-green-700">
            Your {requiredLevel.toUpperCase()} verification has been approved. You can proceed with your transaction.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Verification Required Alert */}
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <AlertDescription className="text-amber-800">
          <strong>Identity Verification Required</strong>
          <br />
          {triggerReason} {triggerValue && `($${triggerValue})`} requires {requiredLevel.toUpperCase()} verification to proceed.
        </AlertDescription>
      </Alert>

      {/* Verification Level Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getLevelIcon(requiredLevel)}
              <CardTitle>{requiredLevel.toUpperCase()} Verification</CardTitle>
            </div>
            <Badge className={getStatusColor(verificationStatus.status)}>
              {getStatusIcon(verificationStatus.status)}
              <span className="ml-2 capitalize">{verificationStatus.status.replace('_', ' ')}</span>
            </Badge>
          </div>
          <CardDescription>
            {getLevelDescription(requiredLevel)}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Progress Bar */}
          {verificationStatus.status !== 'none' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{verificationStatus.progress}%</span>
              </div>
              <Progress value={verificationStatus.progress} className="w-full" />
            </div>
          )}

          {/* Requirements List */}
          {verificationStatus.requirements.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Required Documents:</h4>
              <ul className="space-y-1">
                {verificationStatus.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {getRequirementIcon(requirement)}
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Estimated Time */}
          {verificationStatus.estimatedTime && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Estimated processing time: {verificationStatus.estimatedTime}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            {verificationStatus.status === 'none' && (
              <Button 
                onClick={initiateVerification}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Starting Verification...' : 'Start Verification'}
              </Button>
            )}
            
            {verificationStatus.status === 'in_progress' && verificationStatus.vendorUrl && (
              <Button 
                onClick={() => window.open(verificationStatus.vendorUrl, '_blank')}
                variant="outline"
                className="w-full"
              >
                Continue Verification
              </Button>
            )}
            
            {verificationStatus.status === 'failed' && (
              <Button 
                onClick={initiateVerification}
                disabled={isLoading}
                className="w-full"
              >
                Retry Verification
              </Button>
            )}
            
            {verificationStatus.status === 'manual_review' && (
              <div className="w-full text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Your verification is under manual review. We'll notify you once complete.
                </p>
                <Button 
                  onClick={checkCurrentVerificationStatus}
                  variant="outline"
                  size="sm"
                >
                  Check Status
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex space-x-3">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Secure & Private</h4>
              <p className="text-sm text-blue-700 mt-1">
                Your personal information is encrypted and securely processed by our trusted verification partner. 
                We only store verification status, never your actual documents.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}