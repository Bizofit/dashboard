import { useState } from "react";

interface RoleSelectionPopupProps {
  email: string;
  onSelectRole: (role: "company" | "individual") => void;
}

export default function RoleSelectionPopup({
  email,
  onSelectRole,
}: RoleSelectionPopupProps) {
  const [selectedRole, setSelectedRole] = useState<
    "company" | "individual" | null
  >(null);

  const handleContinue = () => {
    if (selectedRole) {
      onSelectRole(selectedRole);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🎯</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Bizoforce!
          </h2>
          <p className="text-gray-600 text-lg">
            We're excited to have you here,{" "}
            <strong>{email.split("@")[0]}</strong>!
          </p>
          <p className="text-gray-500 mt-2">
            Let's get you set up. How would you like to use Bizoforce?
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Company Option */}
          <div
            onClick={() => setSelectedRole("company")}
            className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
              selectedRole === "company"
                ? "border-blue-600 bg-blue-50 shadow-lg scale-105"
                : "border-gray-200 hover:border-blue-300 hover:shadow-md"
            }`}
          >
            {selectedRole === "company" && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏢</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                I'm a Company
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Perfect for businesses looking to hire, manage projects, and
                sell products
              </p>

              {/* Features */}
              <div className="text-left space-y-2">
                <div className="flex items-start text-sm text-gray-700">
                  <svg
                    className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Post jobs & hire talent</span>
                </div>
                <div className="flex items-start text-sm text-gray-700">
                  <svg
                    className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Manage projects & teams</span>
                </div>
                <div className="flex items-start text-sm text-gray-700">
                  <svg
                    className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Sell products & services</span>
                </div>
                <div className="flex items-start text-sm text-gray-700">
                  <svg
                    className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Track invoices & revenue</span>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Option */}
          <div
            onClick={() => setSelectedRole("individual")}
            className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
              selectedRole === "individual"
                ? "border-purple-600 bg-purple-50 shadow-lg scale-105"
                : "border-gray-200 hover:border-purple-300 hover:shadow-md"
            }`}
          >
            {selectedRole === "individual" && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                I'm an Individual
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Perfect for job seekers, freelancers, and professionals
              </p>

              {/* Features */}
              <div className="text-left space-y-2">
                <div className="flex items-start text-sm text-gray-700">
                  <svg
                    className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Find and apply to jobs</span>
                </div>
                <div className="flex items-start text-sm text-gray-700">
                  <svg
                    className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Build your profile & portfolio</span>
                </div>
                <div className="flex items-start text-sm text-gray-700">
                  <svg
                    className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Track projects & timesheets</span>
                </div>
                <div className="flex items-start text-sm text-gray-700">
                  <svg
                    className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Manage your earnings</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
              selectedRole
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {selectedRole ? "Continue" : "Select an option to continue"}
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Don't worry, you can always change this later!
          </p>
        </div>
      </div>
    </div>
  );
}
