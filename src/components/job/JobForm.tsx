"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { Job } from "@/lib/types"

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  department: z.string().min(2, "Department is required."),
  employmentType: z.string().min(2, "Employment type is required."),
  workplace: z.string().min(2, "Workplace is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  id: z.string().optional(),
})

type JobFormValues = z.infer<typeof formSchema>

interface JobFormProps {
  initialData?: Job | null;
  onSubmit: (values: JobFormValues) => void;
  isSubmitting?: boolean;
}

export function JobForm({ initialData, onSubmit, isSubmitting }: JobFormProps) {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      id: initialData.id,
      title: initialData.title,
      department: initialData.department,
      employmentType: initialData.employmentType,
      workplace: initialData.workplace,
      description: initialData.description,
    } : {
      title: "",
      department: "",
      employmentType: "",
      workplace: "",
      description: "",
    },
  })

  return (
    <Card>
        <CardHeader>
            <CardTitle>{initialData ? 'Edit Job' : 'Add New Job'}</CardTitle>
            <CardDescription>Fill in the details for the job posting. More complex fields can be edited directly in your Supabase table.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. Senior Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. Engineering" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. Full-time" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="workplace"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Workplace</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. Dhaka (Hybrid)" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="A brief summary of the job role."
                        className="resize-y min-h-[100px]"
                        {...field}
                        />
                    </FormControl>
                     <FormDescription>
                        This is the short description shown on the main job list.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (initialData ? "Saving..." : "Creating...") : (initialData ? "Save Changes" : "Create Job")}
                </Button>
            </form>
            </Form>
        </CardContent>
    </Card>
    
  )
}
