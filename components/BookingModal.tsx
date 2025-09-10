
import React, { useState } from 'react';
import { BookingType } from '../types';

interface BookingModalProps {
  slot: { day: string; time: string; room: string };
  onClose: () => void;
  onSubmit: (request: {
    day: string;
    time: string;
    room: string;
    professional: string;
    type: BookingType;
  }) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ slot, onClose, onSubmit }) => {
  const [professional, setProfessional] = useState('');
  const [type, setType] = useState<BookingType>(BookingType.Avulso);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (professional.trim()) {
      onSubmit({ ...slot, professional, type });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-xl font-bold text-gray-800">Solicitar Horário</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Fechar modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-3 rounded">
            <p className="font-bold">{slot.day} - {slot.time}</p>
            <p>Sala: {slot.room}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="professionalName" className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
            <input
              type="text"
              id="professionalName"
              value={professional}
              onChange={(e) => setProfessional(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
              required
              placeholder="Digite seu nome completo"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Agendamento</label>
            <div className="space-y-2">
              {Object.values(BookingType).map(bookingType => (
                <label key={bookingType} className="flex items-center space-x-3 p-2 border rounded-md has-[:checked]:bg-blue-50 has-[:checked]:border-brand-primary cursor-pointer">
                  <input
                    type="radio"
                    name="bookingType"
                    value={bookingType}
                    checked={type === bookingType}
                    onChange={() => setType(bookingType)}
                    className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300"
                  />
                  <span>{bookingType}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400" disabled={!professional.trim()}>
              Enviar Solicitação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
