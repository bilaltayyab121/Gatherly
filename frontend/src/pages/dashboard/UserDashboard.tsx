import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../../api/events';
import type { Event } from '../../types/types';
import EventList from '../../components/events/EventList';
import Loader from '../../components/common/Loader';
import { Calendar, Plus } from 'lucide-react';

export default function UserDashboard() {
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your event dashboard</p>
        </div>
        
        <Link to="/events/create">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Create Event
          </button>
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        {loading ? (
          <Loader />
        ) : (
          <EventList events={events.slice(0, 6)} />
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary-600" />
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link to="/events" className="block text-primary-600 hover:text-primary-800">
              Browse all events
            </Link>
            <Link to="/events/create" className="block text-primary-600 hover:text-primary-800">
              Create new event
            </Link>
            <Link to="/profile" className="block text-primary-600 hover:text-primary-800">
              View profile
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">{events.length}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Events Joined</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}