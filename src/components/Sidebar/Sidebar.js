"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import {
  Users,
  Package,
  Truck,
  UserCheck,
} from "lucide-react"; 

export default function Sidebar({ isCollapsed = true, toggleSidebar }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Renderização para mobile
  if (isMobile) {
    return (
      <div className="relative">
        {/* Botão hambúrguer elegante */}
        <button
          onClick={handleMobileToggle}
          className="fixed top-4 right-4 z-50 p-3 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 md:hidden hover:bg-white transition-all duration-300 hover:scale-105"
          aria-label="Toggle menu"
        >
          <div
            className={`w-5 h-5 flex flex-col justify-center items-center transform transition-all duration-300 ${mobileMenuOpen ? "rotate-45" : ""}`}
          >
            <span
              className={`block w-4 h-0.5 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full transform transition-all duration-300 ${mobileMenuOpen ? "rotate-90 translate-y-0" : "-translate-y-1.5"}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full transform transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full transform transition-all duration-300 ${mobileMenuOpen ? "-rotate-90 -translate-y-0" : "translate-y-1.5"}`}
            ></span>
          </div>
        </button>

        {/* Menu dropdown mobile elegante */}
        <div
          className={`fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 backdrop-blur-sm z-40 transform transition-all duration-500 ease-out md:hidden ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full pointer-events-none"
          }`}
          onClick={handleOverlayClick}
        >
          {/* Header do menu mobile */}
          <div className="flex items-center justify-between px-6 py-8 border-b border-slate-200/50 bg-white/60 backdrop-blur-lg">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-sm opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 p-3 rounded-2xl shadow-lg">
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
              </div>
              <h1 className="ml-4 text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                ConnectaSys
              </h1>
            </div>
            <button
              onClick={handleMobileToggle}
              className="p-2 text-slate-500 hover:text-red-500 transition-colors duration-300 hover:bg-red-50 rounded-xl"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu items mobile */}
          <nav
            className="flex-1 px-6 py-8 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="space-y-4 max-w-md mx-auto">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path} className={`transform transition-all duration-300 delay-${index * 100}`}>
                    <Link
                      href={item.path}
                      onClick={handleLinkClick}
                      className={`group flex items-center px-6 py-4 text-base rounded-2xl transition-all duration-300 relative overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl shadow-blue-500/25 scale-105"
                          : "text-slate-700 hover:bg-white/80 hover:text-blue-600 hover:shadow-lg hover:scale-105 bg-white/40 backdrop-blur-sm border border-white/20"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-10 rounded-2xl"></div>
                      )}
                      <span className={`relative z-10 transition-all duration-300 mr-4 ${
                        isActive ? "text-white scale-110" : "text-slate-500 group-hover:text-blue-500 group-hover:scale-110"
                      }`}>
                        {item.icon}
                      </span>
                      <span className="relative z-10 font-semibold">{item.label}</span>
                      {isActive && (
                        <div className="absolute right-4 w-2 h-2 bg-white rounded-full opacity-80"></div>
                      )}
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


  return (
    <div
      className={`h-full bg-gradient-to-b from-slate-50 to-white border-r border-slate-200/60 shadow transition-all duration-200 ease-out ${
        collapsed ? "w-14" : "w-44"
      }`}
    >
     
      <div className="flex items-center px-2 py-3 border-b border-slate-200/40">
     
        {!collapsed && (
          <div className="flex items-center flex-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl blur-sm opacity-60"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-xl shadow">
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
            </div>
            <h1 className="ml-2 text-base font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              ConnectaSys
            </h1>
          </div>
        )}

 
        <button
          onClick={handleToggle}
          className={`group p-1 text-slate-500 hover:text-blue-600 focus:outline-none transition-all duration-200 rounded-lg hover:bg-blue-50 ${
            collapsed ? "mx-auto" : "ml-auto"
          }`}
        >
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transform group-hover:scale-110 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transform group-hover:scale-110 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          )}
        </button>
      </div>


      <nav className="mt-3 px-1">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path} className={`transform transition-all duration-200 delay-${index * 50}`}>
                <Link
                  href={item.path}
                  className={`group flex items-center ${
                    collapsed ? "justify-center px-2" : "px-2"
                  } py-2 text-xs rounded-lg transition-all duration-200 relative overflow-hidden ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md scale-105"
                      : "text-slate-700 hover:bg-slate-100 hover:text-blue-600 hover:shadow-sm hover:scale-105"
                  }`}
                  title={collapsed ? item.label : ""}
                >
                  {isActive && !collapsed && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                  )}
                  <span className={`transition-all duration-200 ${
                    isActive ? "text-white scale-110" : "text-slate-500 group-hover:text-blue-500 group-hover:scale-110"
                  }`}>
                    {item.icon &&
                   
                      <span className="inline-flex items-center justify-center h-4 w-4">
                        {item.icon}
                      </span>
                    }
                  </span>
                  {!collapsed && (
                    <span className="ml-2 font-medium tracking-wide">{item.label}</span>
                  )}
                  {isActive && collapsed && (
                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-l-full"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>    
    </div>
  );
}