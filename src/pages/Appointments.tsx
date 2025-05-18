
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import AppointmentForm from '@/components/dashboard/AppointmentForm';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Edit, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Mock data for appointments
const mockAppointments = [
  { 
    id: 1, 
    client: "María García", 
    date: new Date(2023, 4, 15, 10, 0), 
    duration: 60,
    status: "confirmada" 
  },
  { 
    id: 2, 
    client: "Juan Pérez", 
    date: new Date(2023, 4, 15, 11, 30), 
    duration: 45,
    status: "pendiente" 
  },
  { 
    id: 3, 
    client: "Ana Martínez", 
    date: new Date(2023, 4, 16, 16, 0), 
    duration: 60,
    status: "completada" 
  },
  { 
    id: 4, 
    client: "Carlos Rodríguez", 
    date: new Date(2023, 4, 17, 9, 0), 
    duration: 30,
    status: "anulada" 
  },
];

const statusStyles = {
  pendiente: "text-yellow-600 bg-yellow-100",
  confirmada: "text-green-600 bg-green-100",
  completada: "text-blue-600 bg-blue-100",
  anulada: "text-red-600 bg-red-100",
};

const Appointments = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [appointments, setAppointments] = useState(mockAppointments);
  
  // Filter appointments based on status
  const filteredAppointments = statusFilter === 'all'
    ? appointments
    : appointments.filter(appointment => appointment.status === statusFilter);
  
  // Handle appointment deletion
  const handleDeleteAppointment = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      setAppointments(appointments.filter(appointment => appointment.id !== id));
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Citas</h1>
        
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
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-medium">Todas las citas</h2>
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="confirmada">Confirmada</SelectItem>
            <SelectItem value="completada">Completada</SelectItem>
            <SelectItem value="anulada">Anulada</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.client}</TableCell>
                  <TableCell>{format(appointment.date, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{format(appointment.date, 'HH:mm')}</TableCell>
                  <TableCell>{appointment.duration} min</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[appointment.status as keyof typeof statusStyles]}`}>
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <AppointmentForm appointmentToEdit={{
                            id: appointment.id,
                            clientId: 1, // This would be the actual client ID
                            date: appointment.date,
                            duration: appointment.duration,
                            notes: "",
                            status: appointment.status,
                          }} />
                        </DialogContent>
                      </Dialog>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No se encontraron citas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Appointments;
