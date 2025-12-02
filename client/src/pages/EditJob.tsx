import { auth } from "../lib/auth";
import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import {
  Card,
  CardContent,
} from "../components/UI/Card";
import Button from "../components/UI/Button";
import Input, { Textarea } from "../components/UI/Input";
import { ArrowLeft, Upload, X } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  slug: string;
  projectCount: number;
  userCount: number;
}

interface ProjectRange {
  id: number;
  name: string;
  minAmount: number;
  maxAmount: number;
  projectCount: number;
  activeProjectCount: number;
}

interface EditJobFormData {
  job_description: string;
  employment_type: string;
  work_mode: string;
  years_of_exp: string;
  experience_range: string;
  required_skills: string;
  project_range_id: string;
  hiring_org: string;
  job_location: string;
  additional_documents: File | null;
  job_seo_title: string;
  job_seo_description: string;
  status: string;
}

export default function EditJobPage() {
  const [_, setLocation] = useLocation();
  const [match, params] = useRoute("/jobs/:jobId/edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState("");
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [projectRanges, setProjectRanges] = useState<ProjectRange[]>([]);
  const [loadingRanges, setLoadingRanges] = useState(false);
  const [formData, setFormData] = useState<EditJobFormData>({
    job_description: "",
    employment_type: "",
    work_mode: "",
    years_of_exp: "",
    experience_range: "",
    required_skills: "",
    project_range_id: "",
    hiring_org: "",
    job_location: "",
    additional_documents: null,
    job_seo_title: "",
    job_seo_description: "",
    status: "draft",
  });

  const [premiumOptions, setPremiumOptions] = useState({
    highlight: false,
    database: false,
    premium: false,
    featured: false,
  });

  const jobId = params?.jobId;

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation("/login");
      return;
    }

    // Fetch all skills once
    const fetchAllSkills = async () => {
      setLoadingSkills(true);
      try {
        const response = await auth.fetchAPI("/api/giglancer/skills?limit=1000");
        const data = await response.json();
        if (data.success) {
          setAllSkills(data.data);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoadingSkills(false);
      }
    };

    // Fetch project ranges
    const fetchProjectRanges = async () => {
      setLoadingRanges(true);
      try {
        const response = await auth.fetchAPI("/api/giglancer/project-ranges");
        const data = await response.json();
        if (data.success) {
          setProjectRanges(data.data);
        }
      } catch (error) {
        console.error("Error fetching project ranges:", error);
      } finally {
        setLoadingRanges(false);
      }
    };

    // Fetch job details
    const fetchJobDetails = async () => {
      if (!jobId) return;

      setLoading(true);
      try {
        const response = await auth.fetchAPI(`/api/giglancer/projects/${jobId}`);
        const data = await response.json();

        if (data.success) {
          const job = data.data;
          setJobTitle(job.title);
          
          setFormData({
            job_description: job.description || "",
            employment_type: job.employment_type || "",
            work_mode: job.work_mode || "",
            years_of_exp: job.years_of_exp?.toString() || "",
            experience_range: "",
            required_skills: "",
            project_range_id: job.project_range_id?.toString() || "",
            hiring_org: job.hiring_org || "",
            job_location: job.location || "",
            additional_documents: null,
            job_seo_title: "",
            job_seo_description: "",
            status: job.status || "draft",
          });

          setPremiumOptions({
            highlight: job.is_urgent || false,
            database: false,
            premium: false,
            featured: job.is_featured || false,
          });

          // Load skills if available - use skills_data from API
          if (job.skills_data && job.skills_data.length > 0) {
            setSelectedSkills(job.skills_data);
          }
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSkills();
    fetchProjectRanges();
    fetchJobDetails();
  }, [jobId, setLocation]);

  // Search skills from cached data
  useEffect(() => {
    if (skillSearchQuery.length < 2) {
      setSkillSuggestions([]);
      return;
    }

    // Filter from cached allSkills data
    const filtered = allSkills.filter((skill) =>
      skill.name.toLowerCase().includes(skillSearchQuery.toLowerCase())
    ).slice(0, 10);

    setSkillSuggestions(filtered);
  }, [skillSearchQuery, allSkills]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      additional_documents: file,
    }));
  };

  const handlePremiumChange = (option: keyof typeof premiumOptions) => {
    setPremiumOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleSkillSelect = (skill: Skill) => {
    if (!selectedSkills.find((s) => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setSkillSearchQuery("");
    setShowSkillDropdown(false);
  };

  const handleSkillRemove = (skillId: number) => {
    setSelectedSkills(selectedSkills.filter((s) => s.id !== skillId));
  };

  const handleSkillSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillSearchQuery(e.target.value);
    setShowSkillDropdown(true);
  };

  const handleSkillSearchBlur = () => {
    // Delay closing to allow click events on dropdown items to fire
    setTimeout(() => {
      setShowSkillDropdown(false);
    }, 200);
  };

  const handleSubmit = async (saveAs: "draft" | "publish") => {
    if (!formData.job_description) {
      alert("Please fill in Job Description");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the data for API submission
      const skillsList = selectedSkills.map((s) => s.name).join(", ");
      const jobData = {
        description: formData.job_description,
        employment_type: formData.employment_type,
        work_mode: formData.work_mode,
        years_of_exp: parseInt(formData.years_of_exp) || 0,
        location: formData.job_location,
        project_range_id: formData.project_range_id ? parseInt(formData.project_range_id) : undefined,
        hiring_org: formData.hiring_org,
        status: saveAs === "publish" ? "open" : "draft",
        requirements: formData.required_skills,
        technical_skills: skillsList,
        skill_ids: selectedSkills.map((s) => s.id),
        is_featured: premiumOptions.featured,
        is_urgent: premiumOptions.highlight,
        bid_duration: 30,
        job_seo_title: formData.job_seo_title,
        job_seo_description: formData.job_seo_description,
      };

      const response = await auth.fetchAPI(`/api/giglancer/projects/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Job ${saveAs === "publish" ? "published" : "updated"} successfully!`);
        setLocation(`/jobs/${jobId}`);
      } else {
        alert(data.message || "Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("An error occurred while updating the job");
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            icon={<ArrowLeft className="w-5 h-5" />}
            onClick={() => setLocation(`/jobs/${jobId}`)}
          >
            Back to Job
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Job</h1>
          <p className="text-gray-600">
            Update job details. Job title cannot be changed.
          </p>
        </div>

        {/* Job Title (Read-only) */}
        <Card>
          <CardContent className="pt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={jobTitle}
                disabled
                className="bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Job title cannot be edited
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card>
          <CardContent className="pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              name="job_description"
              value={formData.job_description}
              onChange={handleInputChange}
              rows={8}
              placeholder="Describe the job responsibilities, requirements, and expectations..."
              required
            />
          </CardContent>
        </Card>

        {/* Job Details */}
        <Card>
          <CardContent className="pt-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Job Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Type
                </label>
                <select
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select employment type</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              {/* Work Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Mode
                </label>
                <select
                  name="work_mode"
                  value={formData.work_mode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select work mode</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience Required
                </label>
                <Input
                  type="number"
                  name="years_of_exp"
                  value={formData.years_of_exp}
                  onChange={handleInputChange}
                  min="0"
                  max="50"
                  placeholder="e.g., 3"
                />
              </div>

              {/* Salary/Budget Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary/Budget Range
                </label>
                <select
                  name="project_range_id"
                  value={formData.project_range_id}
                  onChange={handleInputChange}
                  disabled={loadingRanges}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">
                    {loadingRanges ? "Loading..." : "Select salary range"}
                  </option>
                  {projectRanges.map((range) => (
                    <option key={range.id} value={range.id}>
                      {range.name} - ($
                      {range.minAmount.toLocaleString()} - $
                      {range.maxAmount.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Hiring Organization */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hiring Organization
                </label>
                <Input
                  type="text"
                  name="hiring_org"
                  value={formData.hiring_org}
                  onChange={handleInputChange}
                  placeholder="Company name"
                />
              </div>

              {/* Job Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Location
                </label>
                <Input
                  type="text"
                  name="job_location"
                  value={formData.job_location}
                  onChange={handleInputChange}
                  placeholder="City, State, Country"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Required */}
        <Card>
          <CardContent className="pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills Required
            </label>
            <div className="relative">
              <Input
                type="text"
                value={skillSearchQuery}
                onChange={handleSkillSearchChange}
                onBlur={handleSkillSearchBlur}
                placeholder="Search and select skills..."
                className="mb-3"
              />
              {showSkillDropdown && skillSuggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {loadingSkills ? (
                    <div className="p-4 text-center text-gray-500">
                      Loading skills...
                    </div>
                  ) : (
                    skillSuggestions.map((skill) => (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => handleSkillSelect(skill)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900">
                          {skill.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {skill.projectCount} projects
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Selected Skills */}
            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill.id)}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <Textarea
              name="required_skills"
              value={formData.required_skills}
              onChange={handleInputChange}
              rows={4}
              placeholder="Additional skill requirements or detailed descriptions..."
              className="mt-3"
            />
          </CardContent>
        </Card>

        {/* Premium Options */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Premium Options
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={premiumOptions.highlight}
                  onChange={() => handlePremiumChange("highlight")}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
                />
                <div>
                  <span className="font-medium text-gray-900">
                    Urgent Listing
                  </span>
                  <p className="text-sm text-gray-600">
                    Mark as urgent to attract immediate attention
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={premiumOptions.featured}
                  onChange={() => handlePremiumChange("featured")}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
                />
                <div>
                  <span className="font-medium text-gray-900">
                    Featured Job
                  </span>
                  <p className="text-sm text-gray-600">
                    Highlight in featured jobs section
                  </p>
                </div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              SEO Settings (Optional)
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Title
              </label>
              <Input
                type="text"
                name="job_seo_title"
                value={formData.job_seo_title}
                onChange={handleInputChange}
                placeholder="Optimized title for search engines"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Description
              </label>
              <Textarea
                name="job_seo_description"
                value={formData.job_seo_description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Brief description for search engine results"
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pb-8">
          <Button
            variant="outline"
            onClick={() => setLocation(`/jobs/${jobId}`)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit("draft")}
            disabled={isSubmitting}
            className="bg-gray-600 hover:bg-gray-700"
          >
            {isSubmitting ? "Saving..." : "Save as Draft"}
          </Button>
          <Button
            onClick={() => handleSubmit("publish")}
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {isSubmitting ? "Publishing..." : "Update & Publish"}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
