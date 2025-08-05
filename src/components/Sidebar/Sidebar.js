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
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

export default function Sidebar({ toggleSidebar }) {
  const pathname = usePathname();
const isSSR = typeof window === "undefined";
const [collapsed, setCollapsed] = useState(isSSR ? false : (() => {
  const saved = localStorage.getItem("sidebar-collapsed");
  return saved === "true"; // força booleando
}));

  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ 
    email: "", 
    firstName: "", 
    lastName: "" 
  });
  const [isLoaded, setIsLoaded] = useState(false); // Novo estado para controlar o carregamento

  const getInitial = (email) => {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileSize = window.innerWidth < 768;
      setIsMobile(isMobileSize);
      
      // Não alterar o estado collapsed baseado no tamanho da tela
      // Manter o estado atual independente do redimensionamento
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
  }
}, [collapsed]);


  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
    }
  }, [collapsed]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Carrega imediatamente os dados em cache se existirem
      const stored = localStorage.getItem("user-data");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUserInfo({
            email: parsed.email || "",
            firstName: parsed.firstName || "",
            lastName: parsed.lastName || "",
          });
        } catch (e) {
          console.error("Erro ao ler user-data:", e);
          // Define valores padrão em caso de erro
          setUserInfo({
            email: "usuario@exemplo.com",
            firstName: "Usuário",
            lastName: "Padrão",
          });
        }
      } else {
        // Define valores padrão se não houver dados
        setUserInfo({
          email: "usuario@exemplo.com",
          firstName: "Usuário",
          lastName: "Padrão",
        });
      }
      setIsLoaded(true); // Marca como carregado
    }
  }, []);

  // Função de toggle simplificada - apenas alterna o estado collapsed
  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMobileToggle = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleLinkClick = () => {
    // No mobile, fecha o menu
    if (isMobile) {
      setMobileMenuOpen(false);
    }
    // No desktop, NÃO altera o estado da sidebar
    // Mantém o estado collapsed como está
  };
  const handleOverlayClick = () => setMobileMenuOpen(false);

  const menuItems = [
    { path: "/customer", label: "Clientes", icon: <UserCheck className="h-5 w-5" /> },
    { path: "/suppliers", label: "Fornecedores", icon: <Truck className="h-5 w-5" /> },
    { path: "/products", label: "Produtos", icon: <Package className="h-5 w-5" /> },
    { path: "/Users", label: "Usuários", icon: <Users className="h-5 w-5" /> },
  ];

  // Não renderiza até que os dados estejam carregados (evita piscada)
  if (!isLoaded) {
    return (
      <div className="h-full w-72 bg-gray-900 border-r border-gray-700/50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="relative">
        <button
          onClick={handleMobileToggle}
          className="fixed top-4 left-4 z-50 p-3 bg-gray-900/90 backdrop-blur-xl text-white rounded-xl border border-gray-700/50 md:hidden hover:bg-gray-800 transition-all duration-300"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div
          className={`fixed inset-0 bg-gray-900/95 backdrop-blur-xl z-40 transform transition-all duration-300 ease-out md:hidden ${
            mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
          }`}
          onClick={handleOverlayClick}
        >
          <div
            className="w-72 h-full bg-gray-900 border-r border-gray-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-6 py-6 border-b border-gray-700/50">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-white font-semibold text-lg">ConnectaSys</h1>
                  <p className="text-gray-400 text-sm">
                    {menuItems.find((item) => item.path === pathname)?.label || "Dashboard"}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-4 py-6">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={handleLinkClick}
                    className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      pathname === item.path 
                        ? "bg-gray-800 text-white border border-gray-700/50" 
                        : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                    {pathname === item.path && <ChevronRight className="ml-auto h-4 w-4" />}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50">
              <div className="flex items-center px-3 py-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {getInitial(userInfo.email)}
                </div>
                <div className="ml-3">
                  <p className="text-white text-sm font-medium">
                    {userInfo.firstName} {userInfo.lastName}
                  </p>
                  <p className="text-gray-400 text-xs">{userInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (

  <div
  className={`h-full bg-gray-900 border-r border-gray-700/50 flex flex-col ${
    collapsed ? "w-16" : "w-60 transition-all duration-300 ease-in-out"
  }`}
>

      <div className={`flex items-center ${collapsed ? "justify-center px-2 py-4" : "px-6 py-6"} border-b border-gray-700/50 relative`}>
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
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
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/20">
            <User className="h-5 w-5 text-white" />
          </div>
        )}

        <button
          onClick={handleToggle}
          className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 border border-white/10 rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 z-50"
          title={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
        >
          {collapsed ? (
            <ChevronRightIcon className="h-3 w-3 text-white" />
          ) : (
            <ChevronLeft className="h-3 w-3 text-white" />
          )}
        </button>
      </div>

      <div className={`flex-1 ${collapsed ? "px-1 py-6" : "px-4 py-6"}`}>
        <nav className={`${collapsed ? "space-y-2" : "space-y-1"}`}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`group relative flex items-center ${
                collapsed 
                  ? "justify-center w-10 h-10 mx-auto" 
                  : "px-3 py-2.5"
              } rounded-lg text-sm font-medium transition-all duration-300 ${
                pathname === item.path
                  ? collapsed
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                    : "bg-gray-800 text-white border border-gray-700/50 shadow-lg"
                  : collapsed
                    ? "text-gray-400 hover:text-white hover:bg-gray-800 hover:shadow-md"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
              }`}
              title={collapsed ? item.label : ""}
            >
              <span className={`transition-all duration-300 flex items-center justify-center ${
                collapsed 
                  ? "w-full h-full" 
                  : "mr-3"
              }`}>
                {item.icon}
              </span>
              {!collapsed && (
                <>
                  {item.label}
                  {pathname === item.path && (
                    <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                  )}
                </>
              )}
              
              {/* Tooltip para modo colapsado */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 border border-gray-700/50 shadow-xl">
                  {item.label}
                  <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-800 border-l border-t border-gray-700/50 rotate-45"></div>
                </div>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {!collapsed && (
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {getInitial(userInfo.email)}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-white text-sm font-medium">
                {userInfo.firstName} {userInfo.lastName}
              </p>
              <p className="text-gray-400 text-xs">{userInfo.email}</p>
            </div>
          </div>
        </div>
      )}

      {collapsed && (
        <div className="p-2 border-t border-gray-700/50">
          <div className="flex justify-center">
            <div
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center hover:from-purple-600 hover:to-blue-600 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-purple-500/20 relative group"
              title={`${userInfo.firstName} ${userInfo.lastName} - ${userInfo.email}`}
            >
              <span className="text-white font-bold text-sm">{getInitial(userInfo.email)}</span>
              
              {/* Tooltip para o usuário */}
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 border border-gray-700/50 shadow-xl">
                <div className="font-medium">{userInfo.firstName} {userInfo.lastName}</div>
                <div className="text-gray-400 text-xs">{userInfo.email}</div>
                <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-800 border-l border-t border-gray-700/50 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}