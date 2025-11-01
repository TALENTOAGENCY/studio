"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Job } from '@/lib/job-data';

export function JobApplication({ job }: { job: Job }) {
  const emailBody = `Hello,

I am writing to apply for the position of ${job.title}.

Please find my resume attached for your consideration.

Thank you,
[Your Name]
`;

  const mailtoLink = `mailto:	apply2@talento.agency?subject=${encodeURIComponent(`Application for ${job.title}`)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md hover:shadow-lg transition-shadow">
      <a href={mailtoLink}>Apply Now</a>
    </Button>
  );
}
