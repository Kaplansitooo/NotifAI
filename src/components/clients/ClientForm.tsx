
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ClientFormProps {
  clientToEdit?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address?: string;
    notes?: string;
  };
}

const ClientForm = ({ clientToEdit }: ClientFormProps) => {
  const [name, setName] = useState(clientToEdit?.name || '');
  const [email, setEmail] = useState(clientToEdit?.email || '');
  const [phone, setPhone] = useState(clientToEdit?.phone || '');
  const [address, setAddress] = useState(clientToEdit?.address || '');
  const [notes, setNotes] = useState(clientToEdit?.notes || '');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would save the client data
    console.log({
      id: clientToEdit?.id,
      name,
      email,
      phone,
      address,
      notes
    });
    
    // Show success message
    toast({
      title: clientToEdit ? "Cliente actualizado" : "Cliente creado",
      description: `${name} ha sido ${clientToEdit ? "actualizado" : "añadido"} correctamente.`,
    });
    
    // Navigate back to clients list
    navigate('/clients');
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{clientToEdit ? 'Editar Cliente' : 'Nuevo Cliente'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre y apellidos"
              required
            />
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
            />
          </div>
          
          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="612345678"
              required
            />
          </div>
          
          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Calle, número, código postal, ciudad"
            />
          </div>
          
          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <textarea
              id="notes"
              className="w-full p-2 border rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-physio-500"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Información adicional del cliente..."
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => navigate('/clients')}>
            Cancelar
          </Button>
          <Button type="submit">
            {clientToEdit ? 'Actualizar' : 'Crear'} Cliente
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ClientForm;
