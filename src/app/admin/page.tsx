"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
import type { Job } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Briefcase,
  Building,
  Calendar,
  DollarSign,
  ExternalLink,
  MapPin,
  PlusCircle,
  RefreshCw,
  Search,
  Trash2,
  Copy,
  Check,
  Loader2,
  Layers,
  Users
} from "lucide-react";

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedWorkplace, setSelectedWorkplace] = useState("all");

  // Deletion modal state
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (err: any) {
      if (
        err?.name === "AbortError" ||
        err?.message?.includes("aborted") ||
        err?.message?.includes("signal is aborted")
      ) {
        return;
      }
      console.error("Error loading jobs for admin:", err);
      toast({
        variant: "destructive",
        title: "Failed to load jobs",
        description: err.message || "Could not retrieve jobs from the database.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async () => {
    if (!jobToDelete) return;
    setIsDeleting(true);

    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("jobs").delete().eq("id", jobToDelete.id);

      if (error) throw error;

      toast({
        title: "Job deleted",
        description: `Position "${jobToDelete.title}" (ID: ${jobToDelete.id}) was removed.`,
      });

      setJobs((prev) => prev.filter((j) => j.id !== jobToDelete.id));
      setJobToDelete(null);
    } catch (err: any) {
      console.error("Error deleting job:", err);
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: err.message || "Failed to delete the job from database.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCopyLink = (jobId: string) => {
    const url = `${window.location.origin}/jobs/${jobId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(jobId);
    toast({
      title: "Link copied!",
      description: "Public job link copied to your clipboard.",
    });
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filter options
  const departments = useMemo(() => {
    const set = new Set(jobs.map((j) => j.department).filter(Boolean));
    return Array.from(set).sort();
  }, [jobs]);

  const workplaces = useMemo(() => {
    const set = new Set(jobs.map((j) => j.workplace).filter(Boolean));
    return Array.from(set).sort();
  }, [jobs]);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.id.toLowerCase().includes(query) ||
        (job.department && job.department.toLowerCase().includes(query)) ||
        (job.description && job.description.toLowerCase().includes(query));

      const matchesDept = selectedDept === "all" || job.department === selectedDept;
      const matchesWorkplace = selectedWorkplace === "all" || job.workplace === selectedWorkplace;

      return matchesSearch && matchesDept && matchesWorkplace;
    });
  }, [jobs, searchQuery, selectedDept, selectedWorkplace]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      {/* Header & Main CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">Jobs Management Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage your open career opportunities, inspect listings, or publish new roles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchJobs}
            disabled={isLoading}
            className="text-xs sm:text-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button asChild size="sm" className="bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-sm">
            <Link href="/admin/post-job">
              <PlusCircle className="w-4 h-4 mr-1.5" />
              Post New Job
            </Link>
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="shadow-sm border-border/80 bg-card/60">
          <CardContent className="p-4 sm:p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Total Listings</p>
              <h3 className="text-2xl sm:text-3xl font-bold font-headline mt-1">{jobs.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Briefcase className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/80 bg-card/60">
          <CardContent className="p-4 sm:p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Departments</p>
              <h3 className="text-2xl sm:text-3xl font-bold font-headline mt-1">{departments.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
              <Building className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/80 bg-card/60">
          <CardContent className="p-4 sm:p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Locations</p>
              <h3 className="text-2xl sm:text-3xl font-bold font-headline mt-1">{workplaces.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <MapPin className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/80 bg-card/60">
          <CardContent className="p-4 sm:p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Filtered Results</p>
              <h3 className="text-2xl sm:text-3xl font-bold font-headline mt-1">{filteredJobs.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <Layers className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="mb-6 shadow-sm border-border/80 bg-card/40 backdrop-blur">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search */}
            <div className="sm:col-span-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, ID, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 bg-background"
              />
            </div>

            {/* Department */}
            <div className="sm:col-span-3">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Departments ({departments.length})</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Workplace */}
            <div className="sm:col-span-3">
              <select
                value={selectedWorkplace}
                onChange={(e) => setSelectedWorkplace(e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Locations ({workplaces.length})</option>
                {workplaces.map((wp) => (
                  <option key={wp} value={wp}>
                    {wp}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings List */}
      {isLoading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading job listings...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <Card className="text-center py-16 px-4 border-dashed">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold font-headline">No job listings found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery || selectedDept !== "all" || selectedWorkplace !== "all"
                ? "Try resetting your search filters to find what you are looking for."
                : "No jobs currently exist in the database. Post your first job listing now!"}
            </p>
            <Button asChild size="sm" className="mt-2">
              <Link href="/admin/post-job">
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Post New Job
              </Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="hover:border-primary/40 transition-colors shadow-sm bg-card/80 backdrop-blur"
            >
              <CardContent className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Job Info */}
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted font-medium text-muted-foreground">
                      {job.id}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {job.department || "General"}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {job.employmentType || "Full-time"}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-dashed">
                      {job.experienceLevel || "Mid-level"}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold font-headline hover:text-primary transition-colors">
                    <Link href={`/jobs/${job.id}`} target="_blank" className="hover:underline">
                      {job.title}
                    </Link>
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {job.workplace || "Location not set"}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-primary" />
                      {job.salary || "Negotiable"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 flex-shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyLink(job.id)}
                    className="text-xs h-9"
                    title="Copy Public Link"
                  >
                    {copiedId === job.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1" />
                        Copy Link
                      </>
                    )}
                  </Button>

                  <Button asChild variant="secondary" size="sm" className="text-xs h-9">
                    <Link href={`/jobs/${job.id}`} target="_blank">
                      <ExternalLink className="w-3.5 h-3.5 mr-1" />
                      View Live
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setJobToDelete(job)}
                    className="text-xs h-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    title="Delete Job"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={!!jobToDelete} onOpenChange={(open) => !open && setJobToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the job posting{" "}
              <span className="font-semibold text-foreground">
                "{jobToDelete?.title}" (ID: {jobToDelete?.id})
              </span>{" "}
              from the live Supabase database. Candidates will no longer be able to view or apply for this role.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Job"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
