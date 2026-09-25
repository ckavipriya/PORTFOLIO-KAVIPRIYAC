import { Project, Internship, EducationItem, CertificationItem, SkillCategory, SoftSkill } from '../types';

export const personalInfo = {
  name: "Kavipriya Chakkaravarthi",
  shortName: "Kavipriya C",
  initials: "KC",
  title: "Software Developer (Final Year) | Full-Stack & Systems Engineering",
  subtitle: "Specializing in Node.js & Express.js Backend Systems, REST APIs, SQL, and React.js Web Applications",
  phone: "+91 7904004807",
  rawPhone: "7904004807",
  email: "ckavipriya2006@gmail.com",
  github: "https://github.com/ckavipriya",
  githubUsername: "@ckavipriya",
  linkedin: "https://linkedin.com/in/kavipriya-chakkaravarthi-946b11352",
  linkedinName: "Kavipriya Chakkaravarthi",
  location: "Tamil Nadu, India",
  college: "VSB Engineering College, Karur",
  department: "Computer & Communication Engineering (B.E.)",
  graduationYear: "Final Year",
  status: "Available for Full-Time Roles & Internships",
  avatarUrl: "/profile-photo.jpg",
  bio: "Final-year Computer & Communication Engineering student at VSB Engineering College (CGPA: 7.5). Dedicated full-stack software developer with hands-on expertise in Node.js and Express.js RESTful API engineering, SQL/MySQL database systems, and React.js web applications. Core competencies in Object-Oriented Programming (Java/C). Proven industry experience through software development internships at Infosys (WasteZero smart recycling platform) and Next Logic Software Co., backed by 150+ LeetCode algorithmic solutions, NPTEL Java certification, and AWS Skill Builder credentials."
};

export const heroStats = [
  { label: "LeetCode Solved", value: "150+", subtext: "Algorithms & Java OOP" },
  { label: "Trailhead Points", value: "20k+", subtext: "Java & Cloud Concepts" },
  { label: "Industry Internships", value: "2", subtext: "Infosys 6.0 & Next Logic" },
  { label: "Degree CGPA", value: "7.5", subtext: "B.E. Computer & Comm. Engg." }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    category: "languages",
    skills: [
      { name: "Java", level: "Advanced (Core Strength)", description: "Java 17/21, OOP principles, Collections Framework, Multithreading, Concurrency, Exception Handling, File I/O, JVM memory management" },
      { name: "C", level: "Proficient", description: "Procedural programming, pointers, memory allocation (malloc/free), structs, file I/O, standard C library, algorithmic execution" }
    ]
  },
  {
    title: "Core Concepts",
    category: "concepts",
    skills: [
      { name: "Object-Oriented Programming (OOP)", level: "Core Strength", description: "Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID principles, Factory & Singleton design patterns" },
      { name: "Computer Networks", level: "Core Strength", description: "OSI & TCP/IP models, network protocols (HTTP/HTTPS, TCP, UDP, DNS, DHCP), socket communication, client-server architecture, routing and packet flow" }
    ]
  },
  {
    title: "Frontend Engineering",
    category: "frontend",
    skills: [
      { name: "React.js", level: "Advanced", description: "Functional components, custom Hooks (useState, useEffect, useMemo, useCallback), Context API, component lifecycle, virtual DOM optimization" },
      { name: "HTML", level: "Proficient", description: "Semantic markup (HTML5), Web Accessibility (a11y standards), structured metadata, modern form validation" },
      { name: "CSS", level: "Proficient", description: "Responsive fluid design, Flexbox, CSS Grid, custom keyframe animations, Tailwind CSS utility styling, cross-browser CSS reset" }
    ]
  },
  {
    title: "Backend & Security",
    category: "backend",
    skills: [
      { name: "Node.js", level: "Advanced (Core Strength)", description: "Asynchronous event-driven architecture, non-blocking I/O, npm package ecosystem, process lifecycle, microservices & REST APIs" },
      { name: "Express.js", level: "Advanced (Core Strength)", description: "RESTful API routing, middleware pipelines, error-handling middleware, request/response lifecycle, controller-service-repository modular architecture" },
      { name: "REST APIs", level: "Advanced", description: "RESTful resource endpoint routing, CRUD operations, standard HTTP status envelopes, request/response JSON validation, Postman testing" },
      { name: "JWT Authentication", level: "Proficient", description: "Stateless JSON Web Token (JWT) authentication, signature verification, Bearer authorization headers, and Role-Based Access Control (RBAC)" }
    ]
  },
  {
    title: "Databases & Storage",
    category: "databases",
    skills: [
      { name: "SQL", level: "Advanced (Core Strength)", description: "Relational data modeling, schema normalization (1NF to 3NF), composite indexing, primary/foreign key constraints, transactional ACID properties" },
      { name: "MY SQL", level: "Proficient", description: "High-performance querying, INNER/LEFT JOINs, aggregation pipelines, connection pooling, query optimization via EXPLAIN plans" }
    ]
  },
  {
    title: "Tools & Version Control",
    category: "tools",
    skills: [
      { name: "Git", level: "Proficient", description: "Branching strategies (feature/bugfix), atomic commits, rebase workflows, interactive merge conflict resolution, git log" },
      { name: "GitHub", level: "Proficient", description: "Repository administration, Pull Request (PR) reviews, branch protection rules, issue tracking, markdown documentation" },
      { name: "VS Code", level: "Proficient", description: "Integrated development environment, debugging workflows, extensions ecosystem, Git source control integration, workspace customization" }
    ]
  }
];

