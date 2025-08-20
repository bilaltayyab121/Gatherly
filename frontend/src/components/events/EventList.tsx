import type { Event } from '../../types/types';
import EventCard from './EventCard';

interface EventListProps {
  events: Event[];
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

export default function EventList({ events, onDelete, isLoading }: EventListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📅</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
        <p className="text-gray-500">There are no events available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onDelete={onDelete} />
      ))}
    </div>
  );
}