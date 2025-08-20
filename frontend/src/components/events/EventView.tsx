import type { Event } from '../../types/types';
import Button from '../common/Button';

interface EventViewProps {
  event: Event;
  onJoin: () => void;
  isJoining?: boolean;
  hasJoined?: boolean;
  isOrganizer?: boolean;
}

export default function EventView({ event, onJoin, isJoining, hasJoined, isOrganizer }: EventViewProps) {
  const isPastEvent = new Date(event.endDate) < new Date();
  const availableSeats = event.totalSeats ? event.totalSeats - (event.participations?.length || 0) : null;
  const isFull = availableSeats !== null && availableSeats <= 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
          <p className="text-gray-600 mt-2">
            Organized by: {event.organizers.map(org => org.name).join(', ')}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          event.type === 'ONLINE' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {event.type}
        </span>
      </div>

      <div className="prose prose-gray max-w-none mb-6">
        <p>{event.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Event Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Start:</span>
              <span>{new Date(event.startDate).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">End:</span>
              <span>{new Date(event.endDate).toLocaleString()}</span>
            </div>
            {event.venue && (
              <div className="flex justify-between">
                <span className="text-gray-600">Venue:</span>
                <span>{event.venue}</span>
              </div>
            )}
            {event.joinLink && (
              <div className="flex justify-between">
                <span className="text-gray-600">Join Link:</span>
                <a href={event.joinLink} className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Click to join
                </a>
              </div>
            )}
            {event.totalSeats && (
              <div className="flex justify-between">
                <span className="text-gray-600">Available Seats:</span>
                <span>{availableSeats} / {event.totalSeats}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Contact:</span>
              <span>{event.contactInfo}</span>
            </div>
          </div>
        </div>

        {event.attachments && event.attachments.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Attachments</h3>
            <div className="space-y-2">
              {event.attachments.map((attachment, index) => (
                <a
                  key={index}
                  href={attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Attachment {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {event.questions && event.questions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Joining Criteria</h3>
          <ul className="space-y-2">
            {event.questions.map((question, index) => (
              <li key={index} className="flex items-center">
                <span className="text-sm text-gray-600">
                  {question.question} {question.isRequired && '(Required)'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isOrganizer && (
        <div className="flex justify-end">
          <Button
            onClick={onJoin}
            disabled={hasJoined || isPastEvent || isFull}
            isLoading={isJoining}
          >
            {hasJoined
              ? 'Already Joined'
              : isPastEvent
              ? 'Event Ended'
              : isFull
              ? 'No Seats Available'
              : 'Join Event'}
          </Button>
        </div>
      )}

      {isPastEvent && (
        <div className="mt-4 bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-600">
          This event has already ended.
        </div>
      )}
    </div>
  );
}