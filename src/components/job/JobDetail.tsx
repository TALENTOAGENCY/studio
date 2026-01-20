
"use client";

import React, { useState, useEffect } from "react";
import type { Job } from "@/lib/job-data";
import { Award, Briefcase, Building, Clock, DollarSign, ListChecks, MapPin, Network, Target, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TalentoLogo from "@/components/icons/TalentoLogo";
import { JobApplication } from "@/components/job/JobApplication";
import { ShareJobButton } from "@/components/job/ShareJobButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type SkillBadgeProps = {
  skill: string;
  variant?: "primary" | "secondary";
};

const SkillBadge = ({ skill, variant = "secondary" }: SkillBadgeProps) => (
  <Badge variant={variant === 'primary' ? 'default' : 'secondary'} className={`font-normal ${variant === 'primary' ? 'bg-primary/10 text-primary border-primary/20' : ''}`}>{skill}</Badge>
);

const JobSection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <section className="py-6">
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h2 className="text-xl font-headline font-semibold text-primary">{title}</h2>
    </div>
    <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground/80 space-y-4">
      {children}
    </div>
  </section>
);

const HiringProcessStep = ({ title, details, isLast = false }: { title: string, details: string, isLast?: boolean }) => (
    <div className="relative pl-8">
      <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-primary" />
      {!isLast && <div className="absolute left-[5px] top-4 h-full w-px bg-border" />}
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{details}</p>
    </div>
);

export default function JobDetail({ job }: { job: Job }) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY < 0 ? 0 : currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-background">
       <header className={`sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="https://talento.agency/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-card p-2 rounded-md">
              <TalentoLogo className="h-8 w-auto text-primary" />
            </a>
            <nav className="flex items-center gap-4">
               <a href="https://talento.agency/about-us/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"></a>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button asChild variant="ghost" className="text-muted-foreground px-0 hover:bg-transparent hover:text-white">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all jobs
              </Link>
            </Button>
          </div>
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <Badge variant="outline" className="mb-2">{job.workplace}</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{job.title}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
                    <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.workplace}</div>
                    <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.employmentType}</div>
                    <div className="flex items-center gap-1.5"><Building className="h-4 w-4" /> {job.department}</div>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-start gap-2">
                  <ShareJobButton job={job} />
                  <JobApplication job={job} />
                </div>
              </div>

              <Separator className="my-8" />
              
              <p className="text-foreground/80 mb-6">{job.description}</p>

              <JobSection title="What you will do?" icon={<Briefcase className="w-5 h-5 text-primary" />}>
                <ul className="list-disc pl-5 space-y-2">
                  {job.whatYouWillDo.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </JobSection>

              <JobSection title="Required Skill Sets" icon={<ListChecks className="w-5 h-5 text-primary" />}>
                <div className="flex flex-wrap gap-2 mb-4">
                    {job.highlightedSkills.map(skill => <SkillBadge key={skill} skill={skill} variant="primary" />)}
                    {job.otherSkills.map(skill => <SkillBadge key={skill} skill={skill} />)}
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  {job.requiredSkills.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </JobSection>

              <div className="grid md:grid-cols-2 gap-x-8">
                <JobSection title="Key Performance Matrix" icon={<Target className="w-5 h-5 text-primary" />}>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.kpis.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </JobSection>
                <JobSection title="Hour of Work & Others" icon={<Clock className="w-5 h-5 text-primary" />}>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.workHours.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </JobSection>
              </div>

              <JobSection title="Salary & Benefits" icon={<DollarSign className="w-5 h-5 text-primary" />}>
                <p className="mb-4">{job.salary}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {job.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1"><Award className="w-4 h-4 text-accent" /></div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </JobSection>

              <JobSection title="Hiring Process" icon={<Network className="w-5 h-5 text-primary" />}>
                <div className="space-y-6">
                  {job.hiringProcess.map((step, i) => (
                    <HiringProcessStep key={i} title={step.title} details={step.details} isLast={i === job.hiringProcess.length - 1} />
                  ))}
                </div>
              </JobSection>

               <Separator className="my-8" />
               <div className="text-center">
                <JobApplication job={job}/>
               </div>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
