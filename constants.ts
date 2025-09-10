
import { BookingType } from './types';

export const DAYS_OF_WEEK = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
export const HOURS = Array.from({ length: 15 }, (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`);
export const ROOMS: string[] = ['Sala 1', 'Sala 2', 'Sala 3'];

export const BOOKING_TYPE_COLORS: Record<BookingType, { bg: string, text: string, border: string }> = {
  [BookingType.Fixo]: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300'
  },
  [BookingType.Avulso]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300'
  },
  [BookingType.Reposicao]: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300'
  },
};
