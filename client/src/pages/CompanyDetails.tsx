import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
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
  DollarSign,
  ArrowLeft,
  XCircle,
  Globe,
  MapPin,
  Phone,
  Calendar,
} from "lucide-react";

interface CompanyDetailsProps {
  companyId?: string;
}

interface CompanyData {
  id: string;
  name: string;
  description?: string;
  platform: string;
  role: string;
  isPrimary: boolean;
  logo?: string;
  website?: string;
  industry?: string;
  size?: string;
  location?: string;
  phone?: string;
  foundedYear?: number;
  lastUpdated: string;
}

export default function CompanyDetails({
  companyId: propCompanyId,
}: CompanyDetailsProps) {
  const params = useParams();
  const companyId = propCompanyId || params.companyId;
  const [_, setLocation] = useLocation();

  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!companyId) {
      setError("Company ID is required");
      setLoading(false);
      return;
    }

    fetchCompanyDetails();
  }, [companyId]);

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!auth.isAuthenticated()) {
        setLocation("/login");
        return;
      }

      const response = await auth.fetchAPI(`/api/companies/${companyId}`);

      const data = await response.json();

      if (data.success) {
        setCompany(data.data);
      } else {
        setError(data.message || "Failed to load company details");
      }
    } catch (err: any) {
      console.error("Error fetching company details:", err);
      setError("Failed to load company details");
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Error Loading Company
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button variant="primary" onClick={() => setLocation("/companies")}>
              Back to Companies
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!company) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Company Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              The company you're looking for doesn't exist.
            </p>
            <Button variant="primary" onClick={() => setLocation("/companies")}>
              Back to Companies
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Button & Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setLocation("/companies")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-4">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-2xl">
                  {company.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {company.name}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full border ${getPlatformColor(
                      company.platform
                    )}`}
                  >
                    {company.platform}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full capitalize">
                    {company.role.replace("_", " ")}
                  </span>
                  {company.isPrimary && (
                    <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                      Primary
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {company.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Website</p>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-600 hover:underline"
                    >
                      {company.website}
                    </a>
                  </div>
                </div>
              )}
              {company.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="text-sm text-gray-900">{company.phone}</p>
                  </div>
                </div>
              )}
              {company.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="text-sm text-gray-900">{company.location}</p>
                  </div>
                </div>
              )}
              {company.foundedYear && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Founded</p>
                    <p className="text-sm text-gray-900">
                      {company.foundedYear}
                    </p>
                  </div>
                </div>
              )}
              {company.industry && (
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Industry</p>
                    <p className="text-sm text-gray-900">{company.industry}</p>
                  </div>
                </div>
              )}
              {company.size && (
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Company Size</p>
                    <p className="text-sm text-gray-900">{company.size}</p>
                  </div>
                </div>
              )}
            </div>
            {company.description && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-sm text-gray-600">{company.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Employees</p>
                  <p className="text-2xl font-bold text-gray-900">-</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Products</p>
                  <p className="text-2xl font-bold text-gray-900">-</p>
                </div>
                <Package className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">-</p>
                </div>
                <Briefcase className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$0</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
