import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

interface Event {
  id: string;
  title: string;
  date: string;
  attendees: number;
  status: "Active" | "Upcoming" | "Completed";
}

interface DashboardStats {
  totalEvents: number;
  upcomingEvents: number;
  totalAttendees: number;
}

const OrganizerDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [organizerEvents, setOrganizerEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    upcomingEvents: 0,
    totalAttendees: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if API URL is configured
        if (!import.meta.env.VITE_API_URL) {
          throw new Error("API URL is not configured");
        }

        // Fetch organizer events
        const eventsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/organizer/events`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if response is JSON
        const contentType = eventsResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await eventsResponse.text();
          console.error("Non-JSON response received:", text.substring(0, 200));
          throw new Error("Server returned non-JSON response");
        }

        if (!eventsResponse.ok) {
          throw new Error(`Failed to fetch events: ${eventsResponse.status}`);
        }

        const eventsData = await eventsResponse.json();
        setOrganizerEvents(eventsData.data.events || []);

        // Fetch organizer stats
        const statsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/organizer/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if response is JSON
        const statsContentType = statsResponse.headers.get("content-type");
        if (
          !statsContentType ||
          !statsContentType.includes("application/json")
        ) {
          const text = await statsResponse.text();
          console.error("Non-JSON response received:", text.substring(0, 200));
          throw new Error("Server returned non-JSON response");
        }

        if (!statsResponse.ok) {
          throw new Error(`Failed to fetch stats: ${statsResponse.status}`);
        }

        const statsData = await statsResponse.json();
        setStats(statsData.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const handleDeleteEvent = async (eventId: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      // Remove the deleted event from the list
      setOrganizerEvents(
        organizerEvents.filter((event) => event.id !== eventId)
      );

      // Update stats
      const deletedEvent = organizerEvents.find(
        (event) => event.id === eventId
      );
      if (deletedEvent) {
        setStats({
          totalEvents: stats.totalEvents - 1,
          upcomingEvents:
            deletedEvent.status === "Upcoming"
              ? stats.upcomingEvents - 1
              : stats.upcomingEvents,
          totalAttendees: stats.totalAttendees - deletedEvent.attendees,
        });
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
          <br />
          <small>
            API URL: {import.meta.env.VITE_API_URL || "Not configured"}
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Organizer Dashboard
        </h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Events
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalEvents}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Upcoming Events
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.upcomingEvents}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Attendees
          </h2>
          <p className="text-3xl font-bold text-purple-600">
            {stats.totalAttendees.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Your Events</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {organizerEvents.length > 0 ? (
                organizerEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {event.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {event.attendees}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          event.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : event.status === "Upcoming"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No events found. Create your first event to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New Event
        </button>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
