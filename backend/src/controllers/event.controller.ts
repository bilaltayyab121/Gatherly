import { Request, Response } from "express";
import prisma from "../config/db";
import { User } from "@prisma/client";
import { sendEmail } from "../services/mail.service";
import APIFeatures from "../utils/apiFeatures";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const features = new APIFeatures(prisma.event, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const events = await features.execute(); // Changed from .query() to .execute()

    res.status(200).json({
      status: "success",
      results: events.length,
      data: {
        events,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};
export const getEvent = async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: {
        organizers: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        participations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        questions: true,
      },
    });

    if (!event) {
      throw new Error("No event found with that ID");
    }

    res.status(200).json({
      status: "success",
      data: {
        event,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};

// export const createEvent = async (req: Request, res: Response) => {
//   try {
//     const user = req.user as User;
//     const {
//       title,
//       description,
//       type,
//       venue,
//       joinLink,
//       startDate,
//       endDate,
//       totalSeats,
//       contactInfo,
//       attachments,
//       questions,
//     } = req.body;

//     const event = await prisma.event.create({
//       data: {
//         title,
//         description,
//         type,
//         venue: type === "ONLINE" ? null : venue,
//         joinLink: type === "ONLINE" ? joinLink : null,
//         startDate: new Date(startDate),
//         endDate: new Date(endDate),
//         totalSeats,
//         contactInfo,
//         attachments: attachments || [],
//         organizers: {
//           connect: [{ id: user.id }],
//         },
//         questions: {
//           create: questions?.map(
//             (q: { question: string; isRequired: boolean }) => ({
//               question: q.question,
//               isRequired: q.isRequired,
//             })
//           ),
//         },
//       },
//       include: {
//         organizers: true,
//         questions: true,
//       },
//     });

//     res.status(201).json({
//       status: "success",
//       data: {
//         event,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err instanceof Error ? err.message : "An error occurred",
//     });
//   }
// };

export const createEvent = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    const user = req.user as User;
    const {
      title,
      description,
      type,
      venue,
      joinLink,
      startDate,
      endDate,
      totalSeats,
      contactInfo,
      attachments,
      questions,
    } = req.body;

    console.log("Incoming Event Data:", req.body);
    
    // Validate required fields
    if (!title || !description || !type || !venue || !startDate || !endDate || !totalSeats || !contactInfo) {
  return res.status(400).json({ status: "fail", message: "Missing required fields" });
}


    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ status: "fail", message: "Invalid date format" });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        type,
        venue: type === "ONLINE" ? null : venue,
        joinLink: type === "ONLINE" ? joinLink : null,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        totalSeats,
        contactInfo,
        attachments: attachments || [],
        organizers: {
          connect: [{ id: user.id }],
        },
        questions: questions
          ? {
              create: questions.map(
                (q: { question: string; isRequired: boolean }) => ({
                  question: q.question,
                  isRequired: q.isRequired,
                })
              ),
            }
          : undefined,
      },
      include: {
        organizers: true,
        questions: true,
      },
    });

    res.status(201).json({
      status: "success",
      data: { event },
    });
  } catch (err) {
    console.error(err); // 👈 log full error for debugging
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const eventId = req.params.id;

    // Check if the user is an organizer of the event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { organizers: true },
    });

    if (!event) {
      throw new Error("No event found with that ID");
    }

    const isOrganizer = event.organizers.some(
      (organizer) => organizer.id === user.id
    );

    if (!isOrganizer && user.role !== "ADMIN") {
      throw new Error("You are not authorized to update this event");
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: req.body,
    });

    res.status(200).json({
      status: "success",
      data: {
        event: updatedEvent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const eventId = req.params.id;

    // Check if the user is an organizer of the event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { organizers: true },
    });

    if (!event) {
      throw new Error("No event found with that ID");
    }

    const isOrganizer = event.organizers.some(
      (organizer) => organizer.id === user.id
    );

    if (!isOrganizer && user.role !== "ADMIN") {
      throw new Error("You are not authorized to delete this event");
    }

    await prisma.event.delete({
      where: { id: eventId },
    });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};

export const joinEvent = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const eventId = req.params.id;
    const { answers } = req.body;

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        participations: true,
        questions: true,
      },
    });

    if (!event) {
      throw new Error("No event found with that ID");
    }

    // Check if event has started
    if (new Date(event.startDate) < new Date()) {
      throw new Error("Event has already started");
    }

    // Check if seats are available
    if (event.totalSeats && event.participations.length >= event.totalSeats) {
      throw new Error("No seats available");
    }

    // Check if user has already joined
    const existingParticipation = event.participations.find(
      (participation) => participation.userId === user.id
    );

    if (existingParticipation) {
      throw new Error("You have already joined this event");
    }

    // Validate answers if questions exist
    if (event.questions.length > 0) {
      const requiredQuestions = event.questions.filter((q) => q.isRequired);

      if (!answers || requiredQuestions.some((q) => !answers[q.id])) {
        throw new Error("Please answer all required questions");
      }
    }

    // Create participation
    const participation = await prisma.participation.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        event: {
          connect: { id: eventId },
        },
        answers: {
          create: answers
            ? Object.entries(answers).map(([questionId, answer]) => ({
                question: { connect: { id: questionId } },
                answer: answer as string,
              }))
            : [],
        },
      },
      include: {
        answers: true,
      },
    });

    // Send confirmation email
    await sendEmail({
      email: user.email,
      subject: `Event Registration Confirmation: ${event.title}`,
      text: `You have successfully registered for the event "${event.title}".\n\nEvent Details:\nStart: ${event.startDate}\nEnd: ${event.endDate}\n\nThank you for your participation!`,
    });

    res.status(201).json({
      status: "success",
      data: {
        participation,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};

export const getEventParticipants = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const eventId = req.params.id;

    // Check if user is organizer or admin
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { organizers: true },
    });

    if (!event) {
      throw new Error("No event found with that ID");
    }

    const isOrganizer = event.organizers.some(
      (organizer) => organizer.id === user.id
    );

    if (!isOrganizer && user.role !== "ADMIN") {
      throw new Error("You are not authorized to view participants");
    }

    const participations = await prisma.participation.findMany({
      where: { eventId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        answers: {
          include: {
            question: true,
          },
        },
      },
    });

    res.status(200).json({
      status: "success",
      results: participations.length,
      data: {
        participations,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};
