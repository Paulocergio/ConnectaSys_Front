'use client';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Table from '../../components/Table';
import ModalEditProject from '../../components/Modals/ModalEditProject';   
import ModalConfirmDelete from '../../components/modals/ModalConfirmDelete';


export default function DashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', status: 'Em andamento', progress: '75%' },
    { id: 2, name: 'App Mobile', status: 'Em andamento', progress: '40%' },
    { id: 3, name: 'Campanha Marketing', status: 'Concluído', progress: '100%' },
    { id: 4, name: 'Sistema ERP', status: 'Pendente', progress: '10%' }
  ]);
  const [editProject, setEditProject] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);


  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleEdit = (row) => {
    setEditProject(row);
    setIsEditModalOpen(true);
  };

  const handleDelete = (row) => {
    setProjects(projects.filter(p => p.id !== row.id));
  };

  
  const openDeleteModal = (row) => {
    setProjectToDelete(row);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
    setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
  };


  const handleSaveEdit = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const columns = [
    { title: 'Nome', key: 'name' },
    { title: 'Status', key: 'status' },
    { title: 'Progresso', key: 'progress' },
   {
  title: 'Ações',
  key: 'actions',
  render: (_, row) => (
    <div className="flex space-x-2">
      <button onClick={() => handleEdit(row)} className="text-blue-600">✏️</button>
      <button onClick={() => openDeleteModal(row)} className="text-red-600">🗑️</button>
    </div>
  )
}

  ];

  return (
    <div className="flex min-h-screen bg-white">
      <div className={`hidden md:block transition-all duration-300 ${isSidebarCollapsed ? 'md:w-16' : 'md:w-64'}`}>
        <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      </div>
  
      <div className="flex-1 p-6">
        {/* Tabela */}
        <Table title="Projetos" columns={columns} data={projects} />
  
        {/* Modal de edição */}
        <ModalEditProject
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          project={editProject}
          onSave={handleSaveEdit}
        />
  
        {/* ✅ Modal de confirmação de exclusão */}
        <ModalConfirmDelete
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          itemName={projectToDelete?.name}
        />
      </div>
    </div>
  );
  
}
