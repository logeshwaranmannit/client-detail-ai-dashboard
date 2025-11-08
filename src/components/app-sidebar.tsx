"use client";

import * as React from "react";
import {
  Brain,
  MessageSquare,
  Users,
  Bot,
  FileText,
  Shield,
  Settings,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Activity,
  TrendingUp,
  Zap,
  Eye,
  BarChart,
  FileCheck,
  DollarSign,
  Calendar,
  History,
  Lock,
  Sliders,
  Plug,
  Bell,
  Database,
  AlertTriangle,
  GitMerge,
  BookOpen,
  UserCog,
  Package,
  PenTool,
  Landmark,
  Search,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// AI-centric menu with sub-items based on the table structure
const mainMenuItems = [
  {
    label: "AI Command Center",
    icon: Brain,
    href: "/dashboard",
    description: "AI co-pilot and command hub",
    subItems: [
      { label: "Active Tasks", icon: Activity, href: "/dashboard/ai-command-center/active-tasks" },
      { label: "Smart Suggestions", icon: Sparkles, href: "/dashboard/ai-command-center/suggestions" },
      { label: "Insights", icon: TrendingUp, href: "/dashboard/ai-command-center/insights" },
    ],
  },
  {
    label: "Ask AI",
    icon: Search,
    href: "/dashboard/ask-ai",
    description: "Global semantic search across all data",
  },
  {
    label: "Client Intelligence",
    icon: Eye,
    href: "/dashboard/client-intelligence",
    description: "AI-powered client insights and analytics",
  },
  {
    label: "Clients",
    icon: Users,
    href: "/dashboard/clients",
    description: "Client management and intelligence",
    subItems: [
      { label: "Client Detail", icon: FileText, href: "/dashboard/clients/detail" },
    ],
  },
  {
    label: "Agents",
    icon: Bot,
    href: "/dashboard/agents",
    description: "AI agents and automation tasks",
    subItems: [
      { label: "Agent Activity", icon: Activity, href: "/dashboard/agents/activity" },
      { label: "Ingestion Hub", icon: Database, href: "/dashboard/agents/ingestion-hub" },
      { label: "Reconciliation Console", icon: GitMerge, href: "/dashboard/agents/reconciliation-console" },
      { label: "Exception Review", icon: AlertTriangle, href: "/dashboard/agents/exception-review" },
    ],
  },
  {
    label: "Finalization",
    icon: FileCheck,
    href: "/dashboard/finalization",
    description: "Journal entries and reconciliation",
    subItems: [
      { label: "Journal Intelligence", icon: BookOpen, href: "/dashboard/finalization/journal-intelligence" },
      { label: "Bank Reconciliation", icon: Landmark, href: "/dashboard/finalization/bank-reconciliation" },
      { label: "GL Sync / Finalize", icon: GitMerge, href: "/dashboard/finalization/gl-sync" },
    ],
  },
  {
    label: "Reporting",
    icon: FileText,
    href: "/dashboard/reporting",
    description: "Financial reports and narratives",
    subItems: [
      { label: "Financial Narrative", icon: FileText, href: "/dashboard/reporting/financial-narrative" },
      { label: "Close Packages", icon: Package, href: "/dashboard/reporting/close-packages" },
      { label: "CPA Sign-Off", icon: PenTool, href: "/dashboard/reporting/cpa-signoff" },
    ],
  },
  {
    label: "Audit",
    icon: Shield,
    href: "/dashboard/audit",
    description: "Audit trail and compliance",
    subItems: [
      { label: "Audit Ledger", icon: History, href: "/dashboard/audit/ledger" },
    ],
  },
  {
    label: "Learning",
    icon: Brain,
    href: "/dashboard/learning",
    description: "AI learning and improvements",
    subItems: [
      { label: "Learning Loop", icon: TrendingUp, href: "/dashboard/learning/loop" },
    ],
  },
  {
    label: "System",
    icon: Settings,
    href: "/dashboard/system",
    description: "System configuration and settings",
    subItems: [
      { label: "Agent Settings", icon: Sliders, href: "/dashboard/system/agent-settings" },
      { label: "Alerts", icon: Bell, href: "/dashboard/system/alerts" },
      { label: "User Management", icon: UserCog, href: "/dashboard/system/user-management" },
      { label: "Integrations", icon: Plug, href: "/dashboard/system/integrations" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [aiQuery, setAiQuery] = React.useState("");
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiQuery.trim()) {
      window.location.href = `/dashboard/ai-command-center?q=${encodeURIComponent(aiQuery)}`;
    }
  };

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">AI Accounting</span>
            <span className="text-xs text-muted-foreground">Powered by AI Agents</span>
          </div>
        </div>

        {/* Conversational-first: Prominent AI query input */}
        <div className="px-2 pb-3">
          <form onSubmit={handleAiSubmit}>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ask AI anything..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="pl-9 pr-3 h-9 bg-sidebar-accent/50 border-sidebar-border"
              />
            </div>
          </form>
          <p className="text-[10px] text-muted-foreground mt-1.5 px-1">
            Try: "Show me client status" or "Run reconciliation"
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => {
                const isExpanded = expandedItems.includes(item.label);
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild={!item.subItems} 
                      isActive={isActive && !isExpanded} 
                      className="h-auto py-3"
                      onClick={() => item.subItems && toggleExpanded(item.label)}
                    >
                      {item.subItems ? (
                        <div className="flex w-full cursor-pointer">
                          <item.icon className="h-5 w-5 shrink-0" />
                          <div className="flex flex-1 flex-col items-start gap-0.5 overflow-hidden">
                            <span className="font-medium text-sm">{item.label}</span>
                            <span className="text-[11px] text-muted-foreground line-clamp-1">
                              {item.description}
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                          )}
                        </div>
                      ) : (
                        <Link href={item.href}>
                          <item.icon className="h-5 w-5 shrink-0" />
                          <div className="flex flex-col items-start gap-0.5 overflow-hidden">
                            <span className="font-medium text-sm">{item.label}</span>
                            <span className="text-[11px] text-muted-foreground line-clamp-1">
                              {item.description}
                            </span>
                          </div>
                        </Link>
                      )}
                    </SidebarMenuButton>
                    
                    {item.subItems && isExpanded && (
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <SidebarMenuSubItem key={subItem.href}>
                              <SidebarMenuSubButton asChild isActive={isSubActive}>
                                <Link href={subItem.href}>
                                  <subItem.icon className="h-4 w-4" />
                                  <span>{subItem.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions - Context-aware section */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <div className="px-2 py-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs h-8"
                onClick={() => window.location.href = '/dashboard/agent-activity'}
              >
                <Bot className="h-3.5 w-3.5 mr-2" />
                View All Agent Tasks
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">CPA Mode</span>
            <span className="block text-[10px]">6 agents active</span>
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}