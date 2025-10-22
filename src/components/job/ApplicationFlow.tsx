
"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Mail, Terminal, UploadCloud, User, FileText, CheckCircle } from "lucide-react";
import { MatchResult } from "./MatchResult";
import { applyForJob, type JobApplicationOutput } from "@/ai/flows/apply-for-job";
import { useToast } from "@/hooks/use-toast";
import { Job } from "@/lib/job-data";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  resume: z
    .any()
    .refine((files) => files?.length == 1, "Resume is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(files?.[0]?.type),
      "Only .pdf, .doc, and .docx formats are supported."
    ),
  coverLetter: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof formSchema>;

interface ApplicationFlowProps {
  job: Job;
  onSubmissionComplete: () => void;
}

const readFileAsDataURI = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

export function ApplicationFlow({ job, onSubmissionComplete }: ApplicationFlowProps) {
  const [step, setStep] = useState<"form" | "loading" | "result" | "error">("form");
  const [matchResult, setMatchResult] = useState<JobApplicationOutput | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", coverLetter: "" },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      form.setValue("resume", acceptedFiles, { shouldValidate: true });
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  const onSubmit = async (values: ApplicationFormValues) => {
    setStep("loading");
    try {
      const resumeFile = values.resume[0];
      const resumeDataUri = await readFileAsDataURI(resumeFile);
      
      const result = await applyForJob({
        applicantName: values.name,
        applicantEmail: values.email,
        resumeDataUri,
        jobTitle: job.title,
        jobDescription: job.fullDescription,
        coverLetter: values.coverLetter,
      });

      setMatchResult(result);
      setStep("result");
      onSubmissionComplete();
    } catch (error) {
      console.error("Job application failed:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred.";
      setErrorMessage(message);
      setStep("error");
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      });
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {step === "form" && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="John Doe" {...field} className="pl-9" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                           <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="email" placeholder="john.doe@email.com" {...field} className="pl-9" />
                           </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume</FormLabel>
                      <FormControl>
                        <div
                          {...getRootProps()}
                          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                        >
                          <input {...getInputProps()} />
                          <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
                          {acceptedFiles.length > 0 ? (
                            <div className="flex items-center gap-2 text-sm text-foreground">
                              <FileText className="h-4 w-4" />
                              <span>{acceptedFiles[0].name}</span>
                            </div>
                          ) : (
                            <>
                              <p className="text-center text-sm text-muted-foreground">
                                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX (max 5MB)</p>
                            </>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Letter (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us why you're a great fit for this role..." className="resize-y min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Submit Application & Get AI Analysis</Button>
              </form>
            </Form>
          </motion.div>
        )}

        {step === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
            <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary mb-4" />
            <p className="text-lg font-semibold font-headline">Analyzing your profile & Submitting...</p>
            <p className="text-muted-foreground">Our AI is matching your skills and sending your application.</p>
          </motion.div>
        )}

        {step === "result" && matchResult && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
             <div className="text-center py-6">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold font-headline">Application Submitted!</h3>
                <p className="text-muted-foreground mt-1 mb-6">Your application has been sent. Here is your initial AI-powered match analysis.</p>
                <MatchResult score={matchResult.matchScore} summary={matchResult.summary} />
             </div>
          </motion.div>
        )}

        {step === "error" && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Application Failed</AlertTitle>
              <AlertDescription>
                <p>{errorMessage}</p>
                <Button variant="destructive" size="sm" className="mt-4" onClick={() => setStep("form")}>
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
