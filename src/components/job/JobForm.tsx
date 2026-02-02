"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Sparkles } from "lucide-react"

import type { Job } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { generateJobPost } from "@/ai/flows/generateJobPostFlow"

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Title must be at least 2 characters."),
  department: z.string().min(2, "Department is required."),
  employmentType: z.string().min(2, "Employment type is required."),
  workplace: z.string().min(2, "Workplace is required."),
  description: z.string().min(10, "Short description must be at least 10 characters."),
  fullDescription: z.string().optional(),
  whatYouWillDo: z.string().optional(),
  highlightedSkills: z.string().optional(),
  otherSkills: z.string().optional(),
  requiredSkills: z.string().optional(),
  kpis: z.string().optional(),
  workHours: z.string().optional(),
  benefits: z.string().optional(),
  hiringProcess: z.string().optional(),
  salary: z.string().optional(),
  salaryMin: z.string().optional().nullable(),
  salaryMax: z.string().optional().nullable(),
  experienceLevel: z.string().optional(),
  education: z.string().optional(),
  otherDuties: z.string().optional(),
});

type JobFormValues = z.infer<typeof formSchema>;

interface JobFormProps {
  initialData?: Job | null;
  onSubmit: (values: JobFormValues) => void;
  isSubmitting?: boolean;
}

const arrayToString = (arr: any): string => (Array.isArray(arr) ? arr.join('\n') : '');

const jsonToString = (json: any): string => {
    if (!json) return "[]";
    try {
        return JSON.stringify(json, null, 2);
    } catch {
        return "[]";
    }
};

