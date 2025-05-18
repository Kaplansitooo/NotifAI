
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientList from '@/components/clients/ClientList';
import ClientForm from '@/components/clients/ClientForm';
import ClientDetail from '@/components/clients/ClientDetail';

const Clients = () => {
  return (
    <Routes>
      <Route path="/" element={
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <ClientList />
        </div>
      } />
      <Route path="/new" element={
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Nuevo Cliente</h1>
          <ClientForm />
        </div>
      } />
      <Route path="/:id" element={<ClientDetail />} />
      <Route path="/:id/edit" element={
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Editar Cliente</h1>
          <ClientForm clientToEdit={{
            id: 1,
            name: "María García",
            email: "maria@example.com",
            phone: "612345678",
            address: "Calle Principal 123, 28001 Madrid",
            notes: "Paciente con dolor lumbar crónico. Prefiere sesiones por la tarde.",
          }} />
        </div>
      } />
    </Routes>
  );
};

export default Clients;
