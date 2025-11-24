import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import { StatCard } from "../components/UI/Card";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/UI/Card";
import Button from "../components/UI/Button";
import {
  ShoppingBag,
  Briefcase,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  FileText,
  Target,
  Plus,
} from "lucide-react";
import CompanySwitcher from "../components/CompanySwitcher";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  primaryRole: string;
  company?: {
    id: number;
    name: string;
    platform: string | null;
  } | null;
}

interface DashboardStats {
  openJobs: number;
  activeProjects: number;
  productsListed: number;
  revenue: number;
}

export default function DashboardPage() {
  const [_, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<any>(null);
  const [stats] = useState<DashboardStats>({
    openJobs: 0,
    activeProjects: 0,
    productsListed: 0,
    revenue: 12450,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLocation("/login");
      return;
    }

    // Create AbortController to cancel request on unmount
    const abortController = new AbortController();

    // Clear any cached user data and force fresh fetch
    localStorage.removeItem("userProfile");
    sessionStorage.clear();

    // Add cache-busting timestamp
    const timestamp = new Date().getTime();

    fetch(`/api/auth/profile?_t=${timestamp}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const userData = data.data;

          console.log("👤 User Data:", userData);
          console.log("📋 Roles Array:", userData.roles);
          console.log("🏢 Company Data:", userData.company);

          // Get primary role from roles array
          const roles = userData.roles || [];
          const primaryRoleObj = roles.find(
            (r: any) => r.isPrimary || r.is_primary
          );
          const primaryRole =
            primaryRoleObj?.role ||
            (roles.length > 0 ? roles[0].role : "job_seeker");

          console.log("🎯 Primary Role Object:", primaryRoleObj);
          console.log("🎯 Primary Role:", primaryRole);

          // Individual roles that should see individual dashboard
          const individualRoles = ["job_seeker", "freelancer"];

          console.log(
            "🔍 Is Individual Role?",
            individualRoles.includes(primaryRole)
          );

          // Redirect individual users to individual dashboard IMMEDIATELY
          if (individualRoles.includes(primaryRole)) {
            console.log("🔀 Redirecting to individual dashboard...");
            setLocation("/individual-dashboard");
            return; // Don't set user state, just redirect
          }

          // Only set user state for company roles
          setUser(userData);
          // Company roles (company_admin, hr, team_lead, vendor, etc.) stay on this dashboard
        } else {
          localStorage.removeItem("token");
          setLocation("/login");
        }
      })
      .catch((error) => {
        // Ignore abort errors (happens on unmount)
        if (error.name !== "AbortError") {
          console.error("Profile fetch error:", error);
          localStorage.removeItem("token");
          setLocation("/login");
        }
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      });

    // Cleanup: abort fetch when component unmounts
    return () => {
      abortController.abort();
    };
  }, [setLocation]);

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
      const logoutTimestamp = Date.now();
      fetch(`/api/auth/logout?_t=${logoutTimestamp}`, {
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                B
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">
                  Bizoforce
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search companies, jobs, candidates..."
                  className="w-96 px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-lg">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">
                    ${stats.revenue.toLocaleString()}
                  </span>
                </div>

                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-3 border-l pl-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user.primaryRole}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user.firstName?.charAt(0)}
                      {user.lastName?.charAt(0)}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                      title="Logout"
                    >
                      <svg
                        className="w-4 h-4"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white min-h-screen border-r border-gray-200">
          <nav className="p-4 space-y-1">
            {/* Company Switcher */}
            <div className="mb-6 border-b border-gray-200 pb-4">
              <CompanySwitcher
                currentUser={user}
                onCompanySwitch={(company) => setCurrentCompany(company)}
              />
            </div>

            <div className="mb-6">
              <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 w-full">
                <span className="text-xs uppercase tracking-wider">
                  OVERVIEW
                </span>
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <button
              onClick={() => setLocation("/dashboard")}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg w-full hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Dashboard</span>
            </button>

            <button
              onClick={() =>
                setLocation(
                  `/companies/${
                    currentCompany?.id || user?.company?.id || "unified_1"
                  }`
                )
              }
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg w-full transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Company Profile</span>
            </button>

            <button
              onClick={() => alert("Business Insights - Coming Soon!")}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg w-full transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span>Business Insights</span>
            </button>

            <button
              onClick={() => alert("Messages & Orders - Coming Soon!")}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg w-full transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
              <span>Messages & Orders</span>
            </button>

            <div className="pt-4 border-t mt-4">
              <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 w-full">
                <span className="text-xs uppercase tracking-wider">
                  MARKETPLACE
                </span>
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="pt-2 border-t mt-2">
              <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 w-full">
                <span className="text-xs uppercase tracking-wider">HIRING</span>
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="pt-2 border-t mt-2">
              <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 w-full">
                <span className="text-xs uppercase tracking-wider">
                  PROJECTS & TIME
                </span>
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="pt-2 border-t mt-2">
              <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 w-full">
                <span className="text-xs uppercase tracking-wider">
                  FINANCE
                </span>
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="pt-2 border-t mt-2">
              <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 w-full">
                <span className="text-xs uppercase tracking-wider">
                  ADMINISTRATION
                </span>
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-blue-600 mb-2">
                Welcome to {user?.company?.name || "Bizoforce"}!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your business ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white border-2 border-blue-400 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-2">
                  OPEN JOBS
                </p>
                <p className="text-5xl font-bold text-blue-600 mb-2">
                  {stats.openJobs}
                </p>
                <p className="text-sm text-gray-600">Start hiring talent</p>
              </div>

              <div className="bg-white border-2 border-yellow-400 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <p className="text-sm font-medium text-yellow-600 uppercase tracking-wide mb-2">
                  ACTIVE PROJECTS
                </p>
                <p className="text-5xl font-bold text-yellow-600 mb-2">
                  {stats.activeProjects}
                </p>
                <p className="text-sm text-gray-600">Create first project</p>
              </div>

              <div className="bg-white border-2 border-green-400 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <p className="text-sm font-medium text-green-600 uppercase tracking-wide mb-2">
                  PRODUCTS LISTED
                </p>
                <p className="text-5xl font-bold text-green-600 mb-2">
                  {stats.productsListed}
                </p>
                <p className="text-sm text-gray-600">List products/services</p>
              </div>

              <div className="bg-white border-2 border-purple-400 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <p className="text-sm font-medium text-purple-600 uppercase tracking-wide mb-2">
                  REVENUE
                </p>
                <p className="text-5xl font-bold text-purple-600 mb-2">
                  ${stats.revenue}
                </p>
                <p className="text-sm text-gray-600">This month</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <svg
                      className="w-6 h-6 text-pink-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <h2 className="text-xl font-bold text-gray-900">
                      Getting Started
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
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
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Company Profile Complete
                        </h3>
                        <p className="text-sm text-gray-600">
                          Great! {user?.company?.name || "Bizoforce"} is set up
                        </p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Explore All Features
                        </h3>
                        <p className="text-sm text-gray-600">
                          You have access to hiring, projects, and marketplace
                        </p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      className="w-6 h-6 text-pink-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <h2 className="text-xl font-bold text-gray-900">
                      Quick Start Guide
                    </h2>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Learn how to use Bizoforce effectively
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <svg
                      className="w-6 h-6 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    <h2 className="text-xl font-bold text-gray-900">
                      Quick Actions
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                      <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 text-sm">
                          Post Job
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Hire talent
                        </p>
                      </div>
                    </button>

                    <button className="flex flex-col items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                      <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 text-sm">
                          New Project
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Manage work
                        </p>
                      </div>
                    </button>

                    <button className="flex flex-col items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                      <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-yellow-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 text-sm">
                          Add Product
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Sell services
                        </p>
                      </div>
                    </button>

                    <button className="flex flex-col items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 text-sm">
                          Add Team
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Invite users
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
