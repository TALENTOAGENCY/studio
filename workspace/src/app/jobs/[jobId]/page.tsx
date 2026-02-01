
import { notFound } from 'next/navigation';
import JobDetail from "@/components/job/JobDetail";
import { supabase } from '@/lib/supabase';
import type { Job } from '@/lib/types';

export const dynamic = 'force-dynamic';

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

  // Ensure arrays are not null before passing to component
  const job = {
    ...jobData,
    whatYouWillDo: jobData.whatYouWillDo || [],
    highlightedSkills: jobData.highlightedSkills || [],
    otherSkills: jobData.otherSkills || [],
    requiredSkills: jobData.requiredSkills || [],
    kpis: jobData.kpis || [],
    workHours: jobData.workHours || [],
    benefits: jobData.benefits || [],
    hiringProcess: jobData.hiringProcess || [],
  };


  return <JobDetail job={job as Job} />;
}
