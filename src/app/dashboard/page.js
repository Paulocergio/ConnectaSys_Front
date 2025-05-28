'use client';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Table from '../../components/Table';
import ModalEditProject from '../../components/Modals/ModalEditGeneric';
import { Edit, Trash2 } from 'lucide-react';

export default function DashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      status: 'Em andamento',
      progress: '75%',
      client: 'Empresa XYZ',
      priority: 'Alta',
      category: 'Design'
    },
    {
      id: 2,
      name: 'App Mobile',
      status: 'Em andamento',
      progress: '40%',
      client: 'Startup ABC',
      priority: 'Média',
      category: 'Desenvolvimento'
    },
    {
      id: 3,
      name: 'Campanha Marketing',
      status: 'Concluído',
      progress: '100%',
      client: 'Loja Virtual',
      priority: 'Baixa',
      category: 'Marketing'
    },
    {
      id: 4,
      name: 'Sistema ERP',
      status: 'Pendente',
      progress: '10%',
      client: 'Indústria MNO',
      priority: 'Alta',
      category: 'Desenvolvimento'
    }
  ]);
  const [editProject, setEditProject] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Estatísticas
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'Concluído').length;
  const inProgressProjects = projects.filter(p => p.status === 'Em andamento').length;
  const pendingProjects = projects.filter(p => p.status === 'Pendente').length;

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleEdit = (row) => {
    setEditProject(row);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    setIsEditModalOpen(false);
  };

  const columns = [
    { title: 'Nome', key: 'name', sortable: true, filterable: true },
    { title: 'Cliente', key: 'client', sortable: true, filterable: true },
    { title: 'Status', key: 'status', sortable: true, filterable: true },
    { title: 'Progresso', key: 'progress', sortable: true }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      <div className="flex-1 p-6">
        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <SummaryCard label="Total de Projetos" value={totalProjects} color="blue" />
          <SummaryCard label="Concluídos" value={completedProjects} color="green" />
          <SummaryCard label="Em Andamento" value={inProgressProjects} color="yellow" />
          <SummaryCard label="Pendentes" value={pendingProjects} color="red" />
        </div>

        {/* Tabela */}
        <Table
          title="Gerenciamento de Projetos"
          columns={columns}
          data={projects}
          striped={true}
          onEdit={handleEdit}
        />

        {/* Modal de edição */}
        <ModalEditProject
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          project={editProject}
          onSave={handleSaveEdit}
        />
      </div>
    </div>
  );
}

// Componente auxiliar para os cards
function SummaryCard({ label, value, color }) {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600'
  };

  const iconMap = {
    blue: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    green: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    yellow: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    red: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className={`text-2xl font-semibold ${colorMap[color]}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorMap[color]}`}>
          {iconMap[color]}
        </div>
      </div>
    </div>
  );
}
