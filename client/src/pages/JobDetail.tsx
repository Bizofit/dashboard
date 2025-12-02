import { auth } from "../lib/auth";
import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/UI/Card";
import Button from "../components/UI/Button";
import { Badge } from "../components/UI/Table";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Building2,
  Users,
  Share2,
  Home,
  ChevronRight,
} from "lucide-react";

interface JobDetail {
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  budget_range?: string;
  employment_type?: string;
  work_mode?: string;
  years_of_exp?: number;
  hiring_org?: string;
  status: "open" | "closed" | "draft";
  is_featured?: boolean;
  is_urgent?: boolean;
  platform: string;
  postedAt: string;
  updatedAt?: string;
  requirements?: string;
  benefits?: string;
  bid_duration?: number;
  skills?: string[];
  applicants?: number;
}

export default function JobDetailPage() {
  const [_, setLocation] = useLocation();
  const [match, params] = useRoute("/jobs/:jobId");
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const jobId = params?.jobId;

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation("/login");
      return;
    }

    if (jobId) {
      fetchJobDetail();
    }
  }, [jobId, setLocation]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      const response = await auth.fetchAPI(`/api/giglancer/projects/${jobId}`);
      const data = await response.json();

      if (data.success) {
        setJob(data.data);
      }
    } catch (error) {
      console.error("Error fetching job detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysAgo = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (!job) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Job not found
          </h2>
          <Button onClick={() => setLocation("/jobs")}>Back to Jobs</Button>
        </div>
      </MainLayout>
    );
  }

  const daysAgo = getDaysAgo(job.postedAt);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Home className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
          <button
            onClick={() => setLocation("/jobs")}
            className="hover:text-orange-600 transition-colors"
          >
            Browse Jobs
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">View Job</span>
        </div>

        {/* Job Title with Apply Button */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {job.hiring_org} Hiring – {job.title} – {job.work_mode || "Remote"} 
              {job.location && ` – ${job.location}`}
            </h1>
            <div className="flex gap-2">
              <Button 
                onClick={() => setLocation(`/jobs/${jobId}/edit`)}
                className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap"
              >
                Edit Job
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 whitespace-nowrap">
                Apply on this Job
              </Button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Job Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Job Applicants */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-5 h-5" />
                      <span className="text-sm font-medium">Job Applicants</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {job.applicants || 0}
                    </span>
                  </div>
                </div>

                {/* Salary */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-start gap-2 text-gray-600">
                    <DollarSign className="w-5 h-5 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">Salary</p>
                      <p className="text-base font-semibold text-gray-900">
                        {job.salary || job.budget_range || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Employment Type */}
                {job.employment_type && (
                  <div className="pb-4 border-b border-gray-200">
                    <div className="flex items-start gap-2 text-gray-600">
                      <Building2 className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">Employment Type</p>
                        <p className="text-base font-semibold text-gray-900">
                          {job.employment_type}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Work Mode */}
                {job.work_mode && (
                  <div className="pb-4 border-b border-gray-200">
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">Work Mode</p>
                        <p className="text-base font-semibold text-gray-900">
                          {job.work_mode}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hiring Organization */}
                {job.hiring_org && (
                  <div className="pb-4 border-b border-gray-200">
                    <div className="flex items-start gap-2 text-gray-600">
                      <Building2 className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">Hiring Organization</p>
                        <p className="text-base font-semibold text-gray-900">
                          {job.hiring_org}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Job Location */}
                {job.location && (
                  <div className="pb-4 border-b border-gray-200">
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">Job Location</p>
                        <p className="text-base font-semibold text-gray-900">
                          {job.location}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills Required */}
                {job.skills && job.skills.length > 0 && (
                  <div className="pb-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Skills Required
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exclusive Highlights */}
                {(job.is_featured || job.is_urgent) && (
                  <div className="pb-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Exclusive Highlights
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.is_featured && (
                        <Badge className="bg-yellow-100 text-yellow-700 px-3 py-1">
                          Featured
                        </Badge>
                      )}
                      {job.is_urgent && (
                        <Badge className="bg-red-100 text-red-700 px-3 py-1">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Published On */}
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Published on
                  </p>
                  <p className="text-base text-gray-900">
                    {daysAgo} {daysAgo === 1 ? "day" : "days"} ago
                  </p>
                </div>

                {/* Share Button */}
                <Button
                  variant="outline"
                  icon={<Share2 className="w-4 h-4" />}
                  className="w-full"
                >
                  Share
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Job Description */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {job.description}
                  </div>

                  {job.requirements && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                        Requirements
                      </h3>
                      <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {job.requirements}
                      </div>
                    </>
                  )}

                  {job.benefits && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                        Benefits
                      </h3>
                      <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {job.benefits}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
