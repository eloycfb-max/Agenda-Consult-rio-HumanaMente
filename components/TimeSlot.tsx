
import React from 'react';
import { Booking } from '../types';
import { BOOKING_TYPE_COLORS } from '../constants';

interface TimeSlotProps {
  day: string;
  time: string;
  room: string;
  booking?: Booking;
  onSlotClick: (day: string, time: string, room: string) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ day, time, room, booking, onSlotClick }) => {
  if (booking) {
    const { bg, text, border } = BOOKING_TYPE_COLORS[booking.type];
    return (
      <div className={`p-1.5 rounded-md border text-xs cursor-not-allowed ${bg} ${text} ${border}`}>
        <p className="font-semibold truncate">{booking.professional}</p>
        <p className="text-xs opacity-80">{room}</p>
        <p className="text-xs opacity-80">{booking.type}</p>
      </div>
    );
  }

  return (
    <button
      onClick={() => onSlotClick(day, time, room)}
      className="p-1.5 rounded-md border border-dashed border-gray-300 text-gray-400 text-xs text-left hover:bg-green-50 hover:border-green-400 hover:text-green-600 transition-colors duration-200"
      aria-label={`Agendar ${room} às ${time} de ${day}`}
    >
      <p className="font-semibold">{room}</p>
      <p>Disponível</p>
    </button>
  );
};

export default TimeSlot;
