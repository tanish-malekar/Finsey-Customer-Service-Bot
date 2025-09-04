import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  Zap, 
  Shield, 
  Clock,
  BarChart3,
  Users,
  Bot,
  Play,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  url: string;
  status: 'pending' | 'crawling' | 'indexing' | 'completed' | 'failed';
  pages_crawled: number;
  vectors_created: number;
  created_at: string;
  error_message?: string;
}

const Landing = () => {
  const [url, setUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load existing projects on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/projects/");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim() || !projectName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide both a project name and website URL.",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL (e.g., https://example.com)",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    try {
      const response = await fetch("http://localhost:8000/api/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName.trim(),
          url: url.trim(),
        }),
      });

      if (response.ok) {
        const project = await response.json();
        toast({
          title: "Project Created!",
          description: `Started crawling ${project.url}. This may take a few minutes.`,
        });
        
        setUrl("");
        setProjectName("");
        loadProjects(); // Refresh the projects list
        
        // Start polling for status updates
        pollProjectStatus(project.id);
      } else {
        const error = await response.json();
        toast({
          title: "Creation Failed",
          description: error.error || "Failed to create project. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to the server. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const pollProjectStatus = async (projectId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/projects/${projectId}/`);
        if (response.ok) {
          const project = await response.json();
          
          if (project.status === 'completed') {
            toast({
              title: "Crawling Complete!",
              description: `Successfully indexed ${project.pages_crawled} pages with ${project.vectors_created} vectors.`,
            });
            clearInterval(interval);
            loadProjects(); // Refresh the list
          } else if (project.status === 'failed') {
            toast({
              title: "Crawling Failed",
              description: project.error_message || "An error occurred during crawling.",
              variant: "destructive",
            });
            clearInterval(interval);
            loadProjects(); // Refresh the list
          }
        }
      } catch (error) {
        console.error("Failed to poll project status:", error);
      }
    }, 5000); // Poll every 5 seconds
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'crawling':
      case 'indexing':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'crawling':
        return 'Crawling Website';
      case 'indexing':
        return 'Indexing Content';
      case 'completed':
        return 'Ready for Chat';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'crawling':
      case 'indexing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const goToChat = (project: Project) => {
    if (project.status === 'completed') {
      navigate(`/chat/${project.id}`, { 
        state: { 
          projectName: project.name,
          projectUrl: project.url 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30" />
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent ml-4">
                RAGify
              </h1>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Any Website Into an
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Intelligent AI Assistant</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Instantly create conversational AI chatbots from your website content. 
              No coding required. Just paste a URL and start chatting.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Instant Setup
              </Badge>
              <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Secure & Private
              </Badge>
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-2">
                <Bot className="h-4 w-4 mr-2" />
                AI-Powered
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Create Project Form */}
        <Card className="max-w-2xl mx-auto mb-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Create AI Chatbot</CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Enter your website URL and we'll create an AI assistant trained on your content
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={createProject} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="projectName" className="text-sm font-semibold text-gray-700">
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  placeholder="e.g., Company Website, Documentation Site"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  disabled={isCreating}
                  required
                  className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="url" className="text-sm font-semibold text-gray-700">
                  Website URL
                </Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isCreating}
                  required
                  className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200" 
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Project...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Start Crawling Website
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Projects List */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Projects</h2>
              <p className="text-gray-600">Manage and chat with your AI assistants</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{projects.length} projects</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>{projects.filter(p => p.status === 'completed').length} active</span>
              </div>
            </div>
          </div>
          
          {isLoadingProjects ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading your projects...</p>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <Card className="border-2 border-dashed border-gray-200 bg-gray-50/50">
              <CardContent className="text-center py-16">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-6">Create your first AI assistant by adding a website above</p>
                <Button 
                  onClick={() => document.getElementById('projectName')?.focus()}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Create Your First Project
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="group hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-blue-200 bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {project.name}
                            </h3>
                            <Badge 
                              variant="outline" 
                              className={`${getStatusColor(project.status)} border`}
                            >
                              {getStatusIcon(project.status)}
                              <span className="ml-1">{getStatusText(project.status)}</span>
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                          <Globe className="h-4 w-4" />
                          <span className="font-mono text-sm">{project.url}</span>
                          <ExternalLink className="h-3 w-3" />
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4" />
                            <span>{project.pages_crawled} pages crawled</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Sparkles className="h-4 w-4" />
                            <span>{project.vectors_created} vectors created</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        {project.error_message && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{project.error_message}</p>
                          </div>
                        )}
                      </div>
                      
                      {project.status === 'completed' && (
                        <Button 
                          onClick={() => goToChat(project)}
                          className="ml-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <Bot className="mr-2 h-4 w-4" />
                          Chat with AI
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
