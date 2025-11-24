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
import Modal from "../components/UI/Modal";
import Input, { Select } from "../components/UI/Input";
import { Plus, Users, Mail, UserPlus, Shield } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  isActive: boolean;
}

export default function TeamPage() {
  const [_, setLocation] = useLocation();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLocation("/login");
      return;
    }

    const timestamp = Date.now();
    fetch(`/api/team?_t=${timestamp}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTeam(data.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Team Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your team members and roles
            </p>
          </div>
          <Button
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Member
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {team.length}
                  </p>
                </div>
                <Users className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {team.filter((m) => m.isActive).length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {new Set(team.map((m) => m.department)).size}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600">Roles</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {new Set(team.map((m) => m.role)).size}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-0">
            {team.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No team members yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start building your team by adding members
                </p>
                <Button onClick={() => setIsModalOpen(true)}>Add Member</Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {member.name.charAt(0)}
                          </div>
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {member.email}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-gray-400" />
                          <span className="capitalize">
                            {member.role.replace("_", " ")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>
                        {new Date(member.joinDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={member.isActive ? "success" : "default"}
                        >
                          {member.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<Mail className="w-4 h-4" />}
                          >
                            Email
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<UserPlus className="w-4 h-4" />}
                          >
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Team Member"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">Send Invitation</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Full Name" placeholder="John Doe" required />
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Role"
              options={[
                { value: "team_member", label: "Team Member" },
                { value: "team_lead", label: "Team Lead" },
                { value: "hr", label: "HR Manager" },
                { value: "finance", label: "Finance" },
              ]}
              required
            />
            <Select
              label="Department"
              options={[
                { value: "engineering", label: "Engineering" },
                { value: "sales", label: "Sales" },
                { value: "marketing", label: "Marketing" },
                { value: "hr", label: "Human Resources" },
              ]}
              required
            />
          </div>
          <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
            An invitation email will be sent to the member with setup
            instructions.
          </p>
        </div>
      </Modal>
    </MainLayout>
  );
}
