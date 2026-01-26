import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Upload, FileText, X, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { jobRoles } from "@/data/jobRoles";
import { cn } from "@/lib/utils";
import { useResumeParser } from "@/hooks/useResumeParser";
import { toast } from "sonner";

const UploadResume = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedRoleId = searchParams.get("role");
  const selectedRole = jobRoles.find(r => r.id === selectedRoleId);
  const { parseResume, isLoading: isParsing, error: parseError } = useResumeParser();

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && isValidFile(selectedFile)) {
      setFile(selectedFile);
    }
  }, []);

  const isValidFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    return validTypes.includes(file.type);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Show upload progress
    for (let i = 0; i <= 50; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }
    
    // Parse the resume using AI
    const parsedData = await parseResume(file);
    
    setUploadProgress(100);
    
    if (parsedData) {
      toast.success("Resume parsed successfully!");
      // Navigate to analysis page with real parsed data
      navigate("/analysis", { 
        state: { 
          file: file.name, 
          role: selectedRole,
          extractedData: parsedData 
        } 
      });
    } else {
      toast.error(parseError || "Failed to parse resume. Please try again.");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 gradient-hero-bg min-h-[calc(100vh-5rem)]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">
                  Upload Your <span className="gradient-text">Resume</span>
                </h1>
                <p className="text-muted-foreground">
                  Upload your resume in PDF or DOCX format. Our AI will analyze your skills and match you with relevant opportunities.
                </p>
                {selectedRole && (
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-sm text-muted-foreground">Matching for:</span>
                    <span className="text-sm font-medium text-primary">{selectedRole.title}</span>
                  </div>
                )}
              </div>

              {/* Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300",
                  isDragging
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-border hover:border-primary/50 hover:bg-muted/50",
                  file && "border-success bg-success/5"
                )}
              >
                {!file ? (
                  <>
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center shadow-lg">
                      <Upload className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Drag & drop your resume here
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      or click to browse from your computer
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        PDF
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        DOCX
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-success/10 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="font-medium">{file.name}</span>
                      <button
                        onClick={removeFile}
                        className="p-1 rounded-full hover:bg-muted transition-colors"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uploading...</span>
                    <span className="font-medium">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {/* Analyze Button */}
              <div className="mt-8 text-center">
                <Button
                  variant="hero"
                  size="xl"
                  disabled={!file || isUploading}
                  onClick={handleAnalyze}
                  className="min-w-[200px]"
                >
                  {isUploading ? "Processing..." : "Analyze Resume"}
                  {!isUploading && <ArrowRight className="w-5 h-5" />}
                </Button>
              </div>

              {/* Tips */}
              <div className="mt-12 bg-card rounded-xl p-6 border border-border">
                <h4 className="font-semibold mb-4">Tips for best results:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    Use a clean, well-formatted resume
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    Include relevant skills and technologies
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    Clearly mention your work experience and education
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    Avoid images or complex formatting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UploadResume;
