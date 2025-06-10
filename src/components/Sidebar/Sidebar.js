"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar({ isCollapsed = true, toggleSidebar }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detectar se é mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Sincronizar o estado interno com a prop
  useEffect(() => {
    if (!isMobile) {
      setCollapsed(isCollapsed);
      setMobileMenuOpen(false);
    }
  }, [isCollapsed, isMobile]);

  // Toggle para desktop
  const handleToggle = () => {
    if (toggleSidebar) {
      toggleSidebar();
    } else {
      setCollapsed(!collapsed);
    }
  };

  // Toggle para mobile
  const handleMobileToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Fechar menu mobile ao clicar em link
  const handleLinkClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Fechar menu mobile ao clicar fora
  const handleOverlayClick = () => {
    setMobileMenuOpen(false);
  };

  const menuItems = [
    {
      path: "/customer",
      label: "Clientes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
    },
    {
      path: "/suppliers",
      label: "Fornecedores",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
    },
    {
      path: "/Users",
      label: "Usuários",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  // Renderização para mobile com dropdown
  if (isMobile) {
    return (
      <div className="relative">
        {/* Botão hambúrguer fixo no topo direito */}
        <button
          onClick={handleMobileToggle}
          className="fixed top-4 right-4 z-50 p-1.5 bg-white shadow-md rounded-md border border-gray-200 md:hidden"
          aria-label="Toggle menu"
        >
          <div
            className={`w-4 h-4 flex flex-col justify-center items-center transform transition-all duration-300 ${mobileMenuOpen ? "rotate-45" : ""}`}
          >
            <span
              className={`block w-3.5 h-0.5 bg-gray-600 transform transition-all duration-300 ${mobileMenuOpen ? "rotate-90 translate-y-0" : "-translate-y-1"}`}
            ></span>
            <span
              className={`block w-3.5 h-0.5 bg-gray-600 transform transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`block w-3.5 h-0.5 bg-gray-600 transform transition-all duration-300 ${mobileMenuOpen ? "-rotate-90 -translate-y-0" : "translate-y-1"}`}
            ></span>
          </div>
        </button>

        {/* Menu dropdown mobile ocupando toda a tela */}
        <div
          className={`fixed inset-0 bg-white z-40 transform transition-all duration-300 ease-out md:hidden ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full pointer-events-none"
          }`}
          onClick={handleOverlayClick}
        >
          {/* Cabeçalho do menu dropdown */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 bg-gradient-to-r from-cyan-50 to-blue-50">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-full shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a6.715 6.715 0 00-3.722 1.118.75.75 0 11-.828-1.25 8.25 8.25 0 0112.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 01-1.395-.551A21.69 21.69 0 0018.75 10.5 6.75 6.75 0 0012 3.75z"
                    clipRule="evenodd"
                  />
                  <path d="M7.5 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 12zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zM7.5 18a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 017.5 18z" />
                </svg>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-800">ConnectaSys</h1>
            </div>
            <button
              onClick={handleMobileToggle}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu items dropdown ocupando toda a tela */}
          <nav
            className="flex-1 px-6 py-8 overflow-y-auto bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="space-y-3 max-w-md mx-auto">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={handleLinkClick}
                      className={`flex items-center px-6 py-4 text-base rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-50 to-blue-50 text-blue-600 shadow-lg border-l-4 border-blue-500"
                          : "text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:shadow-md"
                      }`}
                    >
                      <span className={`${isActive ? "text-blue-500" : "text-gray-500"} mr-4`}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    );
  }

  // Renderização para desktop (versão original)
  return (
    <div
      className={`h-full bg-white shadow-lg transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Cabeçalho do Sidebar com botão de toggle */}
      <div className={`flex items-center px-4 py-5 ${collapsed ? "justify-center" : ""}`}>
        {!collapsed && (
          <>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a6.715 6.715 0 00-3.722 1.118.75.75 0 11-.828-1.25 8.25 8.25 0 0112.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 01-1.395-.551A21.69 21.69 0 0018.75 10.5 6.75 6.75 0 0012 3.75z"
                  clipRule="evenodd"
                />
                <path d="M7.5 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 12zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zM7.5 18a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 017.5 18z" />
              </svg>
            </div>
            <h1 className="ml-3 text-xl font-semibold text-gray-800">ConnectaSys</h1>
          </>
        )}

        {/* Botão de toggle desktop */}
        <button
          onClick={handleToggle}
          className={`text-gray-500 hover:text-blue-600 focus:outline-none ${collapsed ? "" : "ml-auto"}`}
        >
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Menu desktop */}
      <nav className="mt-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center ${collapsed ? "justify-center" : ""} px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-50 to-blue-50 text-blue-600 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                  title={collapsed ? item.label : ""}
                >
                  <span className={isActive ? "text-blue-500" : "text-gray-500"}>{item.icon}</span>
                  {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
