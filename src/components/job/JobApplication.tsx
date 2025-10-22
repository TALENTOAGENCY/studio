
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ApplicationFlow } from '@/components/job/ApplicationFlow';
import { Job } from '@/lib/job-data';

export function JobApplication({ job }: { job: Job }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md hover:shadow-lg transition-shadow">Apply Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90svh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="font-headline text-2xl">Apply for {job.title}</DialogTitle>
            <DialogDescription>Submit your application below. Our AI will give you an instant analysis of your fit for this role.</DialogDescription>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto px-6 pb-6">
            <ApplicationFlow 
              job={job}
              onSubmissionComplete={() => {
                // The result view has its own success message. 
                // We can add a timeout to close the modal after a while.
                setTimeout(() => setOpen(false), 8000) 
              }} 
            />
          </div>
      </DialogContent>
    </Dialog>
  );
}