export default function JobForm({ initialData, onSubmit, isSubmitting }: JobFormProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);

  const defaultValues = React.useMemo(() => ({
    id: initialData?.id,
    title: initialData?.title || "",
    department: initialData?.department || "",
    employmentType: initialData?.employmentType || "",
    workplace: initialData?.workplace || "",
    description: initialData?.description || "",
    fullDescription: initialData?.fullDescription || '',
    whatYouWillDo: arrayToString(initialData?.whatYouWillDo),
    highlightedSkills: arrayToString(initialData?.highlightedSkills),
    otherSkills: arrayToString(initialData?.otherSkills),
    requiredSkills: arrayToString(initialData?.requiredSkills),
    kpis: arrayToString(initialData?.kpis),
    workHours: arrayToString(initialData?.workHours),
    benefits: arrayToString(initialData?.benefits),
    hiringProcess: jsonToString(initialData?.hiringProcess),
    salary: initialData?.salary || '',
    salaryMin: initialData?.salaryMin?.toString() ?? "",
    salaryMax: initialData?.salaryMax?.toString() ?? "",
    experienceLevel: initialData?.experienceLevel || '',
    education: initialData?.education || '',
    otherDuties: initialData?.otherDuties || '',
  }), [initialData]);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  React.useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleGenerate = async () => {
    const { title, department, highlightedSkills } = form.getValues();
    if (!title || !department || !highlightedSkills) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill in Title, Department, and Highlighted Skills to generate content with AI.",
        });
        return;
    }
    setIsGenerating(true);
    try {
        const result = await generateJobPost({ title, department, skills: highlightedSkills });
        
        form.setValue("description", result.description, { shouldValidate: true });
        form.setValue("whatYouWillDo", result.whatYouWillDo.join('\n'), { shouldValidate: true });
        form.setValue("requiredSkills", result.requiredSkills.join('\n'), { shouldValidate: true });
        form.setValue("kpis", result.kpis.join('\n'), { shouldValidate: true });
        form.setValue("benefits", result.benefits.join('\n'), { shouldValidate: true });

        toast({
            title: "Content Generated",
            description: "AI has filled in several fields for you. Please review and adjust as needed.",
        });
    } catch (error) {
        console.error("AI generation failed:", error);
        toast({
            variant: "destructive",
            title: "AI Generation Failed",
            description: "Could not generate job post content. Please try again.",
        });
    } finally {
        setIsGenerating(false);
    }
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div>
            <CardTitle>{initialData ? 'Edit Job' : 'Add New Job'}</CardTitle>
            <CardDescription>Fill in the details for the job posting. All fields will be saved to the database.</CardDescription>
          </div>
          <Button type="button" variant="outline" onClick={handleGenerate} disabled={isGenerating || isSubmitting} className="w-full sm:w-auto">
            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Generate with AI
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl><Input placeholder="e.g. Senior Software Engineer" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="department" render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl><Input placeholder="e.g. Engineering" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="employmentType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <FormControl><Input placeholder="e.g. Full-time" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="workplace" render={({ field }) => (
                <FormItem>
                  <FormLabel>Workplace</FormLabel>
                  <FormControl><Input placeholder="e.g. Dhaka (Hybrid)" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            
            <FormField control={form.control} name="highlightedSkills" render={({ field }) => (
              <FormItem>
                <FormLabel>Highlighted Skills</FormLabel>
                <FormControl><Textarea className="resize-y min-h-[80px]" {...field} /></FormControl>
                <FormDescription>Key skills for the role. Enter one per line. Used by AI to generate content.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl><Textarea placeholder="A brief summary of the job role." className="resize-y min-h-[100px]" {...field} /></FormControl>
                <FormDescription>This is the short description shown on the main job list.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            
            <FormField control={form.control} name="fullDescription" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Description</FormLabel>
                <FormControl><Textarea placeholder="The full, detailed description for the job page." className="resize-y min-h-[150px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <FormField control={form.control} name="whatYouWillDo" render={({ field }) => (
              <FormItem>
                <FormLabel>What You Will Do</FormLabel>
                <FormControl><Textarea className="resize-y min-h-[120px]" {...field} /></FormControl>
                <FormDescription>Enter each responsibility on a new line.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="requiredSkills" render={({ field }) => (
              <FormItem>
                <FormLabel>Required Skills</FormLabel>
                <FormControl><Textarea className="resize-y min-h-[120px]" {...field} /></FormControl>
                <FormDescription>Enter each skill on a new line.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="otherSkills" render={({ field }) => (
              <FormItem>
                <FormLabel>Other Skills</FormLabel>
                <FormControl><Textarea className="resize-y min-h-[80px]" {...field} /></FormControl>
                <FormDescription>Enter each skill on a new line.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="kpis" render={({ field }) => (
              <FormItem>
                <FormLabel>Key Performance Indicators (KPIs)</FormLabel>
                <FormControl><Textarea className="resize-y min-h-[120px]" {...field} /></FormControl>
                <FormDescription>Enter each KPI on a new line.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="workHours" render={({ field }) => (
              <FormItem>
                <FormLabel>Work Hours Details</FormLabel>
                <FormControl><Textarea className="resize-y min-h-[80px]" {...field} /></FormControl>
                <FormDescription>Enter each detail on a new line.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="benefits" render={({ field }) => (
              <FormItem>
                <FormLabel>Benefits</FormLabel>
                <FormControl><Textarea className="resize-y min-h-[120px]" {...field} /></FormControl>
                <FormDescription>Enter each benefit on a new line.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField control={form.control} name="salary" render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Display Text</FormLabel>
                  <FormControl><Input placeholder="e.g. BDT 80,000 - 120,000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="experienceLevel" render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <FormControl><Input placeholder="e.g. Mid-level" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="salaryMin" render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Minimum</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g. 80000" {...field} value={field.value ?? ""} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="salaryMax" render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Maximum</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g. 120000" {...field} value={field.value ?? ""} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="education" render={({ field }) => (
              <FormItem>
                <FormLabel>Education</FormLabel>
                <FormControl><Input placeholder="e.g. Bachelor's in CSE" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="otherDuties" render={({ field }) => (
              <FormItem>
                <FormLabel>Other Duties</FormLabel>
                <FormControl><Textarea className="resize-y" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <FormField control={form.control} name="hiringProcess" render={({ field }) => (
              <FormItem>
                <FormLabel>Hiring Process</FormLabel>
                <FormControl><Textarea className="resize-y min-h-[150px] font-mono text-sm" {...field} /></FormControl>
                <FormDescription>Enter as a valid JSON array. e.g., [{"title": "Step 1", "details": "Details for step 1"}]</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" disabled={isSubmitting || isGenerating}>
              {isSubmitting ? (initialData ? "Saving..." : "Creating...") : (initialData ? "Save Changes" : "Create Job")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
