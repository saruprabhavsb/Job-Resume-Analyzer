import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Briefcase, DollarSign, Building2, Lightbulb, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/shared/CircularProgress";

const JobDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const role = location.state?.role;

  if (!role) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20 min-h-[calc(100vh-5rem)] flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Job details not found.</p>
            <Button onClick={() => navigate("/job-matching")}>Back to Matching</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const improvements = [
    `Learn ${role.missingSkills[0] || "new technologies"} through online courses or bootcamps`,
    "Build portfolio projects showcasing your skills",
    "Contribute to open-source projects in your field",
    "Get certified in relevant technologies",
    "Network with professionals in the industry",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="py-12 gradient-hero-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Button
                variant="ghost"
                className="mb-6"
                onClick={() => navigate("/job-matching")}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Results
              </Button>

              {/* Header Card */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-card mb-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  {/* Job Info */}
                  <div className="flex-1">
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {role.category}
                    </span>
                    <h1 className="text-3xl font-bold mt-4 mb-2">{role.title}</h1>
                    <p className="text-muted-foreground mb-6">{role.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Company</p>
                          <p className="font-medium">TechCorp Inc.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="font-medium">San Francisco, CA</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Salary</p>
                          <p className="font-medium">₹66L - ₹1Cr</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Experience</p>
                          <p className="font-medium">0-2 years</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-center lg:items-end">
                    <CircularProgress value={role.score} size="xl" label="Job Fit" />
                  </div>
                </div>
              </div>

              {/* Skills Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Matching Skills */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <h3 className="font-semibold text-lg mb-4 text-success">✓ Matching Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {role.matchingSkills.map((skill: string) => (
                      <span key={skill} className="skill-tag skill-tag-match">
                        {skill}
                      </span>
                    ))}
                    {role.matchingSkills.length === 0 && (
                      <p className="text-muted-foreground text-sm">No matching skills found</p>
                    )}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <h3 className="font-semibold text-lg mb-4 text-destructive">✗ Missing Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {role.missingSkills.map((skill: string) => (
                      <span key={skill} className="skill-tag skill-tag-missing">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Improvement Suggestions */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-card mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg">Improvement Suggestions</h3>
                </div>
                <ul className="space-y-3">
                  {improvements.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-muted-foreground">{suggestion}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => navigate("/contact", { state: { role } })}
                >
                  Apply / Contact Agency
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

export default JobDetails;