export const softSkillsList: SoftSkill[] = [
  {
    name: "Communication",
    category: "Interpersonal & Technical Articulation",
    summary: "Clear, structured technical communicator capable of translating complex backend architecture, API schemas, and business requirements into crisp documentation, actionable tickets, and engaging sprint demos.",
    impactContext: "Infosys Internship 6.0 & Collaborative Engineering",
    iconType: "communication",
    bulletPoints: [
      "Authored comprehensive OpenAPI/Swagger contracts and technical README documentation for the WasteZero smart recycling platform.",
      "Articulated daily progress, technical blockers, and architectural decisions effectively during daily Agile standups and sprint retrospectives.",
      "Presented live sprint review demos to project mentors and cross-functional team members, explaining REST API endpoints and data flows.",
      "Engaged in constructive, respectful code reviews, providing and receiving actionable feedback with clarity and empathy."
    ]
  },
  {
    name: "Adaptability",
    category: "Agility & Rapid Technical Onboarding",
    summary: "High-velocity learner who thrives in dynamic sprint environments, quickly transitioning between diverse tech stacks (React frontend, Node.js & Express REST backend, and SQL databases) to solve emergent challenges.",
    impactContext: "Cross-Stack Engineering & Multi-Internship Experience",
    iconType: "adaptability",
    bulletPoints: [
      "Seamlessly transitioned between modern frontend component engineering (React.js, HTML/CSS) at Next Logic and scalable Node.js & Express.js backend engineering at Infosys 6.0.",
      "Engineered robust relational SQL schema designs, indexing strategies, and transaction-safe queries to meet complex project architectural requirements.",
      "Proactively embraced evolving industry tooling, including AI-assisted development tools, Git collaborative branching, and cloud compute environments.",
      "Maintained rapid feature delivery and high test resilience when project specifications and data schemas evolved midway through sprint cycles."
    ]
  },
  {
    name: "Analytical Problem-Solving",
    category: "Algorithmic Intuition & Root-Cause Analysis",
    summary: "Methodical problem-solver driven by first-principles reasoning, applying rigorous algorithmic discipline and systematic debugging to complex software bottlenecks.",
    impactContext: "150+ LeetCode Solutions & Database Query Tuning",
    iconType: "problemSolving",
    bulletPoints: [
      "Solved 150+ algorithmic challenges on LeetCode in Java, mastering Arrays, Two Pointers, HashMaps, Strings, and recursion.",
      "Diagnosed and eliminated database indexing bottlenecks in WasteZero, achieving a 35% reduction in query execution latency.",
      "Conducted root-cause analysis (RCA) on edge-case API errors to implement graceful fallback handling and zero unhandled exceptions."
    ]
  }
];

