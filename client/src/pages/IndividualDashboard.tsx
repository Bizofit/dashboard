import { useState } from "react";
import { useLocation } from "wouter";

export default function IndividualDashboard() {
  const [_, setLocation] = useLocation();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        setResumeFile(file);
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        setResumeFile(file);
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleUpload = async () => {
    if (!resumeFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const token = localStorage.getItem("token");
      const timestamp = Date.now();
      const response = await fetch(
        `/api/profile/upload-resume?_t=${timestamp}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
          body: formData,
        }
      );

      if (response.ok) {
        // Redirect to full dashboard after successful upload
        setLocation("/dashboard");
      } else {
        alert("Failed to upload resume. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Error uploading resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSkip = () => {
    setLocation("/dashboard");
  };

  const handleLogout = async () => {
    setLoggingOut(true); // Show loading state immediately

    // Immediately clear all client-side state
    localStorage.clear();
    sessionStorage.clear();

    // Clear all cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Call backend logout endpoint (don't wait for response)
    const token = localStorage.getItem("token");
    if (token) {
      const timestamp = Date.now();
      fetch(`/api/auth/logout?_t=${timestamp}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      }).catch(() => {
        // Ignore errors, we're logging out anyway
      });
    }

    // Redirect immediately
    const timestamp = new Date().getTime();
    window.location.href = `/login?switch_account=true&t=${timestamp}`;
  };

  // Show logout loading screen
  if (loggingOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg
              className="w-10 h-10 text-white animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <p className="text-xl font-semibold text-gray-900">Logging out...</p>
          <p className="text-sm text-gray-600 mt-2">Clearing your session</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full relative">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
          title="Logout"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-4xl">📄</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome to Your Dashboard!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Let's get started by uploading your resume
          </p>
          <p className="text-sm text-gray-500">
            This helps employers find you and match you with the perfect
            opportunities
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all ${
              dragActive
                ? "border-purple-600 bg-purple-50 scale-105"
                : resumeFile
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/50"
            }`}
          >
            {resumeFile ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {resumeFile.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => setResumeFile(null)}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Drag and drop your resume here
                  </p>
                  <p className="text-sm text-gray-500 mb-4">or</p>
                  <label className="inline-block">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <span className="cursor-pointer px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all inline-block">
                      Browse Files
                    </span>
                  </label>
                </div>
                <p className="text-xs text-gray-400">
                  Supported format: PDF (Max 10MB)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Why upload your resume?
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Smart Matching
              </p>
              <p className="text-xs text-gray-600">
                Get matched with relevant jobs automatically
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👀</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Employer Visibility
              </p>
              <p className="text-xs text-gray-600">
                Let companies discover your profile
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Quick Apply
              </p>
              <p className="text-xs text-gray-600">
                Apply to jobs with one click
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSkip}
            className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
          >
            Skip for now
          </button>
          <button
            onClick={handleUpload}
            disabled={!resumeFile || uploading}
            className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
              resumeFile && !uploading
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {uploading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Uploading...
              </span>
            ) : (
              "Upload & Continue"
            )}
          </button>
        </div>

        {/* Help Text */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Don't have a resume ready?{" "}
          <button
            onClick={handleSkip}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Skip and build your profile manually
          </button>
        </p>
      </div>
    </div>
  );
}
