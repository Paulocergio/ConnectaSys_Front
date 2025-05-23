'use client';

import { useState, useEffect } from 'react';
import { getUsers } from '../../services/api/userService';
import Sidebar from '../../components/Sidebar';
import Table from '../../components/Table/Table';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Users } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    getUsers()
      .then(res => {
        const sorted = res.data.sort((a, b) => {
          const nameA = `${a.firstName ?? ''} ${a.lastName ?? ''}`.toLowerCase();
          const nameB = `${b.firstName ?? ''} ${b.lastName ?? ''}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });
        setUsers(sorted);
      })

      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      key: 'name',
      title: 'Nome',
      sortable: true,
      render: (_, user) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold uppercase text-xs">
            {`${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`}
          </div>
          <div>
            <div className="font-semibold text-slate-800">{user.firstName} {user.lastName}</div>
            <div className="text-xs text-slate-500">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'phone',
      title: 'Telefone',
      sortable: false,
      render: (_, user) => user.phone || 'Não informado'
    },
    {
      key: 'createdAt',
      title: 'Criado em',
      sortable: true,
      render: value =>
        new Date(value).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
    },
    {
      key: 'isActive',
      title: 'Status',
      sortable: false,
      render: value => (
        value ? (
          <span className="inline-flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            <div className="bg-white rounded-full p-[2px] flex items-center justify-center">
              <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
              </svg>
            </div>
            Ativo
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            <div className="bg-white rounded-full p-[2px] flex items-center justify-center">
              <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 7a1 1 0 112 0v2a1 1 0 11-2 0V7zm1 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
            </div>
            Inativo
          </span>
        )
      )
    },


    {
      key: 'actions',
      title: 'Ações',
      sortable: false,
      render: (_, user) => (
        <div className="flex items-center gap-3">
          <button title="Editar" className="text-slate-500 hover:text-blue-600"><Edit size={16} /></button>
          <button title="Excluir" className="text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
        </div>
      )
    }
  ];


  if (loading) return <p>Carregando usuários…</p>;

  return (
    <div className="flex h-screen">
      <Sidebar
        isCollapsed={collapsed}
        toggleSidebar={() => setCollapsed(c => !c)}
      />
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Table
          title={
            <div className="flex items-center gap-2 text-xl font-semibold text-slate-800">
              <Users size={20} className="text-blue-600" />
              Usuários
            </div>
          }
          data={users}
          columns={columns}
          striped
        />

      </main>
    </div>
  );
}
