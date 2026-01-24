import { useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const projects = [
  {
    title: "AI Resume Parser",
    category: "NLP & Machine Learning",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    description: "Advanced natural language processing system that extracts and categorizes information from resumes with 98% accuracy. Handles multiple formats and languages.",
    features: ["Multi-format parsing", "Skill extraction", "Experience mapping", "Education recognition"],
    tech: ["Python", "TensorFlow", "spaCy", "FastAPI", "React"],
  },
  {
    title: "Job Matching Engine",
    category: "Recommendation System",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    description: "Intelligent job matching algorithm that pairs candidates with opportunities based on skills, experience, and career goals using advanced ML models.",
    features: ["Skill matching", "Experience weighting", "Cultural fit scoring", "Career path prediction"],
    tech: ["Python", "scikit-learn", "PostgreSQL", "GraphQL", "Vue.js"],
  },
  {
    title: "Interview AI Assistant",
    category: "Conversational AI",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
    description: "AI-powered interview preparation tool that simulates real interview scenarios and provides personalized feedback on responses.",
    features: ["Dynamic questioning", "Response analysis", "Feedback generation", "Progress tracking"],
    tech: ["OpenAI GPT-4", "Node.js", "MongoDB", "WebSocket", "Next.js"],
  },
  {
    title: "Skill Assessment Platform",
    category: "Educational AI",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    description: "Comprehensive skill assessment platform that evaluates technical and soft skills through adaptive testing and practical challenges.",
    features: ["Adaptive testing", "Code evaluation", "Soft skill analysis", "Certification system"],
    tech: ["React", "TypeScript", "Docker", "AWS Lambda", "Redis"],
  },
];

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Our AI <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our cutting-edge AI solutions that are transforming the recruitment industry
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group bg-card rounded-2xl overflow-hidden shadow-card card-hover border border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-medium text-primary-foreground/80 bg-primary/80 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <Button
                  variant="outline"
                  className="group/btn"
                  onClick={() => setSelectedProject(project)}
                >
                  View Project
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
            </DialogHeader>
            
            {selectedProject && (
              <div className="space-y-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
                
                <div>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.description}
                </p>

                <div>
                  <h4 className="font-semibold mb-3">Key Features</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedProject.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span key={tech} className="skill-tag skill-tag-neutral">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
