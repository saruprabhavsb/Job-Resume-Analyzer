import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Star, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { jobRoles, jobCategories, recommendedRoles } from "@/data/jobRoles";
import { cn } from "@/lib/utils";

const JobRoles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredRoles = useMemo(() => {
    let roles = jobRoles;
    
    if (activeCategory !== "all") {
      roles = roles.filter(role => role.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      roles = roles.filter(
        role =>
          role.title.toLowerCase().includes(query) ||
          role.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    return roles;
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 gradient-hero-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Explore <span className="gradient-text">Job Roles</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Browse through 50+ job roles across various industries. 
                Select a role to understand the required skills and upload your resume for AI matching.
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search roles or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Roles */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-secondary fill-secondary" />
              <h2 className="text-xl font-semibold">Recommended Roles</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {recommendedRoles.map((role) => (
                <Link
                  key={role.id}
                  to={`/upload?role=${role.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 shadow-sm"
                >
                  <span className="text-sm font-medium">{role.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="flex flex-wrap justify-start gap-2 bg-transparent h-auto p-0 mb-8">
                <TabsTrigger
                  value="all"
                  className={cn(
                    "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                    "rounded-full px-4 py-2 border border-border"
                  )}
                >
                  All Roles ({jobRoles.length})
                </TabsTrigger>
                {jobCategories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className={cn(
                      "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                      "rounded-full px-4 py-2 border border-border"
                    )}
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredRoles.map((role) => (
                    <Link
                      key={role.id}
                      to={`/upload?role=${role.id}`}
                      className="group bg-card rounded-xl p-5 border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {role.title}
                        </h3>
                        {role.recommended && (
                          <Star className="w-4 h-4 text-secondary fill-secondary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {role.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {role.skills.slice(0, 3).map((skill) => (
                          <span key={skill} className="skill-tag skill-tag-neutral text-xs">
                            {skill}
                          </span>
                        ))}
                        {role.skills.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{role.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>

                {filteredRoles.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No roles found matching your search.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Match Your Skills?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Upload your resume and let our AI analyze your skills against all job roles.
            </p>
            <Link to="/upload">
              <Button variant="hero" size="lg">
                Upload Resume
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JobRoles;
