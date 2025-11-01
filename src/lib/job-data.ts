
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
    benefits: string[];
    hiringProcess: { title: string; details: string; }[];
    fullDescription: string;
    workplace: string;
    employmentType: string;
    department: string;
}

const job1: Omit<Job, 'id' | 'fullDescription'> = {
    title: "Senior Software Engineer [Full Stack]",
    description: "Our client—a top US onsite work marketplace—is searching for skilled developers to join their global engineering team. Build technology that genuinely improves lives while delivering exceptional service. Thrive in a fast-paced environment where your ideas matter and collaboration fuels success. Work with outstanding professionals in a culture that champions learning, growth, and innovation. Passionate about development? Excited by meaningful challenges? Apply below and join a rapidly growing team.",
    whatYouWillDo: [
        "Cutting-edge technology SaaS solution hosted on AWS that enables today’s and tomorrow’s Gig economy.",
        "Backend built on PHP, MySQL, and increasingly Node JS microservices, exposed via REST API.",
        "Frontend built with React, React-native, and redux in web and mobile app.",
        "Services built and deployed using Docker containers managed by Kubernetes.",
        "Service observability, monitoring, alerts, and maintaining SLI/SLO.",
        "Work closely with the engineering team, Product Management, UX, and our customers to ensure we build and deliver impactful features.",
        "Assist in preparing technical specs as a team.",
        "Bring fresh ideas on how technology can be used to solve big problems."
    ],
    highlightedSkills: ["React", "Node.js", "PHP", "MySQL", "AWS", "Docker", "Kubernetes", "React-native", "NestJs"],
    otherSkills: ["Redux", "REST API", "Microservices", "Git", "TypeScript", "Event-Driven Architecture", "Software Observability"],
    requiredSkills: [
        "4+ years of experience in the backend.",
        "3+ years of experience in reactJS.",
        "Strong understanding of JavaScript/TypeScript, ES6, React, and React-native.",
        "Backend web experience with languages such as NodeJS, NestJs, PHP, etc.",
        "Advanced knowledge of SQL – MySQL specifically is a plus.",
        "Ability to write clean, standards-compliant HTML and CSS. Preprocessor experience (LESS/SASS) is a plus.",
        "Strong focus and experience Test Driven Development.",
        "Familiarity with the Git version control system.",
        "Knowledge of Linux or other Unix-based systems (Ubuntu/Debian is a plus).",
        "Experience with Web Services-based solutions (REST specifically).",
        "Experience with Microservice architecture.",
        "Experience with Mobile Applications (react-native).",
        "Experience with Event-Driven Architecture(RabbitMQ / Kafka) is a plus.",
        "Knowledge of Software Observability (Application Performance Monitoring) is a plus.",
        "Broad technical knowledge – we look for people who can tie together technologies to solve enormous problems.",
        "Strong written and verbal communication skills.",
        "Ability to work well with others as part of a team and across teams.",
        "Ability to break down more significant initiatives into manageable pieces.",
        "Experience working with offshore teams is a plus."
    ],
    kpis: [
        "Delivery of features as agreed upon in planning ceremonies.",
        "Quality of deliverables to be measured by the number of production bugs.",
        "Team members' feedback on collaboration.",
        "Support of other engineers on complicated coding problems.",
        "Testing practices and implementation of automated tests."
    ],
    workHours: [
        "Willingness to work from 1 PM to 10 PM BD time.",
        "Experience working with offshore teams is a plus."
    ],
    otherDuties: "Please note this job description is not designed to cover or contain a comprehensive listing of activities, duties, or responsibilities required of the employee for this job. Duties, obligations, and activities may change at any time, with or without notice.",
    education: "B.Sc. / M.Sc. in Computer Science & Engineering from any reputed University or equivalent practical experience.",
    salary: "Competitive and above market average salary.",
    benefits: [
        "Festival Bonus (Each accounts for 50% of the Gross)",
        "Performance Reward",
        "Leave Encashment",
        "Medical Insurance",
        "Lunch- Fully Subsidized",
        "Transportation Service - Drop Off",
        "Gym Membership",
        "Career Development Budget",
        "Mobile Bill"
    ],
    hiringProcess: [
        { title: "Cold Call", details: "Non-interview discussion session with Talento TA experts on compatibility, salary, notice period, etc." },
        { title: "Technical Session [Client Company]", details: "Includes a tech test, technical interview, and selection round." },
        { title: "Offer", details: "Successful candidates receive a competitive offer to join the team." }
    ],
    workplace: "Onsite Work Marketplace",
    employmentType: "Full-time",
    department: "Engineering"
};

