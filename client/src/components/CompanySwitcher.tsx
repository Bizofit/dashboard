import { useState, useEffect } from "react";

interface Company {
  id: number;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  industry?: string;
  size?: string;
  user_role: string;
  platform?: string;
  source_platform?: string;
  is_primary: boolean;
  role_id: number;
}

interface CompanySwitcherProps {
  currentUser: any;
  onCompanySwitch?: (company: Company) => void;
}

export default function CompanySwitcher({
  currentUser,
  onCompanySwitch,
}: CompanySwitcherProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);

  useEffect(() => {
    fetchUserCompanies();
  }, []);

  useEffect(() => {
    // Find current primary company
    const primary = companies.find((c) => c.is_primary);
    if (primary) {
      setCurrentCompany(primary);
    }
  }, [companies]);

  const fetchUserCompanies = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("🏢 Fetching user companies...");
      console.log("🏢 Token exists:", !!token);

      const timestamp = Date.now();
      const response = await fetch(`/api/auth/user-companies?_t=${timestamp}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      console.log("🏢 Response status:", response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log("🏢 Companies API response:", data);
        console.log("🏢 Companies data array:", data.data);
        setCompanies(data.data || []);
        console.log("🏢 Set companies count:", (data.data || []).length);

        // Also log individual companies
        if (data.data && data.data.length > 0) {
          data.data.forEach((company: any, index: number) => {
            console.log(`🏢 Company ${index + 1}:`, {
              id: company.id,
              name: company.name,
              role: company.user_role,
              platform: company.platform,
              isPrimary: company.is_primary,
            });
          });
        }
      } else {
        const errorText = await response.text();
        console.error("🏢 Failed to fetch companies - Response:", errorText);
        console.error("🏢 Response status:", response.status);
      }
    } catch (error) {
      console.error("🏢 Failed to fetch companies - Error:", error);
    }
  };

  const handleCompanySwitch = async (company: Company) => {
    if (company.id === currentCompany?.id) {
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/switch-company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          companyId: company.id,
          roleId: company.role_id,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Update companies list to reflect new primary
        setCompanies((prev) =>
          prev.map((c) => ({
            ...c,
            is_primary: c.id === company.id,
          }))
        );

        setCurrentCompany(company);
        setIsOpen(false);

        // Notify parent component
        if (onCompanySwitch) {
          onCompanySwitch(company);
        }

        // Refresh page to load new company data
        window.location.reload();
      } else {
        console.error("Failed to switch company");
      }
    } catch (error) {
      console.error("Error switching company:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show debugging info and handle single company case
  console.log("🏢 CompanySwitcher render - companies count:", companies.length);
  console.log("🏢 Current companies:", companies);
  console.log("🏢 Current company:", currentCompany);
  console.log("🏢 Current user:", currentUser);

  const getPlatformBadge = (platform?: string) => {
    const colors: Record<string, string> = {
      bizoforce: "bg-orange-100 text-orange-800",
      giglancer: "bg-blue-100 text-blue-800",
      screenly: "bg-green-100 text-green-800",
      work: "bg-purple-100 text-purple-800",
    };

    return colors[platform || ""] || "bg-gray-100 text-gray-800";
  };

  const getRoleDisplay = (role: string) => {
    const roleNames: Record<string, string> = {
      company_admin: "Admin",
      vendor: "Vendor",
      hr: "HR",
      team_lead: "Team Lead",
      finance: "Finance",
    };

    return roleNames[role] || role;
  };

  // If no companies, show loading or error state
  if (companies.length === 0) {
    return (
      <div className="flex items-center space-x-2 px-2 py-2 bg-blue-50 border border-blue-200 rounded-lg w-full">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
        <div className="text-sm text-blue-700 font-medium truncate">
          Loading companies...
        </div>
      </div>
    );
  }

  // TEMPORARY: Always show as dropdown for testing
  // if (companies.length === 1) {
  if (false) {
    // Disable single company mode for testing
    const company = companies[0];
    return (
      <div className="flex items-center space-x-2 px-2 py-2 bg-white border border-gray-300 rounded-lg w-full">
        <svg
          className="w-4 h-4 text-gray-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">
            {company.name}
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <span
              className={`inline-flex items-center px-1 py-0.5 rounded text-xs font-medium ${getPlatformBadge(
                company.platform
              )}`}
            >
              {(company.platform || "unknown").toUpperCase()}
            </span>
            <span className="text-xs text-gray-500 truncate">
              {getRoleDisplay(company.user_role)}
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-400 ml-2">Single Company</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="flex items-center space-x-2 px-2 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors w-full disabled:opacity-50"
      >
        <svg
          className="h-4 w-4 text-gray-500 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <div className="flex-1 text-left min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">
            {currentCompany?.name || "Select Company"}
          </div>
          {currentCompany && (
            <div className="text-xs text-gray-500 truncate">
              {getRoleDisplay(currentCompany.user_role)}
            </div>
          )}
        </div>
        {loading ? (
          <div className="animate-spin h-4 w-4 border-2 border-orange-500 border-t-transparent rounded-full"></div>
        ) : (
          <svg
            className={`h-4 w-4 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
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
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
              Switch Company ({companies.length})
            </div>
            {companies.map((company) => (
              <button
                key={`${company.id}-${company.role_id}`}
                onClick={() => handleCompanySwitch(company)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  company.id === currentCompany?.id
                    ? "bg-orange-50 border border-orange-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {company.name}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-600">
                        {getRoleDisplay(company.user_role)}
                      </span>
                      {company.platform && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${getPlatformBadge(
                            company.platform
                          )}`}
                        >
                          {company.platform}
                        </span>
                      )}
                    </div>
                  </div>
                  {company.id === currentCompany?.id && (
                    <div className="text-orange-500 ml-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
