// src/app/Users/page.js
'use client';

import { useState, useEffect } from 'react';
import { getUsers } from '../../services/api/userService';
import Sidebar from '../../components/Sidebar';
import Table from '../../components/Table/Table';
import { User, Mail, MapPin, Calendar, Shield } from 'lucide-react';

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
    <div className="bg-gray-50 p-4 rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Coluna 1: Informações Pessoais */}
        <div className="bg-white rounded-md shadow-sm p-4">
          <div className="flex items-center mb-3 pb-2 border-b border-gray-100">
            <User size={16} className="text-indigo-600 mr-2" />
            <h3 className="text-indigo-600 font-medium">Informações Pessoais</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="text-gray-500 w-20">Gênero:</span>
              <span className="text-gray-700">{user.gender}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-20">Perfil:</span>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs">
                {user.role}
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-20">Ativo:</span>
              <span className={user.isActive ? "text-green-600" : "text-red-600"}>
                {user.isActive ? "Sim" : "Não"}
              </span>
            </div>
          </div>
        </div>

        {/* Coluna 2: Informações de Contato */}
        <div className="bg-white rounded-md shadow-sm p-4">
          <div className="flex items-center mb-3 pb-2 border-b border-gray-100">
            <Mail size={16} className="text-indigo-600 mr-2" />
            <h3 className="text-indigo-600 font-medium">Informações de Contato</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="text-gray-500 w-20">Email:</span>
              <span className="text-indigo-600">{user.email}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-20">Telefone:</span>
              <span className="text-gray-700">{user.phoneNumber}</span>
            </div>
          </div>
        </div>

        {/* Coluna 3: Endereço */}
        <div className="bg-white rounded-md shadow-sm p-4">
          <div className="flex items-center mb-3 pb-2 border-b border-gray-100">
            <MapPin size={16} className="text-indigo-600 mr-2" />
            <h3 className="text-indigo-600 font-medium">Endereço</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="text-gray-500 w-20">Endereço:</span>
              <span className="text-gray-700">{user.address}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-20">Cidade/UF:</span>
              <span className="text-gray-700">{user.city} / {user.state}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-20">País/CEP:</span>
              <span className="text-gray-700">{user.country} / {user.zipCode}</span>
            </div>
          </div>
        </div>

        {/* Coluna 4: Informações do Sistema - Span 2 colunas */}
        <div className="bg-white rounded-md shadow-sm p-4 lg:col-span-2">
          <div className="flex items-center mb-3 pb-2 border-b border-gray-100">
            <Calendar size={16} className="text-indigo-600 mr-2" />
            <h3 className="text-indigo-600 font-medium">Informações do Sistema</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex">
              <span className="text-gray-500 w-24">Criado em:</span>
              <span className="text-gray-700">{new Date(user.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-24">Deletado:</span>
              <span className="text-gray-700">{user.deletedAt ? new Date(user.deletedAt).toLocaleString() : '—'}</span>
            </div>
          </div>
        </div>

        {/* Coluna 5: Segurança */}
        <div className="bg-white rounded-md shadow-sm p-4">
          <div className="flex items-center mb-3 pb-2 border-b border-gray-100">
            <Shield size={16} className="text-indigo-600 mr-2" />
            <h3 className="text-indigo-600 font-medium">Segurança</h3>
          </div>
          
          <div className="text-sm">
            <span className="text-gray-500">Hash da senha:</span>
            <div className="mt-1 bg-gray-50 p-2 rounded text-xs font-mono text-gray-600 overflow-x-auto whitespace-nowrap">
              {user.passwordHash}
            </div>
          </div>
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