import { useEffect, useState } from "react";

interface MigrationProgress {
  step: string;
  progress: number;
  message: string;
}

interface MigrationPopupProps {
  email: string;
  onComplete: (result: any) => void;
}

export default function MigrationPopup({
  email,
  onComplete,
}: MigrationPopupProps) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Starting migration...");
  const [step, setStep] = useState("");

  useEffect(() => {
    // This will be called during Google OAuth callback
    const params = new URLSearchParams(window.location.search);
    const migrationData = params.get("migration");

    if (migrationData) {
      try {
        const data = JSON.parse(decodeURIComponent(migrationData));
        simulateProgress(data);
      } catch (error) {
        console.error("Error parsing migration data:", error);
      }
    } else {
      // Simulate progress for demonstration
      simulateProgress({
        hasCompany: false,
        roles: ["job_seeker"],
        primaryRole: "job_seeker",
      });
    }
  }, []);

  const simulateProgress = (finalData: any) => {
    const steps = [
      {
        step: "bizoforce",
        progress: 25,
        message: "Checking Bizoforce database...",
        delay: 800,
      },
      {
        step: "giglancer",
        progress: 50,
        message: "Checking Giglancer database...",
        delay: 1600,
      },
      {
        step: "screenly",
        progress: 75,
        message: "Checking Screenly database...",
        delay: 2400,
      },
      {
        step: "work",
        progress: 85,
        message: "Checking Work.Bizoforce database...",
        delay: 3200,
      },
      {
        step: "roles",
        progress: 90,
        message: "Determining user roles...",
        delay: 3800,
      },
      {
        step: "unified",
        progress: 95,
        message: "Setting up your dashboard...",
        delay: 4400,
      },
      {
        step: "complete",
        progress: 100,
        message: "Dashboard ready!",
        delay: 5000,
      },
    ];

    steps.forEach(({ step, progress, message, delay }) => {
      setTimeout(() => {
        setStep(step);
        setProgress(progress);
        setMessage(message);

        if (progress === 100) {
          setTimeout(() => {
            onComplete(finalData);
          }, 500);
        }
      }, delay);
    });
  };

  const getStepIcon = (stepName: string) => {
    const icons: { [key: string]: string } = {
      bizoforce: "🛍️",
      giglancer: "💼",
      screenly: "🎥",
      work: "📊",
      roles: "👥",
      unified: "🚀",
      complete: "✅",
    };
    return icons[stepName] || "⏳";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-3xl">{getStepIcon(step)}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Setting Up Your Dashboard
          </h2>
          <p className="text-gray-600">
            We're checking all your accounts across the Bizoforce ecosystem
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{message}</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Steps Checklist */}
        <div className="space-y-3">
          {[
            {
              key: "bizoforce",
              label: "Bizoforce (Marketplace)",
              threshold: 25,
            },
            { key: "giglancer", label: "Giglancer (Jobs)", threshold: 50 },
            {
              key: "screenly",
              label: "Screenly (AI Screening)",
              threshold: 75,
            },
            { key: "work", label: "Work.Bizoforce (Projects)", threshold: 85 },
            { key: "unified", label: "Unified Dashboard", threshold: 95 },
          ].map((item) => (
            <div
              key={item.key}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                progress >= item.threshold
                  ? "bg-green-50 text-green-700"
                  : progress >= item.threshold - 10
                  ? "bg-blue-50 text-blue-700"
                  : "bg-gray-50 text-gray-400"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  progress >= item.threshold
                    ? "bg-green-500 text-white"
                    : progress >= item.threshold - 10
                    ? "bg-blue-500 text-white animate-pulse"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {progress >= item.threshold ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : progress >= item.threshold - 10 ? (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                ) : (
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                )}
              </div>
              <span className="font-medium text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            This may take a few seconds while we consolidate your data from
            multiple platforms
          </p>
        </div>
      </div>
    </div>
  );
}
