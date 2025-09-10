import React, { useState, useCallback } from 'react';
import { Booking, BookingRequest, UserRole } from './types';
import Header from './components/Header';
import Schedule from './components/Schedule';
import BookingModal from './components/BookingModal';
import RequestPanel from './components/RequestPanel';
import Toast from './components/Toast';
import AdminLoginModal from './components/AdminLoginModal';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>('client');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pendingRequests, setPendingRequests] = useState<BookingRequest[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string; room: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRoleChange = useCallback((newRole: UserRole) => {
    if (newRole === 'admin') {
      setLoginError(null);
      setIsLoginModalOpen(true);
    } else {
      setUserRole(newRole);
    }
  }, []);

  const handleAdminLogin = useCallback(({ username, password }) => {
    // Em uma aplicação real, isso seria uma chamada de API.
    if (username === 'admin' && password === 'admin123') {
      setUserRole('admin');
      setIsLoginModalOpen(false);
      setLoginError(null);
      showToast("Login de administrador bem-sucedido!");
    } else {
      setLoginError("Credenciais inválidas. Tente novamente.");
    }
  }, []);

  const handleCloseLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setLoginError(null);
  }, []);

  const handleSlotClick = useCallback((day: string, time: string, room: string) => {
    if (userRole === 'professional') {
      setSelectedSlot({ day, time, room });
    } else if (userRole === 'client') {
      showToast("Acesse como profissional para solicitar um horário.");
    }
  }, [userRole]);

  const handleCloseModal = useCallback(() => {
    setSelectedSlot(null);
  }, []);

  const handleRequestBooking = useCallback((request: Omit<BookingRequest, 'id' | 'status'>) => {
    const newRequest: BookingRequest = {
      ...request,
      id: `req-${Date.now()}`,
      status: 'pending'
    };
    setPendingRequests(prev => [...prev, newRequest]);
    handleCloseModal();
    showToast("Solicitação enviada com sucesso! Aguardando aprovação.");
  }, [handleCloseModal]);

  const handleApproveRequest = useCallback((requestId: string) => {
    const requestToApprove = pendingRequests.find(req => req.id === requestId);
    if (requestToApprove) {
      const newBooking: Booking = { ...requestToApprove };
      setBookings(prev => [...prev, newBooking]);
      setPendingRequests(prev => prev.filter(req => req.id !== requestId));
      showToast("Solicitação aprovada!");
    }
  }, [pendingRequests]);

  const handleDenyRequest = useCallback((requestId: string) => {
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    showToast("Solicitação negada.");
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header userRole={userRole} onRoleChange={handleRoleChange} onShowToast={showToast} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {userRole === 'admin' && (
          <RequestPanel
            requests={pendingRequests}
            onApprove={handleApproveRequest}
            onDeny={handleDenyRequest}
          />
        )}
        <Schedule bookings={bookings} onSlotClick={handleSlotClick} />
        {selectedSlot && (
          <BookingModal
            slot={selectedSlot}
            onClose={handleCloseModal}
            onSubmit={handleRequestBooking}
          />
        )}
        {isLoginModalOpen && (
          <AdminLoginModal 
            onClose={handleCloseLoginModal}
            onSubmit={handleAdminLogin}
            error={loginError}
          />
        )}
      </main>
      {toastMessage && <Toast message={toastMessage} />}
       <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Para compartilhar, copie o link desta página. O modo de visualização padrão é para clientes.</p>
      </footer>
    </div>
  );
};

export default App;