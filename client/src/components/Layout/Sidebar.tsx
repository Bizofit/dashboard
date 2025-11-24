import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Home,
  Briefcase,
  ShoppingBag,
  Users,
  FileText,
  Clock,
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building2,
  UserCircle,
  BarChart3,
  Target,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  userRole?: string;
  userName?: string;
  userEmail?: string;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
}

export default function Sidebar({
  userRole = "company_admin",
  userName = "User",
  userEmail = "",
}: SidebarProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const companyNavItems: NavItem[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <Home className="w-5 h-5" />,
      roles: ["company_admin", "hr", "team_lead", "finance", "vendor"],
    },
    {
      label: "Companies",
      path: "/companies",
      icon: <Building2 className="w-5 h-5" />,
      roles: ["company_admin"],
    },
    {
      label: "Products",
      path: "/products",
      icon: <ShoppingBag className="w-5 h-5" />,
      roles: ["company_admin", "vendor"],
    },
    {
      label: "Jobs",
      path: "/jobs",
      icon: <Briefcase className="w-5 h-5" />,
      roles: ["company_admin", "hr"],
    },
    {
      label: "Projects",
      path: "/projects",
      icon: <Target className="w-5 h-5" />,
      roles: ["company_admin", "team_lead", "finance"],
    },
    {
      label: "Team",
      path: "/team",
      icon: <Users className="w-5 h-5" />,
      roles: ["company_admin", "hr", "team_lead"],
    },
    {
      label: "Timesheets",
      path: "/timesheets",
      icon: <Clock className="w-5 h-5" />,
      roles: ["company_admin", "team_lead", "finance"],
    },
    {
      label: "Invoices",
      path: "/invoices",
      icon: <FileText className="w-5 h-5" />,
      roles: ["company_admin", "finance"],
    },
    {
      label: "Analytics",
      path: "/analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      roles: ["company_admin", "finance"],
    },
  ];

  const individualNavItems: NavItem[] = [
    {
      label: "Dashboard",
      path: "/individual-dashboard",
      icon: <Home className="w-5 h-5" />,
      roles: ["job_seeker", "freelancer"],
    },
    {
      label: "Job Search",
      path: "/job-search",
      icon: <Briefcase className="w-5 h-5" />,
      roles: ["job_seeker", "freelancer"],
    },
    {
      label: "My Projects",
      path: "/my-projects",
      icon: <Target className="w-5 h-5" />,
      roles: ["freelancer"],
    },
    {
      label: "My Timesheets",
      path: "/my-timesheets",
      icon: <Clock className="w-5 h-5" />,
      roles: ["freelancer"],
    },
    {
      label: "Earnings",
      path: "/earnings",
      icon: <DollarSign className="w-5 h-5" />,
      roles: ["freelancer"],
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <UserCircle className="w-5 h-5" />,
      roles: ["job_seeker", "freelancer"],
    },
  ];

  const isIndividual = ["job_seeker", "freelancer"].includes(userRole);
  const navItems = isIndividual ? individualNavItems : companyNavItems;

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const handleLogout = () => {
    // Import auth utility at the top of file if not already done
    sessionStorage.removeItem("jwt_token");
    window.location.href = "/login";
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = location === item.path;

    return (
      <Link href={item.path}>
        <a
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive
              ? "bg-orange-500 text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-100"
          } ${collapsed ? "justify-center" : ""}`}
          onClick={() => setMobileOpen(false)}
        >
          {item.icon}
          {!collapsed && <span className="font-medium">{item.label}</span>}
        </a>
      </Link>
    );
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 py-6 border-b border-gray-200 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          B
        </div>
        {!collapsed && (
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">Bizoforce</h1>
            <p className="text-xs text-gray-500">Unified Dashboard</p>
          </div>
        )}
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{userName}</p>
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                {userRole.replace("_", " ")}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item, index) => (
          <NavLink key={index} item={item} />
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-gray-200 p-3 space-y-1">
        <Link href="/settings">
          <a
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <Settings className="w-5 h-5" />
            {!collapsed && <span className="font-medium">Settings</span>}
          </a>
        </Link>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle - Desktop Only */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 relative ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 flex flex-col ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