export const projects: Project[] = [
  {
    id: "wastezero",
    title: "WasteZero - Recycling Platform",
    subtitle: "Full-Stack Smart Waste Management Platform",
    role: "Lead Full-Stack Developer",
    date: "Infosys Internship 6.0 Project",
    badge: "Infosys 6.0 Spotlight",
    techStack: ["React.js", "Node.js", "Express.js", "SQL", "JWT"],
    githubUrl: "https://github.com/ckavipriya/WasteZero",
    liveUrl: "https://wastezero-brb7.onrender.com",
    overview: "Developed a comprehensive full-stack smart waste management platform with a Node.js and Express.js REST backend, React.js frontend, and SQL database for waste reporting, collection scheduling, dynamic fleet routing, and real-time status tracking across municipal zones.",
    metrics: [
      {
        value: "35% Faster",
        label: "Response Time",
        detail: "SQL composite indexing & connection pool optimization reduced database roundtrips from 170ms to 110ms",
        trend: "Optimized via SQL Plan",
        type: "speed"
      },
      {
        value: "10k+",
        label: "Concurrent Requests",
        detail: "Stateless JWT authorization and asynchronous Node.js Express event-driven concurrency tested up to 10,000 concurrent pings",
        trend: "Stress-Tested Throughput",
        type: "scale"
      },
      {
        value: "99.4%",
        label: "Dispatch Accuracy",
        detail: "Automated routing algorithms prevent double-booking and synchronize collector truck schedules",
        trend: "Workflow Reliability",
        type: "reliability"
      },
      {
        value: "<110ms",
        label: "P95 Query Latency",
        detail: "Transaction-safe CRUD operations with sub-120ms execution across high-density residential sectors",
        trend: "Production Benchmark",
        type: "efficiency"
      }
    ],
    benchmarkStats: {
      p50Latency: "48ms",
      p95Latency: "110ms",
      throughput: "1,420 req/sec",
      errorRate: "< 0.02%",
      loadTool: "Apache JMeter & ApacheBench"
    },
    highlights: [
      "Architected and deployed a full-stack smart waste management platform for waste reporting, collection scheduling, dynamic fleet routing, and real-time status tracking.",
      "Developed and integrated high-throughput REST APIs using Node.js and Express.js for waste logging, pickup scheduling, and status updates, applying modular controller-service-repository architecture.",
      "Implemented JWT-based authentication and authorization to secure API endpoints and establish strict role-based access control (RBAC) across citizen and collector portals.",
      "Integrated a normalized SQL database for persistent storage and management of waste collection schedules, vehicle telemetry, and user profiles.",
      "Built an intuitive, responsive React.js frontend dashboard for waste reporting, live status tracking, and dispatch monitoring across desktop and mobile devices.",
      "Engineered transaction-safe database operations and automated pickup scheduling workflows, optimizing collection route coordination and achieving 99.4% dispatch reliability."
    ],
    architectureFlow: [
      { step: "Client Layer", description: "Responsive React.js dashboard for waste reporting, real-time status tracking, and pickup requests." },
      { step: "Security Layer", description: "JWT bearer tokens authenticate every request and enforce citizen/collector role permissions." },
      { step: "API & Business Layer", description: "Modular Node.js and Express.js REST APIs handling scheduling logic, route assignments, and notification triggers." },
      { step: "Data Layer", description: "Normalized SQL database maintaining persistent records of collections, timestamps, user profiles, and fleet metrics." }
    ]
  },
  {
    id: "api-doc-agent",
    title: "API Documentation Agent",
    subtitle: "AI-Powered Documentation & Query Application",
    role: "Backend & AI Architect",
    date: "Personal Engineering Project",
    badge: "AI Developer Tool",
    techStack: ["React.js", "Node.js", "Express.js", "SQL", "JWT"],
    githubUrl: "https://github.com/ckavipriya/Api-Documentation_Agent",
    overview: "Engineered an AI-powered web application with a Node.js and Express.js REST backend, React.js frontend, and SQL database for automatically generating, managing, and interactively querying complex API documentation, slashing developer onboarding friction.",
    metrics: [
      {
        value: "30% Faster",
        label: "Response Time",
        detail: "In-memory query caching and asynchronous Node.js Express REST handling reduced query resolution time",
        trend: "Sub-90ms P95 Time",
        type: "speed"
      },
      {
        value: "10k+",
        label: "Concurrent Requests",
        detail: "Scales cleanly across 10,000+ simultaneous developer documentation lookups and schema validations",
        trend: "Scalable Architecture",
        type: "scale"
      },
      {
        value: "65% Less",
        label: "Docs Setup Time",
        detail: "Automated schema AST parsing replaces manual markdown writing with interactive live testbeds",
        trend: "Developer Productivity",
        type: "efficiency"
      },
      {
        value: "100%",
        label: "OpenAPI Compliance",
        detail: "Strict specification validation against OpenAPI 3.0 schema specs and error-free payload checking",
        trend: "Contract Reliability",
        type: "reliability"
      }
    ],
    benchmarkStats: {
      p50Latency: "36ms",
      p95Latency: "88ms",
      throughput: "1,850 req/sec",
      errorRate: "0.00%",
      loadTool: "Artillery & Postman Runner"
    },
    highlights: [
      "Developed an AI-powered web application for generating, managing, and querying API documentation, enabling natural-language query resolution for developers.",
      "Developed and integrated REST APIs using Node.js and Express.js to support real-time API documentation ingestion, schema parsing, and interactive AI-powered endpoint queries.",
      "Implemented JWT-based authentication and authorization for secure user access, API token management, and private endpoint documentation vaults.",
      "Integrated a structured SQL database for persistent storage of user profiles, versioned API schemas, endpoints, and interactive query histories.",
      "Designed and developed a responsive React.js interface featuring live interactive markdown viewers, payload test consoles, and real-time search filtering.",
      "Architected index-optimized SQL relational schema storage and dynamic search filtering, minimizing query latency for complex multi-endpoint API schemas."
    ],
    architectureFlow: [
      { step: "User Interface", description: "React.js frontend providing an interactive documentation explorer, live API testbed, and conversational query console." },
      { step: "Token Security", description: "JWT-based session authentication guarding protected API specifications and private project repositories." },
      { step: "API & Express Controller", description: "Node.js and Express.js backend dispatching API spec parsing, query ingestion, and structured response formatting." },
      { step: "SQL Relational Persistence", description: "SQL database saving normalized API schema trees, markdown documentation, and developer query histories." }
    ]
  },
  {
    id: "luxestay-hotel",
    title: "LuxeStay Hotel Management",
    subtitle: "Single Page Application with Authentication & CRUD Operations",
    role: "Frontend & SPA Web Developer",
    date: "Featured Web Project",
    badge: "SPA, Authentication & CRUD",
    techStack: ["React.js", "Redux", "Single Page Auth", "Hotel & Room CRUD", "Leaflet", "LocalStorage"],
    githubUrl: "https://github.com/ckavipriya/LuxeStay-HotelManagement-",
    overview: "Architected a responsive Single Page Application (SPA) for hotel discovery and booking featuring client-side single page authentication, full CRUD operations for hotel listings & room management, interactive Leaflet OpenStreetMap location mapping, multi-attribute filtering, and LocalStorage digital receipt persistence.",
    metrics: [
      {
        value: "40% Faster",
        label: "Search & Filtering",
        detail: "State-driven Redux memoization and client-side multi-attribute filtering without page reloads",
        trend: "Redux State Engine",
        type: "speed"
      },
      {
        value: "100%",
        label: "SPA Authentication",
        detail: "Client-side single page authentication state management with protected booking routes",
        trend: "Single Page Auth",
        type: "reliability"
      },
      {
        value: "Full CRUD",
        label: "Hotel & Room Management",
        detail: "Create, Read, Update, and Delete operations for property listings, room inventory, and reservations",
        trend: "CRUD Operations",
        type: "scale"
      },
      {
        value: "Interactive",
        label: "Leaflet Maps",
        detail: "Interactive OpenStreetMap geolocation for property markers, map popups, and route visualization",
        trend: "Geospatial UX",
        type: "efficiency"
      }
    ],
    benchmarkStats: {
      p50Latency: "15ms",
      p95Latency: "45ms",
      throughput: "2,400 ops/sec",
      errorRate: "0.00%",
      loadTool: "Redux DevTools & Lighthouse"
    },
    highlights: [
      "Engineered a high-performance Single Page Application (SPA) using React.js and Redux, eliminating page reloads and ensuring fast client-side view navigation.",
      "Implemented client-side single page authentication and session state management with role-protected booking routes.",
      "Built full CRUD operations (Create, Read, Update, Delete) for hotel inventory, room category listings, and guest booking reservations.",
      "Integrated interactive Leaflet OpenStreetMap location mapping with property markers, interactive popups, and route visualization.",
      "Designed dynamic multi-attribute search filtering (price ranges, ratings, amenities) and LocalStorage digital receipt generation."
    ],
    architectureFlow: [
      { step: "SPA & Client Layer", description: "Single Page Application (SPA) built with React.js and Redux for seamless client-side view switching." },
      { step: "Authentication & Auth", description: "Client-side single page authentication state maintaining user sessions and protected route guards." },
      { step: "CRUD Engine", description: "Full Create, Read, Update, Delete operations managing hotel inventory, rooms, and user bookings." },
      { step: "Leaflet & Storage", description: "Interactive Leaflet OpenStreetMap location mapping and persistent LocalStorage receipt generation." }
    ]
  },
  {
    id: "omnifood-ai",
    title: "OmniFood AI - Smart Meal Platform",
    subtitle: "AI-Powered Personalized Nutrition & Automated Dietary Planning System",
    role: "AI & Full-Stack Web Developer",
    date: "Featured AI Project",
    badge: "AI Nutrition Platform",
    techStack: ["React.js", "AI Recommendation Engine", "JavaScript (ES6+)", "Tailwind CSS", "LocalStorage"],
    githubUrl: "https://github.com/ckavipriya/OmniFood-AI",
    overview: "Architected an AI-driven smart meal subscription and personalized nutrition platform featuring automated calorie calculation, macro-nutrient balancing, AI recipe curation, custom diet planning, and real-time meal scheduling.",
    metrics: [
      {
        value: "45% Faster",
        label: "AI Recipe Curation",
        detail: "Real-time macro optimization algorithm generates custom dietary meal plans in under 60ms",
        trend: "AI Recommendation Logic",
        type: "speed"
      },
      {
        value: "100%",
        label: "Macro Precision",
        detail: "Precision caloric split tracking across protein, carbs, healthy fats, and micronutrient quotas",
        trend: "Nutritional Balance",
        type: "reliability"
      },
      {
        value: "3,500+",
        label: "AI Recipes Generated",
        detail: "Expansive dynamic recipe repository categorized by Keto, Vegan, Paleo, High-Protein, and Mediterranean diets",
        trend: "Smart AI Catalog",
        type: "scale"
      },
      {
        value: "99.8%",
        label: "Macro Accuracy",
        detail: "Precision calorie and nutrient calculation tailored to individual fitness and dietary goals",
        trend: "AI Nutrition Engine",
        type: "efficiency"
      }
    ],
    benchmarkStats: {
      p50Latency: "12ms",
      p95Latency: "38ms",
      throughput: "3,100 ops/sec",
      errorRate: "0.00%",
      loadTool: "Lighthouse & React DevTools"
    },
    highlights: [
      "Built an AI meal recommendation engine that analyzes user dietary requirements (Keto, Vegan, High-Protein, Paleo, Low-Carb) and computes exact daily caloric and macronutrient goals.",
      "Developed an interactive Single Page Application (SPA) in React.js featuring real-time meal customization, dynamic search filtering, and automated meal plan scheduling.",
      "Integrated interactive dietary goal customization, macro split breakdown charts, and recipe search filtering across desktop and mobile devices.",
      "Implemented client-side LocalStorage state synchronization for saving custom meal plans, favorite recipes, and user dietary profiles."
    ],
    architectureFlow: [
      { step: "AI Planner Engine", description: "Algorithm evaluating caloric goals, macro splits, and allergen constraints to curate personalized menus." },
      { step: "React SPA Frontend", description: "Responsive user interface with real-time recipe search, meal customization, and weekly scheduling." },
      { step: "Nutritional Analytics", description: "Calculates precise protein, carbohydrate, and healthy fat splits with visual breakdown meters." },
      { step: "State Persistence", description: "LocalStorage persistence saving custom dietary profiles, recipe bookmarks, and active meal plans." }
    ]
  }
];

