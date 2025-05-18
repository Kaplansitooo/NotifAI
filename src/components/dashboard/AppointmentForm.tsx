
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
import { CalendarIcon, Mail, MessageSquare, Phone } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Mock data for clients
const mockClients = [
  { id: 1, name: "María García" },
  { id: 2, name: "Juan Pérez" },
  { id: 3, name: "Ana Martínez" },
  { id: 4, name: "Carlos Rodríguez" },
];

// Notification channels
const notificationChannels = [
  { id: "whatsapp", label: "WhatsApp", icon: <Phone className="h-4 w-4" /> },
  { id: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
  { id: "sms", label: "SMS", icon: <MessageSquare className="h-4 w-4" /> },
];

// Notification timings
const notificationTimings = [
  { value: "24", label: "24 horas antes" },
  { value: "12", label: "12 horas antes" },
  { value: "6", label: "6 horas antes" },
  { value: "3", label: "3 horas antes" },
  { value: "1", label: "1 hora antes" },
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
    notificationChannel?: string;
    notificationTiming?: string;
    aiPrompt?: string;
  };
}

const AppointmentForm = ({ onClose, appointmentToEdit }: AppointmentFormProps) => {
  const [date, setDate] = useState<Date | undefined>(appointmentToEdit?.date || undefined);
  const [time, setTime] = useState(appointmentToEdit?.date ? format(appointmentToEdit.date, 'HH:mm') : '');
  const [clientId, setClientId] = useState<string>(appointmentToEdit?.clientId.toString() || '');
  const [duration, setDuration] = useState<string>(appointmentToEdit?.duration.toString() || '60');
  const [notes, setNotes] = useState(appointmentToEdit?.notes || '');
  const [status, setStatus] = useState(appointmentToEdit?.status || 'pendiente');
  const [notificationChannel, setNotificationChannel] = useState(appointmentToEdit?.notificationChannel || 'whatsapp');
  const [notificationTiming, setNotificationTiming] = useState(appointmentToEdit?.notificationTiming || '24');
  const [aiPrompt, setAiPrompt] = useState(appointmentToEdit?.aiPrompt || '');
  
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally save the appointment data
    console.log({
      date,
      time,
      clientId,
      duration,
      notes,
      status,
      notificationChannel,
      notificationTiming,
      aiPrompt
    });
    
    toast({
      title: "Cita programada",
      description: "Las notificaciones automáticas han sido configuradas correctamente.",
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
          
          {/* Notification Channel */}
          <div className="space-y-2">
            <Label>Canal de notificación</Label>
            <RadioGroup value={notificationChannel} onValueChange={setNotificationChannel} className="flex flex-wrap gap-4">
              {notificationChannels.map((channel) => (
                <div key={channel.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={channel.id} id={`channel-${channel.id}`} />
                  <Label htmlFor={`channel-${channel.id}`} className="flex items-center cursor-pointer">
                    <span className="mr-2">{channel.icon}</span>
                    {channel.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Notification Timing */}
          <div className="space-y-2">
            <Label htmlFor="timing">Tiempo de antelación</Label>
            <Select value={notificationTiming} onValueChange={setNotificationTiming}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tiempo" />
              </SelectTrigger>
              <SelectContent>
                {notificationTimings.map((timing) => (
                  <SelectItem key={timing.value} value={timing.value}>
                    {timing.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* AI Prompt for Personalized Message */}
          <div className="space-y-2">
            <Label htmlFor="ai-prompt">Instrucciones para el mensaje de IA</Label>
            <Textarea
              id="ai-prompt"
              placeholder="Por ejemplo: 'Recuérdale que traiga ropa cómoda y menciona su progreso en el dolor de espalda...'"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="min-h-[80px]"
            />
            <p className="text-sm text-muted-foreground">
              La IA generará automáticamente un mensaje personalizado para el cliente combinando
              el recordatorio de la cita con tus instrucciones específicas.
            </p>
          </div>
          
          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas de la cita</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Añadir notas para esta cita..."
              className="min-h-[80px]"
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
