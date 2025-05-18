
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, Clock, User, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const navigationItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <Clock className="w-5 h-5" /> 
    },
    { 
      name: 'Citas', 
      path: '/appointments', 
      icon: <Calendar className="w-5 h-5" /> 
    },
    { 
      name: 'Clientes', 
      path: '/clients', 
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      name: 'Perfil', 
      path: '/profile', 
      icon: <User className="w-5 h-5" /> 
    },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-10 flex flex-col bg-white shadow-lg transition-all duration-300 ${expanded ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {expanded && <h1 className="text-lg font-bold text-physio-700">PhysioApp</h1>}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          {expanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-3 rounded-md transition-colors ${
                  isActive
                    ? 'bg-physio-100 text-physio-700'
                    : 'text-gray-700 hover:bg-physio-50 hover:text-physio-700'
                }`}
              >
                <div className="flex items-center justify-center">
                  {item.icon}
                </div>
                {expanded && <span className="ml-3 text-sm font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        {expanded ? (
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-physio-600 flex items-center justify-center text-white font-bold">
                F
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Fisioterapeuta</p>
              <p className="text-xs text-gray-500 truncate">fisio@ejemplo.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-physio-600 flex items-center justify-center text-white font-bold">
              F
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
