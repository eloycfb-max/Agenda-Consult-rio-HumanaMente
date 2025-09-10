
import React from 'react';
import { BookingRequest } from '../types';
import { BOOKING_TYPE_COLORS } from '../constants';

interface RequestPanelProps {
  requests: BookingRequest[];
  onApprove: (requestId: string) => void;
  onDeny: (requestId: string) => void;
}

const RequestPanel: React.FC<RequestPanelProps> = ({ requests, onApprove, onDeny }) => {
  if (requests.length === 0) {
    return (
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        <p>Não há novas solicitações de agendamento.</p>
      </div>
    );
  }

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Solicitações Pendentes ({requests.length})</h2>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {requests.map(req => {
            const { bg, text } = BOOKING_TYPE_COLORS[req.type];
            return (
                <div key={req.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                        <p className="font-semibold text-gray-800">{req.professional}</p>
                        <p className="text-sm text-gray-600">{req.day}, {req.time} - {req.room}</p>
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mt-1 ${bg} ${text}`}>
                            {req.type}
                        </span>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => onDeny(req.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm font-semibold hover:bg-red-200 transition-colors">
                            Negar
                        </button>
                        <button onClick={() => onApprove(req.id)} className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm font-semibold hover:bg-green-200 transition-colors">
                            Aprovar
                        </button>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default RequestPanel;
