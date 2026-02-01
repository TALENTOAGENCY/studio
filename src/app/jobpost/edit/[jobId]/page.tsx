
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { JobForm } from '@/components/job/JobForm';
import { supabase } from '@/lib/supabase';
import type { Job } from '@/lib/types';
import AppHeader from '@/components/AppHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobId = params.jobId as string;

  useEffect(() => {
    if (!jobId) return;
    const fetchJob = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();
      
      if (error || !data) {
        toast({
          variant: 'destructive',
          title: 'Error fetching job',
          description: error?.message || 'Job not found.',
        });
        router.push('/jobpost/dashboard');
      } else {
        setJob(data as Job);
      }
      setIsLoading(false);
    };

    fetchJob();
  }, [jobId, router, toast]);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    const { error } = await supabase
      .from('jobs')
      .update({
        title: values.title,
        department: values.department,
        employmentType: values.employmentType,
        workplace: values.workplace,
        description: values.description,
      })
      .eq('id', jobId);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error updating job',
        description: error.message,
      });
      setIsSubmitting(false);
    } else {
      toast({
        title: 'Job Updated',
        description: 'The job posting has been saved.',
      });
      router.push('/jobpost/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
             <div className="mb-6">
                <Button asChild variant="ghost" className="text-muted-foreground">
                <Link href="/jobpost/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
                </Button>
            </div>
            {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-8 w-2/3" />
                    <div className="space-y-8 pt-8">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
            ) : (
                <JobForm initialData={job} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            )}
        </div>
      </main>
    </div>
  );
}
