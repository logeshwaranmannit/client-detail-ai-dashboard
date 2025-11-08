"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ClientConversationalAgent } from '@/components/ClientConversationalAgent';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  TrendingUp,
  Sparkles,
  Database,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  industry: string;
  status: string;
  aiSummary: string;
  reconciliationProgress: number;
  exceptionCount: number;
  confidenceScore: number;
  dataFreshness: string;
  signOffReadiness: string;
  createdAt: string;
}

interface Reconciliation {
  id: number;
  clientId: number;
  accountName: string;
  amount: number;
  status: string;
  lastUpdated: string;
}

interface Journal {
  id: number;
  clientId: number;
  entryNumber: string;
  description: string;
  debit: number;
  credit: number;
  date: string;
}

interface Exception {
  id: number;
  clientId: number;
  type: string;
  description: string;
  severity: string;
  status: string;
  createdAt: string;
}

interface Report {
  id: number;
  clientId: number;
  reportName: string;
  reportType: string;
  generatedAt: string;
  fileUrl: string;
}

export default function ClientDetailView() {
  const params = useParams();
  const clientId = params.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [reconciliations, setReconciliations] = useState<Reconciliation[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [exceptions, setExceptions] = useState<Exception[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('reconciliation');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [clientRes, reconciliationsRes, journalsRes, exceptionsRes, reportsRes] = 
          await Promise.all([
            fetch(`/api/clients/${clientId}`),
            fetch(`/api/clients/${clientId}/reconciliations`),
            fetch(`/api/clients/${clientId}/journals`),
            fetch(`/api/clients/${clientId}/exceptions`),
            fetch(`/api/clients/${clientId}/reports`),
          ]);

        const [clientData, reconciliationsData, journalsData, exceptionsData, reportsData] = 
          await Promise.all([
            clientRes.json(),
            reconciliationsRes.json(),
            journalsRes.json(),
            exceptionsRes.json(),
            reportsRes.json(),
          ]);

        setClient(clientData);
        setReconciliations(reconciliationsData);
        setJournals(journalsData);
        setExceptions(exceptionsData);
        setReports(reportsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clientId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Client Not Found</CardTitle>
            <CardDescription>The requested client could not be found.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'ready':
      case 'active':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'in progress':
      case 'in review':
      case 'pending review':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'pending':
      case 'open':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'low':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getSignOffColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready':
        return 'text-green-600 dark:text-green-400';
      case 'pending review':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-red-600 dark:text-red-400';
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
                <p className="text-muted-foreground">{client.industry}</p>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
        </div>

        {/* AI Summary Section */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>AI Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">{client.aiSummary}</p>
          </CardContent>
        </Card>

        {/* Dynamic AI Indicators */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                Reconciliation Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{client.reconciliationProgress}%</div>
                <Progress value={client.reconciliationProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {client.exceptionCount} {client.exceptionCount === 1 ? 'exception' : 'exceptions'} pending
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className={`h-4 w-4 ${getConfidenceColor(client.confidenceScore)}`} />
                Confidence Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className={`text-2xl font-bold ${getConfidenceColor(client.confidenceScore)}`}>
                  {client.confidenceScore}%
                </div>
                <Progress value={client.confidenceScore} className="h-2" />
                <p className="text-xs text-muted-foreground">High accuracy rating</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Database className="h-4 w-4 text-purple-500" />
                Data Freshness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{client.dataFreshness}</div>
                <p className="text-xs text-muted-foreground">Last updated</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className={`h-4 w-4 ${getSignOffColor(client.signOffReadiness)}`} />
                Sign-off Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className={`text-2xl font-bold ${getSignOffColor(client.signOffReadiness)}`}>
                  {client.signOffReadiness}
                </div>
                <p className="text-xs text-muted-foreground">Current status</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="reconciliation">
                  <Activity className="h-4 w-4 mr-2" />
                  Reconciliation
                </TabsTrigger>
                <TabsTrigger value="journals">
                  <FileText className="h-4 w-4 mr-2" />
                  Journals
                </TabsTrigger>
                <TabsTrigger value="exceptions">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Exceptions
                </TabsTrigger>
                <TabsTrigger value="reports">
                  <FileText className="h-4 w-4 mr-2" />
                  Reports
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reconciliation" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reconciliation Accounts</CardTitle>
                    <CardDescription>Current status of all reconciliation accounts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Account Name</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Updated</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reconciliations.map((recon) => (
                          <TableRow key={recon.id}>
                            <TableCell className="font-medium">{recon.accountName}</TableCell>
                            <TableCell className="text-right">
                              ${Math.abs(recon.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(recon.status)}>{recon.status}</Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(recon.lastUpdated).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="journals" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Journal Entries</CardTitle>
                    <CardDescription>Recent journal entries for this client</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Entry #</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Debit</TableHead>
                          <TableHead className="text-right">Credit</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {journals.map((journal) => (
                          <TableRow key={journal.id}>
                            <TableCell className="font-medium">{journal.entryNumber}</TableCell>
                            <TableCell>{journal.description}</TableCell>
                            <TableCell className="text-right">
                              {journal.debit > 0 ? `$${journal.debit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-'}
                            </TableCell>
                            <TableCell className="text-right">
                              {journal.credit > 0 ? `$${journal.credit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-'}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(journal.date).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="exceptions" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Exceptions</CardTitle>
                    <CardDescription>Items requiring attention or review</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Severity</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {exceptions.map((exception) => (
                          <TableRow key={exception.id}>
                            <TableCell className="font-medium">{exception.type}</TableCell>
                            <TableCell className="max-w-xs truncate">{exception.description}</TableCell>
                            <TableCell>
                              <Badge className={getSeverityColor(exception.severity)}>
                                {exception.severity}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(exception.status)}>{exception.status}</Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(exception.createdAt).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>Generated reports and documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Report Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Generated</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">{report.reportName}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{report.reportType}</Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(report.generatedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Conversational Agent */}
          <div className="lg:col-span-1">
            <ClientConversationalAgent clientName={client.name} clientId={client.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
