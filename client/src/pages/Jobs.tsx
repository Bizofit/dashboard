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
import Modal from "../components/UI/Modal";
import Input, { Textarea, Select } from "../components/UI/Input";
import {
  Plus,
  Edit,
  Trash2,
  Briefcase,
  Users as UsersIcon,
  Eye,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  budget_range?: string;
  type: "full-time" | "part-time" | "contract" | "freelance";
  employment_type?: string;
  work_mode?: string;
  years_of_exp?: number;
  hiring_org?: string;
  status: "open" | "closed" | "draft";
  applications?: number;
  is_featured?: boolean;
  is_urgent?: boolean;
  platform: string;
  postedAt: string;
  updatedAt?: string;
}

export default function JobsPage() {
  const [_, setLocation] = useLocation();
  const [giglancerProjects, setGiglancerProjects] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "Remote",
    salary: "",
    employment_type: "contract",
    work_mode: "remote",
    years_of_exp: 0,
    hiring_org: "",
    status: "open",
    requirements: "",
    is_featured: false,
    is_urgent: false,
    bid_duration: 30,
  });

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation("/login");
      return;
    }

    fetchJobs();
  }, [setLocation]);

  const fetchJobs = () => {
    setLoading(true);
    // Fetch Giglancer projects
    auth
      .fetchAPI("/api/giglancer/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setGiglancerProjects(data.data || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching Giglancer projects:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePostJob = () => {
    setEditingJob(null);
    setFormData({
      title: "",
      description: "",
      location: "Remote",
      salary: "",
      employment_type: "contract",
      work_mode: "remote",
      years_of_exp: 0,
      hiring_org: "",
      status: "open",
      requirements: "",
      is_featured: false,
      is_urgent: false,
      bid_duration: 30,
    });
    setIsModalOpen(true);
  };

  const handleSubmitJob = async () => {
    if (!formData.title || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await auth.fetchAPI("/api/giglancer/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Close modal and refresh jobs list
        setIsModalOpen(false);
        fetchJobs();
        alert("Job posted successfully!");
      } else {
        alert(data.message || "Failed to post job");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred while posting the job");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? parseInt(value) || 0
          : value,
    }));
  };

  // Use only Giglancer projects
  const allJobs = giglancerProjects;

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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
            <p className="text-gray-600 mt-1">
              Manage your job openings and applications
            </p>
          </div>
          <Button icon={<Plus className="w-4 h-4" />} onClick={handlePostJob}>
            Post Job
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {allJobs.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Giglancer Projects
                  </p>
                </div>
                <Briefcase className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open Positions</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {allJobs.filter((j) => j.status === "open").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {allJobs.reduce((sum, j) => sum + (j.applications || 0), 0)}
                  </p>
                </div>
                <UsersIcon className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Applications</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">
                    {allJobs.length > 0
                      ? Math.round(
                          allJobs.reduce(
                            (sum, j) => sum + (j.applications || 0),
                            0
                          ) / allJobs.length
                        )
                      : 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card>
          <CardContent className="p-0">
            {allJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No job postings yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start hiring by posting your first job
                </p>
                <Button onClick={handlePostJob}>Post Job</Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Budget/Salary</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">
                            {job.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {job.description?.substring(0, 60)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded capitalize">
                          {(job.employment_type || job.type || "").replace("-", " ")}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {job.salary || job.budget_range || "Not specified"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={job.platform === "giglancer" ? "info" : "default"}>
                          {job.platform}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UsersIcon className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold">
                            {job.applications || 0}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            job.status === "open"
                              ? "success"
                              : job.status === "draft"
                              ? "warning"
                              : "default"
                          }
                        >
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<Eye className="w-4 h-4" />}
                            onClick={() => setLocation(`/jobs/${job.id}`)}
                          >
                            View
                          </Button>
                          {job.platform !== "giglancer" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={<Edit className="w-4 h-4" />}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={<Trash2 className="w-4 h-4 text-red-500" />}
                              />
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Post Job Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Post New Job"
        size="lg"
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSubmitJob}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Job Title"
            name="title"
            placeholder="e.g. Senior Developer"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <Textarea
            label="Job Description"
            name="description"
            placeholder="Describe the role and responsibilities"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Location" 
              name="location"
              placeholder="e.g. Remote, New York" 
              value={formData.location}
              onChange={handleInputChange}
            />
            <Input 
              label="Salary Range" 
              name="salary"
              placeholder="e.g. $80k - $120k" 
              value={formData.salary}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Employment Type"
              name="employment_type"
              value={formData.employment_type}
              onChange={handleInputChange}
              options={[
                { value: "full-time", label: "Full Time" },
                { value: "part-time", label: "Part Time" },
                { value: "contract", label: "Contract" },
                { value: "freelance", label: "Freelance" },
              ]}
              required
            />
            <Select
              label="Work Mode"
              name="work_mode"
              value={formData.work_mode}
              onChange={handleInputChange}
              options={[
                { value: "remote", label: "Remote" },
                { value: "onsite", label: "On-site" },
                { value: "hybrid", label: "Hybrid" },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Years of Experience"
              name="years_of_exp"
              type="number"
              placeholder="e.g. 5"
              value={formData.years_of_exp}
              onChange={handleInputChange}
            />
            <Input
              label="Hiring Organization"
              name="hiring_org"
              placeholder="Company name"
              value={formData.hiring_org}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              options={[
                { value: "draft", label: "Draft" },
                { value: "open", label: "Open" },
                { value: "closed", label: "Closed" },
              ]}
            />
            <Input
              label="Bid Duration (days)"
              name="bid_duration"
              type="number"
              placeholder="e.g. 30"
              value={formData.bid_duration}
              onChange={handleInputChange}
            />
          </div>
          <Textarea
            label="Requirements"
            name="requirements"
            placeholder="List key qualifications and requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            rows={3}
          />
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Featured Job</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_urgent"
                checked={formData.is_urgent}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Urgent Hiring</span>
            </label>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
}
