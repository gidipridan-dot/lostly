import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';

interface KYCRecord {
  id: string;
  userId: string;
  userEmail: string;
  verificationType: 'light' | 'cdd' | 'edd';
  status: 'pending' | 'in_progress' | 'approved' | 'failed' | 'manual_review';
  riskScore: number;
  createdAt: string;
  updatedAt: string;
  triggerReason: string;
  triggerValue?: number;
  vendorSessionId?: string;
  failureReason?: string;
}

interface DashboardStats {
  totalVerifications: number;
  pendingReviews: number;
  approvalRate: number;
  averageProcessingTime: string;
  highRiskUsers: number;
}

export function KYCAdminDashboard() {
  const [records, setRecords] = useState<KYCRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<KYCRecord[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalVerifications: 0,
    pendingReviews: 0,
    approvalRate: 0,
    averageProcessingTime: '0h',
    highRiskUsers: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchKYCRecords();
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [records, searchTerm, statusFilter, levelFilter]);

  const fetchKYCRecords = async () => {
    try {
      setIsLoading(true);
      
      // Mock API call - replace with actual endpoint
      const response = await fetch('/api/admin/kyc/records');
      if (response.ok) {
        const data = await response.json();
        setRecords(data.records || []);
      } else {
        // Mock data for demonstration
        const mockRecords: KYCRecord[] = [
          {
            id: '1',
            userId: 'user_1',
            userEmail: 'john.doe@example.com',
            verificationType: 'cdd',
            status: 'approved',
            riskScore: 25,
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T12:45:00Z',
            triggerReason: 'High value claim',
            triggerValue: 850,
            vendorSessionId: 'onfido_abc123'
          },
          {
            id: '2',
            userId: 'user_2',
            userEmail: 'jane.smith@example.com',
            verificationType: 'edd',
            status: 'manual_review',
            riskScore: 75,
            createdAt: '2024-01-14T14:20:00Z',
            updatedAt: '2024-01-14T14:20:00Z',
            triggerReason: 'Suspicious pattern detected',
            triggerValue: 2500,
            vendorSessionId: 'sumsub_def456'
          },
          {
            id: '3',
            userId: 'user_3',
            userEmail: 'mike.wilson@example.com',
            verificationType: 'light',
            status: 'failed',
            riskScore: 60,
            createdAt: '2024-01-13T09:15:00Z',
            updatedAt: '2024-01-13T09:45:00Z',
            triggerReason: 'Standard verification',
            failureReason: 'Document verification failed'
          }
        ];
        setRecords(mockRecords);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch KYC records",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      // Mock stats - replace with actual API call
      setStats({
        totalVerifications: 1247,
        pendingReviews: 23,
        approvalRate: 87.5,
        averageProcessingTime: '2.3h',
        highRiskUsers: 15
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const applyFilters = () => {
    let filtered = records;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(record => 
        record.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.vendorSessionId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(record => record.status === statusFilter);
    }

    // Level filter
    if (levelFilter !== 'all') {
      filtered = filtered.filter(record => record.verificationType === levelFilter);
    }

    setFilteredRecords(filtered);
  };

  const handleViewDetails = (recordId: string) => {
    // Open detailed view modal or navigate to details page
    toast({
      title: "Details",
      description: `Opening details for record ${recordId}`,
    });
  };

  const handleExportData = () => {
    // Export filtered records to CSV
    const csvData = filteredRecords.map(record => ({
      'User Email': record.userEmail,
      'Verification Type': record.verificationType.toUpperCase(),
      'Status': record.status,
      'Risk Score': record.riskScore,
      'Trigger Reason': record.triggerReason,
      'Trigger Value': record.triggerValue || 'N/A',
      'Created At': new Date(record.createdAt).toLocaleDateString(),
      'Updated At': new Date(record.updatedAt).toLocaleDateString()
    }));

    // Simple CSV export (in production, use a proper CSV library)
    const csvContent = [
      Object.keys(csvData[0] || {}).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kyc-records-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Exported ${filteredRecords.length} records`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'manual_review':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
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

  const getRiskScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">KYC Management Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage identity verifications</p>
        </div>
        <Button onClick={fetchKYCRecords} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Verifications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVerifications.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingReviews}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approvalRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Processing</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageProcessingTime}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Users</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.highRiskUsers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email, user ID, or session ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="manual_review">Manual Review</SelectItem>
              </SelectContent>
            </Select>

            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="cdd">CDD</SelectItem>
                <SelectItem value="edd">EDD</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleExportData} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KYC Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Records ({filteredRecords.length})</CardTitle>
          <CardDescription>
            Recent identity verification requests and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.userEmail}</div>
                        <div className="text-sm text-muted-foreground">{record.userId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {record.verificationType.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        {getStatusIcon(record.status)}
                        <span className="ml-2 capitalize">{record.status.replace('_', ' ')}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium ${getRiskScoreColor(record.riskScore)}`}>
                        {record.riskScore}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {record.triggerReason}
                        {record.failureReason && (
                          <div className="text-red-600 text-xs mt-1">
                            {record.failureReason}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {record.triggerValue ? `$${record.triggerValue}` : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(record.createdAt).toLocaleDateString()}
                        <div className="text-xs text-muted-foreground">
                          {new Date(record.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(record.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No verification records found matching your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}