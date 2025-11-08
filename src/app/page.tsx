"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Activity, ArrowRight } from "lucide-react";

export default function Home() {
  const clients = [
    {
      id: 1,
      name: "Acme Corporation",
      industry: "Manufacturing",
      progress: 94,
      exceptions: 2,
      status: "Ready",
    },
    {
      id: 2,
      name: "TechStart Inc",
      industry: "Technology",
      progress: 78,
      exceptions: 5,
      status: "Pending Review",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Activity className="h-4 w-4" />
            AI-Powered Accounting Platform
          </div>
          <h1 className="text-5xl font-bold tracking-tight">
            Client Management Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deep dive into client reconciliations, journals, exceptions, and reports with AI-powered insights
          </p>
        </div>

        {/* Client Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {clients.map((client) => (
            <Link key={client.id} href={`/clients/${client.id}`}>
              <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{client.name}</CardTitle>
                        <CardDescription>{client.industry}</CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Reconciliation Progress</span>
                    <span className="font-semibold">{client.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {client.exceptions} {client.exceptions === 1 ? 'exception' : 'exceptions'}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        client.status === "Ready"
                          ? "bg-green-500/10 text-green-700 dark:text-green-400"
                          : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                      }
                    >
                      {client.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Platform Features</CardTitle>
            <CardDescription>What you'll find in each client detail view</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">AI-Powered Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Get intelligent summaries and recommendations for each client
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Real-time Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Track reconciliation progress, confidence scores, and data freshness
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Comprehensive Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Access reconciliations, journals, exceptions, and reports in one place
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Conversational AI</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat with an AI assistant focused on each client's data
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}