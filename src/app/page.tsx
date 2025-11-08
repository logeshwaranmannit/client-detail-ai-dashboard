import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <main className="flex w-full max-w-4xl flex-col items-center gap-12 px-8 py-16 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-xl">
            <svg
              className="h-12 w-12 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-5xl font-semibold tracking-tight text-foreground">
              AI Accounting Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Modern accounting powered by artificial intelligence for CPAs and financial professionals
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button asChild size="lg" className="h-12 text-base font-medium flex-1">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 text-base font-medium flex-1">
            <Link href="/register">Create Account</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full">
          <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground">AI-Powered</h3>
            <p className="text-sm text-muted-foreground">Intelligent automation for accounting workflows</p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground">Secure</h3>
            <p className="text-sm text-muted-foreground">Enterprise-grade security for your data</p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground">Analytics</h3>
            <p className="text-sm text-muted-foreground">Real-time insights and reporting</p>
          </div>
        </div>
      </main>
    </div>
  );
}