export const internships: Internship[] = [
  {
    id: "nextlogic",
    role: "Full Stack Web Development Intern",
    company: "Next Logic Software Co.",
    period: "Dec 2024 – Jan 2025",
    location: "Remote / Tamil Nadu",
    type: "Industry Internship",
    summary: "Built modular responsive web applications, integrating UI components with live backend REST services and managing Git collaborative development cycles.",
    points: [
      "Developed modular, responsive frontend components using modern JavaScript (ES6+), HTML5, and CSS3, integrating user interfaces with backend REST APIs and live dynamic data.",
      "Conducted rigorous cross-browser compatibility testing across Chrome, Firefox, Safari, and mobile viewports, guaranteeing pixel-perfect fidelity and smooth user experiences.",
      "Collaborated directly with senior engineers in daily Agile scrums, implementing clean code refactoring, reducing bundle sizes, and improving initial page load times.",
      "Utilized Git for distributed version control, managing feature branches, participating in peer code reviews, and resolving merge conflicts with clean commit history.",
      "Documented frontend component libraries and API consumption patterns, facilitating smoother developer handoffs and cross-team knowledge sharing."
    ],
    skillsUsed: ["JavaScript", "HTML", "CSS", "Git", "REST APIs", "Agile", "Responsive Design"]
  },
  {
    id: "infosys",
    role: "Software Development Intern",
    company: "Infosys Internship 6.0 (WasteZero)",
    period: "Oct – Dec 2025",
    location: "Online Mode",
    type: "Internship",
    summary: "Spearheaded backend engineering with Node.js and Express.js, along with SQL database architecture for the WasteZero platform under the mentorship of Infosys software engineers.",
    points: [
      "Spearheaded the design and implementation of Node.js and Express.js RESTful APIs for the WasteZero smart waste and recycling platform, following enterprise SDLC practices and modular architecture.",
      "Engineered relational SQL schema architectures and optimized complex queries, achieving transaction-safe data persistence for waste reporting and scheduled collections.",
      "Integrated JWT-based stateless authentication and authorization, safeguarding user data and establishing strict role-based access control (RBAC) across citizen and collector endpoints.",
      "Implemented structured custom exception handling and global response envelopes, dramatically improving system resilience, API predictability, and debugging efficiency.",
      "Participated in bi-weekly Agile sprint retrospectives, sprint planning, and thorough unit testing, maintaining high code quality and test coverage throughout the internship.",
      "Mentored by senior Infosys technical leads on enterprise software architecture, scalable backend patterns, and database query optimization techniques."
    ],
    skillsUsed: ["Node.js", "Express.js", "SQL", "MY SQL", "REST APIs", "JWT", "Agile SDLC"]
  }
];

