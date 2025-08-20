export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'ORGANIZER' | 'PARTICIPANT';
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'ONLINE' | 'ONSITE';
  venue?: string;
  joinLink?: string;
  startDate: string;
  endDate: string;
  totalSeats?: number;
  contactInfo: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  organizers: Pick<User, 'id' | 'name' | 'email'>[];
  participations?: Participation[];
  questions?: Question[];
}

export interface Question {
  id: string;
  question: string;
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Participation {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  user: Pick<User, 'id' | 'name' | 'email'>;
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  id: string;
  answer: string;
  question: Question;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  role?: 'ADMIN' | 'ORGANIZER' | 'PARTICIPANT';
}