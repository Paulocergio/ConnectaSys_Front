'use client';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'; // Importe o Sidebar
import MobileHeader from '../../components/Sidebar/MobileHeader'; // Importe o MobileHeader 

export default function DashboardLayout({ children, title = "Dashboard" }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Mobile */}
      <MobileHeader 
        toggleMobileSidebar={toggleMobileSidebar}
        title={title}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
          isMobileOpen={mobileSidebarOpen}
          toggleMobile={toggleMobileSidebar}
        />

        {/* Conteúdo Principal */}
        <main className={`
          flex-1 transition-all duration-300
          ${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'}
          pt-0 lg:pt-4
          px-4 lg:px-6
          pb-6
        `}>
          <div className="max-w-7xl mx-auto">
            {/* Header Desktop (opcional) */}
            <div className="hidden lg:block mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
                  <p className="text-gray-600 mt-1">Bem-vindo de volta ao seu painel</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-13h5v13z" />
                    </svg>
                  </button>
                  
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">U</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Conteúdo das páginas */}
            <div className="mt-4 lg:mt-0">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}