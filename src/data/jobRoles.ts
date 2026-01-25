export interface JobRole {
  id: string;
  title: string;
  category: string;
  description: string;
  skills: string[];
  recommended?: boolean;
  company?: string;
  location?: string;
  salaryUSD?: { min: number; max: number };
  experience?: string;
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
  { id: "software-engineer", title: "Software Engineer", category: "IT / Software", description: "Design and develop software applications", skills: ["Java", "Python", "DSA", "System Design"], recommended: true, company: "TechCorp Inc.", location: "Bangalore, India", salaryUSD: { min: 80000, max: 120000 }, experience: "0-2 years" },
  { id: "software-developer", title: "Software Developer", category: "IT / Software", description: "Build and maintain software solutions", skills: ["C++", "JavaScript", "Git", "Agile"], company: "InnovateTech", location: "Mumbai, India", salaryUSD: { min: 70000, max: 100000 }, experience: "1-3 years" },
  { id: "full-stack-developer", title: "Full Stack Developer", category: "IT / Software", description: "Work on both frontend and backend", skills: ["React", "Node.js", "MongoDB", "REST APIs"], company: "WebScale Solutions", location: "Hyderabad, India", salaryUSD: { min: 90000, max: 140000 }, experience: "2-4 years" },
  { id: "frontend-developer", title: "Frontend Developer", category: "IT / Software", description: "Create user interfaces and experiences", skills: ["HTML", "CSS", "JavaScript", "React"], company: "PixelPerfect", location: "Pune, India", salaryUSD: { min: 60000, max: 90000 }, experience: "0-2 years" },
  { id: "backend-developer", title: "Backend Developer", category: "IT / Software", description: "Build server-side applications", skills: ["Python", "Java", "PostgreSQL", "Docker"], company: "ServerLogic", location: "Chennai, India", salaryUSD: { min: 75000, max: 110000 }, experience: "2-4 years" },
  { id: "web-developer", title: "Web Developer", category: "IT / Software", description: "Develop and maintain websites", skills: ["HTML", "CSS", "JavaScript", "PHP"], recommended: true, company: "DigiWeb Agency", location: "Delhi, India", salaryUSD: { min: 50000, max: 80000 }, experience: "0-2 years" },
  { id: "mobile-developer", title: "Mobile App Developer", category: "IT / Software", description: "Build mobile applications", skills: ["React Native", "Swift", "Kotlin", "Flutter"], company: "AppNation", location: "Bangalore, India", salaryUSD: { min: 85000, max: 130000 }, experience: "1-3 years" },
  { id: "java-developer", title: "Java Developer", category: "IT / Software", description: "Specialize in Java development", skills: ["Java", "Spring Boot", "Hibernate", "Maven"], company: "Enterprise Systems", location: "Noida, India", salaryUSD: { min: 70000, max: 105000 }, experience: "1-3 years" },
  { id: "python-developer", title: "Python Developer", category: "IT / Software", description: "Develop Python applications", skills: ["Python", "Django", "Flask", "NumPy"], company: "DataDriven Co.", location: "Gurgaon, India", salaryUSD: { min: 75000, max: 115000 }, experience: "1-3 years" },
  { id: "ai-ml-engineer", title: "AI / Machine Learning Engineer", category: "IT / Software", description: "Build AI and ML solutions", skills: ["Python", "TensorFlow", "PyTorch", "ML Ops"], recommended: true, company: "AI Innovations", location: "Bangalore, India", salaryUSD: { min: 100000, max: 160000 }, experience: "2-5 years" },
  { id: "data-scientist", title: "Data Scientist", category: "IT / Software", description: "Analyze and interpret complex data", skills: ["Python", "R", "SQL", "Machine Learning"], company: "InsightAnalytics", location: "Mumbai, India", salaryUSD: { min: 95000, max: 150000 }, experience: "2-4 years" },
  { id: "data-analyst", title: "Data Analyst", category: "IT / Software", description: "Analyze business data and trends", skills: ["SQL", "Excel", "Tableau", "Python"], recommended: true, company: "MetricsPlus", location: "Hyderabad, India", salaryUSD: { min: 55000, max: 85000 }, experience: "0-2 years" },
  { id: "devops-engineer", title: "DevOps Engineer", category: "IT / Software", description: "Manage deployment and operations", skills: ["AWS", "Docker", "Kubernetes", "CI/CD"], company: "CloudOps", location: "Pune, India", salaryUSD: { min: 90000, max: 140000 }, experience: "2-5 years" },
  { id: "cloud-engineer", title: "Cloud Engineer", category: "IT / Software", description: "Design cloud infrastructure", skills: ["AWS", "Azure", "GCP", "Terraform"], company: "SkyScale", location: "Bangalore, India", salaryUSD: { min: 95000, max: 145000 }, experience: "3-5 years" },
  { id: "cybersecurity-analyst", title: "Cybersecurity Analyst", category: "IT / Software", description: "Protect systems and networks", skills: ["Network Security", "SIEM", "Penetration Testing", "Compliance"], company: "SecureNet", location: "Delhi, India", salaryUSD: { min: 80000, max: 120000 }, experience: "2-4 years" },
  { id: "qa-engineer", title: "QA / Test Engineer", category: "IT / Software", description: "Ensure software quality", skills: ["Selenium", "Jest", "Test Planning", "Automation"], company: "QualityFirst", location: "Chennai, India", salaryUSD: { min: 50000, max: 75000 }, experience: "0-2 years" },
  { id: "automation-engineer", title: "Automation Engineer", category: "IT / Software", description: "Automate testing and processes", skills: ["Python", "Selenium", "Jenkins", "Robot Framework"], company: "AutomatePro", location: "Noida, India", salaryUSD: { min: 65000, max: 95000 }, experience: "1-3 years" },
  { id: "game-developer", title: "Game Developer", category: "IT / Software", description: "Create video games", skills: ["Unity", "C#", "Unreal Engine", "3D Graphics"], company: "GameForge Studios", location: "Mumbai, India", salaryUSD: { min: 70000, max: 110000 }, experience: "1-4 years" },
  
  // Design & Creative
  { id: "ui-designer", title: "UI Designer", category: "Design & Creative", description: "Design user interfaces", skills: ["Figma", "Sketch", "Adobe XD", "Visual Design"], company: "DesignHub", location: "Bangalore, India", salaryUSD: { min: 55000, max: 85000 }, experience: "1-3 years" },
  { id: "ux-designer", title: "UX Designer", category: "Design & Creative", description: "Design user experiences", skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing"], company: "UserFirst", location: "Mumbai, India", salaryUSD: { min: 60000, max: 95000 }, experience: "2-4 years" },
  { id: "ui-ux-designer", title: "UI/UX Designer", category: "Design & Creative", description: "Combined UI and UX design", skills: ["Figma", "User Research", "Prototyping", "Design Systems"], recommended: true, company: "CreativeMinds", location: "Hyderabad, India", salaryUSD: { min: 65000, max: 100000 }, experience: "1-3 years" },
  { id: "graphic-designer", title: "Graphic Designer", category: "Design & Creative", description: "Create visual content", skills: ["Adobe Photoshop", "Illustrator", "InDesign", "Branding"], company: "VisualArts Co.", location: "Delhi, India", salaryUSD: { min: 40000, max: 65000 }, experience: "0-2 years" },
  { id: "product-designer", title: "Product Designer", category: "Design & Creative", description: "Design digital products", skills: ["Product Thinking", "Figma", "User Research", "Design Strategy"], company: "ProductLab", location: "Pune, India", salaryUSD: { min: 80000, max: 120000 }, experience: "3-5 years" },
  { id: "motion-designer", title: "Motion Designer", category: "Design & Creative", description: "Create animated content", skills: ["After Effects", "Cinema 4D", "Animation", "Motion Graphics"], company: "MotionWorks", location: "Chennai, India", salaryUSD: { min: 50000, max: 80000 }, experience: "1-3 years" },
  { id: "visual-designer", title: "Visual Designer", category: "Design & Creative", description: "Create visual brand elements", skills: ["Adobe Creative Suite", "Typography", "Color Theory", "Brand Design"], company: "BrandCraft", location: "Gurgaon, India", salaryUSD: { min: 45000, max: 70000 }, experience: "1-2 years" },
  { id: "web-designer", title: "Web Designer", category: "Design & Creative", description: "Design website layouts", skills: ["Figma", "HTML", "CSS", "Responsive Design"], company: "WebAesthetics", location: "Noida, India", salaryUSD: { min: 45000, max: 75000 }, experience: "0-2 years" },
  
  // Business & Management
  { id: "business-analyst", title: "Business Analyst", category: "Business & Management", description: "Analyze business processes", skills: ["Requirements Analysis", "SQL", "Jira", "Documentation"], recommended: true, company: "ConsultPro", location: "Mumbai, India", salaryUSD: { min: 60000, max: 90000 }, experience: "1-3 years" },
  { id: "product-manager", title: "Product Manager", category: "Business & Management", description: "Manage product development", skills: ["Product Strategy", "Roadmapping", "Analytics", "Stakeholder Management"], company: "TechVentures", location: "Bangalore, India", salaryUSD: { min: 100000, max: 150000 }, experience: "4-6 years" },
  { id: "project-manager", title: "Project Manager", category: "Business & Management", description: "Manage projects and teams", skills: ["Agile", "Scrum", "MS Project", "Risk Management"], company: "DeliverIT", location: "Hyderabad, India", salaryUSD: { min: 80000, max: 120000 }, experience: "3-5 years" },
  { id: "program-manager", title: "Program Manager", category: "Business & Management", description: "Oversee multiple projects", skills: ["Program Management", "Strategic Planning", "Leadership", "Budgeting"], company: "GlobalTech", location: "Delhi, India", salaryUSD: { min: 110000, max: 160000 }, experience: "5-8 years" },
  { id: "operations-manager", title: "Operations Manager", category: "Business & Management", description: "Manage daily operations", skills: ["Operations", "Process Improvement", "Leadership", "Analytics"], company: "OpsExcellence", location: "Pune, India", salaryUSD: { min: 70000, max: 100000 }, experience: "3-5 years" },
  { id: "strategy-analyst", title: "Strategy Analyst", category: "Business & Management", description: "Develop business strategies", skills: ["Market Analysis", "Financial Modeling", "PowerPoint", "Research"], company: "StrategyWorks", location: "Gurgaon, India", salaryUSD: { min: 65000, max: 95000 }, experience: "2-4 years" },
  
  // HR & Admin
  { id: "hr-executive", title: "HR Executive", category: "HR & Admin", description: "Handle HR operations", skills: ["Recruitment", "Employee Relations", "HRIS", "Compliance"], recommended: true, company: "PeopleFirst", location: "Bangalore, India", salaryUSD: { min: 35000, max: 55000 }, experience: "0-2 years" },
  { id: "hr-manager", title: "HR Manager", category: "HR & Admin", description: "Lead HR department", skills: ["HR Strategy", "Performance Management", "Training", "Labor Laws"], company: "TalentHub", location: "Mumbai, India", salaryUSD: { min: 60000, max: 90000 }, experience: "4-6 years" },
  { id: "talent-acquisition", title: "Talent Acquisition Specialist", category: "HR & Admin", description: "Recruit top talent", skills: ["Sourcing", "Interviewing", "ATS", "Employer Branding"], company: "HireRight", location: "Delhi, India", salaryUSD: { min: 45000, max: 70000 }, experience: "1-3 years" },
  { id: "recruiter", title: "Recruiter", category: "HR & Admin", description: "Find and hire candidates", skills: ["LinkedIn Recruiting", "Screening", "Negotiation", "Networking"], company: "RecruitPro", location: "Hyderabad, India", salaryUSD: { min: 40000, max: 60000 }, experience: "1-2 years" },
  
  // Marketing & Sales
  { id: "digital-marketing", title: "Digital Marketing Executive", category: "Marketing & Sales", description: "Execute digital campaigns", skills: ["Google Ads", "Facebook Ads", "Analytics", "Content Marketing"], recommended: true, company: "DigitalEdge", location: "Mumbai, India", salaryUSD: { min: 40000, max: 65000 }, experience: "0-2 years" },
  { id: "seo-specialist", title: "SEO Specialist", category: "Marketing & Sales", description: "Optimize for search engines", skills: ["SEO", "Google Analytics", "Keyword Research", "Technical SEO"], company: "SearchBoost", location: "Bangalore, India", salaryUSD: { min: 45000, max: 70000 }, experience: "1-3 years" },
  { id: "content-writer", title: "Content Writer", category: "Marketing & Sales", description: "Create written content", skills: ["Copywriting", "SEO Writing", "Research", "Editing"], company: "ContentCraft", location: "Delhi, India", salaryUSD: { min: 30000, max: 50000 }, experience: "0-2 years" },
  { id: "social-media-manager", title: "Social Media Manager", category: "Marketing & Sales", description: "Manage social presence", skills: ["Social Media", "Content Creation", "Analytics", "Community Management"], company: "SocialBuzz", location: "Pune, India", salaryUSD: { min: 40000, max: 60000 }, experience: "1-3 years" },
  { id: "sales-executive", title: "Sales Executive", category: "Marketing & Sales", description: "Drive sales growth", skills: ["Sales", "CRM", "Negotiation", "Lead Generation"], company: "SalesForce India", location: "Chennai, India", salaryUSD: { min: 35000, max: 55000 }, experience: "0-2 years" },
  
  // Finance
  { id: "accountant", title: "Accountant", category: "Finance", description: "Manage financial records", skills: ["Accounting", "Tally", "Excel", "Financial Reporting"], company: "FinanceFirst", location: "Mumbai, India", salaryUSD: { min: 35000, max: 55000 }, experience: "0-2 years" },
  { id: "financial-analyst", title: "Financial Analyst", category: "Finance", description: "Analyze financial data", skills: ["Financial Modeling", "Excel", "Valuation", "Forecasting"], company: "InvestPro", location: "Gurgaon, India", salaryUSD: { min: 60000, max: 95000 }, experience: "2-4 years" },
  { id: "auditor", title: "Auditor", category: "Finance", description: "Audit financial statements", skills: ["Auditing", "Compliance", "Risk Assessment", "GAAP"], company: "AuditPartners", location: "Delhi, India", salaryUSD: { min: 50000, max: 80000 }, experience: "2-4 years" },
  
  // Core Engineering
  { id: "electrical-engineer", title: "Electrical Engineer", category: "Core Engineering", description: "Design electrical systems", skills: ["Circuit Design", "AutoCAD", "PLC", "Power Systems"], recommended: true, company: "PowerGrid India", location: "Chennai, India", salaryUSD: { min: 45000, max: 70000 }, experience: "0-3 years" },
  { id: "electronics-engineer", title: "Electronics Engineer", category: "Core Engineering", description: "Develop electronic devices", skills: ["PCB Design", "Embedded C", "VHDL", "Testing"], company: "ElectroTech", location: "Bangalore, India", salaryUSD: { min: 50000, max: 75000 }, experience: "1-3 years" },
  { id: "mechanical-engineer", title: "Mechanical Engineer", category: "Core Engineering", description: "Design mechanical systems", skills: ["SolidWorks", "AutoCAD", "FEA", "Manufacturing"], recommended: true, company: "MechWorks", location: "Pune, India", salaryUSD: { min: 45000, max: 70000 }, experience: "0-3 years" },
  { id: "civil-engineer", title: "Civil Engineer", category: "Core Engineering", description: "Design infrastructure", skills: ["AutoCAD", "Structural Design", "Project Management", "Surveying"], company: "BuildCorp", location: "Hyderabad, India", salaryUSD: { min: 40000, max: 65000 }, experience: "0-3 years" },
  { id: "embedded-engineer", title: "Embedded Systems Engineer", category: "Core Engineering", description: "Develop embedded systems", skills: ["Embedded C", "RTOS", "Microcontrollers", "Hardware Design"], company: "EmbedTech", location: "Noida, India", salaryUSD: { min: 55000, max: 85000 }, experience: "1-4 years" },
  { id: "iot-engineer", title: "IoT Engineer", category: "Core Engineering", description: "Build IoT solutions", skills: ["IoT Protocols", "Sensors", "Cloud IoT", "Embedded Systems"], company: "SmartConnect", location: "Bangalore, India", salaryUSD: { min: 60000, max: 90000 }, experience: "1-3 years" },
];

export const recommendedRoles = jobRoles.filter(role => role.recommended);
