"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { JobForm } from '@/components/job/JobForm';
import { getSupabase } from '@/lib/supabase';
import AppHeader from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AddJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    
    // Create a new full job object with default values for complex fields
    const newJob = {
      ...values,
      id: `ta${Math.floor(Date.now() / 1000)}`, // Simple unique ID
      whatYouWillDo: [],
      highlightedSkills: [],
      otherSkills: [],
      requiredSkills: [],
      kpis: [],
      workHours: [],
      otherDuties: "",
      education: "",
      salary: "Not specified",
      salaryMin: null,
      salaryMax: null,
      experienceLevel: "Not specified",
      benefits: [],
      hiringProcess: [],
      fullDescription: values.description,
    };

    const supabase = getSupabase();
    const { error } = await supabase.from('jobs').insert([newJob]);

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
        description: 'The new job has been added to the database.',
      });
      router.push('/jobpost/dashboard');
      router.refresh(); // To reflect changes on the main page
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
            <JobForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </main>
    </div>
  );
}
