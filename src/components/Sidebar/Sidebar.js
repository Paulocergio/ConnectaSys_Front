"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import {
  Users,
  Package,
  Truck,
  UserCheck,
  ChevronRight,
  Menu,
  X,
  User,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function Sidebar({ isCollapsed = false, toggleSidebar }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const [userEmail, setUserEmail] = useState("");

  const getInitial = (email) => {
  if (!email) return "U";
  return email.charAt(0).toUpperCase();
};


  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setCollapsed(isCollapsed);
      setMobileMenuOpen(false);
    }
  }, [isCollapsed, isMobile]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user-data");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUserEmail(parsed.email || "");
        } catch (e) {
          console.error("Erro ao ler user-data:", e);
        }
      }
    }
  }, []);

  const handleToggle = () => {
    if (toggleSidebar) {
      toggleSidebar();
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleMobileToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const handleOverlayClick = () => {
    setMobileMenuOpen(false);
  };

  const menuItems = [
    {
      path: "/customer",
      label: "Clientes",
      icon: <UserCheck className="h-5 w-5" />,
    },
    {
      path: "/suppliers",
      label: "Fornecedores",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      path: "/products",
      label: "Produtos",
      icon: <Package className="h-5 w-5" />,
    },
    {
      path: "/Users",
      label: "Usuários",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  if (isMobile) {


    return (
      <div className="relative">
        {/* Botão do menu mobile */}
        <button
          onClick={handleMobileToggle}
          className="fixed top-4 left-4 z-50 p-3 bg-gray-900/90 backdrop-blur-xl text-white rounded-xl border border-gray-700/50 md:hidden hover:bg-gray-800 transition-all duration-300"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Overlay mobile */}
        <div
          className={`fixed inset-0 bg-gray-900/95 backdrop-blur-xl z-40 transform transition-all duration-300 ease-out md:hidden ${
            mobileMenuOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full pointer-events-none"
          }`}
          onClick={handleOverlayClick}
        >
          <div
            className="w-72 h-full bg-gray-900 border-r border-gray-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header mobile */}
            <div className="flex items-center px-6 py-6 border-b border-gray-700/50">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a6.715 6.715 0 00-3.722 1.118.75.75 0 11-.828-1.25 8.25 8.25 0 0112.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 01-1.395-.551A21.69 21.69 0 0018.75 10.5 6.75 6.75 0 0012 3.75z"
                      clipRule="evenodd"
                    />
                    <path d="M7.5 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 12zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zM7.5 18a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 017.5 18z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h1 className="text-white font-semibold text-lg">ConnectaSys</h1>
                  <p className="text-gray-400 text-sm">Dashboard</p>
                </div>
              </div>
            </div>

            {/* Navegação mobile */}
            <div className="px-4 py-6">
              <div className="mb-6">
                <h2 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3 px-2">
                  Principal
                </h2>
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={handleLinkClick}
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-gray-800 text-white border border-gray-700/50"
                            : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                        {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Footer mobile */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50">
              <div className="flex items-center px-3 py-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-white text-sm font-medium">{userData.name}</p>
                  <p className="text-gray-400 text-xs">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sidebar desktop
  return (
    <div
      className={`h-full bg-gray-900 border-r border-gray-700/50 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="flex items-center px-6 py-6 border-b border-gray-700/50 relative">
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a6.715 6.715 0 00-3.722 1.118.75.75 0 11-.828-1.25 8.25 8.25 0 0112.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 01-1.395-.551A21.69 21.69 0 0018.75 10.5 6.75 6.75 0 0012 3.75z"
                  clipRule="evenodd"
                />
                <path d="M7.5 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 12zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zM7.5 18a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 017.5 18z" />
              </svg>
            </div>
            <div className="ml-3">
              <h1 className="text-white font-semibold text-lg">ConnectaSys</h1>
              <p className="text-gray-400 text-sm">
                {menuItems.find((item) => item.path === pathname)?.label || "Dashboard"}
              </p>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a6.715 6.715 0 00-3.722 1.118.75.75 0 11-.828-1.25 8.25 8.25 0 0112.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 01-1.395-.551A21.69 21.69 0 0018.75 10.5 6.75 6.75 0 0012 3.75z"
                clipRule="evenodd"
              />
              <path d="M7.5 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 12zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zM7.5 18a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 017.5 18z" />
            </svg>
          </div>
        )}

        {/* Botão para expandir/colapsar */}
        <button
          onClick={handleToggle}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200 hover:scale-110"
          title={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-3 w-3" />
          ) : (
            <PanelLeftClose className="h-3 w-3" />
          )}
        </button>
      </div>

      {/* Navegação principal */}
      <div className="flex-1 px-4 py-6">
        <div className="mb-8">
          {!collapsed && (
            <h2 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-4 px-2">
              Principal
            </h2>
          )}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`group flex items-center ${collapsed ? "justify-center px-2" : "px-3"} py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gray-800 text-white border border-gray-700/50 shadow-lg"
                      : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                  }`}
                  title={collapsed ? item.label : ""}
                >
                  <span
                    className={`${collapsed ? "" : "mr-3"} transition-colors duration-200 ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-300"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <>
                      {item.label}
                      {isActive && <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Seção adicional (More) */}
        {!collapsed && (
          <div>
            <h2 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-4 px-2">
              Mais
            </h2>
            <nav className="space-y-1">
              <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200">
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Favoritos
              </button>
              <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200">
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Premium
              </button>
              <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200 group">
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Configurações
                <ChevronRight className="ml-auto h-4 w-4 text-gray-400 group-hover:text-gray-300" />
              </button>
            </nav>
          </div>
        )}
      </div>


      {!collapsed && (
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer">
           <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
  {getInitial(userEmail)}
</div>

<div className="ml-3 flex-1">
  <p className="text-white text-sm font-medium">{getInitial(userEmail)}</p>
  <p className="text-gray-400 text-xs">{userEmail}</p>
</div>

          </div>
        </div>
      )}

      {collapsed && (
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex justify-center">
            <div
              className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200 cursor-pointer"
              title="User Name"
            >
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
