
import { Briefcase, Building, Code, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TalentoLogo } from "@/components/icons/TalentoLogo";
import { jobs, Job } from "@/lib/job-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShareJobButton } from "@/components/job/ShareJobButton";

const JobListItem = ({ job }: { job: Job }) => (
  <Card className="hover:shadow-lg transition-shadow flex flex-col">
    <CardHeader>
      <CardTitle className="font-headline text-xl text-primary">{job.title}</CardTitle>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> US (Remote)</div>
        <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.employmentType}</div>
        <div className="flex items-center gap-1.5"><Building className="h-4 w-4" /> {job.department}</div>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-foreground/80 mb-4 line-clamp-2">{job.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {job.highlightedSkills.slice(0, 5).map(skill => (
          <Badge key={skill} variant="secondary" className="font-normal">{skill}</Badge>
        ))}
        {job.highlightedSkills.length > 5 && <Badge variant="outline">+{job.highlightedSkills.length - 5} more</Badge>}
      </div>
    </CardContent>
    <CardFooter className="flex justify-between items-center">
      <Button asChild variant="outline">
        <Link href={`/jobs/${job.id}`}>View Details</Link>
      </Button>
      <ShareJobButton job={job} />
    </CardFooter>
  </Card>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="https://talento.agency/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <TalentoLogo className="h-8 w-auto text-primary" />
            </a>
            <nav className="flex items-center gap-4">
              <a href="https://talento.agency/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Home</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 space-y-4 text-center">
             <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Find Your Next Opportunity</h1>
             <p className="text-lg text-muted-foreground">We connect talented developers with innovative companies changing the world.</p>
          </div>
          <div className="mb-8 relative">
            <Code className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search by keyword (e.g., React, Node JS)" className="pl-10" />
          </div>
          
          <div className="space-y-6">
            {jobs.map(job => (
                <JobListItem key={job.id} job={job} />
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
