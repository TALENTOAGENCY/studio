
import { jobs } from "@/lib/job-data";
import { notFound } from 'next/navigation';
import JobDetail from "@/components/job/JobDetail";

export default function JobDetailPage({ params }: { params: { jobId: string } }) {
  const jobData = jobs.find(job => job.id === params.jobId);

  if (!jobData) {
    notFound();
  }

  return <JobDetail job={jobData} />;
}

export async function generateStaticParams() {
  return jobs.map((job) => ({
    jobId: job.id,
  }));
}
