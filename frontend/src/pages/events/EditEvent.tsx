import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEvent, updateEvent } from '../../api/events';
import Event from '../../components/events/EventForm';
import type { EventFormData } from '../../components/events/EventForm';
import EventForm from '../../components/events/EventForm';
import Alert from '../../components/common/Alert';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';

export default function EditEvent() {
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (id) {
          const data = await getEvent(id);
          setEvent(data);
        }
      } catch (err) {
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (data: EventFormData) => {
    try {
      setIsLoading(true);
      setError('');
      if (id) {
        await updateEvent(id, data);
        navigate('/events');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update event');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="danger" message="Event not found" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
          <p className="text-gray-600 mt-2">Update the details of your event</p>
        </div>

        <Card>
          {error && (
            <Alert variant="danger" message={error} onClose={() => setError('')} />
          )}
          
          <EventForm event={event} onSubmit={handleSubmit} isLoading={isLoading} />
        </Card>
      </div>
    </div>
  );
}