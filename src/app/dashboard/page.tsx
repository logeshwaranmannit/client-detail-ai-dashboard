"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Send, 
  Upload, 
  AlertCircle, 
  Package, 
  Brain,
  FileText,
  CheckCircle,
  Clock,
  Activity,
  Cpu,
  Zap,
  Server,
  TrendingUp,
  Bot,
  Play,
  Pause,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

// Mock data for AI agent activities
const agentActivities = [
  {
    id: 1,
    agent: "Extractor",
    status: "active",
    task: "Processing Q4 bank statements for Client ABC",
    progress: 75,
    timestamp: "2 minutes ago",
    icon: FileText,
  },
  {
    id: 2,
    agent: "Classifier",
    status: "active",
    task: "Categorizing 234 transactions from uploaded CSV",
    progress: 45,
    timestamp: "5 minutes ago",
    icon: Brain,
  },
  {
    id: 3,
    agent: "Reconciler",
    status: "pending",
    task: "Bank reconciliation for 3 accounts - queued",
    progress: 0,
    timestamp: "8 minutes ago",
    icon: CheckCircle,
  },
  {
    id: 4,
    agent: "Extractor",
    status: "completed",
    task: "Ingested 45 invoices from Client XYZ",
    progress: 100,
    timestamp: "12 minutes ago",
    icon: FileText,
  },
  {
    id: 5,
    agent: "Classifier",
    status: "active",
    task: "ML model training on new expense patterns",
    progress: 62,
    timestamp: "15 minutes ago",
    icon: Brain,
  },
];

// System health metrics
const systemHealth = [
  {
    label: "CPU Load",
    value: 45,
    status: "healthy",
    icon: Cpu,
  },
  {
    label: "API Status",
    value: 100,
    status: "healthy",
    icon: Server,
  },
  {
    label: "Agent Uptime",
    value: 99.8,
    status: "healthy",
    icon: Activity,
  },
  {
    label: "Processing Queue",
    value: 23,
    status: "moderate",
    icon: Clock,
  },
];

export default function Dashboard() {
  const [command, setCommand] = useState("");

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      // Process command - placeholder for AI command processing
      console.log("Command submitted:", command);
      setCommand("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
            <h1 className="text-lg font-semibold">AI Command Center</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="flex flex-col gap-6 p-6">
              {/* Conversational Command Interface */}
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    AI Command Interface
                  </CardTitle>
                  <CardDescription>
                    Issue natural language commands to control your AI agents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCommandSubmit} className="flex gap-2">
                    <Input
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      placeholder='Try: "Ingest client data", "Summarize close progress", "Review exceptions"...'
                      className="flex-1 h-12 text-base"
                    />
                    <Button type="submit" size="lg" className="px-6">
                      <Send className="h-4 w-4 mr-2" />
                      Execute
                    </Button>
                  </form>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs text-muted-foreground">Quick commands:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setCommand("Ingest client data")}
                    >
                      Ingest client data
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setCommand("Summarize close progress")}
                    >
                      Summarize close progress
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setCommand("Run bank reconciliation")}
                    >
                      Run bank reconciliation
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <Upload className="h-6 w-6 text-primary" />
                  <span className="font-medium">Upload Files</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <AlertCircle className="h-6 w-6 text-yellow-500" />
                  <span className="font-medium">Review Exceptions</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <Package className="h-6 w-6 text-blue-500" />
                  <span className="font-medium">Generate Close Package</span>
                </Button>
              </div>

              {/* Live Activity Feed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Live Agent Activity
                  </CardTitle>
                  <CardDescription>
                    Real-time view of what each AI agent is currently doing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agentActivities.map((activity) => {
                      const AgentIcon = activity.icon;
                      return (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <AgentIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{activity.agent}</span>
                                {getStatusBadge(activity.status)}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {activity.timestamp}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{activity.task}</p>
                            {activity.status === "active" && (
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className="font-medium">{activity.progress}%</span>
                                </div>
                                <Progress value={activity.progress} className="h-1.5" />
                              </div>
                            )}
                          </div>
                          <div className={`h-3 w-3 rounded-full ${getStatusColor(activity.status)} ${activity.status === "active" ? "animate-pulse" : ""}`} />
                        </div>
                      );
                    })}
                  </div>
                  <Button variant="ghost" className="w-full mt-4">
                    View All Activity
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* System Health Sidebar */}
          <div className="w-80 border-l bg-muted/30 overflow-auto">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">System Health</h2>
                <p className="text-xs text-muted-foreground">
                  Real-time monitoring of system performance
                </p>
              </div>

              {/* Health Metrics */}
              <div className="space-y-4">
                {systemHealth.map((metric) => {
                  const MetricIcon = metric.icon;
                  return (
                    <Card key={metric.label}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                            <MetricIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{metric.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {metric.label === "Processing Queue"
                                ? `${metric.value} items`
                                : `${metric.value}%`}
                            </div>
                          </div>
                        </div>
                        {metric.label !== "Processing Queue" && (
                          <Progress
                            value={metric.value}
                            className={`h-2 ${
                              metric.value >= 90
                                ? "[&>div]:bg-green-500"
                                : metric.value >= 70
                                ? "[&>div]:bg-yellow-500"
                                : "[&>div]:bg-red-500"
                            }`}
                          />
                        )}
                        {metric.label === "Processing Queue" && (
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant="outline"
                              className={
                                metric.value < 30
                                  ? "border-green-500/20 bg-green-500/10 text-green-500"
                                  : "border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
                              }
                            >
                              {metric.value < 30 ? "Normal" : "Moderate"}
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Active Agents Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Active Agents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-green-500" />
                      <span>Extractor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-muted-foreground">Running</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-green-500" />
                      <span>Classifier</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-muted-foreground">Running</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-yellow-500" />
                      <span>Reconciler</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Pause className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-muted-foreground">Idle</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Stats */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Today's Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tasks Completed</span>
                    <span className="text-sm font-semibold">342</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Processing Time</span>
                    <span className="text-sm font-semibold">2.4s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="text-sm font-semibold text-green-500">99.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Exceptions</span>
                    <span className="text-sm font-semibold text-yellow-500">8</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}