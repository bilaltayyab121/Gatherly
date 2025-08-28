import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { Event } from "../../types/types";
import Button from "../common/Button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

interface EventCardProps {
  event: Event;
  onDelete?: (id: string) => void;
  onJoin?: (id: string) => void;
  onLeave?: (id: string) => void;
  showActions?: boolean;
  showOrganizerActions?: boolean;
  showJoinButton?: boolean;
}

export default function EventCard({
  event,
  onDelete,
  onJoin,
  onLeave,
  showActions = true,
  showOrganizerActions = false,
}: EventCardProps) {
  const { user, isAuthenticated } = useAuth();
  const isPastEvent = new Date(event.endDate) < new Date();
  const availableSeats = event.totalSeats
    ? event.totalSeats - (event.participations?.length || 0)
    : null;

  const isParticipating = event.participations?.some(
    (participation) => participation.user?.id === user?.id
  );

  const isOrganizer =
    event.organizers?.some((organizer) => organizer.id === user?.id) ||
    user?.role === "ADMIN";

  const canJoin =
    !isPastEvent &&
    availableSeats !== null &&
    availableSeats > 0 &&
    !isParticipating &&
    !isOrganizer;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {event.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {formatDate(event.startDate)} • {formatTime(event.startDate)} -{" "}
                {formatTime(event.endDate)}
              </span>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              event.type === "ONLINE"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {event.type}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-3 text-sm text-gray-600 mb-4">
          {event.venue && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.venue}</span>
            </div>
          )}

          {event.joinLink && event.type === "ONLINE" && (
            <div className="flex items-center">
              <span className="font-medium">Join Link:</span>
              <a
                href={event.joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-600 hover:underline"
              >
                Click here to join
              </a>
            </div>
          )}

          {event.totalSeats && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>
                {availableSeats} of {event.totalSeats} seats available
                {availableSeats === 0 && (
                  <span className="ml-2 text-red-600 font-medium">(Full)</span>
                )}
              </span>
            </div>
          )}

          <div className="flex items-center">
            <span className="font-medium">Organized by:</span>
            <span className="ml-2">
              {event.organizers?.map((org) => org.name).join(", ")}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link
            to={`/events/${event.id}`}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            View Details
          </Link>

          {showActions && isAuthenticated && (
            <div className="flex space-x-2">
              {/* Join/Leave buttons for participants */}
              {!isOrganizer && (
                <>
                  {canJoin && onJoin && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onJoin(event.id)}
                    >
                      Join Event
                    </Button>
                  )}

                  {isParticipating && onLeave && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onLeave(event.id)}
                    >
                      Leave Event
                    </Button>
                  )}
                </>
              )}

              {/* Organizer actions */}
              {showOrganizerActions && isOrganizer && (
                <>
                  <Link to={`/events/${event.id}/edit`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
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
                </>
              )}
            </div>
          )}
        </div>

        {isPastEvent && (
          <div className="mt-3 bg-gray-100 px-3 py-2 rounded text-sm text-gray-600 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Past Event
          </div>
        )}

        {isParticipating && !isPastEvent && (
          <div className="mt-3 bg-green-100 px-3 py-2 rounded text-sm text-green-800">
            You're attending this event
          </div>
        )}
      </div>
    </div>
  );
}
