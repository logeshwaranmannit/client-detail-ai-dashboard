"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search,
  Upload,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Filter,
  Brain,
  ChevronRight,
  FileUp,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

// Mock data for clients
const mockClients = [
  {
    id: "1",
    name: "Acme Corporation",
    accountant: "Sarah Johnson",
    closeProgress: 85,
    openExceptions: 3,
    confidenceTrend: "up",
    sentiment: "ready for review",
    sentimentType: "success",
    lastUpdated: "2 hours ago",
    totalTasks: 45,
    completedTasks: 38,
  },
  {
    id: "2",
    name: "TechStart Inc.",
    accountant: "Michael Chen",
    closeProgress: 62,
    openExceptions: 7,
    confidenceTrend: "down",
    sentiment: "waiting on data",
    sentimentType: "warning",
    lastUpdated: "4 hours ago",
    totalTasks: 52,
    completedTasks: 32,
  },
  {
    id: "3",
    name: "Global Services LLC",
    accountant: "Sarah Johnson",
    closeProgress: 95,
    openExceptions: 1,
    confidenceTrend: "stable",
    sentiment: "ready for review",
    sentimentType: "success",
    lastUpdated: "1 hour ago",
    totalTasks: 38,
    completedTasks: 36,
  },
  {
    id: "4",
    name: "Innovate Solutions",
    accountant: "David Park",
    closeProgress: 45,
    openExceptions: 12,
    confidenceTrend: "down",
    sentiment: "needs attention",
    sentimentType: "error",
    lastUpdated: "6 hours ago",
    totalTasks: 60,
    completedTasks: 27,
  },
  {
    id: "5",
    name: "Prime Industries",
    accountant: "Michael Chen",
    closeProgress: 78,
    openExceptions: 5,
    confidenceTrend: "up",
    sentiment: "on track",
    sentimentType: "info",
    lastUpdated: "3 hours ago",
    totalTasks: 42,
    completedTasks: 33,
  },
  {
    id: "6",
    name: "BlueSky Enterprises",
    accountant: "Sarah Johnson",
    closeProgress: 90,
    openExceptions: 2,
    confidenceTrend: "stable",
    sentiment: "ready for review",
    sentimentType: "success",
    lastUpdated: "1 hour ago",
    totalTasks: 35,
    completedTasks: 32,
  },
];

const accountants = [
  "All Accountants",
  "Sarah Johnson",
  "Michael Chen", 
  "David Park",
];

export default function ClientIntelligencePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAccountant, setSelectedAccountant] = useState("All Accountants");
  const [filteredClients, setFilteredClients] = useState(mockClients);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterClients(query, selectedAccountant);
  };

  const handleAccountantFilter = (accountant: string) => {
    setSelectedAccountant(accountant);
    filterClients(searchQuery, accountant);
  };

  const filterClients = (query: string, accountant: string) => {
    let filtered = mockClients;

    // Filter by search query
    if (query.trim()) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by accountant
    if (accountant !== "All Accountants") {
      filtered = filtered.filter(client => client.accountant === accountant);
    }

    setFilteredClients(filtered);
  };

  const handleClientClick = (clientId: string) => {
    // Navigate to client detail view
    console.log("Opening client detail for:", clientId);
    // router.push(`/dashboard/client-intelligence/${clientId}`);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSentimentBadge = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "warning":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "error":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      case "info":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      default:
        return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Client Intelligence</h1>
          </div>
          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Insights
          </Badge>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="gap-2">
              <FileUp className="h-4 w-4" />
              Ingest Data
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Ask AI about this client
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Search and Filter Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Search clients by name..."
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedAccountant} onValueChange={handleAccountantFilter}>
                      <SelectTrigger className="w-[200px]">
                        <Users className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {accountants.map((accountant) => (
                          <SelectItem key={accountant} value={accountant}>
                            {accountant}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Clients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{filteredClients.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Avg Close Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      filteredClients.reduce((acc, c) => acc + c.closeProgress, 0) /
                        filteredClients.length
                    )}%
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Exceptions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {filteredClients.reduce((acc, c) => acc + c.openExceptions, 0)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Ready for Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {filteredClients.filter(c => c.sentimentType === "success").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Client Cards */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Active Clients
                <Badge variant="outline">{filteredClients.length}</Badge>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredClients.map((client) => (
                  <Card
                    key={client.id}
                    className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
                    onClick={() => handleClientClick(client.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <CardTitle className="text-base flex items-center gap-2">
                            {client.name}
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-3 w-3" />
                            {client.accountant}
                          </div>
                        </div>
                        <Badge className={getSentimentBadge(client.sentimentType)}>
                          {client.sentiment}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Close Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Close Progress</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{client.closeProgress}%</span>
                            {getTrendIcon(client.confidenceTrend)}
                          </div>
                        </div>
                        <Progress 
                          value={client.closeProgress} 
                          className="h-2"
                        />
                        <div className="text-xs text-muted-foreground">
                          {client.completedTasks} of {client.totalTasks} tasks completed
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">Exceptions</div>
                          <div className="flex items-center gap-1">
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                            <span className="font-semibold">{client.openExceptions}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">Confidence</div>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(client.confidenceTrend)}
                            <span className="font-semibold capitalize">{client.confidenceTrend}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">Updated</div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs">{client.lastUpdated}</span>
                          </div>
                        </div>
                      </div>

                      {/* AI Sentiment Indicator */}
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border">
                        <Brain className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-xs text-muted-foreground">
                          AI Agent: <span className="font-medium text-foreground">{client.sentiment}</span>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {filteredClients.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No clients found</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    No clients match your current filters. Try adjusting your search or filter criteria.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
