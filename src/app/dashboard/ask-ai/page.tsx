"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search,
  Mic,
  MicOff,
  Sparkles,
  Users,
  CreditCard,
  FileText,
  AlertCircle,
  ArrowRight,
  Clock,
  TrendingUp,
  Filter,
  History,
  Brain,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";

// Mock data for search results
const mockSearchResults = {
  clients: [
    {
      id: "1",
      name: "Acme Corporation",
      status: "flagged",
      reason: "Pending bank reconciliation",
      lastUpdated: "2 hours ago",
      confidence: 95,
    },
    {
      id: "2",
      name: "TechStart Inc.",
      status: "active",
      reason: "All documents processed",
      lastUpdated: "1 day ago",
      confidence: 88,
    },
  ],
  transactions: [
    {
      id: "1",
      description: "Wire transfer - $45,000",
      client: "Acme Corporation",
      date: "2024-11-05",
      status: "unreconciled",
      confidence: 92,
    },
    {
      id: "2",
      description: "Vendor payment - Office supplies",
      client: "TechStart Inc.",
      date: "2024-11-06",
      status: "classified",
      confidence: 78,
    },
  ],
  journalEntries: [
    {
      id: "1",
      entry: "JE-2024-1045",
      description: "Accrual adjustment for Q4",
      amount: "$12,500",
      status: "pending_review",
      confidence: 85,
    },
  ],
  exceptions: [
    {
      id: "1",
      type: "Missing Documentation",
      description: "Invoice #INV-5432 not found in system",
      client: "Acme Corporation",
      severity: "high",
      confidence: 94,
    },
    {
      id: "2",
      type: "Amount Mismatch",
      description: "Bank statement shows $500 variance",
      client: "Global Services LLC",
      severity: "medium",
      confidence: 87,
    },
  ],
};

// Mock recent queries
const recentQueries = [
  "Which clients were flagged last week?",
  "Show me unreconciled transactions over $10,000",
  "What exceptions need my attention?",
  "Summarize Q4 close progress",
];

// Mock follow-up suggestions
const followUpSuggestions = [
  "Want to see the underlying invoice?",
  "Show me the full transaction history",
  "Generate a reconciliation report",
  "Review all related journal entries",
  "Flag this for CPA review",
];

