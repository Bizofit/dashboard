import { auth } from "../lib/auth";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/UI/Card";
import Button from "../components/UI/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
} from "../components/UI/Table";
import Input from "../components/UI/Input";
import { Plus, Users, Eye, MessageCircle } from "lucide-react";

interface Candidate {
  id: number;
  name: string;
  email: string;
  skills: string[];
  experience: number;
  location: string;
  applications: number;
  status: "Active" | "Shortlisted" | "Hired";
  avatar?: string;
}

interface CandidateStats {
  totalCandidates: number;
  activeApplications: number;
  shortlisted: number;
  hiredThisMonth: number;
}

export default function CandidatesPage() {
  const [_, setLocation] = useLocation();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [stats, setStats] = useState<CandidateStats>({
    totalCandidates: 0,
    activeApplications: 0,
    shortlisted: 0,
    hiredThisMonth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [skillFilter, setSkillFilter] = useState("All Skills");

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation("/login");
      return;
    }

    fetchCandidates();
  }, [setLocation]);

  const fetchCandidates = async () => {
    try {
      // Get user companies first to determine context
      const companiesResponse = await auth.fetchAPI("/api/auth/user-companies");
      const companiesData = await companiesResponse.json();
      
      if (companiesData.success && companiesData.data?.length > 0) {
        const primaryCompany = companiesData.data.find((c: any) => c.is_primary);
        const selectedCompany = primaryCompany || companiesData.data[0];
        
        // Fetch candidates (bids) from Giglancer
        const response = await auth.fetchAPI(
          `/api/companies/${selectedCompany.id}/candidates`
        );
        const data = await response.json();
        
        if (data.success) {
          setCandidates(data.data || []);
          setStats(data.stats || stats);
        }
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Statuses" || candidate.status === statusFilter;
    const matchesSkill =
      skillFilter === "All Skills" ||
      candidate.skills.some((skill) => skill === skillFilter);
    return matchesSearch && matchesStatus && matchesSkill;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Shortlisted":
        return "bg-yellow-100 text-yellow-800";
      case "Hired":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#4169E1]">Candidates</h1>
            <p className="text-gray-600 mt-1">
              Browse and manage candidate profiles
            </p>
          </div>
          <Button
            icon={<Plus className="w-4 h-4" />}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Add Candidate
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Total Candidates</p>
                  <p className="text-3xl font-bold text-blue-900 mt-1">
                    {stats.totalCandidates.toLocaleString()}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    ↑ 18% from last month
                  </p>
                </div>
                <Users className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Active Applications</p>
                  <p className="text-3xl font-bold text-green-900 mt-1">
                    {stats.activeApplications.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    ↑ 22% from last month
                  </p>
                </div>
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700">Shortlisted</p>
                  <p className="text-3xl font-bold text-yellow-900 mt-1">
                    {stats.shortlisted}
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">Under review</p>
                </div>
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Hired This Month</p>
                  <p className="text-3xl font-bold text-purple-900 mt-1">
                    {stats.hiredThisMonth}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    ↑ 28% from last month
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
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
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Statuses</option>
                <option>Active</option>
                <option>Shortlisted</option>
                <option>Hired</option>
              </select>
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Skills</option>
                <option>JavaScript</option>
                <option>React</option>
                <option>Node.js</option>
                <option>Python</option>
                <option>UI/UX</option>
                <option>Figma</option>
              </select>
            </div>

            {/* Candidates Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CANDIDATE</TableHead>
                    <TableHead>SKILLS</TableHead>
                    <TableHead>EXPERIENCE</TableHead>
                    <TableHead>LOCATION</TableHead>
                    <TableHead>APPLICATIONS</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead className="text-right">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCandidates.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-gray-500"
                      >
                        No candidates found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {candidate.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {candidate.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                              >
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                +{candidate.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-900">
                            {candidate.experience} years
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600">
                            {candidate.location}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-semibold text-sm">
                            {candidate.applications}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(candidate.status)}>
                            {candidate.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="View Profile"
                            >
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Send Message"
                            >
                              <MessageCircle className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
