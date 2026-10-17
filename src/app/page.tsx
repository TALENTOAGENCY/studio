import { getSupabase } from "@/lib/supabase";
import type { Job } from "@/lib/types";
import JobListingsView from "@/components/home/JobListingsView";

export const dynamic = "force-dynamic";

async function getJobs(): Promise<Job[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching jobs server-side:", error.message);
      return [];
    }

    return (data || []) as Job[];
  } catch (err: any) {
    console.error("Failed to query jobs from Supabase:", err?.message || err);
    return [];
  }
}

export default async function Home() {
  const initialJobs = await getJobs();
  return <JobListingsView initialJobs={initialJobs} />;
}
