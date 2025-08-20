export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const ROLES = {
  ADMIN: 'ADMIN',
  ORGANIZER: 'ORGANIZER',
  PARTICIPANT: 'PARTICIPANT',
} as const;

export const EVENT_TYPES = {
  ONSITE: 'ONSITE',
  ONLINE: 'ONLINE',
} as const;

export const PARTICIPATION_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;