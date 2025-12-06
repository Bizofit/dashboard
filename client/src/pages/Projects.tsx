import { auth } from "../lib/auth";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/UI/Card";
import Button from "../components/UI/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
} from "../components/UI/Table";
import { Plus, Target, Eye, Edit, Users as UsersIcon } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "paused" | "cancelled";
  budget: number;
  deadline: string;
  progress: number;
  teamSize: number;
  platform: string;
}

export default function ProjectsPage() {
  const [_, setLocation] = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation("/login");
      return;
    }

    // Fetch user projects from Work.Bizoforce platform
    const fetchProjects = async () => {
      try {
        // Fetch projects where user is a member
        const projectsResponse = await auth.fetchAPI("/api/work/user-projects");
        const projectsData = await projectsResponse.json();

        console.log("📋 Projects response:", projectsData);

        if (projectsData.success) {
          setProjects(projectsData.data || []);
        } else {
          console.error("Failed to fetch projects:", projectsData.message);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [setLocation]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">
              Manage your ongoing and completed projects
            </p>
          </div>
          <Button
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setLocation("/create-project")}
          >
            Create Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {projects.length}
                  </p>
                </div>
                <Target className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {projects.filter((p) => p.status === "active").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {projects.filter((p) => p.status === "completed").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600">On Hold</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {projects.filter((p) => p.status === "paused").length}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.length === 0 ? (
            <Card className="lg:col-span-2">
              <CardContent className="text-center py-12">
                <Target className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No projects yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first project to get started
                </p>
                <Button onClick={() => setLocation("/create-project")}>
                  Create Project
                </Button>
              </CardContent>
            </Card>
          ) : (
            projects.map((project) => (
              <Card key={project.id} hover>
                <CardContent>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {project.description}
                      </p>
                    </div>
                    <Badge
                      variant={
                        project.status === "active"
                          ? "success"
                          : project.status === "completed"
                          ? "info"
                          : project.status === "paused"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-gray-900">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-600">Budget</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {project.budget ? `$${project.budget.toLocaleString()}` : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Team</p>
                        <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                          <UsersIcon className="w-3 h-3" /> {project.teamSize || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Deadline</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Eye className="w-4 h-4" />}
                        className="flex-1"
                        onClick={() => setLocation(`/projects/${project.id}`)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Edit className="w-4 h-4" />}
                        onClick={() => setLocation(`/projects/${project.id}/edit`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}
