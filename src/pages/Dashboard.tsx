
import React from 'react';
import AppointmentCalendar from '@/components/dashboard/AppointmentCalendar';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import AppointmentForm from '@/components/dashboard/AppointmentForm';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Cita
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <AppointmentForm />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-9">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-physio-600" />
              Calendario de Citas
            </h2>
            <AppointmentCalendar />
          </div>
        </div>
        
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-3">Resumen</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Hoy:</span>
                <span className="font-semibold">3 citas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Esta semana:</span>
                <span className="font-semibold">15 citas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Este mes:</span>
                <span className="font-semibold">42 citas</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-3">Próximas Citas</h2>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="font-medium">María García</p>
                <p className="text-sm text-gray-600">Hoy, 15:30</p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                <p className="font-medium">Carlos Rodríguez</p>
                <p className="text-sm text-gray-600">Mañana, 10:00</p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p className="font-medium">Ana Martínez</p>
                <p className="text-sm text-gray-600">Viernes, 12:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
