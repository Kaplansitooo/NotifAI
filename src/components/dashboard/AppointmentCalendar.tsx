
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

// Mock data for appointments
const mockAppointments = [
  { id: 1, client: "María García", date: new Date(2023, 4, 15, 10, 0), status: "confirmada" },
  { id: 2, client: "Juan Pérez", date: new Date(2023, 4, 15, 11, 30), status: "pendiente" },
  { id: 3, client: "Ana Martínez", date: new Date(2023, 4, 16, 16, 0), status: "completada" },
  { id: 4, client: "Carlos Rodríguez", date: new Date(2023, 4, 17, 9, 0), status: "anulada" },
];

const statusColors = {
  pendiente: "bg-yellow-100 text-yellow-800 border-yellow-300",
  confirmada: "bg-green-100 text-green-800 border-green-300",
  completada: "bg-blue-100 text-blue-800 border-blue-300",
  anulada: "bg-red-100 text-red-800 border-red-300",
};

type AppointmentStatus = "pendiente" | "confirmada" | "completada" | "anulada";

interface Appointment {
  id: number;
  client: string;
  date: Date;
  status: AppointmentStatus;
}

const AppointmentCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');
  
  // Filter appointments based on selected date and status
  const filteredAppointments = mockAppointments.filter((appointment) => {
    const sameDay = isSameDay(appointment.date, date);
    const statusMatch = statusFilter === 'all' || appointment.status === statusFilter;
    return sameDay && statusMatch;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-x-2">
          <button 
            className={`btn ${view === 'month' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('month')}
          >
            Mes
          </button>
          <button 
            className={`btn ${view === 'week' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('week')}
          >
            Semana
          </button>
          <button 
            className={`btn ${view === 'day' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('day')}
          >
            Día
          </button>
        </div>
        
        <div>
          <select 
            className="p-2 border rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | 'all')}
          >
            <option value="all">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="confirmada">Confirmada</option>
            <option value="completada">Completada</option>
            <option value="anulada">Anulada</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => day && setDate(day)}
            className="rounded-md border"
            locale={es}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4">
            Citas para el {format(date, 'PPPP', { locale: es })}
          </h3>
          
          {filteredAppointments.length > 0 ? (
            <div className="space-y-3">
              {filteredAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className={`p-3 border rounded-md ${statusColors[appointment.status]}`}
                >
                  <div className="flex justify-between">
                    <p className="font-medium">{appointment.client}</p>
                    <span className="text-sm">
                      {format(appointment.date, 'HH:mm')}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hay citas para este día
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
