import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent, joinEvent } from "../../api/events";
import type { Event } from "../../types/types";
import EventView from "../../components/events/EventView";
import Alert from "../../components/common/Alert";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../hooks/useAuth";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (id) {
          const data = await getEvent(id);
          setEvent(data);

          // Check if current user has already joined
          if (user && data.participations) {
            const hasParticipated = data.participations.some(
              (p: any) => p.user.id === user.id
            );
            setHasJoined(hasParticipated);
          }
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, user]);

  const handleJoin = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsJoining(true);
    try {
      await joinEvent(id!);
      setSuccess("You have successfully joined the event!");
      setHasJoined(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to join event");
    } finally {
      setIsJoining(false);
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

  const isOrganizer = event.organizers.some((org) => org.id === user?.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {error && (
          <Alert
            variant="danger"
            message={error}
            onClose={() => setError("")}
          />
        )}
        {success && (
          <Alert
            variant="success"
            message={success}
            onClose={() => setSuccess("")}
          />
        )}

        <EventView
          event={event}
          onJoin={handleJoin}
          isJoining={isJoining}
          hasJoined={hasJoined}
          isOrganizer={isOrganizer}
        />
      </div>
    </div>
  );
}
