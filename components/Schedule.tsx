
import React from 'react';
import { Booking } from '../types';
import { DAYS_OF_WEEK, HOURS, ROOMS } from '../constants';
import TimeSlot from './TimeSlot';

interface ScheduleProps {
  bookings: Booking[];
  onSlotClick: (day: string, time: string, room: string) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ bookings, onSlotClick }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
      <div className="grid gap-px bg-gray-200" style={{ gridTemplateColumns: `auto repeat(${DAYS_OF_WEEK.length}, minmax(140px, 1fr))` }}>
        {/* Header Row */}
        <div className="bg-gray-100 p-2 font-bold text-center sticky left-0 z-10">Hora</div>
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="bg-gray-100 p-2 font-bold text-center text-sm sm:text-base">
            {day}
          </div>
        ))}

        {/* Schedule Body */}
        {HOURS.map(time => (
          <React.Fragment key={time}>
            <div className="bg-gray-100 p-2 font-bold text-center sticky left-0 z-10">{time}</div>
            {DAYS_OF_WEEK.map(day => (
              <div key={`${day}-${time}`} className="bg-white p-1 grid grid-cols-1 gap-1">
                {ROOMS.map(room => {
                  const booking = bookings.find(b => b.day === day && b.time === time && b.room === room);
                  return (
                    <TimeSlot
                      key={`${day}-${time}-${room}`}
                      day={day}
                      time={time}
                      room={room}
                      booking={booking}
                      onSlotClick={onSlotClick}
                    />
                  );
                })}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
