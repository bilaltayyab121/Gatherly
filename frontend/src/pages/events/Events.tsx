import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../../api/events';
import type { Event } from '../../types/types';
import EventList from '../../components/events/EventList';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/common/Loader';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

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

  const handleDelete = async (id: string) => {
    // Implement delete functionality
    console.log('Delete event:', id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Events</h1>
          <p className="text-gray-600 mt-2">Discover and join amazing events</p>
        </div>
        
        {isAuthenticated && (user?.role === 'ADMIN' || user?.role === 'ORGANIZER') && (
          <Link to="/events/create">
            <Button>Create Event</Button>
          </Link>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <EventList events={events} onDelete={handleDelete} />
      )}
    </div>
  );
}