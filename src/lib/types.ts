export interface Job {
    id: string;
    title: string;
    description: string;
    whatYouWillDo: string[];
    highlightedSkills: string[];
    otherSkills: string[];
    requiredSkills: string[];
    kpis: string[];
    workHours: string[];
    otherDuties: string;
    education: string;
    salary: string;
    salaryMin: number | null;
    salaryMax: number | null;
    experienceLevel: string;
    benefits: string[];
    hiringProcess: { title: string; details: string; }[];
    fullDescription: string;
    workplace: string;
    employmentType: string;
    department: string;
}
