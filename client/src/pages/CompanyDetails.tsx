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
  Mail,
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
  employees?: any[];
  products?: any[];
  jobs?: any[];
  financials?: {
    revenue?: {
      yearly?: number;
      monthly?: number;
    };
  };
  metadata?: {
    customFields?: {
      _listing_ceo?: string;
      _listing_executives?: string;
      _listing_headquarters?: string;
      _listing_countries?: string;
      _listing_year_incorporated?: string;
      _listing_employees?: string;
      _listing_revenue?: string;
      _listing_description?: string;
      _listing_services?: string;
      _listing_products?: string;
      [key: string]: any;
    };
    listingUrl?: string;
  };
  analytics?: {
    candidateMetrics?: {
      totalReviews?: number;
      averageRating?: number;
    };
  };
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

      console.log("Company details API response:", data);

      if (data.success) {
        console.log("Company data:", data.data);
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

  // Debug: Log all metadata to see what's available
  console.log('🔍 Company metadata:', company.metadata);
  console.log('🔍 Custom fields:', company.metadata?.customFields);
  console.log('🔍 Analytics:', company.analytics);
  
  // Helper to safely access customFields (handle both direct and nested {success, data} structure)
  const getCustomField = (fieldName: string) => {
    const fields = company.metadata?.customFields;
    if (!fields) return null;
    // Check if it's wrapped in {success, data} structure
    if (fields.data && typeof fields.data === 'object') {
      return fields.data[fieldName];
    }
    return fields[fieldName];
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Hero Section with Company Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 py-6">
            <Button 
              variant="outline" 
              onClick={() => setLocation("/companies")}
              className="mb-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Companies
            </Button>
            
            <div className="flex items-start gap-6">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-24 h-24 rounded-xl object-cover border-4 border-white/20"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl bg-white/10 backdrop-blur-sm border-4 border-white/20 flex items-center justify-center text-white font-bold text-4xl">
                  {company.name.charAt(0).toUpperCase()}
                </div>
              )}
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {company.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30">
                    {company.platform}
                  </span>
                  <span className="px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30 capitalize">
                    {company.role.replace("_", " ")}
                  </span>
                  {company.isPrimary && (
                    <span className="px-3 py-1 text-sm font-medium bg-purple-500/80 backdrop-blur-sm text-white rounded-full border border-purple-300/30">
                      ⭐ Primary
                    </span>
                  )}
                  {company.metadata?.listingId && (
                    <span className="px-3 py-1 text-sm font-medium bg-blue-500/80 backdrop-blur-sm text-white rounded-full border border-blue-300/30">
                      ID: {company.metadata.listingId}
                    </span>
                  )}
                </div>
                
                {/* Quick Contact Info */}
                <div className="flex flex-wrap gap-4 text-white/90">
                  {(company.website || getCustomField('website')) && (
                    <a
                      href={company.website || String(getCustomField('website'))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">Visit Website</span>
                    </a>
                  )}
                  {(company.phone || getCustomField('phone')) && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{company.phone || String(getCustomField('phone'))}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Employees</p>
                  <p className="text-3xl font-bold text-blue-900 mt-1">
                    {company.employees?.length || 0}
                  </p>
                </div>
                <Users className="w-12 h-12 text-blue-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Products</p>
                  <p className="text-3xl font-bold text-green-900 mt-1">
                    {company.products?.length || 0}
                  </p>
                </div>
                <Package className="w-12 h-12 text-green-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Active Jobs</p>
                  <p className="text-3xl font-bold text-purple-900 mt-1">
                    {company.jobs?.length || 0}
                  </p>
                </div>
                <Briefcase className="w-12 h-12 text-purple-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Revenue</p>
                  <p className="text-3xl font-bold text-orange-900 mt-1">
                    ${company.financials?.revenue?.yearly?.toLocaleString() || 0}
                  </p>
                </div>
                <DollarSign className="w-12 h-12 text-orange-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Company Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            {(company.description || getCustomField('_listing_description') || getCustomField('description')) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-orange-500" />
                    About Company
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {String(getCustomField('_listing_description') || getCustomField('description') || company.description || '')}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Leadership Team */}
            {(getCustomField('_listing_ceo') || getCustomField('ceo') || getCustomField('_listing_executives')) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Leadership Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(getCustomField('_listing_ceo') || getCustomField('ceo')) && (
                      <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {String(getCustomField('_listing_ceo') || getCustomField('ceo') || '').charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {String(getCustomField('_listing_ceo') || getCustomField('ceo') || '')}
                          </p>
                          <p className="text-sm text-blue-600">Chief Executive Officer</p>
                        </div>
                      </div>
                    )}
                    {getCustomField('_listing_executives') && (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm font-medium text-gray-600 mb-2">Other Executives</p>
                        <p className="text-gray-900 whitespace-pre-line">
                          {String(getCustomField('_listing_executives') || '')}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Products & Services */}
            {(getCustomField('_listing_services') || getCustomField('_listing_products') || getCustomField('products')) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-green-500" />
                    Products & Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getCustomField('_listing_services') && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Services
                        </h4>
                        <p className="text-gray-700 whitespace-pre-line pl-4">
                          {String(getCustomField('_listing_services') || '')}
                        </p>
                      </div>
                    )}
                    {(() => {
                      const products = getCustomField('_listing_products') || getCustomField('products');
                      if (!products) return null;
                      const productText = typeof products === 'object' && products.count !== undefined 
                        ? `${products.count} products available` 
                        : String(products);
                      return (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Products
                          </h4>
                          <p className="text-gray-700 whitespace-pre-line pl-4">
                            {productText}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Company Info Sidebar */}
          <div className="space-y-6">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {company.website && (
                    <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                      <Globe className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Website</p>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-orange-600 hover:underline break-all"
                        >
                          {company.website}
                        </a>
                      </div>
                    </div>
                  )}

                  {company.email && (
                    <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                      <Mail className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
                        <a
                          href={`mailto:${company.email}`}
                          className="text-sm text-orange-600 hover:underline break-all"
                        >
                          {company.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {company.phone && (
                    <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                      <Phone className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Phone</p>
                        <a
                          href={`tel:${company.phone}`}
                          className="text-sm text-orange-600 hover:underline"
                        >
                          {company.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {(company.location || getCustomField('_listing_headquarters') || getCustomField('address')) && (
                    <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                      <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Headquarters</p>
                        <p className="text-sm text-gray-900">
                          {String(getCustomField('_listing_headquarters') || getCustomField('address') || company.location || '')}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {getCustomField('_listing_countries') && (
                    <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                      <Globe className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Operating Countries</p>
                        <p className="text-sm text-gray-900">
                          {String(getCustomField('_listing_countries') || getCustomField('countries_served') || '')}
                        </p>
                      </div>
                    </div>
                  )}

                  {(company.foundedYear || getCustomField('_listing_year_incorporated') || getCustomField('founded_year')) && (
                    <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                      <Calendar className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Year Founded</p>
                        <p className="text-sm text-gray-900">
                          {String(getCustomField('_listing_year_incorporated') || getCustomField('founded_year') || company.foundedYear || '')}
                        </p>
                      </div>
                    </div>
                  )}

                  {company.industry && (
                    <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                      <Briefcase className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Industry</p>
                        <p className="text-sm text-gray-900">{company.industry}</p>
                      </div>
                    </div>
                  )}

                  {(company.size || getCustomField('_listing_employees') || getCustomField('employees')) && (
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Company Size</p>
                        <p className="text-sm text-gray-900">
                          {String(getCustomField('_listing_employees') || getCustomField('employees') || company.size || '')} employees
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            {(getCustomField('_listing_review_count') || company.analytics?.candidateMetrics?.totalReviews) && (
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    Customer Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-orange-600 mb-2">
                      {(getCustomField('_listing_review_average') || company.analytics?.candidateMetrics?.averageRating || 0).toFixed(1)}
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-2xl">
                          {i < Math.round(getCustomField('_listing_review_average') || company.analytics?.candidateMetrics?.averageRating || 0) ? '⭐' : '☆'}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      Based on {getCustomField('_listing_review_count') || company.analytics?.candidateMetrics?.totalReviews || 0} reviews
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Team Overview */}
            {company.employees && company.employees.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-3 border-b">
                      <span className="text-sm text-gray-600">Total Members</span>
                      <span className="text-lg font-bold text-purple-600">
                        {company.employees.length}
                      </span>
                    </div>
                    {company.employees.slice(0, 3).map((employee: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm">
                          {employee.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{employee.name || 'Team Member'}</p>
                          <p className="text-xs text-gray-500">{employee.role || 'Member'}</p>
                        </div>
                      </div>
                    ))}
                    {company.employees.length > 3 && (
                      <p className="text-xs text-gray-500 text-center pt-2">
                        +{company.employees.length - 3} more team members
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
