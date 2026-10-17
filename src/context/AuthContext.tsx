"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";

export interface AdminUser {
  id: string;
  email: string | null;
  full_name: string | null;
  is_approved: boolean;
  role: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  adminUser: AdminUser | null;
  isApproved: boolean;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null; isApproved: boolean; emailUnconfirmed?: boolean }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null; user: User | null; emailConfirmationSent: boolean }>;
  signOut: () => Promise<void>;
  checkApproval: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  adminUser: null,
  isApproved: false,
  session: null,
  loading: true,
  signIn: async () => ({ error: null, isApproved: false }),
  signUp: async () => ({ error: null, user: null, emailConfirmationSent: false }),
  signOut: async () => {},
  checkApproval: async () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Guard to prevent concurrent / duplicate auth sync runs
  const isSyncingRef = useRef(false);

  // Helper to fetch or create Admin_User record
  const fetchAdminUser = useCallback(async (userId: string, userEmail?: string | null, isEmailConfirmed = false): Promise<AdminUser | null> => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("Admin_User")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.warn("Could not query Admin_User table:", error.message);
      }

      if (data) {
        const adminData: AdminUser = {
          id: data.id,
          email: data.email || userEmail || null,
          full_name: data.full_name || null,
          is_approved: Boolean(data.is_approved),
          role: data.role || "pending",
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
        return adminData;
      }

      // If user is email confirmed but row doesn't exist in Admin_User yet, create pending entry
      if (isEmailConfirmed) {
        const newAdmin = {
          id: userId,
          email: userEmail || "",
          full_name: userEmail ? userEmail.split("@")[0] : "Admin",
          is_approved: false,
          role: "pending",
        };

        const { data: createdAdmin, error: insertError } = await supabase
          .from("Admin_User")
          .insert([newAdmin])
          .select()
          .maybeSingle();

        if (insertError) {
          console.warn("Auto-create Admin_User note:", insertError.message);
        }

        const resolved = createdAdmin || newAdmin;
        return {
          id: resolved.id,
          email: resolved.email,
          full_name: resolved.full_name,
          is_approved: Boolean(resolved.is_approved),
          role: resolved.role || "pending",
          created_at: resolved.created_at,
          updated_at: resolved.updated_at,
        };
      }

      return null;
    } catch (err) {
      console.error("fetchAdminUser error:", err);
      return null;
    }
  }, []);

  // Synchronize entire auth state in one batch to eliminate race conditions
  const syncAuthState = useCallback(async (currentSession: Session | null) => {
    if (isSyncingRef.current) return;
    isSyncingRef.current = true;

    try {
      const currentUser = currentSession?.user ?? null;

      if (!currentUser) {
        setSession(null);
        setUser(null);
        setAdminUser(null);
        setIsApproved(false);
        setLoading(false);
        return;
      }

      const isEmailConfirmed = Boolean(currentUser.email_confirmed_at);
      const adminRecord = await fetchAdminUser(currentUser.id, currentUser.email, isEmailConfirmed);

      // Atomic batch update of states
      setSession(currentSession);
      setUser(currentUser);
      setAdminUser(adminRecord);
      setIsApproved(Boolean(adminRecord?.is_approved));
      setLoading(false);
    } catch (err) {
      console.error("Auth sync error:", err);
      setLoading(false);
    } finally {
      isSyncingRef.current = false;
    }
  }, [fetchAdminUser]);

  const checkApproval = useCallback(async (): Promise<boolean> => {
    if (!user) return false;
    const isEmailConfirmed = Boolean(user.email_confirmed_at);
    const adminRecord = await fetchAdminUser(user.id, user.email, isEmailConfirmed);
    const approved = Boolean(adminRecord?.is_approved);

    setAdminUser(adminRecord);
    setIsApproved(approved);
    return approved;
  }, [user, fetchAdminUser]);

  useEffect(() => {
    let mounted = true;

    // Safety timeout: ensure loading state never hangs for more than 2 seconds
    const safetyTimer = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 2000);

    try {
      const supabase = getSupabase();

      // Check current session
      supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
        if (!mounted) return;
        syncAuthState(currentSession);
      }).catch((err) => {
        console.error("Error getting session:", err);
        if (mounted) setLoading(false);
      });

      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
        if (!mounted) return;
        syncAuthState(newSession);
      });

      return () => {
        mounted = false;
        clearTimeout(safetyTimer);
        subscription.unsubscribe();
      };
    } catch (err) {
      console.error("Supabase init error in AuthProvider:", err);
      clearTimeout(safetyTimer);
      setLoading(false);
    }
  }, [syncAuthState]);

  const signIn = async (email: string, password: string) => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const isUnconfirmed = error.message.toLowerCase().includes("email not confirmed");
        return { error, isApproved: false, emailUnconfirmed: isUnconfirmed };
      }

      if (data.user) {
        const isEmailConfirmed = Boolean(data.user.email_confirmed_at);
        const adminRecord = await fetchAdminUser(data.user.id, data.user.email, isEmailConfirmed);
        const approved = Boolean(adminRecord?.is_approved);

        // Batch update state before returning to ensure consumer sees synchronized state
        setSession(data.session);
        setUser(data.user);
        setAdminUser(adminRecord);
        setIsApproved(approved);
        setLoading(false);

        return { error: null, isApproved: approved };
      }

      return { error: null, isApproved: false };
    } catch (err: any) {
      return { error: err, isApproved: false };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const supabase = getSupabase();
      const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || email.split("@")[0],
          },
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        return { error, user: null, emailConfirmationSent: false };
      }

      const newUser = data.user;
      const isEmailConfirmed = Boolean(newUser?.email_confirmed_at);

      if (isEmailConfirmed && newUser) {
        const adminRecord = await fetchAdminUser(newUser.id, newUser.email, true);
        setSession(data.session);
        setUser(newUser);
        setAdminUser(adminRecord);
        setIsApproved(Boolean(adminRecord?.is_approved));
        setLoading(false);
        return { error: null, user: newUser, emailConfirmationSent: false };
      }

      return { error: null, user: newUser, emailConfirmationSent: true };
    } catch (err: any) {
      return { error: err, user: null, emailConfirmationSent: false };
    }
  };

  const signOut = async () => {
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setSession(null);
      setUser(null);
      setAdminUser(null);
      setIsApproved(false);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        adminUser,
        isApproved,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        checkApproval,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
