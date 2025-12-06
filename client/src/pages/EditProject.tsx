import { auth } from "../lib/auth";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import { Card, CardContent } from "../components/UI/Card";
import Button from "../components/UI/Button";
import Input, { Textarea } from "../components/UI/Input";
import { Save, ArrowLeft } from "lucide-react";

interface ProjectCategory {
  id: number;
  name: string;
  companyId: number | null;
}

interface Client {
  id: number;
  name: string;
}

interface EditProjectProps {
  projectId?: string;
}

export default function EditProjectPage({ projectId }: EditProjectProps) {
  const [_, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [fetchingProject, setFetchingProject] = useState(true);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  // Form state
  const [projectName, setProjectName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [withoutDeadline, setWithoutDeadline] = useState(false);
  const [allowManualTimeLog, setAllowManualTimeLog] = useState(false);
  const [projectSummary, setProjectSummary] = useState("");
  const [notes, setNotes] = useState("");
  const [completionPercent, setCompletionPercent] = useState("");
  const [calculateProgress, setCalculateProgress] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientFeedback, setClientFeedback] = useState("");
  const [readOnlyMode, setReadOnlyMode] = useState(false);
  const [projectBudget, setProjectBudget] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [hoursAllocated, setHoursAllocated] = useState("");
  const [status, setStatus] = useState("not started");

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation("/login");
      return;
    }

    // Fetch project categories
    auth
      .fetchAPI("/api/work/project-categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.data || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching project categories:", error);
      });

    // Fetch project details
    if (projectId) {
      fetchProjectDetails();
    }
  }, [setLocation, projectId]);

  const fetchProjectDetails = async () => {
    try {
      setFetchingProject(true);
      const response = await auth.fetchAPI(`/api/work/user-projects/${projectId}`);
      const data = await response.json();

      if (data.success) {
        const project = data.data;
        setProjectName(project.name || "");
        setCategoryId(project.categoryId?.toString() || "");
        
        // Format dates for HTML date input (YYYY-MM-DD)
        if (project.startDate) {
          const startDateObj = new Date(project.startDate);
          setStartDate(startDateObj.toISOString().split('T')[0]);
        }
        if (project.deadline) {
          const deadlineObj = new Date(project.deadline);
          setDeadline(deadlineObj.toISOString().split('T')[0]);
        }
        
        setWithoutDeadline(!project.deadline);
        setAllowManualTimeLog(project.manualTimelog === "enable");
        setProjectSummary(project.description || "");
        setNotes(project.notes || "");
        setCompletionPercent(project.progress?.toString() || "0");
        setClientId(project.clientId?.toString() || "");
        setProjectBudget(project.projectBudget?.toString() || "");
        setCurrencyId(project.currencyId?.toString() || "");
        setHoursAllocated(project.hoursAllocated?.toString() || "");
        setStatus(project.status || "not started");
      } else {
        alert(data.message || "Failed to fetch project details");
        setLocation("/projects");
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
      alert("An error occurred while fetching project details");
      setLocation("/projects");
    } finally {
      setFetchingProject(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await auth.fetchAPI(`/api/work/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_name: projectName,
          category_id: categoryId ? parseInt(categoryId) : null,
          start_date: startDate,
          deadline: withoutDeadline ? null : deadline || null,
          allow_manual_time_log: allowManualTimeLog,
          project_summary: projectSummary || null,
          notes: notes || null,
          completion_percent: completionPercent ? parseFloat(completionPercent) : 0,
          calculate_progress_through_tasks: calculateProgress,
          client_id: clientId ? parseInt(clientId) : null,
          client_feedback: clientFeedback || null,
          read_only_mode: readOnlyMode,
          project_budget: projectBudget ? parseFloat(projectBudget) : null,
          currency_id: currencyId ? parseInt(currencyId) : null,
          hours_allocated: hoursAllocated ? parseFloat(hoursAllocated) : null,
          status: status,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Project updated successfully!");
        setLocation("/projects");
      } else {
        alert(data.message || "Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("An error occurred while updating the project");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingProject) {
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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/projects")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">UPDATE PROJECT DETAILS</h1>
              <p className="text-gray-600 mt-1">Edit project information</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Project Info Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                PROJECT INFO
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Eg: Project Wiki"
                    required
                  />
                </div>

                {/* Project Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Category <span className="text-blue-500">ⓘ</span>
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Eg: In-House</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline
                  </label>
                  <Input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    disabled={withoutDeadline}
                    placeholder="Without deadline"
                  />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={withoutDeadline}
                      onChange={(e) => setWithoutDeadline(e.target.checked)}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-600">Without deadline</span>
                  </label>
                </div>
              </div>

              {/* Allow Manual Time Log */}
              <div className="mt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowManualTimeLog}
                    onChange={(e) => setAllowManualTimeLog(e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">
                    Allow manual time logs?
                  </span>
                </label>
              </div>

              {/* Project Summary */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Summary
                </label>
                <div className="border rounded-lg">
                  <div className="flex items-center gap-2 px-3 py-2 border-b bg-gray-50">
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <span className="font-bold">B</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <span className="italic">I</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <span className="underline">U</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      #
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      ≡
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      ⋮⋮
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      •
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      1.
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      ⊞
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      🔗
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      ×
                    </button>
                  </div>
                  <Textarea
                    value={projectSummary}
                    onChange={(e) => setProjectSummary(e.target.value)}
                    rows={4}
                    className="border-0 focus:ring-0"
                    placeholder="This is test web project"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note
                </label>
                <div className="border rounded-lg">
                  <div className="flex items-center gap-2 px-3 py-2 border-b bg-gray-50">
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <span className="font-bold">B</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <span className="italic">I</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <span className="underline">U</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      #
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      ≡
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      ⋮⋮
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      •
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      1.
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      ⊞
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      🔗
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      ×
                    </button>
                  </div>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="border-0 focus:ring-0"
                  />
                </div>
              </div>

              {/* Project Completion Status */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Completion Status
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={completionPercent}
                    onChange={(e) => setCompletionPercent(e.target.value)}
                    placeholder="0"
                    disabled={calculateProgress}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <div 
                      className="h-full bg-blue-100 rounded-l-lg transition-all"
                      style={{ width: `${completionPercent || 0}%` }}
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={calculateProgress}
                    onChange={(e) => setCalculateProgress(e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-600">Calculate progress through tasks</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Client Info Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                CLIENT INFO
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Client
                </label>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select Client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Client can manage tasks of this project
                </p>
              </div>

              {/* Read Only Mode */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={readOnlyMode}
                    onChange={(e) => setReadOnlyMode(e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Read Only Mode</span>
                </label>
              </div>

              {/* Client Feedback */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Feedback
                </label>
                <Textarea
                  value={clientFeedback}
                  onChange={(e) => setClientFeedback(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Budget Info Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                BUDGET INFO
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Project Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Budget
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={projectBudget}
                    onChange={(e) => setProjectBudget(e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                {/* Currency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={currencyId}
                    onChange={(e) => setCurrencyId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select Currency</option>
                    <option value="1">USD</option>
                    <option value="2">EUR</option>
                    <option value="3">GBP</option>
                  </select>
                </div>

                {/* Hours Allocated */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hours Allocated
                  </label>
                  <Input
                    type="number"
                    step="0.5"
                    value={hoursAllocated}
                    onChange={(e) => setHoursAllocated(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Project Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="not started">Not Started</option>
                  <option value="in progress">In Progress</option>
                  <option value="on hold">On Hold</option>
                  <option value="canceled">Canceled</option>
                  <option value="finished">Finished</option>
                  <option value="under review">Under Review</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setLocation("/projects")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              icon={<Save className="w-4 h-4" />}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
