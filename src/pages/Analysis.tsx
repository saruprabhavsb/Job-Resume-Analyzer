import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle, Briefcase, GraduationCap, Wrench, Tags, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

// Simulated extracted data
const extractedData = {
  skills: ["Java", "SQL", "HTML", "CSS", "JavaScript", "React", "Git", "REST APIs"],
  experience: "Fresher (0-1 years)",
  education: "B.E – Electronics & Communication Engineering",
  tools: ["VS Code", "Git", "Postman", "Jira", "Eclipse"],
  keywords: ["Full Stack", "Web Development", "Problem Solving", "Agile", "Team Collaboration"],
};

const Analysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    "Parsing document...",
    "Extracting skills...",
    "Analyzing experience...",
    "Identifying keywords...",
    "Preparing results...",
  ];

  useEffect(() => {
    if (!location.state?.file) {
      navigate("/upload");
      return;
    }

    // Simulate analysis process
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsAnalyzing(false), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [location.state, navigate]);

  const handleMatchJobs = () => {
    navigate("/job-matching", { state: { extractedData, role: location.state?.role } });
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20 min-h-[calc(100vh-5rem)] flex items-center justify-center gradient-hero-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-8 rounded-2xl gradient-bg flex items-center justify-center shadow-lg animate-pulse-glow">
                <Sparkles className="w-12 h-12 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-6">Analyzing Your Resume</h2>
              <div className="space-y-3">
                {analysisSteps.map((step, index) => (
                  <div
                    key={step}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      index < currentStep
                        ? "bg-success/10 text-success"
                        : index === currentStep
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : index === currentStep ? (
                      <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                    )}
                    <span className="text-sm font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 gradient-hero-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Extracted Data Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Skills */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Tags className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.skills.map((skill) => (
                      <span key={skill} className="skill-tag skill-tag-match">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold">Experience</h3>
                  </div>
                  <p className="text-foreground font-medium">{extractedData.experience}</p>
                </div>

                {/* Education */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Education</h3>
                  </div>
                  <p className="text-foreground font-medium">{extractedData.education}</p>
                </div>

                {/* Tools */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold">Tools</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.tools.map((tool) => (
                      <span key={tool} className="skill-tag skill-tag-neutral">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Keywords */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-card mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Keywords</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {extractedData.keywords.map((keyword) => (
                    <span key={keyword} className="skill-tag skill-tag-neutral">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button variant="hero" size="xl" onClick={handleMatchJobs}>
                  Match Jobs
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Analysis;
