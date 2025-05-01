'use client';

import { useState } from 'react';
// 1) Import do Table genérico
import Table from '../../components/Table/Table';
// 2) Import correto da Sidebar
import Sidebar from '../../components/Sidebar';

export default function CustomerPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const columns = [
    { key: 'id',   title: 'ID',    sortable: true },
    { key: 'name', title: 'Nome',  sortable: true },
  ];

  const data = [
    { id: 1, name: 'Cliente 1' },
    { id: 2, name: 'Cliente 2' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar controlada pelo estado */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      {/* Conteúdo principal */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Table
          title="Clientes"
          data={data}
          columns={columns}
          striped
          onRowClick={(row) => alert(`Clicou em: ${row.name}`)}
        />
      </main>
    </div>
  );
}
