
import React from 'react';
import { Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const { toast } = useToast();

  const handleNotificationClick = () => {
    toast({
      title: "Notificaciones",
      description: "No tienes notificaciones nuevas",
    });
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-20 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6 ml-20 md:ml-64">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Centro de Fisioterapia</h2>
        </div>
        <div className="flex items-center">
          <button 
            onClick={handleNotificationClick}
            className="p-2 text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
