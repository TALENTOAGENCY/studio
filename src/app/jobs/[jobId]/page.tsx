
import { notFound } from 'next/navigation';
import JobDetail from "@/components/job/JobDetail";
import { supabase } from '@/lib/supabase';
import type { Job } from '@/lib/job-data';

async function getJob(jobId: string) {
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();
    
    if (error) {
        console.error('Error fetching job:', error);
        return null;
    }
    return data;
}

export default async function JobDetailPage({ params }: { params: { jobId: string } }) {
  const jobData = await getJob(params.jobId);

  if (!jobData) {
    notFound();
  }

  return <JobDetail job={jobData as Job} />;
}

export async function generateStaticParams() {
  const { data: jobs, error } = await supabase.from('jobs').select('id');
  if (error || !jobs) {
      return [];
  }
  return jobs.map((job) => ({
    jobId: job.id.toString(),
  }));
}
