import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";
import Sidebar from "./Sidebar";
import { auth } from "../../lib/auth";

interface MainLayoutProps {
  children: ReactNode;
}

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  roles?: Array<{ role: string; isPrimary: boolean }>;
  primaryRole?: string;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation("/login");
      return;
    }

    // ALWAYS fetch fresh user data from API - NO CACHE
    console.log("Fetching fresh user profile from API...");
    auth
      .getCurrentUser()
      .then((userData) => {
        console.log("User profile fetched from API:", userData);
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        // Clear invalid token and redirect to login
        auth.clearToken();
        setLocation("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setLocation]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const userName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.email.split("@")[0];

  const userRole =
    user.primaryRole ||
    user.roles?.find((r) => r.isPrimary)?.role ||
    "company_admin";

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={userRole} userName={userName} userEmail={user.email} />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
