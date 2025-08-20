import { api } from ".";
import type { Event, Participation, Question } from "../types/types";

export const getEvents = async (params = {}): Promise<Event[]> => {
  const response = await api.get("/events", { params });
  return response.data.data.events;
};

export const getEvent = async (id: string): Promise<Event> => {
  const response = await api.get(`/events/${id}`);
  return response.data.data.event;
};

export const createEvent = async (data: {
  title: string;
  description: string;
  type: "ONLINE" | "ONSITE";
  venue?: string;
  joinLink?: string;
  startDate: string;
  endDate: string;
  totalSeats?: number;
  contactInfo: string;
  attachments?: string[];
  questions?: Omit<Question, "id" | "createdAt" | "updatedAt">[];
}): Promise<Event> => {
  const response = await api.post("/events", data);
  return response.data.data.event;
};

export const updateEvent = async (
  id: string,
  data: Partial<Event>
): Promise<Event> => {
  const response = await api.patch(`/events/${id}`, data);
  return response.data.data.event;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/events/${id}`);
};

export const joinEvent = async (
  id: string,
  answers?: Record<string, string>
): Promise<Participation> => {
  const response = await api.post(`/events/${id}/join`, { answers });
  return response.data.data.participation;
};

export const getEventParticipants = async (
  id: string
): Promise<Participation[]> => {
  const response = await api.get(`/events/${id}/participants`);
  return response.data.data.participations;
};
