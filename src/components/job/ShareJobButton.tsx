
"use client";

import { useState } from 'react';
import type { Job } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";

export function ShareJobButton({ job }: { job: Job }) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    const jobUrl = `${window.location.origin}/jobs/${job.id}`;
    navigator.clipboard.writeText(jobUrl).then(() => {
      setIsCopied(true);
      toast({
        title: "Link Copied!",
        description: "The job link has been copied to your clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Could not copy the link.",
      });
    });
  };

  return (
    <Button variant="outline" size="icon" onClick={handleShare} aria-label="Share job">
      <Share2 className="h-4 w-4" />
    </Button>
  );
}
