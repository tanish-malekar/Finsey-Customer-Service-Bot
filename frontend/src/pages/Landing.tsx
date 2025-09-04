import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Globe, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
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
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'crawling':
      case 'indexing':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <Loader2 className="h-5 w-5 text-gray-500" />;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Globe className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">RAGify</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform any website into an intelligent chatbot.
          </p>
        </div>

        {/* Create Project Form */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
            <CardDescription>
              Enter a website URL and project name to start crawling and indexing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createProject} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  placeholder="e.g., Company Website, Documentation Site"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  disabled={isCreating}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isCreating}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Project...
                  </>
                ) : (
                  <>
                    <Globe className="mr-2 h-4 w-4" />
                    Start Crawling Website
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Projects List */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Projects</h2>
          
          {isLoadingProjects ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : projects.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No projects yet. Create your first project above!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(project.status)}
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              project.status === 'completed' ? 'bg-green-100 text-green-800' :
                              project.status === 'failed' ? 'bg-red-100 text-red-800' :
                              project.status === 'crawling' || project.status === 'indexing' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {getStatusText(project.status)}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{project.url}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span>Pages: {project.pages_crawled}</span>
                          <span>Vectors: {project.vectors_created}</span>
                          <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                        </div>
                        
                        {project.error_message && (
                          <p className="text-red-600 text-sm mt-2">{project.error_message}</p>
                        )}
                      </div>
                      
                      {project.status === 'completed' && (
                        <Button 
                          onClick={() => goToChat(project)}
                          className="ml-4"
                        >
                          Chat with Website
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
