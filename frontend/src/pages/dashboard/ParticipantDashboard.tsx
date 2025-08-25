// pages/dashboard/ParticipantDashboard.tsx
import { useState, useEffect } from "react";
// import { useAuth } from "../../hooks/useAuth";
import { getUserEvents } from "../../api/events";
import type { Event } from "../../types/types";
import EventCard from "../../components/events/EventCard";

export default function ParticipantDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
//   const { user } = useAuth();

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const eventsData = await getUserEvents();
        // Ensure eventsData is always an array, even if API returns undefined/null
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      } catch (err) {
        console.error("Failed to load user events", err);
        setError("Failed to load your events. Please try again later.");
        setEvents([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading your events...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Events</h1>
      
      {!events || events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't joined any events yet.</p>
          <a 
            href="/events" 
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Browse Events
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              showJoinButton={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}