
export enum BookingType {
  Fixo = 'Fixo',
  Avulso = 'Avulso',
  Reposicao = 'Reposição',
}

export type Room = 'Sala 1' | 'Sala 2' | 'Sala 3';
export type UserRole = 'client' | 'professional' | 'admin';

export interface Booking {
  id: string;
  day: string;
  time: string;
  room: string;
  professional: string;
  type: BookingType;
}

export interface BookingRequest extends Booking {
  status: 'pending';
}
