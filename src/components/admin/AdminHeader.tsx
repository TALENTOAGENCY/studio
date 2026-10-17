"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import TalentoLogo from "@/components/icons/TalentoLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, LayoutDashboard, ExternalLink, LogOut, Shield } from "lucide-react";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Admin Badge */}
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-muted/50 transition-colors">
              <TalentoLogo className="h-7 w-auto text-primary" />
            </Link>
            <Badge variant="outline" className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border-primary/20">
              <Shield className="w-3 h-3" />
              Admin Portal
            </Badge>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Button
              asChild
              variant={pathname === "/admin" ? "secondary" : "ghost"}
              size="sm"
              className="text-xs sm:text-sm font-medium"
            >
              <Link href="/admin">
                <LayoutDashboard className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden">Jobs</span>
              </Link>
            </Button>

            <Button
              asChild
              variant={pathname === "/admin/post-job" ? "default" : "outline"}
              size="sm"
              className="text-xs sm:text-sm font-medium"
            >
              <Link href="/admin/post-job">
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Post Job
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground hidden md:inline-flex"
            >
              <Link href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                Live Careers
              </Link>
            </Button>
          </nav>

          {/* User profile & actions */}
          <div className="flex items-center gap-2">
            {user?.email && (
              <span className="text-xs text-muted-foreground hidden lg:inline-block max-w-[180px] truncate">
                {user.email}
              </span>
            )}
            <ThemeToggle />
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs px-2 sm:px-3"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
