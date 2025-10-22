export const jobData = {
    title: "Staff Software Engineer",
    description: "Our client—a top US onsite work marketplace—is searching for skilled developers to join their global engineering team. Build technology that genuinely improves lives while delivering exceptional service. Thrive in a fast-paced environment where your ideas matter and collaboration fuels success. Work with outstanding professionals in a culture that champions learning, growth, and innovation.",
    whatYouWillDo: [
        "Develop a cutting-edge technology SaaS solution hosted on AWS that enables today’s and tomorrow’s Gig economy.",
        "Work on a backend built on PHP, MySQL, and increasingly Node JS and Golang microservices, exposed via REST API.",
        "Contribute to a frontend built with React and Redux.",
        "Build and deploy services using Docker containers managed by Kubernetes.",
        "Work closely with the engineering team, Product Management, UX, and our customers to ensure we are building and delivering impactful features.",
        "Prepare technical designs and delivery plans independently.",
        "Bring fresh ideas on how technology can be used to solve big problems."
    ],
    highlightedSkills: ["React", "Node.js", "PHP", "MySQL", "AWS", "Docker", "Kubernetes"],
    otherSkills: ["Redux", "Golang", "REST API", "Microservices", "Git"],
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
        "Quality of deliverables measured by the number of production bugs.",
        "Positive team member feedback on collaboration.",
        "Support of other engineers on complicated coding problems.",
        "Implementation and adherence to testing practices and automated tests."
    ],
    workHours: [
        "This is a full-time, exempt position with typical business hours Monday-Friday.",
        "Additional hours may be needed for travel, increased workload, or on-call duties.",
        "This position has no supervisory responsibility.",
        "Travel is approximately 0% and does not require international travel."
    ],
    otherDuties: "Please note this job description is not designed to cover or contain a comprehensive listing of activities, duties, or responsibilities required of the employee for this job. Duties, obligations, and activities may change at any time, with or without notice.",
    education: "B.Sc. / M.Sc. in Computer Science & Engineering from any reputed University or equivalent practical experience.",
    salary: "Competitive and above market average salary.",
    benefits: [
        "Festival Bonus (2 per year)",
        "Performance Rewards",
        "Leave Encashment",
        "Medical Insurance",
        "Fully Subsidized Lunch",
        "Transportation Service (Drop Off)",
        "Gym Membership",
        "Career Development Budget",
        "Mobile Bill Reimbursement"
    ],
    hiringProcess: [
        { title: "Cold Call & Compatibility", details: "Initial contact and discussion on compatibility, salary, and notice period with Talento TA experts." },
        { title: "Technical Session [Client Company]", details: "A comprehensive technical evaluation including a test and interviews with the client's engineering team." },
        { title: "Selection Round", details: "Final interviews and decision-making process." },
        { title: "Offer", details: "Successful candidates receive a competitive offer to join the team." }
    ],
    fullDescription: ""
};

jobData.fullDescription = `
Job Title: ${jobData.title}

Description: ${jobData.description}

What You Will Do:
${jobData.whatYouWillDo.map(item => `- ${item}`).join('\n')}

Required Skill Sets:
${jobData.requiredSkills.map(item => `- ${item}`).join('\n')}

Key Performance Matrix:
${jobData.kpis.map(item => `- ${item}`).join('\n')}

Education: ${jobData.education}
`.trim();
