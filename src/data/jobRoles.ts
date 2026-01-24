export interface JobRole {
  id: string;
  title: string;
  category: string;
  description: string;
  skills: string[];
  recommended?: boolean;
}

export const jobCategories = [
  "IT / Software",
  "Design & Creative",
  "Business & Management",
  "HR & Admin",
  "Marketing & Sales",
  "Finance",
  "Core Engineering",
];

export const jobRoles: JobRole[] = [
  // IT / Software
  { id: "software-engineer", title: "Software Engineer", category: "IT / Software", description: "Design and develop software applications", skills: ["Java", "Python", "DSA", "System Design"], recommended: true },
  { id: "software-developer", title: "Software Developer", category: "IT / Software", description: "Build and maintain software solutions", skills: ["C++", "JavaScript", "Git", "Agile"] },
  { id: "full-stack-developer", title: "Full Stack Developer", category: "IT / Software", description: "Work on both frontend and backend", skills: ["React", "Node.js", "MongoDB", "REST APIs"] },
  { id: "frontend-developer", title: "Frontend Developer", category: "IT / Software", description: "Create user interfaces and experiences", skills: ["HTML", "CSS", "JavaScript", "React"] },
  { id: "backend-developer", title: "Backend Developer", category: "IT / Software", description: "Build server-side applications", skills: ["Python", "Java", "PostgreSQL", "Docker"] },
  { id: "web-developer", title: "Web Developer", category: "IT / Software", description: "Develop and maintain websites", skills: ["HTML", "CSS", "JavaScript", "PHP"], recommended: true },
  { id: "mobile-developer", title: "Mobile App Developer", category: "IT / Software", description: "Build mobile applications", skills: ["React Native", "Swift", "Kotlin", "Flutter"] },
  { id: "java-developer", title: "Java Developer", category: "IT / Software", description: "Specialize in Java development", skills: ["Java", "Spring Boot", "Hibernate", "Maven"] },
  { id: "python-developer", title: "Python Developer", category: "IT / Software", description: "Develop Python applications", skills: ["Python", "Django", "Flask", "NumPy"] },
  { id: "ai-ml-engineer", title: "AI / Machine Learning Engineer", category: "IT / Software", description: "Build AI and ML solutions", skills: ["Python", "TensorFlow", "PyTorch", "ML Ops"], recommended: true },
  { id: "data-scientist", title: "Data Scientist", category: "IT / Software", description: "Analyze and interpret complex data", skills: ["Python", "R", "SQL", "Machine Learning"] },
  { id: "data-analyst", title: "Data Analyst", category: "IT / Software", description: "Analyze business data and trends", skills: ["SQL", "Excel", "Tableau", "Python"], recommended: true },
  { id: "devops-engineer", title: "DevOps Engineer", category: "IT / Software", description: "Manage deployment and operations", skills: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
  { id: "cloud-engineer", title: "Cloud Engineer", category: "IT / Software", description: "Design cloud infrastructure", skills: ["AWS", "Azure", "GCP", "Terraform"] },
  { id: "cybersecurity-analyst", title: "Cybersecurity Analyst", category: "IT / Software", description: "Protect systems and networks", skills: ["Network Security", "SIEM", "Penetration Testing", "Compliance"] },
  { id: "qa-engineer", title: "QA / Test Engineer", category: "IT / Software", description: "Ensure software quality", skills: ["Selenium", "Jest", "Test Planning", "Automation"] },
  { id: "automation-engineer", title: "Automation Engineer", category: "IT / Software", description: "Automate testing and processes", skills: ["Python", "Selenium", "Jenkins", "Robot Framework"] },
  { id: "game-developer", title: "Game Developer", category: "IT / Software", description: "Create video games", skills: ["Unity", "C#", "Unreal Engine", "3D Graphics"] },
  
  // Design & Creative
  { id: "ui-designer", title: "UI Designer", category: "Design & Creative", description: "Design user interfaces", skills: ["Figma", "Sketch", "Adobe XD", "Visual Design"] },
  { id: "ux-designer", title: "UX Designer", category: "Design & Creative", description: "Design user experiences", skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing"] },
  { id: "ui-ux-designer", title: "UI/UX Designer", category: "Design & Creative", description: "Combined UI and UX design", skills: ["Figma", "User Research", "Prototyping", "Design Systems"], recommended: true },
  { id: "graphic-designer", title: "Graphic Designer", category: "Design & Creative", description: "Create visual content", skills: ["Adobe Photoshop", "Illustrator", "InDesign", "Branding"] },
  { id: "product-designer", title: "Product Designer", category: "Design & Creative", description: "Design digital products", skills: ["Product Thinking", "Figma", "User Research", "Design Strategy"] },
  { id: "motion-designer", title: "Motion Designer", category: "Design & Creative", description: "Create animated content", skills: ["After Effects", "Cinema 4D", "Animation", "Motion Graphics"] },
  { id: "visual-designer", title: "Visual Designer", category: "Design & Creative", description: "Create visual brand elements", skills: ["Adobe Creative Suite", "Typography", "Color Theory", "Brand Design"] },
  { id: "web-designer", title: "Web Designer", category: "Design & Creative", description: "Design website layouts", skills: ["Figma", "HTML", "CSS", "Responsive Design"] },
  
  // Business & Management
  { id: "business-analyst", title: "Business Analyst", category: "Business & Management", description: "Analyze business processes", skills: ["Requirements Analysis", "SQL", "Jira", "Documentation"], recommended: true },
  { id: "product-manager", title: "Product Manager", category: "Business & Management", description: "Manage product development", skills: ["Product Strategy", "Roadmapping", "Analytics", "Stakeholder Management"] },
  { id: "project-manager", title: "Project Manager", category: "Business & Management", description: "Manage projects and teams", skills: ["Agile", "Scrum", "MS Project", "Risk Management"] },
  { id: "program-manager", title: "Program Manager", category: "Business & Management", description: "Oversee multiple projects", skills: ["Program Management", "Strategic Planning", "Leadership", "Budgeting"] },
  { id: "operations-manager", title: "Operations Manager", category: "Business & Management", description: "Manage daily operations", skills: ["Operations", "Process Improvement", "Leadership", "Analytics"] },
  { id: "strategy-analyst", title: "Strategy Analyst", category: "Business & Management", description: "Develop business strategies", skills: ["Market Analysis", "Financial Modeling", "PowerPoint", "Research"] },
  
  // HR & Admin
  { id: "hr-executive", title: "HR Executive", category: "HR & Admin", description: "Handle HR operations", skills: ["Recruitment", "Employee Relations", "HRIS", "Compliance"], recommended: true },
  { id: "hr-manager", title: "HR Manager", category: "HR & Admin", description: "Lead HR department", skills: ["HR Strategy", "Performance Management", "Training", "Labor Laws"] },
  { id: "talent-acquisition", title: "Talent Acquisition Specialist", category: "HR & Admin", description: "Recruit top talent", skills: ["Sourcing", "Interviewing", "ATS", "Employer Branding"] },
  { id: "recruiter", title: "Recruiter", category: "HR & Admin", description: "Find and hire candidates", skills: ["LinkedIn Recruiting", "Screening", "Negotiation", "Networking"] },
  
  // Marketing & Sales
  { id: "digital-marketing", title: "Digital Marketing Executive", category: "Marketing & Sales", description: "Execute digital campaigns", skills: ["Google Ads", "Facebook Ads", "Analytics", "Content Marketing"], recommended: true },
  { id: "seo-specialist", title: "SEO Specialist", category: "Marketing & Sales", description: "Optimize for search engines", skills: ["SEO", "Google Analytics", "Keyword Research", "Technical SEO"] },
  { id: "content-writer", title: "Content Writer", category: "Marketing & Sales", description: "Create written content", skills: ["Copywriting", "SEO Writing", "Research", "Editing"] },
  { id: "social-media-manager", title: "Social Media Manager", category: "Marketing & Sales", description: "Manage social presence", skills: ["Social Media", "Content Creation", "Analytics", "Community Management"] },
  { id: "sales-executive", title: "Sales Executive", category: "Marketing & Sales", description: "Drive sales growth", skills: ["Sales", "CRM", "Negotiation", "Lead Generation"] },
  
  // Finance
  { id: "accountant", title: "Accountant", category: "Finance", description: "Manage financial records", skills: ["Accounting", "Tally", "Excel", "Financial Reporting"] },
  { id: "financial-analyst", title: "Financial Analyst", category: "Finance", description: "Analyze financial data", skills: ["Financial Modeling", "Excel", "Valuation", "Forecasting"] },
  { id: "auditor", title: "Auditor", category: "Finance", description: "Audit financial statements", skills: ["Auditing", "Compliance", "Risk Assessment", "GAAP"] },
  
  // Core Engineering
  { id: "electrical-engineer", title: "Electrical Engineer", category: "Core Engineering", description: "Design electrical systems", skills: ["Circuit Design", "AutoCAD", "PLC", "Power Systems"], recommended: true },
  { id: "electronics-engineer", title: "Electronics Engineer", category: "Core Engineering", description: "Develop electronic devices", skills: ["PCB Design", "Embedded C", "VHDL", "Testing"] },
  { id: "mechanical-engineer", title: "Mechanical Engineer", category: "Core Engineering", description: "Design mechanical systems", skills: ["SolidWorks", "AutoCAD", "FEA", "Manufacturing"], recommended: true },
  { id: "civil-engineer", title: "Civil Engineer", category: "Core Engineering", description: "Design infrastructure", skills: ["AutoCAD", "Structural Design", "Project Management", "Surveying"] },
  { id: "embedded-engineer", title: "Embedded Systems Engineer", category: "Core Engineering", description: "Develop embedded systems", skills: ["Embedded C", "RTOS", "Microcontrollers", "Hardware Design"] },
  { id: "iot-engineer", title: "IoT Engineer", category: "Core Engineering", description: "Build IoT solutions", skills: ["IoT Protocols", "Sensors", "Cloud IoT", "Embedded Systems"] },
];

export const recommendedRoles = jobRoles.filter(role => role.recommended);
