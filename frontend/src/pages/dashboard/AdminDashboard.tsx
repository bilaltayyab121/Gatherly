import { useEffect, useState } from 'react';
import { getEvents } from '../../api/events';
import type { Event } from '../../types/types';
import EventList from '../../components/events/EventList';
import Loader from '../../components/common/Loader';
import { Users, Calendar, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch events', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage events and users</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Calendar className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold">{events.length}</div>
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
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-gray-600">Participations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Events</h2>
        {loading ? (
          <Loader />
        ) : (
          <EventList events={events.slice(0, 5)} />
        )}
      </div>

      {/* Admin Actions */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">User Management</h3>
          <div className="space-y-2">
            <button className="block w-full text-left p-2 hover:bg-gray-50 rounded">
              View all users
            </button>
            <button className="block w-full text-left p-2 hover:bg-gray-50 rounded">
              Manage roles
            </button>
            <button className="block w-full text-left p-2 hover:bg-gray-50 rounded">
              User statistics
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">System Settings</h3>
          <div className="space-y-2">
            <button className="block w-full text-left p-2 hover:bg-gray-50 rounded">
              General settings
            </button>
            <button className="block w-full text-left p-2 hover:bg-gray-50 rounded">
              Email templates
            </button>
            <button className="block w-full text-left p-2 hover:bg-gray-50 rounded">
              Backup & restore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}