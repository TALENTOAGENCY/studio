
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

const job1: Omit<Job, 'id' | 'fullDescription' | 'salaryMin' | 'salaryMax' | 'experienceLevel'> = {
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

const job2: Omit<Job, 'id' | 'fullDescription' | 'salaryMin' | 'salaryMax' | 'experienceLevel'> = {
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

const job3: Omit<Job, 'id' | 'fullDescription' | 'salaryMin' | 'salaryMax' | 'experienceLevel'> = {
    title: "Director, Service Delivery",
    description: `TALENTO is thrilled to source top Bangladeshi marketing service delivery talent for our client — a premier North American offshore marketing agency powering global SMBs.

The Director of Service Delivery is the organization's delivery command center! This C-suite caliber role orchestrates seamless client fulfillment at scale, owning mission-critical execution, enterprise quality benchmarks, dynamic resource allocation, and exponential operational growth.

Reporting to the COO, you'll engineer bulletproof delivery cadence and scalable throughput models. In lockstep with Customer Success leadership, convert their strategic "what & why" into your tactical "how & when" mastery – routinely surpassing client commitments via gated governance, AI-driven process optimization, and 24/7 operational resilience. You're the client promise fulfillment engine!`,
    whatYouWillDo: [
        "Shape company-wide delivery strategy, turning customer commitments into actionable roadmaps and capacity plans.",
        "Partner seamlessly with Customer Success to exceed client expectations while advising the COO on scalability and operational excellence.",
        "Lead delivery teams from Project Managers to execution crews, ensuring all client work hits deadlines, scope, budget, and quality targets.",
        "Own timelines, risks, and dependencies across accounts while serving as the ultimate escalation point.",
        "Define playbooks, SOPs, and QA standards aligned with Customer Success needs.",
        "Build scalable governance and KPIs (timeliness, quality, utilization) that boost CSAT and retention.",
        "Rapidly scale Service Delivery while preserving quality and engagement.",
        "Design team structures and resourcing aligned with Customer Success accounts.",
        "Hire, mentor, and develop managers to build strong second-line leadership and a culture of ownership and excellence.",
        "Serve as the primary partner to the Director of Customer Success, joining regular reviews on client health, risks, and growth.",
        "Partner with Sales on pre-sales scoping, Finance on utilization and forecasting, and international stakeholders on performance updates.",
        "Spot delivery risks early and implement fixes before client impact; drive ongoing improvements in tools, workflows, and practices."
    ],
    highlightedSkills: ["Service Delivery Leadership", "Operations Management", "Team Scaling", "Process Optimization", "Client Account Management", "Governance & QA Standards", "Cross-Functional Collaboration", "Risk Management"],
    otherSkills: ["Marketing Agency Experience", "Professional Services Background", "AI-Driven Optimization", "KPI Definition", "Stakeholder Management", "Capacity Planning", "SOP Development"],
    requiredSkills: [
        "10–15+ years of experience in Service Delivery, Operations, or Client Services leadership.",
        "Strong preference for candidates with a marketing agency or professional services background.",
        "5+ years of experience leading large, multi-layered teams in high-growth environments.",
        "Proven ability to scale delivery organizations while maintaining quality and predictability.",
        "Experience working with North American or global clients and stakeholders.",
        "Strong operational discipline, analytical thinking, and structured problem-solving skills.",
        "Excellent communication and stakeholder management skills (written & verbal).",
        "Demonstrated experience in building and mentoring high-performing delivery teams.",
        "Ability to partner closely with Customer Success / Account Management functions."
    ],
    kpis: [
        "Client satisfaction (CSAT) and retention metrics.",
        "On-time delivery percentage and predictability of commitments.",
        "Delivery quality scores / defect rates / rework levels.",
        "Team utilization and throughput at scale.",
        "Successful scaling of delivery organization (headcount growth without quality drop).",
        "Timely risk identification and resolution.",
        "Continuous process improvement impact (efficiency gains, cost savings)."
    ],
    workHours: [
        "Monday – Friday",
        "2:00 PM – 11:00 PM BD time (to align with North American clients)",
        "Hybrid model (Dhaka, Bangladesh)"
    ],
    otherDuties: "Please note this job description is not designed to cover or contain a comprehensive listing of activities, duties, or responsibilities required of the employee for this job. Duties, obligations, and activities may change at any time, with or without notice.",
    education: "Bachelor’s or Master’s degree in Business, Management, Marketing, Communications, or related field; or equivalent professional experience.",
    salary: "BDT 200,000 – 400,000 per month (depending on experience)",
    benefits: [
        "Bangladeshi & North American government holidays",
        "Year-end 1-week break",
        "Bi-annual festival bonuses",
        "Annual salary review",
        "Paid casual & sick leave",
        "Friendly office culture"
    ],
    hiringProcess: [
        { title: "Initial Screening", details: "Discussion with TALENTO team on experience, expectations, notice period, and cultural fit." },
        { title: "Leadership Interviews", details: "Multiple rounds including COO and Director of Customer Success." },
        { title: "Case / Strategy Discussion", details: "Presentation or deep-dive on service delivery scaling, governance, or client fulfillment scenarios." },
        { title: "Offer", details: "Competitive offer with detailed compensation and benefits package." }
    ],
    workplace: "Dhaka (Hybrid)",
    employmentType: "Fixed Term",
    department: "Service Delivery"
};

const job4: Omit<Job, 'id' | 'fullDescription' | 'salaryMin' | 'salaryMax' | 'experienceLevel'> = {
    title: "Senior Software Engineer (Fullstack)",
    description: "TALENTO is sourcing for a Dhaka-rooted global outsourcing giant with offices across USA, Canada, and Australia, and support through specialized team augmentation in software, apps, design, AI, blockchain, cloud, security, and analytics.",
    whatYouWillDo: [
        "Designing and building core systems that are scalable, robust, and maintainable",
        "Leading projects end-to-end, from design to release",
        "Collaborating with product, design, and engineering teams to ship impactful features",
        "Mentoring junior and mid-level developers — helping them grow technically",
        "Monitoring technical debt, system performance, and long-term code health"
    ],
    highlightedSkills: ["React", "Next.js", "Node.js", "Django", "FastAPI", "AWS", "GCP", "PostgreSQL", "MySQL", "MongoDB"],
    otherSkills: ["Firestore", "DynamoDB", "Redis", "Memcached", "Prisma", "TypeORM", "Sequelize", "GitHub Actions", "Jenkins", "Terraform", "Kafka", "RabbitMQ", "Pub/Sub", "System Design", "API Development"],
    requiredSkills: [
        "6–9 years of professional software engineering experience",
        "Prior experience mentoring or guiding team members",
        "Strong backend experience in modern languages/frameworks",
        "Solid understanding of system design, API development, and both Relational & NoSQL databases",
        "Flexibility to switch between tools/technologies based on project needs",
        "Experience shipping features to production in a startup or fast-moving environment",
        "Ability to take ownership and lead projects",
        "Comfortable with frontend frameworks to contribute and collaborate with UI teams"
    ],
    kpis: [
        "End-to-end project delivery timeliness and quality.",
        "Scalability and robustness of designed systems.",
        "Impact of mentorship on junior developers' growth.",
        "Improvements in system performance and reduction of technical debt."
    ],
    workHours: [
        "Full-time position",
        "Flexible work environment"
    ],
    otherDuties: "Please note this job description is not designed to cover or contain a comprehensive listing of activities, duties, or responsibilities required of the employee for this job. Duties, obligations, and activities may change at any time, with or without notice.",
    education: "Bachelor's degree in Computer Science or a related field, or equivalent practical experience.",
    salary: "Up to 150,000 BDT",
    benefits: [
        "Two annual festival bonuses",
        "Complimentary snacks and coffee",
        "Partially Subsidized lunch",
        "2 days off per week",
        "Games & entertainment facilities",
        "Flexible work environment",
        "Performance-based bonus",
        "Quarterly events and celebrations",
        "Corporate Discounts"
    ],
    hiringProcess: [
        { title: "Initial Screening", details: "A conversation with our talent acquisition team to discuss your background and the role." },
        { title: "Technical Interview", details: "A deep dive into your technical expertise and problem-solving skills." },
        { title: "System Design Round", details: "A session to understand your approach to building scalable and robust systems." },
        { title: "Final Interview", details: "A final conversation with leadership to ensure a great fit." },
        { title: "Offer", details: "Successful candidates receive a competitive offer." }
    ],
    workplace: "Dhaka (Hybrid)",
    employmentType: "Full-Time",
    department: "Engineering"
};

const job5: Omit<Job, 'id' | 'fullDescription' | 'salaryMin' | 'salaryMax' | 'experienceLevel'> = {
    title: "Software Engineer (Fullstack)",
    description: "TALENTO is sourcing for a Dhaka-rooted global outsourcing giant with offices across USA, Canada, and Australia, and support through specialized team augmentation in software, apps, design, AI, blockchain, cloud, security, and analytics.",
    whatYouWillDo: [
        "Build and maintain backend services using Node.js, Python, Java, or Go",
        "Work with PostgreSQL, MySQL, MongoDB",
        "Contribute to frontend development using React.js / Next.js when needed",
        "Debug, test, and optimize backend systems",
        "Collaborate with Product, QA, and Engineering Leads to deliver features on time"
    ],
    highlightedSkills: ["Node.js", "Python", "Java", "Go", "React.js", "Next.js", "PostgreSQL", "MySQL", "MongoDB"],
    otherSkills: ["Express", "NestJS", "Django", "FastAPI", "Spring Boot", "Gin", "Fiber", "Unit Testing", "Integration Testing", "API Testing"],
    requiredSkills: [
        "3–5 years of professional experience",
        "Strong in at least one backend framework: Node.js (Express / NestJS), Python (Django / FastAPI), Java (Spring Boot), Go (Gin / Fiber)",
        "Comfortable with (or willing to learn) React.js / Next.js",
        "Experience writing unit, integration, and API tests",
        "Ability to switch between multiple stacks as required"
    ],
    kpis: [
        "Reliable and timely delivery of features.",
        "Quality of code measured by peer reviews and bug reports.",
        "Effective collaboration with Product, QA, and Engineering teams.",
        "Demonstrated growth and learning in new technologies.",
    ],
    workHours: [
        "Full-time position",
        "Flexible work environment"
    ],
    otherDuties: "Please note this job description is not designed to cover or contain a comprehensive listing of activities, duties, or responsibilities required of the employee for this job. Duties, obligations, and activities may change at any time, with or without notice.",
    education: "Bachelor's degree in Computer Science or a related field, or equivalent practical experience.",
    salary: "Up to 90,000 BDT",
    benefits: [
        "Two annual festival bonuses",
        "Partially Subsidized lunch",
        "Complimentary snacks and coffee",
        "2 weekly holidays",
        "Games & recreation facilities",
        "Flexible work environment",
        "Performance-based bonuses",
        "Quarterly events and celebrations",
        "Corporate Discounts"
    ],
    hiringProcess: [
        { title: "Initial Screening", details: "A conversation with our talent acquisition team to discuss your background and the role." },
        { title: "Technical Interview", details: "A deep dive into your technical expertise and problem-solving skills." },
        { title: "Final Interview", details: "A final conversation with leadership to ensure a great fit." },
        { title: "Offer", details: "Successful candidates receive a competitive offer." }
    ],
    workplace: "Dhaka (Hybrid)",
    employmentType: "Full-Time",
    department: "Engineering"
};

const job6: Omit<Job, 'id' | 'fullDescription' | 'salaryMin' | 'salaryMax' | 'experienceLevel'> = {
    title: "DevOps & Infrastructure Engineer",
    description: "TALENTO is sourcing for a Dhaka-rooted global outsourcing giant with offices across USA, Canada, and Australia, and support through specialized team augmentation in software, apps, design, AI, blockchain, cloud, security, and analytics.",
    whatYouWillDo: [
        "Design, deploy, and manage AWS cloud infrastructure",
        "Build and maintain CI/CD pipelines (GitHub Actions / GitLab CI / CircleCI)",
        "Manage containerization using Docker",
        "Implement Infrastructure as Code using Terraform",
        "Set up monitoring & alerting with tools like Prometheus, Grafana, Sentry, Datadog",
        "Maintain Linux/Unix servers and system administration tasks",
        "Write automation scripts using Bash / Shell / Python",
        "Manage logs, performance analysis, and observability systems",
        "Work with networking, security, and system hardening",
        "Support backend teams (Node.js / Nest.js / Fast API)",
        "Collaborate with engineering teams to ensure smooth, automated delivery"
    ],
    highlightedSkills: ["AWS", "Docker", "Terraform", "CI/CD", "Python", "Bash", "Linux"],
    otherSkills: ["Git", "GitOps", "Prometheus", "Grafana", "Serverless", "SST.dev", "AWS CDK", "Node.js", "Next.js", "Fast API", "MLOps", "Microservices"],
    requiredSkills: [
        "3–5 years of hands-on DevOps experience",
        "Strong in AWS Cloud Services & Architecture",
        "Solid experience with Docker and container workflows",
        "Strong Terraform knowledge for infra automation",
        "Experience with CI/CD tools (GitHub Actions, GitLab, CircleCI)",
        "Comfortable with Linux administration",
        "Strong scripting with Python / Bash",
        "Familiarity with Git & GitOps workflows",
        "Experience managing databases, backups, and migrations",
        "Understanding of networking, VPCs, firewalls, security groups",
        "Experience with monitoring tools (Prometheus, Grafana, etc.)",
        "Experience with Serverless (SST.dev / AWS CDK) is a huge plus",
        "Experience with Node.js / Next.js / Fast API is a huge plus",
        "Deploying automated testing pipelines is a huge plus",
        "MLOps / AgentOps exposure is a huge plus",
        "Experience with SOA and microservices architecture is a huge plus"
    ],
    kpis: [
        "Infrastructure uptime and reliability.",
        "CI/CD pipeline efficiency and speed.",
        "Automation of manual processes.",
        "Security and compliance of the infrastructure."
    ],

    workHours: [
        "Full-time position",
        "Flexible work environment"
    ],
    otherDuties: "Please note this job description is not designed to cover or contain a comprehensive listing of activities, duties, or responsibilities required of the employee for this job. Duties, obligations, and activities may change at any time, with or without notice.",
    education: "Bachelor's degree in Computer Science or a related field, or equivalent practical experience.",
    salary: "Up to 100,000 BDT",
    benefits: [
        "Two annual festival bonuses",
        "Partially subsidized lunch",
        "Unlimited tea, snacks & coffee",
        "Two weekly holidays",
        "In-office games & recreation",
        "Flexible work culture",
        "Performance-based bonuses",
        "Quarterly team events",
        "Corporate discounts"
    ],
    hiringProcess: [
        { title: "Initial Screening", details: "A conversation with our talent acquisition team to discuss your background and the role." },
        { title: "Technical Interview", details: "A deep dive into your DevOps knowledge and systems thinking." },
        { title: "Final Interview", details: "A final conversation with leadership to ensure a great fit." },
        { title: "Offer", details: "Successful candidates receive a competitive offer." }
    ],
    workplace: "Dhaka (Hybrid)",
    employmentType: "Full-Time",
    department: "Infrastructure"
};

const job7: Omit<Job, 'id' | 'fullDescription' | 'salaryMin' | 'salaryMax' | 'experienceLevel'> = {
    title: "Senior AI Engineer",
    description: "TALENTO is sourcing for a Dhaka-rooted global outsourcing giant with offices across USA, Canada, and Australia, and support through specialized team augmentation in software, apps, design, AI, blockchain, cloud, security, and analytics.",
    whatYouWillDo: [
        "Design, develop, and deploy scalable AI systems",
        "Build and lead the AI engineering team",
        "Define best practices across data, ML, and deployment workflows",
        "Work with cross-functional teams to ship production-grade AI features",
        "Mentor junior engineers",
        "Drive architecture decisions for cloud-based and enterprise AI systems"
    ],
    highlightedSkills: ["Python", "TensorFlow", "PyTorch", "LLMs", "Pinecone", "AWS SageMaker", "Docker", "Kubernetes"],
    otherSkills: ["Node.js", "TypeScript", "Conversational AI", "Graph Databases", "AIOps", "REST APIs", "scikit-learn", "Weaviate", "Chroma", "Azure ML", "GCP AI Platform"],
    requiredSkills: [
        "Bachelor’s/Master’s degree in CS, ML, AI, or related field",
        "5+ years of experience building & deploying production AI/ML systems",
        "Strong Python expertise + ML frameworks: TensorFlow, PyTorch, scikit-learn",
        "Experience with LLMs (OpenAI, Claude, or open-source models)",
        "Hands-on experience with vector DBs: Pinecone, Weaviate, Chroma",
        "Experience with cloud AI platforms: AWS SageMaker, Azure ML, GCP AI Platform",
        "Knowledge of MLOps: model versioning, monitoring, deployment",
        "Experience integrating AI systems with REST APIs",
        "Strong with Docker & Kubernetes",
        "Understanding of data engineering & large-scale data handling"
    ],
    kpis: [
        "Quality and scalability of deployed AI systems.",
        "Performance and growth of the AI engineering team.",
        "Successful integration of AI features into production.",
        "Impact of mentorship on junior engineers."
    ],
    workHours: [
        "Full-time position",
        "Dhaka (Onsite/Hybrid)"
    ],
    otherDuties: "Please note this job description is not designed to cover or contain a comprehensive listing of activities, duties, or responsibilities required of the employee for this job. Duties, obligations, and activities may change at any time, with or without notice.",
    education: "Bachelor’s/Master’s degree in CS, ML, AI, or related field",
    salary: "Up to 2,00,000 BDT",
    benefits: [
        "Two annual festival bonuses",
        "Complimentary snacks and coffee",
        "Partially Subsidized lunch",
        "2 days off per week",
        "Games & entertainment facilities",
        "Flexible work environment",
        "Performance-based bonus",
        "Quarterly events and celebrations",
        "Corporate Discounts"
    ],
    hiringProcess: [
        { title: "Initial Screening", details: "A conversation with our talent acquisition team to discuss your background and the role." },
        { title: "Technical Deep-Dive", details: "A session focusing on your AI/ML expertise and hands-on skills." },
        { title: "System Design & Architecture", details: "A round to evaluate your approach to designing scalable AI systems." },
        { title: "Final Leadership Interview", details: "A final conversation to ensure a great cultural and team fit." },
        { title: "Offer", details: "Successful candidates receive a competitive offer." }
    ],
    workplace: "Dhaka (Onsite/Hybrid)",
    employmentType: "Full-Time",
    department: "AI & Machine Learning"
};

const job8: Omit<Job, 'id' | 'fullDescription' | 'salaryMin' | 'salaryMax' | 'experienceLevel'> = {
    title: "AI Engineer",
    description: "TALENTO is sourcing for a Dhaka-rooted global outsourcing giant with offices across USA, Canada, and Australia, and support through specialized team augmentation in software, apps, design, AI, blockchain, cloud, security, and analytics.",
    whatYouWillDo: [
        "Develop, train, and evaluate ML models on structured & unstructured datasets",
        "Build modular, versioned, reproducible training pipelines",
        "Support deployment of containerized models with REST-based inference APIs",
        "Integrate MLOps tools such as MLflow, DVC for tracking and lifecycle management",
        "Use n8n or similar tools to orchestrate workflow automations and data triggers",
        "Collaborate with backend & infra teams for model serving and CI/CD",
        "Design batch or real-time inference systems and work with feature stores",
        "Monitor deployed models for drift, stability issues, and dataset shifts",
        "Participate in sprint planning, technical discussions, and delivery checkpoints"
    ],
    highlightedSkills: ["Python", "TensorFlow", "PyTorch", "LLMs", "MLOps", "Docker", "Kubernetes", "GCP", "AWS"],
    otherSkills: ["scikit-learn", "MLflow", "DVC", "n8n", "Pinecone", "Weaviate", "REST APIs"],
    requiredSkills: [
        "3–5 years of hands-on ML/AI experience",
        "Bachelor’s in CSE (Open-source contributions or research publications preferred)",
        "2–3 years building & deploying production ML systems",
        "Strong Python skills + ML frameworks: TensorFlow, PyTorch, scikit-learn",
        "Experience with cloud AI tooling: GCP (Vertex AI, Agent Engine, ADK), AWS (SageMaker, Bedrock, Q)",
        "Experience with LLMs (OpenAI, Claude, etc.)",
        "Experience with n8n or other automation/orchestration platforms",
        "Hands-on with vector DBs: Pinecone, Weaviate, etc.",
        "Solid MLOps fundamentals: versioning, monitoring, evaluation, deployment",
        "Strong understanding of REST APIs, Docker, and Kubernetes",
        "Good understanding of data engineering concepts & large datasets"
    ],
    kpis: [
        "Quality and performance of developed ML models.",
        "Efficiency and reliability of training and deployment pipelines.",
        "Effective collaboration with backend and infrastructure teams.",
        "Contribution to MLOps best practices."
    ],
    workHours: [
        "Full-time position",
        "Dhaka"
    ],
    otherDuties: "Please note this job description is not designed to cover or contain a comprehensive listing of activities, duties, or responsibilities required of the employee for this job. Duties, obligations, and activities may change at any time, with or without notice.",
    education: "Bachelor’s in CSE (Open-source contributions or research publications preferred)",
    salary: "Up to 90,000 BDT",
    benefits: [
        "Two annual festival bonuses",
        "Complimentary snacks and coffee",
        "Partially Subsidized lunch",
        "2 days off per week",
        "Games & entertainment facilities",
        "Flexible work environment",
        "Performance-based bonus",
        "Quarterly events and celebrations",
    ],
    hiringProcess: [
        { title: "Initial Screening", details: "A conversation with our talent acquisition team to discuss your background and the role." },
        { title: "Technical Interview", details: "A deep dive into your ML/AI expertise and problem-solving skills." },
        { title: "System Design / Case Study", details: "A practical problem-solving session on a real-world scenario." },
        { title: "Final Interview", details: "A final conversation with leadership to ensure a great fit." },
        { title: "Offer", details: "Successful candidates receive a competitive offer." }
    ],
    workplace: "Dhaka",
    employmentType: "Full-Time",
    department: "AI & Machine Learning"
};

const job9: Omit<Job, 'id' | 'fullDescription' | 'salaryMin' | 'salaryMax' | 'experienceLevel'> = {
    title: "React Native Developer",
    description: "TALENTO is sourcing for a Dhaka-rooted global outsourcing giant with offices across USA, Canada, and Australia, and support through specialized team augmentation in software, apps, design, AI, blockchain, cloud, security, and analytics.",
    whatYouWillDo: [
        "Develop, maintain, and enhance cross-platform mobile apps using React Native (TypeScript preferred)",
        "Implement complex navigation flows, deep linking, and transitions using React Navigation",
        "Collaborate with designers and backend teams to deliver smooth user experiences",
        "Build modern UI using NativeWind (Tailwind for RN) or StyleSheet-based designs",
        "Integrate REST APIs, OAuth, Firebase services, and third-party SDKs",
        "Implement advanced animations using Reanimated & gesture-handler",
        "Manage local storage using AsyncStorage and other persistence methods",
        "Handle build processes using Xcode and Android Studio",
        "Work with In-App Purchases (IAP) for both platforms",
        "Optimize FlatList and virtualized list components for performance",
        "Debug, identify, and fix performance and stability issues",
        "Write clean, maintainable, and efficient code",
        "Participate in code reviews and uphold development standards",
        "Stay updated with the latest React Native tools, libraries, and trends"
    ],
    highlightedSkills: ["React Native", "TypeScript", "React Navigation", "Reanimated", "Xcode", "Android Studio", "Firebase"],
    otherSkills: ["Redux Toolkit", "NativeWind", "Zod", "React Hook Form", "IAP", "Expo", "Git", "REST APIs"],
    requiredSkills: [
        "3–5 years of professional React Native development experience",
        "Strong knowledge of JavaScript (ES6+), TypeScript, and core React concepts",
        "Experience with React Navigation, routing, and deep linking",
        "Solid understanding of state management: Redux Toolkit (RTK), RTK Query, or Context API",
        "Proficiency with React Native Reanimated",
        "Experience with React Hook Form + Zod or Formik + Yup",
        "Understanding of mobile architecture & performance optimization",
        "Experience with Firebase (FCM, OAuth, basic Firestore)",
        "Strong experience with Xcode + Android Studio",
        "Knowledge of AsyncStorage & local data management",
        "Expertise in optimizing FlatList and large list rendering",
        "Strong debugging and problem-solving skills",
        "Experience with Git & collaborative workflows",
        "Ability to work independently and meet deadlines",
        "Experience with IAP integration",
        "Familiarity with CI/CD pipelines for mobile apps",
        "Experience publishing apps to App Store & Google Play",
        "Understanding of UI/UX best practices",
        "Experience with third-party SDK integrations",
        "Experience with Expo (managed or bare workflow)"
    ],
    kpis: [
        "Quality and performance of the mobile applications.",
        "Timely delivery of features and updates.",
        "Code quality, maintainability, and adherence to best practices.",
        "Positive collaboration with design and backend teams."
    ],
    workHours: [
        "Full-time position",
        "Location: Onsite"
    ],
    otherDuties: "Please note this job description is not designed to cover or contain a comprehensive listing of activities, duties, or responsibilities required of the employee for this job. Duties, obligations, and activities may change at any time, with or without notice.",
    education: "Bachelor's degree in Computer Science or a related field, or equivalent practical experience.",
    salary: "Up to 1,00,000 BDT",
    benefits: [
        "Two annual festival bonuses",
        "Complimentary snacks and coffee",
        "Partially Subsidized lunch",
        "2 days off per week",
        "Games & entertainment facilities",
        "Flexible work environment",
        "Performance-based bonus",
        "Quarterly events and celebrations",
        "Corporate Discounts"
    ],
    hiringProcess: [
        { title: "Initial Screening", details: "A conversation with our talent acquisition team to discuss your background and the role." },
        { title: "Technical Interview", details: "A deep dive into your React Native expertise and problem-solving skills." },
        { title: "Final Interview", details: "A final conversation with leadership to ensure a great fit." },
        { title: "Offer", details: "Successful candidates receive a competitive offer." }
    ],
    workplace: "Dhaka (Onsite)",
    employmentType: "Full-Time",
    department: "Mobile Engineering"
};

const job10: Omit<Job, 'id' | 'fullDescription' | 'salaryMin' | 'salaryMax' | 'experienceLevel'> = {
    title: "Data Engineer",
    description: "TALENTO is sourcing for a Dhaka-rooted global outsourcing giant with offices across USA, Canada, and Australia, and support through specialized team augmentation in software, apps, design, AI, blockchain, cloud, security, and analytics.",
    whatYouWillDo: [
        "Ensure proper app access and MFA for secure authentication",
        "Optimize Snowflake views (change rollup view to union all tab views) for consistent reporting",
        "Audit Fivetran connectors to validate active data flows",
        "Update manual lead ingest process to reduce overhead",
        "Troubleshoot and resolve lead ingest issues related to boolean fields",
        "Configure Zapier and AWS S3 access",
        "Validate automation workflows and system connections",
        "Modify and enhance digital marketing dashboards: Verify metrics availability across sources, Update views to include new metrics, Incorporate new metrics into dashboards",
        "Provide ad-hoc break/fix support and oversight",
        "Address unplanned issues to ensure smooth operations"
    ],
    highlightedSkills: ["Power BI", "Snowflake", "AWS", "Fivetran", "SQL"],
    otherSkills: ["Data Modeling", "Zapier", "AWS S3"],
    requiredSkills: [
        "Strong experience with Power BI (Must)",
        "Strong experience with Snowflake (Must)",
        "Knowledge of AWS and Fivetran (Good to have)",
        "Strong SQL skills and data modeling expertise",
        "Ability to troubleshoot data pipelines and ensure data accuracy",
        "Experience collaborating with marketing, product, and engineering teams"
    ],
    kpis: [
        "Ownership of assigned data pipelines and dashboards",
        "Reliable and clear communication of issues and progress",
        "Ability to debug, optimize, and maintain production workflows",
        "Growth mindset and willingness to learn new tools and processes",
        "Proactive problem-solving and attention to detail"
    ],
    workHours: [
        "Full-time position"
    ],
    otherDuties: "Please note this job description is not designed to cover or contain a comprehensive listing of activities, duties, or responsibilities required of the employee for this job. Duties, obligations, and activities may change at any time, with or without notice.",
    education: "Bachelor's degree in a related field or equivalent practical experience.",
    salary: "Up to 150,000 BDT",
    benefits: [
        "Two annual festival bonuses",
        "Partially subsidized lunch",
        "Complimentary snacks and coffee",
        "2 weekly holidays",
        "Games & recreation facilities",
        "Flexible work environment",
        "Performance-based bonuses",
        "Quarterly team events",
        "Corporate discounts"
    ],
    hiringProcess: [
        { title: "Initial Screening", details: "A conversation with our talent acquisition team to discuss your background and the role." },
        { title: "Technical Interview", details: "A deep dive into your data engineering skills." },
        { title: "Final Interview", details: "A final conversation with leadership to ensure a great fit." },
        { title: "Offer", details: "Successful candidates receive a competitive offer." }
    ],
    workplace: "Dhaka (Hybrid)",
    employmentType: "Full-Time",
    department: "Data Engineering"
};

const job11: Omit<Job, 'id' | 'fullDescription' | 'salaryMin' | 'salaryMax' | 'experienceLevel'> = {
    title: "Software Quality Assurance Engineer",
    description: "TALENTO is sourcing for a Dhaka-rooted global outsourcing giant with offices across USA, Canada, and Australia, and support through specialized team augmentation in software, apps, design, AI, blockchain, cloud, security, and analytics.",
    whatYouWillDo: [
        "Analyze requirements and prepare detailed test cases, test plans, and scenarios.",
        "Perform manual testing for web and mobile applications (iOS & Android).",
        "Conduct API and Load testing.",
        "Identify, log, and track defects, collaborating with developers for timely resolution.",
        "Understand end-to-end data flow from backend (database/API) to frontend to identify potential bugs.",
        "Design critical system-level test cases based on requirements and data flow.",
        "Participate in regression, integration, and post-release testing.",
        "Prepare test reports and communicate results to stakeholders.",
        "Drive the QA process and manage priorities across multiple projects."
    ],
    highlightedSkills: ["Manual Testing", "API Testing", "Mobile App Testing", "Load Testing", "Test Case Design"],
    otherSkills: ["Agile/Scrum", "JIRA", "Postman", "SQL", "Playwright"],
    requiredSkills: [
        "2-3 years of experience in manual, API, database, Load testing, and mobile app testing.",
        "Strong understanding of SDLC, STLC, and defect lifecycle.",
        "Ability to analyze requirements and design critical system-level test cases.",
        "Strong problem-solving skills, self-driven, with product awareness and user-focused testing mindset.",
        "Skilled in bug advocacy, ensuring defects are accurately identified, prioritized, and clearly communicated.",
        "Experience in test case preparation, defect reporting, and test reporting.",
        "Agile/Scrum experience."
    ],
    kpis: [
        "Quality and coverage of test cases.",
        "Accuracy and clarity of defect reporting.",
        "Timely execution of testing cycles.",
        "Effective collaboration with development teams."
    ],
    workHours: [
        "Full-time position",
        "Location: Onsite"
    ],
    otherDuties: "Please note this job description is not designed to cover or contain a comprehensive listing of activities, duties, or responsibilities required of the employee for this job. Duties, obligations, and activities may change at any time, with or without notice.",
    education: "Bachelor's degree in a related field or equivalent practical experience.",
    salary: "Up to 55,000 BDT",
    benefits: [
        "Two annual festival bonuses",
        "Partially subsidized lunch",
        "Complimentary snacks and coffee",
        "2 weekly holidays",
        "Games & recreation facilities",
        "Flexible work environment",
        "Performance-based bonuses",
        "Quarterly team events",
        "Corporate discounts"
    ],
    hiringProcess: [
        { title: "Initial Screening", details: "A conversation with our talent acquisition team to discuss your background and the role." },
        { title: "Technical Interview", details: "A deep dive into your SQA expertise and problem-solving skills." },
        { title: "Final Interview", details: "A final conversation with leadership to ensure a great fit." },
        { title: "Offer", details: "Successful candidates receive a competitive offer." }
    ],
    workplace: "Dhaka (Onsite)",
    employmentType: "Full-Time",
    department: "Quality Assurance"
};

const job12: Omit<Job, 'id' | 'fullDescription' | 'salaryMin' | 'salaryMax' | 'experienceLevel'> = {
    title: "Product Lead",
    description: "TALENTO is sourcing for a Dhaka-rooted global outsourcing giant with offices across USA, Canada, and Australia, and support through specialized team augmentation in software, apps, design, AI, blockchain, cloud, security, and analytics.",
    whatYouWillDo: [
        "Own a product area as a hands-on individual contributor, taking ambiguous problems from discovery and framing through delivery, launch, and iteration.",
        "Manage and coach up to two Product Managers, serving as their local people manager and helping them strengthen problem framing, decision-making, execution, and communication.",
        "Set and reinforce a high bar for product thinking and quality, modeling best practices through your own IC work and coaching others through real examples.",
        "Help PMs move beyond stakeholder-driven execution, coaching them to form independent points of view grounded in user needs, data, and business impact.",
        "Support PMs working across different product areas, providing guidance and perspective without acting as an approval or decision bottleneck.",
        "Partner closely with Product Designers and Engineering Leads, ensuring strong collaboration, clear priorities, and effective delivery.",
        "Align with US-based Product and Design Leadership, contributing local context, surfacing risks and tradeoffs, and supporting shared ownership models.",
        "Establish strong local operating norms, including clear decision-making, documentation, retrospectives, and continuous improvement.",
    ],
    highlightedSkills: ["Product Management", "People Management", "B2B SaaS", "Marketplace", "Product Strategy", "Roadmap Planning"],
    otherSkills: ["Problem Framing", "User Research", "Data Analysis", "Agile", "Scrum", "Mentorship"],
    requiredSkills: [
        "5+ years of experience in Product Management, with a strong track record shipping user-facing features (B2B SaaS and/or marketplace experience preferred).",
        "Proven strength as an IC Product Manager, able to independently frame problems, make tradeoffs, and deliver outcomes.",
        "Previous people management or mentorship experience, with a genuine interest in coaching and developing PMs.",
        "Strong product judgment and independent point of view, comfortable making and explaining decisions under ambiguity.",
        "Excellent problem framing skills, able to translate vague inputs into clear problems, solution directions, and success metrics.",
        "Clear, concise communicator, with fluent spoken and written English and comfort working with US-based teams.",
        "Dependable and outcome-oriented, able to drive progress through ambiguity, tight timelines, and competing priorities.",
        "Experience working on distributed or global teams is a strong plus."
    ],
    kpis: [
        "Product adoption and user engagement metrics.",
        "Team performance and growth of managed PMs.",
        "Successful delivery of product roadmap initiatives.",
        "Quality of product specifications and problem framing.",
    ],
    workHours: [
        "Working Days: Hybrid, Monday to Friday (3 days work from home + 2 days work from office)",
        "Working Hours: 1:00 pm to 10:00 pm",
        "Office Location: Uttara, Dhaka, Bangladesh (Hybrid)"
    ],
    otherDuties: "We may use artificial intelligence (AI) tools to support parts of the hiring process, such as reviewing applications, analyzing resumes, or assessing responses. These tools assist our recruitment team but do not replace human judgment. Final hiring decisions are ultimately made by humans. If you would like more information about how your data is processed, please contact us.",
    education: "Not specified.",
    salary: "BDT 285,000 - 350,000 (Monthly)",
    benefits: [
        "Mobile bill",
        "Gym Membership",
        "Medical Insurance",
        "Festival bonus",
        "Performance Reward Bonus",
        "Gratuity benefit.",
        "Lunch/Dinner Facilities: Fully Subsidized",
        "Sound work-life balance - Regular working hours: 8 hours/day, 5 days a week.",
        "Friendly work environment. Flexible leave/vacation policy.",
        "A great learning opportunity.",
        "Opportunity to work with cross-cultural teams with the USA.",
        "Annual performance evaluation and increment.",
        "Semi-annual reflection opportunities - because growth is the name of the game",
        "Employee Drop Off - we’ve got your commute covered"
    ],
    hiringProcess: [
        { title: "Initial Screening", details: "A conversation with our talent acquisition team." },
        { title: "Product Sense & IC Skills Interview", details: "Deep dive into your product thinking and individual contributor capabilities." },
        { title: "Leadership & Coaching Interview", details: "Discussion on your management style and experience coaching others." },
        { title: "Final Interview", details: "A final conversation with leadership." },
        { title: "Offer", details: "Successful candidates receive a competitive offer." }
    ],
    workplace: "Dhaka (Hybrid)",
    employmentType: "Full-time",
    department: "Product"
};


const buildFullDescription = (job: Omit<Job, 'id' | 'fullDescription' | 'experienceLevel' | 'salaryMin' | 'salaryMax'>) => {
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
        ...job12,
        id: "ta1543",
        fullDescription: buildFullDescription(job12),
        experienceLevel: "Senior-level",
        salaryMin: 285000,
        salaryMax: 350000,
    },
    {
        ...job11,
        id: "ta1542",
        fullDescription: buildFullDescription(job11),
        experienceLevel: "Entry-level",
        salaryMin: null,
        salaryMax: 55000,
    },
    {
        ...job10,
        id: "ta1541",
        fullDescription: buildFullDescription(job10),
        experienceLevel: "Mid-level",
        salaryMin: null,
        salaryMax: 150000,
    },
    {
        ...job9,
        id: "ta1540",
        fullDescription: buildFullDescription(job9),
        experienceLevel: "Mid-level",
        salaryMin: null,
        salaryMax: 100000,
    },
    {
        ...job8,
        id: "ta1539",
        fullDescription: buildFullDescription(job8),
        experienceLevel: "Mid-level",
        salaryMin: null,
        salaryMax: 90000,
    },
    {
        ...job7,
        id: "ta1538",
        fullDescription: buildFullDescription(job7),
        experienceLevel: "Senior-level",
        salaryMin: null,
        salaryMax: 200000,
    },
    {
        ...job6,
        id: "ta1537",
        fullDescription: buildFullDescription(job6),
        experienceLevel: "Mid-level",
        salaryMin: null,
        salaryMax: 100000,
    },
    {
        ...job5,
        id: "ta1536",
        fullDescription: buildFullDescription(job5),
        experienceLevel: "Mid-level",
        salaryMin: null,
        salaryMax: 90000,
    },
    {
        ...job4,
        id: "ta1535",
        fullDescription: buildFullDescription(job4),
        experienceLevel: "Senior-level",
        salaryMin: null,
        salaryMax: 150000,
    },
    {
        ...job3,
        id: "ta1534",
        fullDescription: buildFullDescription(job3),
        experienceLevel: "Director",
        salaryMin: 200000,
        salaryMax: 400000,
    },
    {
        ...job1,
        id: "ta1532",
        fullDescription: buildFullDescription(job1),
        experienceLevel: "Senior-level",
        salaryMin: null,
        salaryMax: null,
    },
    {
        ...job2,
        id: "ta1533",
        fullDescription: buildFullDescription(job2),
        experienceLevel: "Senior-level",
        salaryMin: null,
        salaryMax: null,
    }
];
