'use client';



import Table   from '../../../components/Table/Table';
import Sidebar from '../../../components/Sidebar';

import { useState } from 'react';

export default function UsersPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);

  const columns = [
    { key: 'id',   title: 'ID',   sortable: true },
    { key: 'name', title: 'Nome', sortable: true },
  ];
  const data = [
    { id: 1, name: 'Cliente 1' },
    { id: 2, name: 'Cliente 2' },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Table
          title="Clientes"
          data={data}
          columns={columns}
          striped
          onRowClick={row => alert(`Clicou em: ${row.name}`)}
        />
      </main>
    </div>
  );
}
