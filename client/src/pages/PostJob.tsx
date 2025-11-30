import { auth } from "../lib/auth";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import {
  Card,
  CardContent,
} from "../components/UI/Card";
import Button from "../components/UI/Button";
import Input, { Textarea, Select } from "../components/UI/Input";
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

interface PostJobFormData {
  job_title: string;
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

export default function PostJobPage() {
  const [_, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [projectRanges, setProjectRanges] = useState<ProjectRange[]>([]);
  const [loadingRanges, setLoadingRanges] = useState(false);
  const [formData, setFormData] = useState<PostJobFormData>({
    job_title: "",
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

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation("/login");
      return;
    }

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

    fetchProjectRanges();
  }, [setLocation]);

  // Fetch skills based on search query
  useEffect(() => {
    const fetchSkills = async () => {
      if (skillSearchQuery.length < 2) {
        setSkillSuggestions([]);
        return;
      }

      setLoadingSkills(true);
      try {
        const response = await auth.fetchAPI(
          `/api/giglancer/skills?search=${encodeURIComponent(skillSearchQuery)}&limit=10`
        );
        const data = await response.json();
        if (data.success) {
          setSkillSuggestions(data.data);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoadingSkills(false);
      }
    };

    const debounceTimer = setTimeout(fetchSkills, 300);
    return () => clearTimeout(debounceTimer);
  }, [skillSearchQuery]);

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
    if (!formData.job_title || !formData.job_description) {
      alert("Please fill in Job Title and Job Description");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the data for API submission
      const skillsList = selectedSkills.map((s) => s.name).join(", ");
      const jobData = {
        title: formData.job_title,
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

      const response = await auth.fetchAPI("/api/giglancer/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Job ${saveAs === "publish" ? "published" : "saved as draft"} successfully!`);
        setLocation("/jobs");
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

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            icon={<ArrowLeft className="w-5 h-5" />}
            onClick={() => setLocation("/jobs")}
          >
            Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Post a Job</h1>
          </div>
        </div>

        {/* Why Post a Job Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Why Post a Job?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-blue-600">1.</span>
                <p>Reach qualified candidates quickly with our extensive recruiting system</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-blue-600">2.</span>
                <p>Get applications from job-optimized online application requirements</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-blue-600">3.</span>
                <p>Enhanced visibility with SEO-optimized job listings</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-blue-600">4.</span>
                <p>Track and manage applications efficiently through our dashboard</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Form */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Basic Job Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Basic Job Information
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Job Title"
                    name="job_title"
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.job_title}
                    onChange={handleInputChange}
                    required
                  />
                  <Textarea
                    label="Job Description"
                    name="job_description"
                    placeholder="Describe the role and responsibilities"
                    value={formData.job_description}
                    onChange={handleInputChange}
                    rows={6}
                    required
                  />
                </div>
              </div>

              {/* Job Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Employment type"
                    name="employment_type"
                    value={formData.employment_type}
                    onChange={handleInputChange}
                    options={[
                      { value: "", label: "Select employment type" },
                      { value: "full-time", label: "Full Time" },
                      { value: "part-time", label: "Part Time" },
                      { value: "contract", label: "Contract" },
                      { value: "freelance", label: "Freelance" },
                      { value: "internship", label: "Internship" },
                    ]}
                    required
                  />
                  <Select
                    label="Work Mode"
                    name="work_mode"
                    value={formData.work_mode}
                    onChange={handleInputChange}
                    options={[
                      { value: "", label: "Select work mode" },
                      { value: "remote", label: "Remote" },
                      { value: "onsite", label: "On-site" },
                      { value: "hybrid", label: "Hybrid" },
                    ]}
                    required
                  />
                  <Input
                    label="Years (EXP)"
                    name="years_of_exp"
                    type="number"
                    placeholder="min-04/year*"
                    value={formData.years_of_exp}
                    onChange={handleInputChange}
                  />
                  <Select
                    label="Experience range"
                    name="experience_range"
                    value={formData.experience_range}
                    onChange={handleInputChange}
                    options={[
                      { value: "", label: "From years of experience" },
                      { value: "0-2", label: "0-2 years" },
                      { value: "2-5", label: "2-5 years" },
                      { value: "5-10", label: "5-10 years" },
                      { value: "10+", label: "10+ years" },
                    ]}
                  />
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Required Skills
                </h3>
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technical Skills *
                    </label>
                    <div className="relative">
                      <Input
                        name="skill_search"
                        placeholder="Search and add skill (e.g., React, Node.js, Python)"
                        value={skillSearchQuery}
                        onChange={handleSkillSearchChange}
                        onFocus={() => setShowSkillDropdown(true)}
                        onBlur={handleSkillSearchBlur}
                      />
                      {showSkillDropdown && skillSearchQuery.length >= 2 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {loadingSkills ? (
                            <div className="p-3 text-sm text-gray-500">Loading skills...</div>
                          ) : skillSuggestions.length > 0 ? (
                            skillSuggestions.map((skill) => (
                              <button
                                key={skill.id}
                                type="button"
                                onClick={() => handleSkillSelect(skill)}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-900">
                                    {skill.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {skill.projectCount + skill.userCount} uses
                                  </span>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="p-3 text-sm text-gray-500">
                              No skills found. Try different keywords.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {/* Selected Skills */}
                    {selectedSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedSkills.map((skill) => (
                          <span
                            key={skill.id}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {skill.name}
                            <button
                              type="button"
                              onClick={() => handleSkillRemove(skill.id)}
                              className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Company Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Hiring Organization"
                    name="hiring_org"
                    placeholder="Your company name"
                    value={formData.hiring_org}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Job Location"
                    name="job_location"
                    placeholder="e.g. New York, NY"
                    value={formData.job_location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <Select
                  label="Salary Range (Budget)"
                  name="project_range_id"
                  value={formData.project_range_id}
                  onChange={handleInputChange}
                  options={[
                    { value: "", label: loadingRanges ? "Loading ranges..." : "Select budget range" },
                    ...projectRanges.map((range) => ({
                      value: range.id.toString(),
                      label: range.name,
                    })),
                  ]}
                />
              </div>

              {/* Additional Documents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Documents
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      <span className="text-orange-500 font-medium">
                        Upload File
                      </span>{" "}
                      (or) file uploaded yet
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      All (excludes-png, jpeg/jpg)
                    </p>
                  </label>
                  {formData.additional_documents && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.additional_documents.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Get the most from your job section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Get the most from your job! (optional)
                </h3>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={premiumOptions.highlight}
                      onChange={() => handlePremiumChange("highlight")}
                      className="mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-medium">
                          HIGHLIGHT
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          250% higher success rate
                        </span>
                        <span className="ml-auto text-sm font-semibold text-gray-900">
                          Free
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Get priority placement in job listings and attract more qualified candidates
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={premiumOptions.database}
                      onChange={() => handlePremiumChange("database")}
                      className="mt-1 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">
                          DATABASE
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          Our hands-on recruitment service where you get free in-the wild results
                        </span>
                        <span className="ml-auto text-sm font-semibold text-gray-900">
                          Free
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Access our extensive candidate database and receive matched profiles
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={premiumOptions.premium}
                      onChange={() => handlePremiumChange("premium")}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-medium">
                          PREMIUM
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          Expert to help you review better insights from post to take the most
                        </span>
                        <span className="ml-auto text-sm font-semibold text-gray-900">
                          Free
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Get dedicated support and insights to optimize your job posting
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={premiumOptions.featured}
                      onChange={() => handlePremiumChange("featured")}
                      className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded font-medium">
                          FEATURED
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          I want all applications to be verified in order developers can pick care
                        </span>
                        <span className="ml-auto text-sm font-semibold text-gray-900">
                          Free
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        All candidates are pre-screened and verified for quality
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* SEO Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  SEO Information
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Job SEO Title"
                    name="job_seo_title"
                    placeholder="SEO optimized title"
                    value={formData.job_seo_title}
                    onChange={handleInputChange}
                  />
                  <Textarea
                    label="Job SEO Description"
                    name="job_seo_description"
                    placeholder="SEO optimized description"
                    value={formData.job_seo_description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    Keep it between 150-160 characters.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setLocation("/jobs")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSubmit("draft")}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save as Draft"}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleSubmit("publish")}
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    {isSubmitting ? "Publishing..." : "Publish Job"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