const job2: Omit<Job, 'id' | 'fullDescription'> = {
    title: "Staff Software Engineer",
    description: `Our client—a top US onsite work marketplace—is searching for skilled developers to join their global engineering team. 
Build technology that genuinely improves lives while delivering exceptional service.

Thrive in a fast-paced environment where your ideas matter and collaboration fuels success. 
Work with outstanding professionals in a culture that champions learning, growth, and innovation.

Passionate about development? Excited by meaningful challenges? Apply below and join a rapidly growing team.`,
    whatYouWillDo: [
        "Develop a cutting-edge technology SaaS solution hosted on AWS that enables today’s and tomorrow’s Gig economy.",
        "Work on a backend built on PHP, MySQL, and increasingly Node JS and Golang microservices, exposed via REST API.",
        "Contribute to a frontend built with React and Redux.",
        "Build and deploy services using Docker containers managed by Kubernetes.",
        "Work closely with the engineering team, Product Management, UX, and customers to ensure impactful features are delivered.",
        "Ability to prepare technical designs and delivery plans independently.",
        "Bring fresh ideas on how technology can be used to solve big problems."
    ],
    highlightedSkills: ["React", "Redux", "Node.js", "Golang", "PHP", "MySQL", "AWS", "Docker", "Kubernetes"],
    otherSkills: ["REST API", "Microservices", "Git", "TypeScript", "Testing", "Software Design", "Linux"],
    requiredSkills: [
        "7+ years of Software development experience.",
        "Strong focus and experience in testing best practices.",
        "Strong understanding of JavaScript, React, and Redux.",
        "Ability to write clean, standards-compliant HTML and CSS. Preprocessor experience (LESS/SASS) is a plus.",
        "Backend web experience with languages such as PHP, Javascript, Node JS, Golang, etc.",
        "Advanced knowledge of SQL – MySQL specifically is a plus.",
        "Familiarity with the Git version control system.",
        "Knowledge of Linux or other Unix-based systems (Ubuntu/Debian is a plus).",
        "Experience with Web Services-based solutions (REST specifically).",
        "Experience with Microservice architecture is a plus.",
        "Broad technical knowledge – we look for people who can tie together technologies to solve really big problems.",
        "Strong written and verbal communication skills.",
        "Ability to work well with others as part of a team and across teams.",
        "Ability to break down more significant initiatives into manageable pieces.",
        "Experience working with offshore teams is a plus."
    ],
    kpis: [
        "Delivery of features as agreed upon in planning ceremonies.",
        "Quality of deliverables to be measured by the number of production bugs.",
        "Team member's feedback on collaboration.",
        "Support of other engineers on complicated coding problems.",
        "Testing practices and implementation of automated tests."
    ],
    workHours: [
        "Experience working with offshore teams is a plus.",
        "This is a full-time, exempt position with typical business hours Monday-Friday. In cases of travel, increased workload, or on-call nature, additional hours may be needed.",
        "This position doesn’t have supervisory responsibility.",
        "This position will travel approximately 0% of the time and will not require international travel.",
        "This job operates in a professional office environment. This role routinely uses standard office equipment such as computers, software tools, phones, photocopiers, and filing cabinets."
    ],
    otherDuties: "Please note this job description is not designed to cover or contain a comprehensive listing of activities, duties, or responsibilities required of the employee for this job. Duties, obligations, and activities may change at any time, with or without notice.",
    education: "B.Sc./ M.Sc. in Computer Science & Engineering from any reputed University or equivalent practical experience.",
    salary: "Competitive and above market average salary.",
    benefits: [
        "Festival Bonus (Each accounts for 50% of the Gross)",
        "Performance Reward",
        "Leave Encashment",
        "Medical Insurance",
        "Lunch – Fully Subsidized",
        "Transportation Service – Drop Off",
        "Gym Membership",
        "Career Development Budget",
        "Mobile Bill"
    ],
    hiringProcess: [
        { title: "Cold Call", details: "Non-interview discussion session with Talento TA experts on compatibility, salary, notice period, etc." },
        { title: "Technical Session [Client Company]", details: "Includes a tech test, technical interview, and selection round." },
        { title: "Offer", details: "Successful candidates receive a competitive offer to join the team." }
    ],
    workplace: "US Onsite Work Marketplace",
    employmentType: "Full-time",
    department: "Engineering"
};

const buildFullDescription = (job: Omit<Job, 'id' | 'fullDescription'>) => {
    return `
Job Title: ${job.title}

Description: ${job.description}

What You Will Do:
${job.whatYouWillDo.map(item => `- ${item}`).join('\n')}

Required Skill Sets:
${job.requiredSkills.map(item => `- ${item}`).join('\n')}

Key Performance Matrix:
${job.kpis.map(item => `- ${item}`).join('\n')}

Education: ${job.education}
`.trim();
};

export const jobs: Job[] = [
    {
        ...job1,
        id: "1",
        fullDescription: buildFullDescription(job1)
    },
    {
        ...job2,
        id: "2",
        fullDescription: buildFullDescription(job2)
    }
];
