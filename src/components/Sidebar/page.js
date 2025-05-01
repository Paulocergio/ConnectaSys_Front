'use client';
import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function DashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Sidebar começa recolhida
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Toggle para expandir/recolher a sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  // Dados de exemplo
  const projects = [
    { id: 1, name: 'Website Redesign', status: 'Em andamento', progress: 75 },
    { id: 2, name: 'App Mobile', status: 'Em andamento', progress: 40 },
    { id: 3, name: 'Campanha Marketing', status: 'Concluído', progress: 100 },
    { id: 4, name: 'Sistema ERP', status: 'Pendente', progress: 10 }
  ];
  
  const tasks = [
    { id: 1, name: 'Design da página inicial', completed: true },
    { id: 2, name: 'Implementar login', completed: true },
    { id: 3, name: 'Testar responsividade', completed: false },
    { id: 4, name: 'Otimizar imagens', completed: false },
    { id: 5, name: 'Revisar textos', completed: false }
  ];
  
  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Sidebar para desktop - sempre visível mas pode estar recolhida */}
      <div className={`hidden md:block transition-all duration-300 ${isSidebarCollapsed ? 'md:w-16' : 'md:w-64'}`}>
        <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      </div>
      
      {/* Sidebar para mobile (quando aberto) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 flex max-w-xs w-full bg-gray-900 shadow-xl">
            <Sidebar isCollapsed={false} toggleSidebar={() => setIsMobileMenuOpen(false)} />
            <button 
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        {/* Cabeçalho */}
        <header className="bg-gray-900 text-white shadow-md">
          <div className="px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              {/* Botão de menu para mobile */}
              <button 
                className="md:hidden mr-3 text-gray-400 hover:text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            
            {/* Perfil no cabeçalho */}
            <div className="flex items-center">
              <span className="mr-2 text-sm hidden sm:inline-block">Augusto Morais</span>
              <img 
                className="h-8 w-8 rounded-full bg-gray-700"
                src="https://via.placeholder.com/40"
                alt="Avatar do usuário"
              />
            </div>
          </div>
        </header>
        
        {/* Conteúdo principal */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Bem-vindo ao Dashboard!</h2>
            <p className="text-gray-300 text-lg">Você foi autenticado com sucesso.</p>
          </div>
          
          {/* Cards de resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
              <div className="flex items-center">
                <div className="bg-cyan-900 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-400">Total de Projetos</h3>
                  <p className="text-2xl font-semibold text-white">{projects.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
              <div className="flex items-center">
                <div className="bg-green-900 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-400">Tarefas</h3>
                  <p className="text-2xl font-semibold text-white">{tasks.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
              <div className="flex items-center">
                <div className="bg-yellow-900 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-400">Em Andamento</h3>
                  <p className="text-2xl font-semibold text-white">
                    {projects.filter(p => p.status === 'Em andamento').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
              <div className="flex items-center">
                <div className="bg-blue-900 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-400">Concluídos</h3>
                  <p className="text-2xl font-semibold text-white">
                    {projects.filter(p => p.status === 'Concluído').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Seção de projetos e tarefas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Projetos recentes */}
            <div className="lg:col-span-2 bg-gray-900 rounded-lg shadow-md border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="text-lg font-medium text-white">Projetos Recentes</h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-800">
                    <thead>
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Nome
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Progresso
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-800">
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {project.name}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              project.status === 'Em andamento' ? 'bg-yellow-900 text-yellow-300' :
                              project.status === 'Concluído' ? 'bg-green-900 text-green-300' :
                              'bg-gray-700 text-gray-300'
                            }`}>
                              {project.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  project.progress === 100 ? 'bg-green-500' :
                                  project.progress > 60 ? 'bg-cyan-500' :
                                  project.progress > 30 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-right mt-1">{project.progress}%</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Tarefas */}
            <div className="bg-gray-900 rounded-lg shadow-md border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="text-lg font-medium text-white">Lista de Tarefas</h3>
              </div>
              <div className="p-6">
                <ul className="divide-y divide-gray-800">
                  {tasks.map((task) => (
                    <li key={task.id} className="py-3 flex items-center">
                      <input
                        id={`task-${task.id}`}
                        name={`task-${task.id}`}
                        type="checkbox"
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-600 rounded"
                        checked={task.completed}
                        readOnly
                      />
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`ml-3 block text-sm ${
                          task.completed ? 'text-gray-500 line-through' : 'text-white'
                        }`}
                      >
                        {task.name}
                      </label>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <button
                    type="button"
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-cyan-500 hover:bg-cyan-600 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Adicionar Tarefa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}