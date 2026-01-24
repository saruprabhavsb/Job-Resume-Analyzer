import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircularProgress } from "@/components/shared/CircularProgress";
import { jobRoles } from "@/data/jobRoles";

// Simulated matching results
const generateMatchResults = () => {
  return jobRoles.slice(0, 12).map((role) => {
    const score = Math.floor(Math.random() * 60) + 30;
    const matchingSkills = role.skills.slice(0, Math.ceil(role.skills.length * (score / 100)));
    const missingSkills = role.skills.filter((s) => !matchingSkills.includes(s));
    return {
      ...role,
      score,
      matchingSkills,
      missingSkills,
    };
  }).sort((a, b) => b.score - a.score);
};

const JobMatching = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [matchResults] = useState(generateMatchResults);

  const filteredResults = matchResults.filter(
    (role) =>
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (role: typeof matchResults[0]) => {
    navigate(`/job-details/${role.id}`, { state: { role } });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 gradient-hero-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">
                Job <span className="gradient-text">Matching Results</span>
              </h1>
              <p className="text-muted-foreground mb-8">
                Based on your resume analysis, here are the best matching opportunities for you.
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search matched jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((role) => (
                <div
                  key={role.id}
                  className="bg-card rounded-2xl p-6 border border-border shadow-card card-hover"
                >
                  {/* Header with Score */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{role.title}</h3>
                      <span className="text-sm text-muted-foreground">{role.category}</span>
                    </div>
                    <CircularProgress value={role.score} size="sm" />
                  </div>

                  {/* Matching Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-success mb-2">Matching Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {role.matchingSkills.map((skill) => (
                        <span key={skill} className="skill-tag skill-tag-match text-xs">
                          {skill}
                        </span>
                      ))}
                      {role.matchingSkills.length === 0 && (
                        <span className="text-xs text-muted-foreground">No matching skills</span>
                      )}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-destructive mb-2">Missing Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {role.missingSkills.map((skill) => (
                        <span key={skill} className="skill-tag skill-tag-missing text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleViewDetails(role)}
                  >
                    View Job Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {filteredResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No matching jobs found.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JobMatching;
