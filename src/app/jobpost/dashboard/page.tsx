'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_KEY } from '../page';
import { jobs as initialJobs, Job } from '@/lib/job-data';
import AppHeader from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Upload, Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

export default function JobPostDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const { toast } = useToast();

  useEffect(() => {
    const isAuth = sessionStorage.getItem(AUTH_KEY) === 'true';
    if (!isAuth) {
      router.replace('/jobpost');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    router.push('/jobpost');
  };
  
  const handleAddNew = () => {
    toast({ title: "Note", description: "Add new job functionality will be implemented in the next step." });
  }
  
  const handleUpload = () => {
    toast({ title: "Note", description: "CSV upload functionality will be implemented in the next step." });
  }

  const handleDownloadTemplate = () => {
    const headers = Object.keys(initialJobs[0]).filter(key => !['whatYouWillDo', 'highlightedSkills', 'otherSkills', 'requiredSkills', 'kpis', 'workHours', 'benefits', 'hiringProcess', 'fullDescription'].includes(key)).join(',') + '\n';
    const exampleRow = Object.entries(initialJobs[0]).filter(([key]) => !['whatYouWillDo', 'highlightedSkills', 'otherSkills', 'requiredSkills', 'kpis', 'workHours', 'benefits', 'hiringProcess', 'fullDescription'].includes(key)).map(([, value]) => `"${String(value).replace(/"/g, '""')}"`).join(',') + '\n';

    const csvContent = headers + exampleRow;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "job_template.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({ title: "Template Downloaded", description: "A sample CSV template has been downloaded." });
    }
  }
  
  const handleDelete = (jobId: string) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    toast({ title: "Job Removed", description: `Job with ID ${jobId} has been removed from the list.` });
  }
  
  const handleEdit = (jobId: string) => {
     toast({ title: "Note", description: `Editing for job ${jobId} will be implemented in the next step.` });
  }


  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <p>Redirecting to login...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary">Job Dashboard</h1>
            <p className="text-muted-foreground">Manage your organization's job postings.</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" onClick={handleDownloadTemplate} size="sm"><Download className="mr-2 h-4 w-4"/> Demo CSV</Button>
            <Button variant="outline" onClick={handleUpload} size="sm"><Upload className="mr-2 h-4 w-4"/> Upload CSV</Button>
            <Button onClick={handleAddNew} size="sm"><PlusCircle className="mr-2 h-4 w-4"/> Add New Job</Button>
            <Button variant="ghost" onClick={handleLogout} size="sm">Logout</Button>
          </div>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Job Listings</CardTitle>
                <CardDescription>Showing {jobs.length} active job postings. Changes made here are temporary.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-medium max-w-xs truncate">{job.title}</TableCell>
                                    <TableCell><Badge variant="secondary">{job.department}</Badge></TableCell>
                                    <TableCell>{job.employmentType}</TableCell>
                                    <TableCell>{job.workplace}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleEdit(job.id)}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => window.open(`/jobs/${job.id}`, '_blank')}>View</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive" onClick={() => handleDelete(job.id)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
