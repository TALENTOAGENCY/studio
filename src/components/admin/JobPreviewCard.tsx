"use client";

import React from "react";
import type { Job } from "@/lib/types";
import {
  Award,
  Briefcase,
  Building,
  Clock,
  DollarSign,
  ListChecks,
  MapPin,
  Network,
  Target,
  ArrowLeft,
  Send,
  Eye,
  Loader2,
  GraduationCap,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const SkillBadge = ({ skill, variant = "secondary" }: { skill: string; variant?: "primary" | "secondary" }) => (
  <Badge
    variant={variant === "primary" ? "default" : "secondary"}
    className={`font-normal ${variant === "primary" ? "bg-primary/10 text-primary border-primary/20" : ""}`}
  >
    {skill}
  </Badge>
);

const JobSection = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
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

const HiringProcessStep = ({ title, details, isLast = false }: { title: string; details: string; isLast?: boolean }) => (
  <div className="relative pl-8">
    <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-primary" />
    {!isLast && <div className="absolute left-[5px] top-4 h-full w-px bg-border" />}
    <h4 className="font-semibold">{title}</h4>
    <p className="text-sm text-muted-foreground">{details}</p>
  </div>
);

interface JobPreviewCardProps {
  job: Partial<Job>;
  onBackToEdit?: () => void;
  onPublish?: () => void;
  isPublishing?: boolean;
}

export default function JobPreviewCard({ job, onBackToEdit, onPublish, isPublishing }: JobPreviewCardProps) {
  const safeWhatYouWillDo = (job.whatYouWillDo || []).filter(Boolean);
  const safeHighlightedSkills = (job.highlightedSkills || []).filter(Boolean);
  const safeOtherSkills = (job.otherSkills || []).filter(Boolean);
  const safeRequiredSkills = (job.requiredSkills || []).filter(Boolean);
  const safeKpis = (job.kpis || []).filter(Boolean);
  const safeWorkHours = (job.workHours || []).filter(Boolean);
  const safeBenefits = (job.benefits || []).filter(Boolean);
  const safeHiringProcess = (job.hiringProcess || []).filter(s => s && s.title);

  return (
    <div className="space-y-6">
      {/* Preview Alert Banner */}
      <div className="sticky top-20 z-30 bg-primary/15 border border-primary/30 backdrop-blur-md rounded-xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground text-sm">Candidate Preview Mode</span>
              <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
                Live Preview
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              This is exactly how candidates will view the job posting once published.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onBackToEdit && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onBackToEdit}
              className="flex-1 sm:flex-none"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Edit
            </Button>
          )}
          {onPublish && (
            <Button
              type="button"
              size="sm"
              onClick={onPublish}
              disabled={isPublishing}
              className="flex-1 sm:flex-none bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-1.5" />
                  Publish Job
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Main Job Card */}
      <Card className="overflow-hidden shadow-xl border-border/80">
        <CardContent className="p-6 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline">{job.workplace || "Location not set"}</Badge>
                {job.id && (
                  <Badge variant="secondary" className="font-mono text-xs">
                    ID: {job.id}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">
                {job.title || "Untitled Position"}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground text-sm">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" /> {job.workplace || "Location not set"}
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-primary" /> {job.employmentType || "Full-time"}
                </div>
                <div className="flex items-center gap-1.5">
                  <Building className="h-4 w-4 text-primary" /> {job.department || "General"}
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-primary" /> {job.salary || "Negotiable"}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex items-start gap-2">
              <Button size="lg" className="bg-accent/80 text-accent-foreground font-semibold shadow opacity-90 cursor-not-allowed">
                Apply Now (Preview)
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Overview */}
          {job.description && (
            <div className="mb-6">
              <p className="text-foreground/85 leading-relaxed text-base">{job.description}</p>
            </div>
          )}

          {/* Full Description if provided */}
          {job.fullDescription && job.fullDescription !== job.description && (
            <div className="mb-8 p-4 rounded-lg bg-muted/40 border text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
              {job.fullDescription}
            </div>
          )}

          {/* What you will do */}
          {safeWhatYouWillDo.length > 0 && (
            <JobSection title="What you will do?" icon={<Briefcase className="w-5 h-5 text-primary" />}>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                {safeWhatYouWillDo.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </JobSection>
          )}

          {/* Required Skills & highlighted tags */}
          {(safeHighlightedSkills.length > 0 || safeOtherSkills.length > 0 || safeRequiredSkills.length > 0) && (
            <JobSection title="Required Skill Sets" icon={<ListChecks className="w-5 h-5 text-primary" />}>
              {(safeHighlightedSkills.length > 0 || safeOtherSkills.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {safeHighlightedSkills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} variant="primary" />
                  ))}
                  {safeOtherSkills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                </div>
              )}
              {safeRequiredSkills.length > 0 && (
                <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                  {safeRequiredSkills.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </JobSection>
          )}

          {/* KPIs and Work Hours */}
          {(safeKpis.length > 0 || safeWorkHours.length > 0) && (
            <div className="grid md:grid-cols-2 gap-x-8">
              {safeKpis.length > 0 && (
                <JobSection title="Key Performance Matrix" icon={<Target className="w-5 h-5 text-primary" />}>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    {safeKpis.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </JobSection>
              )}
              {safeWorkHours.length > 0 && (
                <JobSection title="Hour of Work & Others" icon={<Clock className="w-5 h-5 text-primary" />}>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    {safeWorkHours.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </JobSection>
              )}
            </div>
          )}

          {/* Education & Experience */}
          {(job.education || job.experienceLevel) && (
            <JobSection title="Education & Experience" icon={<GraduationCap className="w-5 h-5 text-primary" />}>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                {job.education && (
                  <div className="p-3.5 rounded-lg bg-muted/40 border">
                    <span className="font-semibold block text-foreground mb-1">Education</span>
                    <span className="text-muted-foreground">{job.education}</span>
                  </div>
                )}
                {job.experienceLevel && (
                  <div className="p-3.5 rounded-lg bg-muted/40 border">
                    <span className="font-semibold block text-foreground mb-1">Experience Level</span>
                    <span className="text-muted-foreground">{job.experienceLevel}</span>
                  </div>
                )}
              </div>
            </JobSection>
          )}

          {/* Salary & Benefits */}
          {(job.salary || safeBenefits.length > 0) && (
            <JobSection title="Salary & Benefits" icon={<DollarSign className="w-5 h-5 text-primary" />}>
              {job.salary && <p className="mb-4 text-base font-medium">{job.salary}</p>}
              {safeBenefits.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {safeBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/30 border text-sm">
                      <div className="flex-shrink-0 mt-0.5">
                        <Award className="w-4 h-4 text-accent" />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              )}
            </JobSection>
          )}

          {/* Hiring Process */}
          {safeHiringProcess.length > 0 && (
            <JobSection title="Hiring Process" icon={<Network className="w-5 h-5 text-primary" />}>
              <div className="space-y-6">
                {safeHiringProcess.map((step, i) => (
                  <HiringProcessStep
                    key={i}
                    title={step.title}
                    details={step.details}
                    isLast={i === safeHiringProcess.length - 1}
                  />
                ))}
              </div>
            </JobSection>
          )}

          {/* Other duties */}
          {job.otherDuties && (
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10 text-xs text-muted-foreground flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>{job.otherDuties}</span>
            </div>
          )}

          <Separator className="my-8" />
          <div className="text-center">
            <Button size="lg" className="bg-accent/80 text-accent-foreground font-semibold shadow opacity-90 cursor-not-allowed">
              Apply Now (Preview Mode)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
