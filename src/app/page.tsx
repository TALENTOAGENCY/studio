
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Briefcase, Building, Code, MapPin, Receipt, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TalentoLogo from "@/components/icons/TalentoLogo";
import { jobs, Job } from "@/lib/job-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShareJobButton } from "@/components/job/ShareJobButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const JobListItem = ({ job }: { job: Job }) => (
  <Card className="hover:shadow-lg transition-shadow flex flex-col">
    <CardHeader>
      <CardTitle className="font-headline text-xl text-primary">{job.title}</CardTitle>
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
    <CardFooter className="flex justify-between items-center">
      <Button asChild variant="outline">
        <Link href={`/jobs/${job.id}`}>View Details</Link>
      </Button>
      <ShareJobButton job={job} />
    </CardFooter>
  </Card>
);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const filterOptions = useMemo(() => {
    const departments = [...new Set(jobs.map(job => job.department))].sort();
    const locations = [...new Set(jobs.map(job => job.workplace))].sort();
    const types = [...new Set(jobs.map(job => job.employmentType))].sort();
    return { departments, locations, types };
  }, []);

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

      return searchMatch && departmentMatch && locationMatch && typeMatch;
    });
    setFilteredJobs(filtered);
  }, [searchQuery, selectedDepartment, selectedLocation, selectedType]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("");
    setSelectedLocation("");
    setSelectedType("");
  };

  const hasActiveFilters = !!(selectedDepartment || selectedLocation || selectedType);

  return (
    <div className="min-h-screen bg-background">
      <header className={`sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="https://talento.agency/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <TalentoLogo className="h-8 w-auto text-primary" />
            </a>
            <nav className="flex items-center gap-4">
              <a href="https://talento.agency/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"></a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 space-y-4 text-center">
             <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary"> Find Your Next Opportunity</h1>
             <p className="text-lg text-muted-foreground">We connect talented developers with innovative companies changing the world.</p>
          </div>
          
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Code className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by keyword (e.g., React, Node JS)" 
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            <Collapsible className="space-y-2">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filter Jobs
                  {hasActiveFilters && <span className="ml-2 h-2 w-2 rounded-full bg-accent" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                <div className="border p-4 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Select value={selectedDepartment} onValueChange={(value) => value === 'all' ? setSelectedDepartment('') : setSelectedDepartment(value)}>
                      <SelectTrigger><SelectValue placeholder="All Departments" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {filterOptions.departments.map(dep => <SelectItem key={dep} value={dep}>{dep}</SelectItem>)}
                      </SelectContent>
                    </Select>

                    <Select value={selectedLocation} onValueChange={(value) => value === 'all' ? setSelectedLocation('') : setSelectedLocation(value)}>
                      <SelectTrigger><SelectValue placeholder="All Locations" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {filterOptions.locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedType} onValueChange={(value) => value === 'all' ? setSelectedType('') : setSelectedType(value)}>
                      <SelectTrigger><SelectValue placeholder="All Types" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {filterOptions.types.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  {hasActiveFilters && (
                    <Button variant="ghost" onClick={clearFilters} className="w-full mt-4 text-muted-foreground hover:text-foreground">
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
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
