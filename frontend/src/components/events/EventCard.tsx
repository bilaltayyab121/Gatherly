import { Link } from "react-router-dom";
import type { Event } from "../../types/types";
import Button from "../common/Button";

interface EventCardProps {
  event: Event;
  onDelete?: (id: string) => void;
}

export default function EventCard({ event, onDelete }: EventCardProps) {
  const isPastEvent = new Date(event.endDate) < new Date();
  const availableSeats = event.totalSeats
    ? event.totalSeats - (event.participations?.length || 0)
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              event.type === "ONLINE"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {event.type}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <span className="font-medium">Date:</span>
            <span className="ml-2">
              {new Date(event.startDate).toLocaleDateString()} -{" "}
              {new Date(event.endDate).toLocaleDateString()}
            </span>
          </div>

          {event.totalSeats && (
            <div className="flex items-center">
              <span className="font-medium">Seats:</span>
              <span className="ml-2">
                {availableSeats} / {event.totalSeats} available
              </span>
            </div>
          )}

          <div className="flex items-center">
            <span className="font-medium">Organized by:</span>
            <span className="ml-2">
              {event.organizers.map((org) => org.name).join(", ")}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link
            to={`/events/${event.id}`}
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            View Details
          </Link>

          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(event.id)}
            >
              Delete
            </Button>
          )}
        </div>

        {isPastEvent && (
          <div className="mt-3 bg-gray-100 px-3 py-1 rounded text-xs text-gray-600">
            Past Event
          </div>
        )}
      </div>
    </div>
  );
}
