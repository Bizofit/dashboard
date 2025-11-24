import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import { auth } from "../lib/auth";
import { StatCard } from "../components/UI/Card";
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
  ArrowRight,
} from "lucide-react";

interface DashboardStats {
  openJobs?: number;
  activeProjects?: number;
  productsListed?: number;
  revenue?: number;
  teamMembers?: number;
  pendingTimesheets?: number;
  pendingInvoices?: number;
  applications?: number;
}

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  time: string;
  status: string;
}

export default function DashboardPage() {
  const [_, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({});
  const [activities, setActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      console.log("No token found, redirecting to login");
      setLocation("/login");
      return;
    }

    console.log("Fetching dashboard stats from API...");

    // Fetch dashboard stats
    auth
      .fetchAPI("/api/dashboard/stats")
      .then((res) => {
        console.log("Dashboard stats response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dashboard stats data received:", data);
        if (data.success) {
          setStats(data.data.stats || {});
          setActivities(data.data.activities || []);
        } else {
          console.error("API returned success:false", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        alert("Failed to load dashboard data. Check console for details.");
      })
      .finally(() => {
        console.log("Dashboard stats loading complete");
        setLoading(false);
      });
  }, [setLocation]);

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
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's what's happening.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" icon={<TrendingUp className="w-4 h-4" />}>
              Analytics
            </Button>
            <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
              Quick Action
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Projects"
            value={stats.activeProjects || 0}
            icon={<Target className="w-6 h-6" />}
            color="blue"
            trend={{ value: 12, positive: true }}
            onClick={() => setLocation("/projects")}
          />
          <StatCard
            title="Open Jobs"
            value={stats.openJobs || 0}
            icon={<Briefcase className="w-6 h-6" />}
            color="green"
            trend={{ value: 8, positive: true }}
            onClick={() => setLocation("/jobs")}
          />
          <StatCard
            title="Team Members"
            value={stats.teamMembers || 0}
            icon={<Users className="w-6 h-6" />}
            color="purple"
            onClick={() => setLocation("/team")}
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${(stats.revenue || 0).toLocaleString()}`}
            icon={<DollarSign className="w-6 h-6" />}
            color="orange"
            trend={{ value: 15, positive: true }}
            onClick={() => setLocation("/analytics")}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Products Listed"
            value={stats.productsListed || 0}
            icon={<ShoppingBag className="w-5 h-5" />}
            color="yellow"
            onClick={() => setLocation("/products")}
          />
          <StatCard
            title="Pending Timesheets"
            value={stats.pendingTimesheets || 0}
            icon={<Clock className="w-5 h-5" />}
            color="red"
            onClick={() => setLocation("/timesheets")}
          />
          <StatCard
            title="Pending Invoices"
            value={stats.pendingInvoices || 0}
            icon={<FileText className="w-5 h-5" />}
            color="blue"
            onClick={() => setLocation("/invoices")}
          />
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No recent activity
                </div>
              ) : (
                <Table>
                  <TableBody>
                    {activities.slice(0, 5).map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {activity.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {activity.type}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              activity.status === "completed"
                                ? "success"
                                : activity.status === "pending"
                                ? "warning"
                                : "default"
                            }
                          >
                            {activity.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-500 text-sm">
                          {activity.time}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setLocation("/jobs")}
              >
                <span>Post a Job</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setLocation("/projects")}
              >
                <span>Create Project</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setLocation("/team")}
              >
                <span>Add Team Member</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setLocation("/products")}
              >
                <span>Add Product</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setLocation("/invoices")}
              >
                <span>Create Invoice</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