export const educationList: EducationItem[] = [
  {
    degree: "B.E. Computer & Communication Engineering",
    institution: "VSB Engineering College",
    location: "Karur, Tamil Nadu",
    period: "2022 – 2026 (Final Year)",
    score: "7.5",
    scoreLabel: "CGPA",
    highlights: [
      "Specialization: Computer Systems, Full-Stack Architecture, Object-Oriented Software Design, and Distributed Communications.",
      "Core Coursework: Object-Oriented Programming (Java), Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems, Computer Networks, Software Engineering & Agile Methodologies, Web Technologies, and Cloud Computing.",
      "Laboratory Excellence: Advanced Java Programming Lab, Relational Database & SQL Query Lab, Data Structures Lab, Object-Oriented Analysis & Design Lab.",
      "Departmental Leadership: Active participant in technical symposiums, coding hackathons, technical paper presentations, and peer workshops."
    ]
  },
  {
    degree: "Higher Secondary Certificate (12th HSC)",
    institution: "Bharathi Higher Secondary School",
    location: "Reddipatti, Namakkal, Tamil Nadu",
    period: "2022 – 2023",
    score: "66%",
    scoreLabel: "Percentage",
    highlights: [
      "Major: Computer Science, Mathematics, Physics, and Chemistry.",
      "Built rigorous mathematical and analytical foundations in algorithmic logic, discrete structures, and procedural programming.",
      "Active participant in state-level science exhibitions, computer clubs, and mathematics talent competitions."
    ]
  }
];

