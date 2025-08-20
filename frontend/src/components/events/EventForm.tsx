import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { Event, Question } from "../../types/types";
import Button from "../common/Button";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Select from "../common/Select";

interface EventFormProps {
  event?: Event;
  onSubmit: SubmitHandler<EventFormData>;
  isLoading?: boolean;
}

export interface EventFormData {
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
}

export default function EventForm({
  event,
  onSubmit,
  isLoading,
}: EventFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<EventFormData>();

  const [questions, setQuestions] = useState<
    Omit<Question, "id" | "createdAt" | "updatedAt">[]
  >([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  const eventType = watch("type", event?.type || "ONSITE");

  useEffect(() => {
    if (event) {
      reset({
        title: event.title,
        description: event.description,
        type: event.type,
        venue: event.venue || "",
        joinLink: event.joinLink || "",
        startDate: event.startDate.split("T")[0],
        endDate: event.endDate.split("T")[0],
        totalSeats: event.totalSeats,
        contactInfo: event.contactInfo,
        attachments: event.attachments,
      });
      if (event.questions) {
        setQuestions(
          event.questions.map((q) => ({
            question: q.question,
            isRequired: q.isRequired,
          }))
        );
      }
    }
  }, [event, reset]);

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { question: newQuestion, isRequired }]);
      setNewQuestion("");
      setIsRequired(false);
    }
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data: EventFormData) => {
    onSubmit({
      ...data,
      questions: questions.length > 0 ? questions : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Input
        label="Event Title"
        id="title"
        {...register("title", { required: "Title is required" })}
        error={errors.title?.message}
      />

      <Textarea
        label="Description"
        id="description"
        {...register("description", { required: "Description is required" })}
        error={errors.description?.message}
        rows={4}
      />

      <Select
        label="Event Type"
        id="type"
        {...register("type")}
        options={[
          { value: "ONSITE", label: "Onsite" },
          { value: "ONLINE", label: "Online" },
        ]}
      />

      {eventType === "ONSITE" ? (
        <Input
          label="Venue"
          id="venue"
          {...register("venue", {
            required: "Venue is required for onsite events",
          })}
          error={errors.venue?.message}
        />
      ) : (
        <Input
          label="Join Link"
          id="joinLink"
          {...register("joinLink", {
            required: "Join link is required for online events",
          })}
          error={errors.joinLink?.message}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Start Date"
          id="startDate"
          type="datetime-local"
          {...register("startDate", { required: "Start date is required" })}
          error={errors.startDate?.message}
        />
        <Input
          label="End Date"
          id="endDate"
          type="datetime-local"
          {...register("endDate", { required: "End date is required" })}
          error={errors.endDate?.message}
        />
      </div>

      <Input
        label="Total Seats (optional)"
        id="totalSeats"
        type="number"
        {...register("totalSeats")}
      />

      <Input
        label="Contact Information"
        id="contactInfo"
        {...register("contactInfo", {
          required: "Contact information is required",
        })}
        error={errors.contactInfo?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Questions (optional)
        </label>
        <div className="space-y-2">
          {questions.map((q, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded"
            >
              <span>
                {q.question} {q.isRequired && "(Required)"}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-2 flex space-x-2">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="New question"
            className="flex-1 border rounded px-3 py-2"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Required</span>
          </label>
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-primary-500 text-white px-3 py-2 rounded hover:bg-primary-600"
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          {event ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  );
}
