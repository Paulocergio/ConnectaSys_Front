"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Header() {
  const benefits = [
    "Redução de 40% em tarefas administrativas",
    "Aumento da satisfação dos clientes",
    "Controle financeiro completo",
    "Gestão eficiente de estoques"
  ];

  return (
<section id="sobre" className="relative min-h-screen flex items-center bg-[#101218] text-white py-16">      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Column - Text Content */}
          <div className="lg:w-1/2">
            {/* Main Title */}
            <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="text-white">Gestão moderna</span><br/>
              <span className="text-white">para</span><br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                oficinas mecânicas
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Transforme sua oficina com uma plataforma completa e intuitiva. 
              Controle todos os aspectos do seu negócio em um único sistema.
            </p>
            
            {/* Benefits List - Redesigned with icons */}
            <div className="mb-10 space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-300">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-indigo-400" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons - Simplified */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/cadastro" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors flex items-center justify-center shadow-lg shadow-indigo-600/20"
              >
                Criar Conta Grátis
                <ArrowRight size={18} className="ml-2" />
              </a>
              
              <a 
                href="#demonstracao" 
                className="border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors flex items-center justify-center"
              >
                Ver demonstração
              </a>
            </div>
          </div>
          
          {/* Right Column - Dashboard Preview */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              {/* Soft glow behind dashboard */}
              <div className="absolute -inset-4 bg-indigo-500/20 rounded-3xl blur-3xl opacity-30"></div>
              
              {/* Dashboard container */}
              <div className="relative bg-gradient-to-br from-[#0C1228] to-[#161E42] rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/20">
                {/* Top bar */}
                <div className="flex justify-between items-center p-4 border-b border-indigo-500/10">
                  <div className="flex space-x-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-sm text-indigo-300 font-semibold tracking-wider">ConnectaSys</div>
                  <div className="flex space-x-1.5 items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="text-xs text-green-400">ONLINE</div>
                  </div>
                </div>
                
                {/* Dashboard content */}
                <div className="p-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#0A0E1F] p-4 rounded-xl border border-indigo-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-indigo-300 font-medium">Faturamento</h3>
                        <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-white text-2xl font-bold">R$1.000.000</p>
                      <div className="flex items-center text-green-400 text-sm mt-1">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                        </svg>
                        32% em relação ao mês anterior
                      </div>
                    </div>
                    
                    <div className="bg-[#0A0E1F] p-4 rounded-xl border border-purple-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-purple-300 font-medium">Clientes</h3>
                        <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <p className="text-white text-2xl font-bold">1.000</p>
                      <div className="flex items-center text-green-400 text-sm mt-1">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                        </svg>
                        12% em relação ao mês anterior
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart */}
                  <div className="bg-[#0A0E1F] p-4 rounded-xl border border-blue-500/20 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-blue-300 font-medium">Desempenho Anual</h3>
                      <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    
                    {/* Static chart representation */}
                    <div className="h-40 flex items-end space-x-2">
                      {[30, 45, 25, 60, 40, 70, 55, 65, 50, 80, 60, 75].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-gradient-to-t from-blue-500/30 to-indigo-500/60 rounded-sm"
                            style={{ height: `${height}%` }}
                          ></div>
                          <div className="text-xs text-gray-500 mt-1">{i + 1}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Activity Feed */}
                  <div className="bg-[#0A0E1F] p-4 rounded-xl border border-indigo-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-indigo-300 font-medium">Atividades Recentes</h3>
                      <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { title: "Ordem de serviço #1528 concluída", time: "Há 15 minutos" },
                        { title: "Novo cliente cadastrado", time: "Há 1 hora" },
                        { title: "Pagamento de R$750 recebido", time: "Há 3 horas" }
                      ].map((activity, i) => (
                        <div key={i} className="flex items-center py-2 border-b border-gray-800">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                          <div>
                            <p className="text-gray-200">{activity.title}</p>
                            <p className="text-gray-500 text-xs">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Accent elements */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg hidden lg:flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg hidden lg:flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simple grid pattern for background */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
}