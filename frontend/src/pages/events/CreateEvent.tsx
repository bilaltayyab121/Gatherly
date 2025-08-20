import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../api/events';
import type { EventFormData } from '../../components/events/EventForm';
import EventForm from '../../components/events/EventForm';
import Alert from '../../components/common/Alert';
import Card from '../../components/common/Card';

export default function CreateEvent() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: EventFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await createEvent(data);
      navigate('/events');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create event');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
          <p className="text-gray-600 mt-2">Fill in the details to create a new event</p>
        </div>

        <Card>
          {error && (
            <Alert variant="danger" message={error} onClose={() => setError('')} />
          )}
          
          <EventForm onSubmit={handleSubmit} isLoading={isLoading} />
        </Card>
      </div>
    </div>
  );
}