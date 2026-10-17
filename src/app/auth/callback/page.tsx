"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [statusText, setStatusText] = useState("Verifying your email and confirming credentials...");

  useEffect(() => {
    let mounted = true;

    const handleCallback = async () => {
      try {
        const supabase = getSupabase();

        // 1. If PKCE flow returned a code, exchange it for session
        if (typeof window !== "undefined") {
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get("code");
          if (code) {
            const { error: exchangeErr } = await supabase.auth.exchangeCodeForSession(code);
            if (exchangeErr) {
              console.warn("exchangeCodeForSession warning:", exchangeErr.message);
            }
          }
        }

        // 2. Get the current session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Auth callback session error:", error);
          router.replace("/login?error=" + encodeURIComponent(error.message));
          return;
        }

        if (session?.user) {
          const user = session.user;
          if (mounted) setStatusText("Email confirmed! Verifying account permissions...");

          const fullName = user.user_metadata?.full_name || (user.email ? user.email.split("@")[0] : "Admin");

          // Ensure user exists in Admin_User
          await supabase
            .from("Admin_User")
            .upsert(
              [
                {
                  id: user.id,
                  email: user.email,
                  full_name: fullName,
                  is_approved: false, // Default is false, requires manual activation in Supabase
                  role: "pending",
                  updated_at: new Date().toISOString(),
                },
              ],
              { onConflict: "id", ignoreDuplicates: true }
            );

          if (mounted) {
            setStatusText("Verification complete! Redirecting to dashboard...");
            setTimeout(() => {
              router.replace("/admin");
            }, 600);
          }
        } else {
          // If no session found yet, listen for auth event (e.g. from hash fragment)
          const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
            if (currentSession?.user && mounted) {
              const u = currentSession.user;
              await supabase.from("Admin_User").upsert(
                [
                  {
                    id: u.id,
                    email: u.email,
                    full_name: u.user_metadata?.full_name || (u.email ? u.email.split("@")[0] : "Admin"),
                    is_approved: false,
                    role: "pending",
                    updated_at: new Date().toISOString(),
                  },
                ],
                { onConflict: "id", ignoreDuplicates: true }
              );

              subscription.unsubscribe();
              router.replace("/admin");
            }
          });

          // Fallback timeout
          setTimeout(() => {
            if (mounted) router.replace("/login");
          }, 4000);
        }
      } catch (err: any) {
        console.error("Auth callback exception:", err);
        router.replace("/login");
      }
    };

    handleCallback();

    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="p-8 rounded-2xl bg-card border shadow-xl max-w-md w-full text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <h2 className="text-xl font-bold font-headline">Email Verification</h2>
        <p className="text-sm text-muted-foreground">{statusText}</p>
      </div>
    </div>
  );
}
