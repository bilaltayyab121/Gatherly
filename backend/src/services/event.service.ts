import { Event, Participation, Prisma, Question, User } from '@prisma/client';
import prisma from '../config/db';
import AppError from '../utils/appError';
import { sendEmail } from './mail.service';

type EventWithRelations = Event & {
  organizers: User[];
  participations: (Participation & { user: User })[];
  questions: Question[];
};

export const createEvent = async (
  data: Prisma.EventCreateInput,
  organizerId: string
): Promise<EventWithRelations> => {
  return prisma.event.create({
    data: {
      ...data,
      organizers: {
        connect: { id: organizerId },
      },
    },
    include: {
      organizers: true,
      participations: {
        include: {
          user: true,
        },
      },
      questions: true,
    },
  });
};

export const getEventById = async (id: string): Promise<EventWithRelations | null> => {
  return prisma.event.findUnique({
    where: { id },
    include: {
      organizers: true,
      participations: {
        include: {
          user: true,
        },
      },
      questions: true,
    },
  });
};

export const joinEvent = async (
  eventId: string,
  userId: string,
  answers?: Record<string, string>
): Promise<Participation> => {
  const event = await getEventById(eventId);
  
  if (!event) {
    throw new AppError('No event found with that ID', 404);
  }

  // Check if event has started
  if (new Date(event.startDate) < new Date()) {
    throw new AppError('Event has already started', 400);
  }

  // Check if seats are available
  if (event.totalSeats && event.participations.length >= event.totalSeats) {
    throw new AppError('No seats available', 400);
  }

  // Check if user has already joined
  const existingParticipation = event.participations.find(
    (participation) => participation.user.id === userId
  );

  if (existingParticipation) {
    throw new AppError('You have already joined this event', 400);
  }

  // Create participation
  const participation = await prisma.participation.create({
    data: {
      user: {
        connect: { id: userId },
      },
      event: {
        connect: { id: eventId },
      },
      answers: answers
        ? {
            create: Object.entries(answers).map(([questionId, answer]) => ({
              question: { connect: { id: questionId } },
              answer,
            })),
          }
        : undefined,
    },
    include: {
      answers: {
        include: {
          question: true,
        },
      },
    },
  });

  // Send confirmation email
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user) {
    await sendEmail({
      email: user.email,
      subject: `Event Registration Confirmation: ${event.title}`,
      text: `You have successfully registered for the event "${event.title}".\n\nEvent Details:\nStart: ${event.startDate}\nEnd: ${event.endDate}\n\nThank you for your participation!`,
    });
  }

  return participation;
};