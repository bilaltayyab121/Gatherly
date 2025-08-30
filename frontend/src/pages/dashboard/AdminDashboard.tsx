import { useEffect, useState } from "react";
import { getEvents } from "../../api/events";
import type { Event } from "../../types/types";
import EventList from "../../components/events/EventList";
import Loader from "../../components/common/Loader";
import {
  Users,
  Calendar,
  BarChart3,
  Settings,
  UserCheck,
  Download,
  Mail,
  Database,
} from "lucide-react";

// Define types for the dashboard data
interface DashboardStats {
  totalEvents: number;
  totalUsers: number;
  totalParticipations: number;
  pendingApprovals: number;
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    totalUsers: 0,
    totalParticipations: 0,
    pendingApprovals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch events
        const eventsData = await getEvents();
        setEvents(eventsData);

        // Fetch dashboard stats
        const statsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/stats`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!statsResponse.ok) {
          throw new Error("Failed to fetch dashboard statistics");
        }

        const statsData = await statsResponse.json();
        setStats(statsData);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleExportData = async (type: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/export/${type}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to export ${type} data`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}-export-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error(`Failed to export ${type} data`, err);
      alert(`Failed to export ${type} data. Please try again.`);
    }
  };

  const handleUserAction = async (action: string, userId?: string) => {
    try {
      let response;

      switch (action) {
        case "viewUsers":
          // Navigate to users page (implementation depends on your routing)
          console.log("Navigate to users page");
          break;
        case "approveUsers":
          response = await fetch(
            `${import.meta.env.VITE_API_URL}admin/users/pending`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch pending users");
          }

          const pendingUsers = await response.json();
          // Show modal or navigate to approval page
          console.log("Pending users:", pendingUsers);
          break;
        case "manageRoles":
          // Implement role management UI
          console.log("Open role management UI");
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(`Failed to perform ${action}`, err);
      alert(`Failed to perform action. Please try again.`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage events and users</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold">
                {stats.totalParticipations}
              </div>
              <div className="text-sm text-gray-600">Participations</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
              <div className="text-sm text-gray-600">Pending Approvals</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Recent Events</h2>
          <button
            onClick={() => handleExportData("events")}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Download size={16} className="mr-1" />
            Export
          </button>
        </div>
        <EventList events={events.slice(0, 5)} />
      </div>

      {/* Admin Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            User Management
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => handleUserAction("viewUsers")}
              className="block w-full text-left p-3 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200"
            >
              View all users
            </button>
            <button
              onClick={() => handleUserAction("approveUsers")}
              className="block w-full text-left p-3 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200"
            >
              Approve pending users ({stats.pendingApprovals})
            </button>
            <button
              onClick={() => handleUserAction("manageRoles")}
              className="block w-full text-left p-3 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200"
            >
              Manage roles
            </button>
            <button
              onClick={() => handleExportData("users")}
              className="flex items-center w-full text-left p-3 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200"
            >
              <Download size={16} className="mr-2" />
              Export user data
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            System Settings
          </h3>
          <div className="space-y-2">
            <button className="flex items-center w-full text-left p-3 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200">
              <Settings size={16} className="mr-2" />
              General settings
            </button>
            <button className="flex items-center w-full text-left p-3 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200">
              <Mail size={16} className="mr-2" />
              Email templates
            </button>
            <button className="flex items-center w-full text-left p-3 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200">
              <Database size={16} className="mr-2" />
              Backup & restore
            </button>
            <button
              onClick={() => handleExportData("system")}
              className="flex items-center w-full text-left p-3 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200"
            >
              <Download size={16} className="mr-2" />
              Export system data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
