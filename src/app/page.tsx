"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Briefcase, Building, Code, MapPin, Receipt, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { jobs, Job } from "@/lib/job-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import AppHeader from "@/components/AppHeader";


const JobListItem = ({ job }: { job: Job }) => (
  <Link href={`/jobs/${job.id}`} className="block group rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
    <Card className="relative hover:shadow-lg transition-shadow flex flex-col h-full group-hover:border-primary/50">

        <CardHeader>
            <CardTitle className="font-headline text-xl text-primary pr-24">{job.title}</CardTitle>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.workplace}</div>
                <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.employmentType}</div>
                <div className="flex items-center gap-1.5"><Building className="h-4 w-4" /> {job.department}</div>
                <div className="flex items-center gap-1.5"><Receipt className="h-4 w-4" /> {job.salary}</div>
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
    </Card>
  </Link>
);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

  const filterOptions = useMemo(() => {
    const departments = [...new Set(jobs.map(job => job.department))].sort();
    const locations = [...new Set(jobs.map(job => job.workplace))].sort();
    const types = [...new Set(jobs.map(job => job.employmentType))].sort();
    const experienceLevels = [...new Set(jobs.map(job => job.experienceLevel))].filter(Boolean).sort();
    return { departments, locations, types, experienceLevels };
  }, []);

  const salaryBrackets = [
    { label: "Any", value: "" },
    { label: "Up to 60k", value: "0-60000" },
    { label: "60k - 100k", value: "60000-100000" },
    { label: "100k - 200k", value: "100000-200000" },
    { label: "200k+", value: "200000-Infinity" },
  ];

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = jobs.filter(job => {
      const searchMatch =
        !lowercasedQuery ||
        job.title.toLowerCase().includes(lowercasedQuery) ||
        job.description.toLowerCase().includes(lowercasedQuery) ||
        job.highlightedSkills.some(skill => skill.toLowerCase().includes(lowercasedQuery)) ||
        job.otherSkills.some(skill => skill.toLowerCase().includes(lowercasedQuery));
      
      const departmentMatch = !selectedDepartment || job.department === selectedDepartment;
      const locationMatch = !selectedLocation || job.workplace === selectedLocation;
      const typeMatch = !selectedType || job.employmentType === selectedType;
      const experienceMatch = !selectedExperience || job.experienceLevel === selectedExperience;

      const salaryMatch = !selectedSalary || (() => {
          if (!job.salaryMin && !job.salaryMax) return false;

          const [filterMin, filterMax] = selectedSalary.split('-').map(s => s === 'Infinity' ? Infinity : Number(s));

          const jobMin = job.salaryMin ?? job.salaryMax;
          const jobMax = job.salaryMax ?? job.salaryMin;

          if (!jobMin || !jobMax) return false;

          return jobMin < filterMax && jobMax >= filterMin;
      })();

      return searchMatch && departmentMatch && locationMatch && typeMatch && experienceMatch && salaryMatch;
    });
    setFilteredJobs(filtered);
  }, [searchQuery, selectedDepartment, selectedLocation, selectedType, selectedExperience, selectedSalary]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const clearFilters = () => {
    setSelectedDepartment("");
    setSelectedLocation("");
    setSelectedType("");
    setSelectedExperience("");
    setSelectedSalary("");
  };

  const hasActiveFilters = !!(selectedDepartment || selectedLocation || selectedType || selectedExperience || selectedSalary);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 space-y-4 text-center">
             <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary"> Find Your Next Opportunity</h1>
             <p className="text-lg text-muted-foreground">We connect talented developers with innovative companies changing the world.</p>
          </div>
          
          <div className="mb-8 space-y-4">
            <div className="flex flex-row items-center gap-2">
              <div className="relative w-full flex-grow">
                <Code className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search by keyword (e.g., React, Node JS)" 
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-shrink-0">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Filter Jobs</span>
                    {hasActiveFilters && <span className="ml-2 h-2 w-2 rounded-full bg-accent" />}
                  </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                  <SheetHeader>
                    <SheetTitle>Filter Jobs</SheetTitle>
                    <SheetDescription>
                      Refine your job search using the options below.
                    </SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="flex-grow pr-6 -mr-6">
                    <div className="space-y-8 py-4">
                      <div>
                        <Label className="text-base font-semibold text-foreground">Department</Label>
                        <RadioGroup value={selectedDepartment} onValueChange={setSelectedDepartment} className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="" id="dep-all" />
                            <Label htmlFor="dep-all" className="font-normal">All Departments</Label>
                          </div>
                          {filterOptions.departments.map(dep => (
                            <div key={dep} className="flex items-center space-x-2">
                              <RadioGroupItem value={dep} id={`dep-${dep}`} />
                              <Label htmlFor={`dep-${dep}`} className="font-normal">{dep}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-base font-semibold text-foreground">Location</Label>
                        <RadioGroup value={selectedLocation} onValueChange={setSelectedLocation} className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="" id="loc-all" />
                            <Label htmlFor="loc-all" className="font-normal">All Locations</Label>
                          </div>
                          {filterOptions.locations.map(loc => (
                            <div key={loc} className="flex items-center space-x-2">
                              <RadioGroupItem value={loc} id={`loc-${loc}`} />
                              <Label htmlFor={`loc-${loc}`} className="font-normal">{loc}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-base font-semibold text-foreground">Employment Type</Label>
                        <RadioGroup value={selectedType} onValueChange={setSelectedType} className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="" id="type-all" />
                            <Label htmlFor="type-all" className="font-normal">All Types</Label>
                          </div>
                          {filterOptions.types.map(type => (
                            <div key={type} className="flex items-center space-x-2">
                              <RadioGroupItem value={type} id={`type-${type}`} />
                              <Label htmlFor={`type-${type}`} className="font-normal">{type}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                       <div>
                        <Label className="text-base font-semibold text-foreground">Experience Level</Label>
                        <RadioGroup value={selectedExperience} onValueChange={setSelectedExperience} className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="" id="exp-all" />
                            <Label htmlFor="exp-all" className="font-normal">All Levels</Label>
                          </div>
                          {filterOptions.experienceLevels.map(level => (
                            <div key={level} className="flex items-center space-x-2">
                              <RadioGroupItem value={level} id={`exp-${level}`} />
                              <Label htmlFor={`exp-${level}`} className="font-normal">{level}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-base font-semibold text-foreground">Salary Range (BDT)</Label>
                        <RadioGroup value={selectedSalary} onValueChange={setSelectedSalary} className="mt-2 space-y-1">
                          {salaryBrackets.map(bracket => (
                            <div key={bracket.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={bracket.value} id={`sal-${bracket.value}`} />
                              <Label htmlFor={`sal-${bracket.value}`} className="font-normal">{bracket.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  </ScrollArea>
                  <SheetFooter>
                    {hasActiveFilters && (
                      <Button variant="ghost" onClick={clearFilters} className="w-full mt-4">
                        Clear All Filters
                      </Button>
                    )}
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                  <JobListItem key={job.id} job={job} />
              ))
            ) : (
                <Card className="text-center p-8">
                  <p className="text-muted-foreground">No jobs found matching your criteria.</p>
                  {hasActiveFilters && <Button variant="link" onClick={clearFilters} className="mt-2">Clear all filters</Button>}
                </Card>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
