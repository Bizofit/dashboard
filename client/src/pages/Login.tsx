import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { auth } from "../lib/auth";

export default function LoginPage() {
  const [location, setLocation] = useLocation();
  const [showEmployeeLogin, setShowEmployeeLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAccountSwitchMessage, setShowAccountSwitchMessage] =
    useState(false);

  useEffect(() => {
    // Check if user just logged out and needs to switch accounts
    const params = new URLSearchParams(window.location.search);
    if (params.get("switch_account") === "true") {
      setShowAccountSwitchMessage(true);
    }

    // Ensure no residual token exists on login page
    if (auth.isAuthenticated()) {
      console.log("⚠️ Clearing residual token on login page");
      auth.clearToken();
      sessionStorage.clear();
    }
  }, []);

  const handleGoogleLogin = () => {
    // Add prompt=select_account to force Google account chooser
    window.location.href = "/api/auth/google?prompt=select_account";
  };

  const handleEmployeeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const timestamp = Date.now();
      const response = await fetch(`/api/auth/login?_t=${timestamp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        auth.setToken(data.data.token);
        setLocation("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err: any) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl font-bold">
              B
            </div>
            <span className="text-2xl font-bold">Bizoforce</span>
          </div>
          <div className="space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              Welcome to Bizoforce Ecosystem
            </h1>
            <p className="text-xl text-white/90 max-w-lg">
              Generate leads, grow your business, hire talent, manage projects,
              and collaborate seamlessly - all in one powerful platform.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Account Switch Message */}
          {showAccountSwitchMessage && (
            <div className="mb-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-600 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-semibold text-blue-900">
                    Switching Google Accounts?
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Click "Continue with Google" below and you'll be prompted to
                    choose which Google account to use.
                  </p>
                  <button
                    onClick={() => setShowAccountSwitchMessage(false)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-2"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">Sign in with Google to continue</p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              Continue with Google
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  For company employees
                </span>
              </div>
            </div>

            {!showEmployeeLogin ? (
              <button
                onClick={() => setShowEmployeeLogin(true)}
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
              >
                Company Employee Login
              </button>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setShowEmployeeLogin(false)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back
                </button>

                <form onSubmit={handleEmployeeLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50"
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </form>
              </div>
            )}

            <div className="mt-8 space-y-2 text-sm text-gray-600">
              <p>
                <strong>Company Admins & Individual Users:</strong> Use Google
                sign-in above
              </p>
              <p>
                <strong>Company Employees:</strong> Use the work email login if
                invited by your admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
