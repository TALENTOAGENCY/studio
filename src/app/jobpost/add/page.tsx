"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import JobForm from '@/components/job/JobForm';
import { getSupabase } from '@/lib/supabase';
import AppHeader from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Job } from '@/lib/types';

// Helper to convert a string (multiline or comma-separated) to an array of strings
const stringToArray = (str: string | undefined | null) => {
    if (!str) return [];
    // Handles both comma-separated and newline-separated
    return str.split(/[\n,]/).map(item => item.trim()).filter(Boolean);
};

export default function AddJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    
    let hiringProcess;
    try {
      hiringProcess = values.hiringProcess ? JSON.parse(values.hiringProcess) : [];
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Invalid Hiring Process JSON',
        description: 'Please provide a valid JSON array for the hiring process.',
      });
      setIsSubmitting(false);
      return;
    }

    const jobToInsert = {
      ...values,
      id: `ta${Math.floor(Date.now() / 1000)}`,
      whatYouWillDo: stringToArray(values.whatYouWillDo),
      highlightedSkills: stringToArray(values.highlightedSkills),
      otherSkills: stringToArray(values.otherSkills),
      requiredSkills: stringToArray(values.requiredSkills),
      kpis: stringToArray(values.kpis),
      workHours: stringToArray(values.workHours),
      benefits: stringToArray(values.benefits),
      hiringProcess: hiringProcess,
      salaryMin: values.salaryMin ? Number(values.salaryMin) : null,
      salaryMax: values.salaryMax ? Number(values.salaryMax) : null,
    };

    const supabase = getSupabase();
    const { error } = await supabase.from('jobs').insert([jobToInsert]);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error creating job',
        description: error.message,
      });
      setIsSubmitting(false);
    } else {
      toast({
        title: 'Job Created',
        description: 'The new job has been added successfully.',
      });
      router.push('/jobpost/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <Button asChild variant="ghost" className="text-muted-foreground">
                <Link href="/jobpost/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
                </Button>
            </div>
            <JobForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </main>
    </div>
  );
}
