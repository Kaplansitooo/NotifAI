
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { es } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

// Mock data for clients
const mockClients = [
  { id: 1, name: "María García" },
  { id: 2, name: "Juan Pérez" },
  { id: 3, name: "Ana Martínez" },
  { id: 4, name: "Carlos Rodríguez" },
];

interface AppointmentFormProps {
  onClose?: () => void;
  appointmentToEdit?: {
    id: number;
    clientId: number;
    date: Date;
    duration: number;
    notes: string;
    status: string;
  };
}

const AppointmentForm = ({ onClose, appointmentToEdit }: AppointmentFormProps) => {
  const [date, setDate] = useState<Date | undefined>(appointmentToEdit?.date || undefined);
  const [time, setTime] = useState(appointmentToEdit?.date ? format(appointmentToEdit.date, 'HH:mm') : '');
  const [clientId, setClientId] = useState<string>(appointmentToEdit?.clientId.toString() || '');
  const [duration, setDuration] = useState<string>(appointmentToEdit?.duration.toString() || '60');
  const [notes, setNotes] = useState(appointmentToEdit?.notes || '');
  const [status, setStatus] = useState(appointmentToEdit?.status || 'pendiente');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally save the appointment data
    console.log({
      date,
      time,
      clientId,
      duration,
      notes,
      status
    });
    
    // Close the form or navigate away
    if (onClose) onClose();
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{appointmentToEdit ? 'Editar Cita' : 'Nueva Cita'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Client Selection */}
          <div className="space-y-2">
            <Label htmlFor="client">Cliente</Label>
            <Select value={clientId} onValueChange={setClientId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar cliente" />
              </SelectTrigger>
              <SelectContent>
                {mockClients.map(client => (
                  <SelectItem key={client.id} value={client.id.toString()}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Fecha</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  locale={es}
                  className="p-3"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Time Selection */}
          <div className="space-y-2">
            <Label htmlFor="time">Hora</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          
          {/* Duration Selection */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duración (minutos)</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Duración" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutos</SelectItem>
                <SelectItem value="45">45 minutos</SelectItem>
                <SelectItem value="60">60 minutos</SelectItem>
                <SelectItem value="90">90 minutos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Status Selection */}
          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="confirmada">Confirmada</SelectItem>
                <SelectItem value="completada">Completada</SelectItem>
                <SelectItem value="anulada">Anulada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <textarea
              id="notes"
              className="w-full p-2 border rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-physio-500"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Añadir notas para esta cita..."
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {appointmentToEdit ? 'Actualizar' : 'Crear'} Cita
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AppointmentForm;