export default function AskAIPage() {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        setHasSearched(true);
        setIsSearching(false);
      }, 1000);
    }
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // In real implementation, this would integrate with Web Speech API
    if (!isListening) {
      // Start listening
      console.log("Voice input started");
    } else {
      // Stop listening
      console.log("Voice input stopped");
    }
  };

  const handleRecentQuery = (recentQuery: string) => {
    setQuery(recentQuery);
    setHasSearched(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "flagged":
      case "high":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      case "pending_review":
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "active":
      case "classified":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "unreconciled":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      default:
        return "text-muted-foreground bg-muted/10 border-border";
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
            <h1 className="text-lg font-semibold">Ask AI</h1>
          </div>
          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="h-3 w-3 mr-1" />
            Semantic Search
          </Badge>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Search Interface */}
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Global Semantic Search
                </CardTitle>
                <CardDescription>
                  Query any data point across clients, transactions, journal entries, and exceptions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder='Try: "Which clients were flagged last week?" or "Show unreconciled transactions"...'
                      className="h-12 text-base pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 ${
                        isListening ? "bg-red-500/10 text-red-500" : ""
                      }`}
                      onClick={handleVoiceToggle}
                    >
                      {isListening ? (
                        <MicOff className="h-4 w-4 animate-pulse" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button type="submit" size="lg" className="px-6" disabled={isSearching}>
                    {isSearching ? (
                      <>
                        <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </>
                    )}
                  </Button>
                </form>

                {/* Memory Integration Hint */}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <Brain className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">AI Memory Active:</span> I remember your previous queries and can help you track changes over time.
                  </div>
                </div>

                {/* Recent Queries */}
                {!hasSearched && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <History className="h-3 w-3" />
                      Recent Queries
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentQueries.map((recentQuery, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-auto py-2 px-3 text-xs hover:border-primary hover:bg-primary/5"
                          onClick={() => handleRecentQuery(recentQuery)}
                        >
                          <Clock className="h-3 w-3 mr-1.5" />
                          {recentQuery}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Search Results */}
            {hasSearched && (
              <div className="space-y-6">
                {/* Results Summary */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">Search Results</h2>
                    <Badge variant="outline" className="bg-muted">
                      {mockSearchResults.clients.length + 
                       mockSearchResults.transactions.length + 
                       mockSearchResults.journalEntries.length + 
                       mockSearchResults.exceptions.length} results found
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter Results
                  </Button>
                </div>

                {/* Clients Section */}
                {mockSearchResults.clients.length > 0 && (
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Users className="h-5 w-5 text-blue-500" />
                          Clients
                        </CardTitle>
                        <Badge variant="outline">{mockSearchResults.clients.length}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockSearchResults.clients.map((client) => (
                          <div
                            key={client.id}
                            className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                          >
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{client.name}</h3>
                                <Badge className={getStatusColor(client.status)}>
                                  {client.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground ml-auto">
                                  {client.confidence}% match
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">{client.reason}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {client.lastUpdated}
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="shrink-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Transactions Section */}
                {mockSearchResults.transactions.length > 0 && (
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <CreditCard className="h-5 w-5 text-green-500" />
                          Transactions
                        </CardTitle>
                        <Badge variant="outline">{mockSearchResults.transactions.length}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockSearchResults.transactions.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                          >
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{transaction.description}</h3>
                                <Badge className={getStatusColor(transaction.status)}>
                                  {transaction.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground ml-auto">
                                  {transaction.confidence}% match
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{transaction.client}</span>
                                <span>•</span>
                                <span>{transaction.date}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="shrink-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Journal Entries Section */}
                {mockSearchResults.journalEntries.length > 0 && (
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <FileText className="h-5 w-5 text-purple-500" />
                          Journal Entries
                        </CardTitle>
                        <Badge variant="outline">{mockSearchResults.journalEntries.length}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockSearchResults.journalEntries.map((entry) => (
                          <div
                            key={entry.id}
                            className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                          >
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{entry.entry}</h3>
                                <Badge className={getStatusColor(entry.status)}>
                                  {entry.status.replace("_", " ")}
                                </Badge>
                                <span className="text-xs text-muted-foreground ml-auto">
                                  {entry.confidence}% match
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">{entry.description}</p>
                              <div className="text-sm font-medium">{entry.amount}</div>
                            </div>
                            <Button variant="ghost" size="sm" className="shrink-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Exceptions Section */}
                {mockSearchResults.exceptions.length > 0 && (
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                          Exceptions
                        </CardTitle>
                        <Badge variant="outline">{mockSearchResults.exceptions.length}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockSearchResults.exceptions.map((exception) => (
                          <div
                            key={exception.id}
                            className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                          >
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{exception.type}</h3>
                                <Badge className={getStatusColor(exception.severity)}>
                                  {exception.severity}
                                </Badge>
                                <span className="text-xs text-muted-foreground ml-auto">
                                  {exception.confidence}% match
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">{exception.description}</p>
                              <div className="text-xs text-muted-foreground">
                                Client: {exception.client}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="shrink-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Follow-up Suggestions */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Follow-up Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {followUpSuggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start h-auto py-3 px-4 text-sm hover:border-primary hover:bg-background"
                        >
                          <MessageSquare className="h-4 w-4 mr-2 shrink-0" />
                          <span className="text-left">{suggestion}</span>
                          <ChevronRight className="h-4 w-4 ml-auto shrink-0" />
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Empty State with Suggestions */}
            {!hasSearched && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ask AI Anything</h3>
                  <p className="text-sm text-muted-foreground max-w-md mb-6">
                    Search across all your accounting data using natural language. 
                    I can help you find clients, transactions, journal entries, and exceptions.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="outline" className="bg-background">
                      Natural Language
                    </Badge>
                    <Badge variant="outline" className="bg-background">
                      Voice Input
                    </Badge>
                    <Badge variant="outline" className="bg-background">
                      Memory Integration
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
