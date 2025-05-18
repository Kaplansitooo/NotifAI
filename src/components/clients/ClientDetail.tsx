
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Edit, Phone, Mail, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Mock data for a client
const mockClient = {
  id: 1,
  name: "María García",
  phone: "612345678",
  email: "maria@example.com",
  address: "Calle Principal 123, 28001 Madrid",
  notes: "Paciente con dolor lumbar crónico. Prefiere sesiones por la tarde.",
  appointments: [
    { id: 1, date: new Date(2023, 4, 15, 10, 0), status: "completada", notes: "Sesión de evaluación inicial. Dolor en zona lumbar." },
    { id: 2, date: new Date(2023, 4, 22, 11, 30), status: "completada", notes: "Mejoría notable tras ejercicios prescritos." },
    { id: 3, date: new Date(2023, 4, 29, 10, 0), status: "pendiente", notes: "" },
  ]
};

const statusClasses = {
  pendiente: "text-yellow-600 bg-yellow-100 border-yellow-200",
  confirmada: "text-green-600 bg-green-100 border-green-200",
  completada: "text-blue-600 bg-blue-100 border-blue-200",
  anulada: "text-red-600 bg-red-100 border-red-200",
};

const ClientDetail = () => {
  const { id } = useParams();
  // In a real app, you would fetch the client data based on the id
  const client = mockClient;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{client.name}</h1>
          <div className="flex items-center space-x-4 mt-2 text-gray-600">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>{client.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>{client.email}</span>
            </div>
          </div>
        </div>
        
        <Button asChild>
          <Link to={`/clients/${client.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Editar Cliente
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="appointments">Historial de Citas</TabsTrigger>
          <TabsTrigger value="notes">Notas de Tratamiento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Datos Personales</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="font-medium text-gray-500">Dirección</dt>
                  <dd>{client.address}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Email</dt>
                  <dd>{client.email}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Teléfono</dt>
                  <dd>{client.phone}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          {client.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notas</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{client.notes}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Citas</CardTitle>
              <CardDescription>
                Historial completo de citas del cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              {client.appointments.length > 0 ? (
                <div className="space-y-4">
                  {client.appointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="font-medium">
                              {format(appointment.date, 'PPP', { locale: es })}
                            </span>
                            <span className="ml-2 text-gray-600">
                              {format(appointment.date, 'HH:mm')}
                            </span>
                          </div>
                          
                          {appointment.notes && (
                            <div className="mt-2 text-gray-700">
                              {appointment.notes}
                            </div>
                          )}
                        </div>
                        
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusClasses[appointment.status as keyof typeof statusClasses]}`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-gray-500">
                  Este cliente no tiene citas registradas
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Notas de Tratamiento</CardTitle>
              <CardDescription>
                Historial de tratamientos y evolución del cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">15 de Mayo, 2023</h3>
                    <span className="ml-2 text-sm text-gray-500">Primera sesión</span>
                  </div>
                  <Separator className="my-2" />
                  <p>Evaluación inicial. El paciente presenta dolor en zona lumbar, principalmente al levantarse por las mañanas. Se inicia tratamiento con masaje descontracturante y se prescriben ejercicios de estiramiento.</p>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">22 de Mayo, 2023</h3>
                    <span className="ml-2 text-sm text-gray-500">Seguimiento</span>
                  </div>
                  <Separator className="my-2" />
                  <p>El paciente reporta mejoría notable tras seguir los ejercicios prescritos. Se continúa con el mismo tratamiento añadiendo nuevos ejercicios de fortalecimiento para la zona central.</p>
                </div>
              </div>
              
              {/* Add note form */}
              <div className="mt-8">
                <h3 className="font-medium mb-2">Añadir nueva nota</h3>
                <textarea
                  className="w-full p-2 border rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-physio-500"
                  placeholder="Escribe una nueva nota de tratamiento..."
                />
                <div className="mt-2 flex justify-end">
                  <Button>Guardar Nota</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetail;
