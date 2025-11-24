import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import MigrationPopup from "../components/MigrationPopup";
import RoleSelectionPopup from "../components/RoleSelectionPopup";
import { auth } from "../lib/auth";

export default function AuthCallback() {
  const [_, setLocation] = useLocation();
  const [showMigration, setShowMigration] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");
    const showMigration = params.get("showMigration") === "true";
    const isNewUser = params.get("newUser") === "true";
    const isTrulyNewUser = params.get("trulyNewUser") === "true";

    if (token) {
      auth.setToken(token);

      // Always show migration progress if showMigration flag is set
      if (showMigration && email) {
        setUserEmail(email);
        setShowMigration(true);
      } else {
        // Fallback: existing logic for backward compatibility
        if (isTrulyNewUser && email) {
          setUserEmail(email);
          setShowMigration(true);
        } else if (isNewUser && email) {
          setUserEmail(email);
          setShowMigration(true);
        } else {
          setLocation("/dashboard");
        }
      }
    } else {
      setLocation("/login?error=auth_failed");
    }
  }, [setLocation]);

  const handleMigrationComplete = async (result: any) => {
    console.log("Migration complete:", result);
    setShowMigration(false);

    // Wait a moment for database to be consistent
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if we need to show role selection
    const params = new URLSearchParams(window.location.search);
    const isTrulyNewUser = params.get("trulyNewUser") === "true";

    if (isTrulyNewUser) {
      setShowRoleSelection(true);
    } else {
      // For existing users, redirect based on their primary role
      const primaryRole = result.primaryRole || "job_seeker";
      const individualRoles = ["job_seeker", "freelancer"];

      if (individualRoles.includes(primaryRole)) {
        console.log("🔀 Redirecting individual user to individual dashboard");
        setLocation("/individual-dashboard");
      } else {
        console.log("🔀 Redirecting company user to company dashboard");
        setLocation("/dashboard");
      }
    }
  };

  const handleRoleSelection = async (role: "company" | "individual") => {
    console.log("User selected role:", role);

    try {
      // Send role selection to backend
      const response = await auth.fetchAPI("/api/auth/select-role", {
        method: "POST",
        body: JSON.stringify({ role }),
      });

      if (response.ok) {
        // Redirect based on selected role
        if (role === "company") {
          setLocation("/company-setup");
        } else {
          // Individual users go to resume upload dashboard
          setLocation("/individual-dashboard");
        }
      } else {
        console.error("Failed to save role selection");
        setLocation("/dashboard");
      }
    } catch (error) {
      console.error("Error saving role:", error);
      setLocation("/dashboard");
    }
  };

  if (showRoleSelection) {
    return (
      <RoleSelectionPopup
        email={userEmail}
        onSelectRole={handleRoleSelection}
      />
    );
  }

  if (showMigration) {
    return (
      <MigrationPopup email={userEmail} onComplete={handleMigrationComplete} />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}
