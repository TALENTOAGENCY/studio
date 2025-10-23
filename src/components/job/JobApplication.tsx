
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Job } from '@/lib/job-data';

export function JobApplication({ job }: { job: Job }) {
  const mailtoLink = `mailto:dawod.analyst@gmail.com?subject=Application for ${encodeURIComponent(job.title)}`;

  return (
    <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md hover:shadow-lg transition-shadow">
      <a href={mailtoLink}>Apply Now</a>
    </Button>
  );
}
