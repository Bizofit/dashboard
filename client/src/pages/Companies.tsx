import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import { auth } from "../lib/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/UI/Card";
import Button from "../components/UI/Button";
import {
  Building2,
  Users,
  Package,
  Briefcase,
  ArrowRight,
  Search,
} from "lucide-react";

interface Company {
  id: string;
  name: string;
  description?: string;
  platform: string;
  role: string;
  originalRole: string;
  isPrimary: boolean;
  metadata?: {
    logo?: string;
    industry?: string;
    size?: string;
    location?: string;
  };
}

export default function CompaniesPage() {
  const [_, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation("/login");
      return;
    }

    auth
      .fetchAPI("/api/companies")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Companies data received:", data);
        if (data.success) {
          setCompanies(data.data || []);
        } else {
          console.error("API returned success:false", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setLocation]);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      unified: "bg-purple-100 text-purple-700 border-purple-200",
      bizoforce: "bg-blue-100 text-blue-700 border-blue-200",
      giglancer: "bg-green-100 text-green-700 border-green-200",
      screenly: "bg-orange-100 text-orange-700 border-orange-200",
      work: "bg-pink-100 text-pink-700 border-pink-200",
    };
    return colors[platform] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getRoleIcon = (role: string) => {
    if (role === "company_admin" || role === "admin")
      return <Building2 className="w-5 h-5" />;
    if (role === "vendor") return <Package className="w-5 h-5" />;
    if (role === "hr") return <Users className="w-5 h-5" />;
    return <Briefcase className="w-5 h-5" />;
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Companies</h1>
            <p className="text-gray-600 mt-1">
              Manage your companies across all platforms
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Companies</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {companies.length}
                  </p>
                </div>
                <Building2 className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Admin Roles</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {companies.filter((c) => c.role === "company_admin").length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Vendor Roles</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {companies.filter((c) => c.role === "vendor").length}
                  </p>
                </div>
                <Package className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Platforms</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(companies.map((c) => c.platform)).size}
                  </p>
                </div>
                <Briefcase className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Companies Grid */}
        {filteredCompanies.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? "No companies found" : "No companies yet"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Start by adding your first company"}
              </p>
              {!searchTerm && (
                <Button
                  variant="primary"
                  onClick={() => setLocation("/company-setup")}
                >
                  Add Company
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Card
                key={company.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setLocation(`/companies/${company.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {company.metadata?.logo ? (
                        <img
                          src={company.metadata.logo}
                          alt={company.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                          {company.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">
                          {company.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          {getRoleIcon(company.role)}
                          <span className="text-sm text-gray-600 capitalize">
                            {company.role.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  {company.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {company.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full border ${getPlatformColor(
                        company.platform
                      )}`}
                    >
                      {company.platform}
                    </span>
                    {company.isPrimary && (
                      <span className="px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>

                  {company.metadata && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-1">
                      {company.metadata.industry && (
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Industry:</span>{" "}
                          {company.metadata.industry}
                        </p>
                      )}
                      {company.metadata.location && (
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Location:</span>{" "}
                          {company.metadata.location}
                        </p>
                      )}
                      {company.metadata.size && (
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Size:</span>{" "}
                          {company.metadata.size}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
