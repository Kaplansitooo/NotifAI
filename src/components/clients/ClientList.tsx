
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for clients
const mockClients = [
  { 
    id: 1, 
    name: "María García", 
    phone: "612345678", 
    email: "maria@example.com", 
    appointmentsCount: 5 
  },
  { 
    id: 2, 
    name: "Juan Pérez", 
    phone: "623456789", 
    email: "juan@example.com", 
    appointmentsCount: 3 
  },
  { 
    id: 3, 
    name: "Ana Martínez", 
    phone: "634567890", 
    email: "ana@example.com", 
    appointmentsCount: 8 
  },
  { 
    id: 4, 
    name: "Carlos Rodríguez", 
    phone: "645678901", 
    email: "carlos@example.com", 
    appointmentsCount: 2 
  },
];

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  appointmentsCount: number;
}

const ClientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<Client[]>(mockClients);

  // Filter clients based on search term
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  // Handle client deletion
  const handleDeleteClient = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <Button asChild>
          <Link to="/clients/new">Nuevo Cliente</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Citas</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    <Link to={`/clients/${client.id}`} className="hover:underline text-physio-600">
                      {client.name}
                    </Link>
                  </TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell className="text-center">{client.appointmentsCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/clients/${client.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No se encontraron clientes
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClientList;
