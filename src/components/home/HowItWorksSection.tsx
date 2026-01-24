import { Briefcase, Upload, Brain, Target } from "lucide-react";

const steps = [
  {
    icon: Briefcase,
    title: "Choose Job Role",
    description: "Select from 50+ job roles across IT, Design, Business, and more.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Upload,
    title: "Upload Resume",
    description: "Upload your resume in PDF or DOCX format with drag-and-drop ease.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Brain,
    title: "AI Resume Analysis",
    description: "Our AI extracts skills, experience, education, and key qualifications.",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: Target,
    title: "Job Matching Score",
    description: "Get personalized job fit scores with matching and missing skills analysis.",
    color: "from-violet-500 to-violet-600",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Four simple steps to match your resume with the perfect job opportunity
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-border via-primary/30 to-border" />
              )}

              <div className="relative bg-card rounded-2xl p-8 shadow-card card-hover border border-border/50 h-full">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-sm font-bold text-primary-foreground shadow-md">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
