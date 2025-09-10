import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onShowToast: (message: string) => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, onRoleChange, onShowToast }) => {
  const roleNames: Record<UserRole, string> = {
    client: 'Cliente',
    professional: 'Profissional',
    admin: 'Administrador'
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole;
    onRoleChange(newRole);
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      onShowToast('Link copiado para a área de transferência!');
    }).catch(err => {
      console.error('Falha ao copiar link: ', err);
      onShowToast('Não foi possível copiar o link.');
    });
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <div className="flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">HumanaMente Psicologia</h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
                onClick={handleShareClick}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-brand-primary transition-colors"
                aria-label="Copiar link para compartilhar"
                title="Copiar link para compartilhar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
            </button>
            <span className="text-sm text-gray-600 hidden sm:block">Acessando como:</span>
            <select
                value={userRole}
                onChange={handleSelectChange}
                className="rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring focus:ring-brand-primary focus:ring-opacity-50 text-sm"
                aria-label="Selecionar tipo de usuário"
            >
                <option value="client">Cliente</option>
                <option value="professional">Profissional</option>
                <option value="admin">Administrador</option>
            </select>
        </div>
      </div>
    </header>
  );
};

export default Header;