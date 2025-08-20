export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const isPastEvent = (endDate: string): boolean => {
  return new Date(endDate) < new Date();
};

export const getAvailableSeats = (totalSeats?: number, participations?: unknown[]): number | null => {
  if (totalSeats === undefined) return null;
  return totalSeats - (participations?.length || 0);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};