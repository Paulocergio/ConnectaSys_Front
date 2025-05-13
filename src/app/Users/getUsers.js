// src/app/Users/page.js
'use client';

import { useState, useEffect } from 'react';
import { getUsers } from '../../services/api/userService';
import Sidebar from '../../components/Sidebar';
import Table   from '../../components/Table/Table';

export default function UsersPage() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    console.log('[UsersPage] useEffect: chamando getUsers');
    getUsers()
      .then(res => {
        console.log('[UsersPage] getUsers res.data:', res.data);
        setUsers(res.data);
      })
      .catch(err => {
        console.error('[UsersPage] getUsers erro:', err);
        setError(true);
      })
      .finally(() => {
        console.log('[UsersPage] fetch finalizado via getUsers');
        setLoading(false);
      });
  }, []);

  console.log('[UsersPage] render —', { users, loading, error });

  if (loading) return <p>Carregando usuários…</p>;
  if (error)   return <p>Erro ao carregar usuários.</p>;

  const columns = [
    { key: 'id',        title: 'ID',       sortable: true },
    { key: 'firstName', title: 'Nome',     sortable: true },
    { key: 'email',     title: 'Email',    sortable: true },
    /* …suas outras colunas… */
  ];

  const toggleSidebar = () => setCollapsed(c => !c);

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={collapsed} toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Table
          title="Usuários"
          data={users}
          columns={columns}
          striped
          onRowClick={row => alert(`Clicou em ${row.firstName}`)}
        />
      </main>
    </div>
  );
}
