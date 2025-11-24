import { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/UI/Card";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { User, Bell, Shield, CreditCard, Building2, Save } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
    },
    { id: "security", label: "Security", icon: <Shield className="w-5 h-5" /> },
    {
      id: "billing",
      label: "Billing",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "company",
      label: "Company",
      icon: <Building2 className="w-5 h-5" />,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <Card className="lg:col-span-1">
            <CardContent className="p-0">
              <nav className="space-y-1 p-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-orange-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      U
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Upload Photo
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        JPG or PNG. Max 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" placeholder="John" />
                    <Input label="Last Name" placeholder="Doe" />
                  </div>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                  />
                  <Input label="Phone Number" placeholder="+1 (555) 000-0000" />
                  <Input label="Job Title" placeholder="Software Engineer" />

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline">Cancel</Button>
                    <Button
                      variant="primary"
                      icon={<Save className="w-4 h-4" />}
                    >
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      {
                        label: "Email Notifications",
                        description: "Receive email updates about your account",
                      },
                      {
                        label: "Push Notifications",
                        description:
                          "Receive push notifications in your browser",
                      },
                      {
                        label: "Job Alerts",
                        description: "Get notified about new job postings",
                      },
                      {
                        label: "Project Updates",
                        description: "Updates about your projects",
                      },
                      {
                        label: "Team Activity",
                        description: "Notifications about team member activity",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                      variant="primary"
                      icon={<Save className="w-4 h-4" />}
                    >
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <Input label="Current Password" type="password" />
                      <Input label="New Password" type="password" />
                      <Input label="Confirm New Password" type="password" />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                      variant="primary"
                      icon={<Save className="w-4 h-4" />}
                    >
                      Update Security
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "billing" && (
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white">
                    <p className="text-sm opacity-90">Current Plan</p>
                    <h3 className="text-2xl font-bold mt-1">Professional</h3>
                    <p className="text-3xl font-bold mt-4">
                      $99<span className="text-lg font-normal">/month</span>
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 border-white text-white hover:bg-white hover:text-orange-500"
                    >
                      Upgrade Plan
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Payment Method
                    </h3>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-gray-400" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600">Expires 12/24</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Billing History
                    </h3>
                    <div className="space-y-2">
                      {[
                        {
                          date: "Nov 1, 2025",
                          amount: "$99.00",
                          status: "Paid",
                        },
                        {
                          date: "Oct 1, 2025",
                          amount: "$99.00",
                          status: "Paid",
                        },
                        {
                          date: "Sep 1, 2025",
                          amount: "$99.00",
                          status: "Paid",
                        },
                      ].map((invoice, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded"
                        >
                          <span className="text-gray-900">{invoice.date}</span>
                          <span className="font-semibold">
                            {invoice.amount}
                          </span>
                          <span className="text-green-600">
                            {invoice.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "company" && (
              <Card>
                <CardHeader>
                  <CardTitle>Company Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input label="Company Name" placeholder="Acme Corporation" />
                  <Input label="Website" placeholder="https://example.com" />
                  <Input label="Industry" placeholder="Technology" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Company Size" placeholder="1-10 employees" />
                    <Input label="Founded Year" placeholder="2020" />
                  </div>
                  <Input
                    label="Address"
                    placeholder="123 Main St, City, Country"
                  />
                  <Input label="Phone" placeholder="+1 (555) 000-0000" />

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline">Cancel</Button>
                    <Button
                      variant="primary"
                      icon={<Save className="w-4 h-4" />}
                    >
                      Save Changes
                    </Button>
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