export const achievementsList = [
  {
    number: "20,000+",
    label: "Salesforce Trailhead Points",
    badge: "Cloud & Apex Trailblazer",
    description: "Earned extensive skill badges across Salesforce ecosystem, mastering CRM platform architecture, Apex OOP programming, process automation, and enterprise cloud data security."
  },
  {
    number: "150+",
    label: "LeetCode Problems Solved",
    badge: "Algorithmic Problem Solver",
    description: "Consistent problem solver tackling data structures and algorithms in Java, covering Arrays, Strings, HashMaps, Two Pointers, Linked Lists, and recursion."
  },
  {
    number: "Top Performer",
    label: "Infosys Internship 6.0 Spotlight",
    badge: "Enterprise Engineering Recognition",
    description: "Recognized by technical mentors for architecting the full-stack WasteZero recycling platform, delivering production-ready Node.js & Express.js REST APIs and optimized SQL database persistence."
  },
  {
    number: "Participant",
    label: "GeeksforGeeks Tech Conference",
    badge: "System Design & Algorithmic Excellence",
    description: "Engaged in national technical conference workshops exploring distributed systems design, backend performance tuning, microservices, and competitive programming."
  }
];

export const certificationsList: CertificationItem[] = [
  {
    name: "NPTEL — Programming in Java",
    issuer: "IIT Kharagpur / Ministry of Education (NPTEL)",
    badgeLabel: "Elite Certification • Core Java & OOP",
    period: "12-Week Intensive National Accreditation",
    credentialId: "NPTEL24CS-JAVA-ELITE",
    description: "Completed comprehensive 12-week national curriculum delivered by IIT Kharagpur faculty, focusing on core Java concepts, object-oriented design, multithreading concurrency, Java Collections framework, exception handling, and robust application development.",
    skills: ["Java", "OOP Principles", "Collections Framework", "Multithreading", "Exception Handling", "File I/O"],
    highlights: [
      "Earned official NPTEL accreditation through 12 weekly programming assignments and a proctored national final examination.",
      "Mastered deep OOP paradigms: Abstract classes, Interfaces, Dynamic Polymorphism, and Encapsulation.",
      "Implemented concurrent and multi-threaded architectures with synchronization locks and thread lifecycle management.",
      "Comprehensive mastery of Java Generics, Collections (ArrayList, HashMap, TreeSet, LinkedList), and memory optimization."
    ]
  },
  {
    name: "AWS Skill Builder Badge — Introduction to Generative AI",
    issuer: "Amazon Web Services (AWS)",
    badgeLabel: "Cloud & Generative AI Accreditation",
    period: "AWS Training & Certification",
    credentialId: "AWS-SKILL-BUILDER-GENAI",
    description: "Achieved official Amazon Web Services Skill Builder accreditation badge validating practical understanding of AWS Cloud infrastructure, Generative AI models, compute, storage, networking, and cloud security architecture.",
    skills: ["AWS Cloud", "Generative AI", "EC2 Compute", "Amazon S3", "IAM Security", "Cloud Architecture"],
    highlights: [
      "Demonstrated proficiency in foundational Generative AI concepts, foundation models, and AWS cloud compute services.",
      "Hands-on understanding of Amazon S3 object storage policies, lifecycle management, and relational database deployments.",
      "Gained practical mastery over Identity and Access Management (IAM), role-based least-privilege security policies, and VPC routing.",
      "Studied AWS Well-Architected Framework principles covering operational excellence, security, reliability, and cost optimization."
    ]
  },
  {
    name: "Geeks for Geeks Conference — Java",
    issuer: "GeeksforGeeks (GFG Tech Community)",
    badgeLabel: "Core Java & System Engineering",
    period: "National Technical Conference",
    credentialId: "GFG-TECH-CONF-JAVA",
    description: "Attended and actively participated in the premier GeeksforGeeks National Technical Conference focused on Core Java engineering, engaging with senior industry engineers on distributed systems design, high-frequency algorithm optimization, modern microservices architecture, and clean code paradigms.",
    skills: ["Java", "System Design", "Data Structures & Algorithms", "Microservices", "REST Architecture"],
    highlights: [
      "Participated in intensive technical sessions covering scalable Java backend design patterns, caching layers, and API gateway architectures.",
      "Engaged in live algorithm problem-solving clinics and competitive programming strategies led by senior industry tech leads.",
      "Explored best practices in modern full-stack development, code maintainability, and clean code principles.",
      "Networked with software architects, gaining practical insights into enterprise production software delivery and interview excellence."
    ]
  },
  {
    name: "Srishti 2K24 — National Level Technical Symposium, IEEE",
    issuer: "IEEE Student Branch",
    badgeLabel: "National Level IEEE Technical Symposium",
    period: "National Level Technical Event",
    credentialId: "IEEE-SRISHTI-2K24",
    description: "Participated and presented in Srishti 2K24, a prestigious National Level Technical Symposium organized under IEEE, presenting technical concepts and demonstrating problem-solving capabilities.",
    skills: ["Technical Presentation", "IEEE Engineering Standards", "Problem-Solving", "Innovation"],
    highlights: [
      "Represented institution in paper presentations and competitive technical events at a national level.",
      "Demonstrated deep understanding of modern software engineering methodologies and technical innovation.",
      "Engaged with peer researchers and industry mentors across IEEE chapters."
    ]
  }
];

export const languagesSpoken = [
  { name: "English", level: "Professional Working Proficiency" },
  { name: "Tamil", level: "Native / Bilingual Proficiency" }
];
