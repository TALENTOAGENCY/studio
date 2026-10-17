"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import TalentoLogo from "@/components/icons/TalentoLogo";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  UserPlus,
  User,
  MailCheck
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, isApproved, loading: authLoading, signIn, signUp } = useAuth();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [verificationEmailSent, setVerificationEmailSent] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/admin");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please enter both your email and password.",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "signin") {
        const { error, isApproved: approved, emailUnconfirmed } = await signIn(email.trim(), password);

        if (error) {
          if (emailUnconfirmed) {
            toast({
              variant: "destructive",
              title: "Email Not Verified",
              description: "Please check your inbox and click the verification link before logging in.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Sign in failed",
              description: error.message || "Invalid email or password. Please verify your credentials.",
            });
          }
        } else {
          if (approved) {
            toast({
              title: "Welcome back!",
              description: "Successfully authenticated. Loading dashboard...",
            });
          } else {
            toast({
              title: "Account Pending Authorization",
              description: "Email verified. Awaiting manual administrator activation in Supabase.",
            });
          }
          router.replace("/admin");
        }
      } else {
        const { error, user: newUser, emailConfirmationSent } = await signUp(email.trim(), password, fullName.trim());

        if (error) {
          toast({
            variant: "destructive",
            title: "Registration failed",
            description: error.message || "Could not register account.",
          });
        } else if (emailConfirmationSent) {
          setVerificationEmailSent(email.trim());
          toast({
            title: "Verification Email Sent ✉️",
            description: `We've sent a confirmation link to ${email.trim()}. Please verify your email.`,
          });
        } else {
          toast({
            title: "Account Registered",
            description: "Account created and pending administrator approval.",
          });
          router.replace("/admin");
        }
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: err.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only show a loading screen if user is already logged in and being redirected to /admin
  if (user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">Already signed in. Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header bar */}
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
        <Card className="w-full max-w-md shadow-2xl border-border/80 bg-card/95 backdrop-blur-md">
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-2 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight font-headline">
              {mode === "signin" ? "Admin Portal" : "Register Admin"}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground">
              {mode === "signin"
                ? "Sign in with your administrator credentials to access the job dashboard."
                : "Create an administrator account."}
            </CardDescription>
          </CardHeader>

          {/* Verification Email Sent Notice */}
          {verificationEmailSent ? (
            <CardContent className="space-y-5 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
                <MailCheck className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold font-headline">Verify Your Email</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  We have sent a verification link to: <br />
                  <strong className="text-foreground">{verificationEmailSent}</strong>
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setVerificationEmailSent(null);
                  setMode("signin");
                }}
                className="w-full"
              >
                Return to Sign In
              </Button>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Full Name <span className="text-xs font-normal text-muted-foreground">(Optional)</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="e.g. Sarah Connor"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10 h-11 bg-background/50 focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@talento.agency"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 bg-background/50 focus-visible:ring-primary"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Password
                    </Label>
                    {mode === "signup" && (
                      <span className="text-xs text-muted-foreground">Min 6 characters</span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11 bg-background/50 focus-visible:ring-primary"
                      required
                      autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 font-semibold text-sm shadow-md transition-all hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {mode === "signin" ? "Signing In..." : "Sending Verification..."}
                    </>
                  ) : (
                    <>
                      {mode === "signin" ? (
                        <>
                          <ShieldCheck className="w-4 h-4 mr-2" />
                          Sign In to Dashboard
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Register Admin Account
                        </>
                      )}
                    </>
                  )}
                </Button>

                <div className="text-center text-xs text-muted-foreground">
                  {mode === "signin" ? (
                    <p>
                      Need a new admin account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setVerificationEmailSent(null);
                          setMode("signup");
                        }}
                        className="text-primary hover:underline font-medium"
                      >
                        Register here
                      </button>
                    </p>
                  ) : (
                    <p>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setVerificationEmailSent(null);
                          setMode("signin");
                        }}
                        className="text-primary hover:underline font-medium"
                      >
                        Sign In
                      </button>
                    </p>
                  )}
                </div>
              </CardFooter>
            </form>
          )}
        </Card>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-xs text-muted-foreground relative z-10">
        &copy; {new Date().getFullYear()} Talento Studio. Security & Permissions Gate.
      </footer>
    </div>
  );
}
