"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import TalentoLogo from "@/components/icons/TalentoLogo";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ShieldAlert,
  RefreshCw,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  Clock,
  MailCheck
} from "lucide-react";

export default function PendingApprovalView() {
  const router = useRouter();
  const { user, adminUser, checkApproval, signOut } = useAuth();
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
  };

  const handleCheckStatus = async () => {
    setIsChecking(true);
    try {
      const approved = await checkApproval();
      if (approved) {
        toast({
          title: "Access Approved! 🎉",
          description: "Your administrator account has been authorized. Entering dashboard...",
        });
      } else {
        toast({
          title: "Still Pending Authorization",
          description: "Your account is not yet approved. Please make sure is_approved is set to true in the Admin_User table in Supabase.",
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Check failed",
        description: err.message || "Could not check approval status.",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto px-4 py-6 flex items-center justify-between relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Careers
        </Link>
        <Link href="https://talento.agency" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-card/60 backdrop-blur border">
          <TalentoLogo className="h-7 w-auto text-primary" />
        </Link>
      </div>

      {/* Main card */}
      <main className="container mx-auto px-4 py-8 flex items-center justify-center relative z-10">
        <Card className="w-full max-w-lg shadow-2xl border-amber-500/30 bg-card/95 backdrop-blur-md">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-3 shadow-inner">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Account Pending Authorization
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold font-headline">
              Account Pending Authorization
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Account Details Box */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/80 space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Account Email:</span>
                <span className="font-semibold text-foreground">{user?.email || "Unknown"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email Status:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <MailCheck className="w-3.5 h-3.5" />
                  Verified & Confirmed
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Account Role:</span>
                <span className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                  {adminUser?.role || "Pending Approval"}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              onClick={handleCheckStatus}
              disabled={isChecking}
              className="w-full sm:flex-1 font-semibold"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? "animate-spin" : ""}`} />
              Check Approval Status
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="w-full sm:w-auto text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-xs text-muted-foreground relative z-10">
        &copy; {new Date().getFullYear()} Talento Studio &bull; Security & Permissions Gate
      </footer>
    </div>
  );
}
