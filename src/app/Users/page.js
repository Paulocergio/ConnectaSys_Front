// src/app/Users/page.js
'use client';

import { useState, useEffect } from 'react';
import { getUsers } from '../../services/api/userService';
import Sidebar from '../../components/Sidebar';
import Table from '../../components/Table/Table';

// Modifique a linha de importação para incluir Phone
import { User, Mail, MapPin, Calendar, Shield, Phone } from 'lucide-react';
export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    getUsers()
      .then(res => setUsers(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando usuários…</p>;
  if (error) return <p>Erro ao carregar usuários.</p>;

  const columns = [
    { key: 'id', title: 'ID', sortable: true },
    { key: 'firstName', title: 'Nome', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'phoneNumber', title: 'Telefone', sortable: true },
  ];

  // Função simplificada para renderizar detalhes do usuário
  const renderUserDetails = user => (
<div className="border rounded-lg p-4 shadow-sm bg-white">
  <div className="flex flex-wrap gap-y-3">
    {/* Linha 1 */}
    <div className="flex items-center w-full md:w-1/2 xl:w-1/3 pr-4">
      <User size={16} className="text-indigo-600 mr-2" />
      <span className="font-medium text-gray-600 mr-1">Perfil:</span>
      <span className="text-gray-800">{user.role} ({user.gender})</span>
      {user.isActive && (
        <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Ativo</span>
      )}
      {!user.isActive && (
        <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">Inativo</span>
      )}
    </div>
    
    {/* Linha 2 */}
    <div className="flex items-center w-full md:w-1/2 xl:w-1/3 pr-4">
      <Mail size={16} className="text-indigo-600 mr-2" />
      <span className="font-medium text-gray-600 mr-1">Email:</span>
      <span className="text-indigo-600">{user.email}</span>
    </div>
    
    {/* Linha 3 */}
    <div className="flex items-center w-full md:w-1/2 xl:w-1/3 pr-4">
      <Mail size={16} className="text-indigo-600 mr-2" />
      <span className="font-medium text-gray-600 mr-1">Telefone:</span>
      <span className="text-gray-800">{user.phoneNumber}</span>
    </div>
    
    {/* Linha 4 */}
    <div className="flex items-center w-full md:w-1/2 xl:w-1/3 pr-4">
      <MapPin size={16} className="text-indigo-600 mr-2" />
      <span className="font-medium text-gray-600 mr-1">Endereço:</span>
      <span className="text-gray-800">{user.city}/{user.state}, {user.country}</span>
    </div>
    
    {/* Linha 5 */}
    <div className="flex items-center w-full md:w-1/2 xl:w-1/3 pr-4">
      <Calendar size={16} className="text-indigo-600 mr-2" />
      <span className="font-medium text-gray-600 mr-1">Criado:</span>
      <span className="text-gray-800">{new Date(user.createdAt).toLocaleString()}</span>
    </div>
  </div>
</div>
  );

  return (
    <div className="flex h-screen">
      <Sidebar
        isCollapsed={collapsed}
        toggleSidebar={() => setCollapsed(c => !c)}
      />
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Table
          title="Usuários"
          data={users}
          columns={columns}
          striped
          onRowClick={() => {}}
          renderExpandedRow={renderUserDetails}
        />
      </main>
    </div>
  );
}