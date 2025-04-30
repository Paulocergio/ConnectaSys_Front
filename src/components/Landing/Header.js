"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const benefits = [
    "Redução de 40% em tarefas administrativas",
    "Aumento da satisfação dos clientes",
    "Controle financeiro completo",
    "Gestão eficiente de estoques"
  ];

  return (
    <section 
      id="sobre" 
      className="relative min-h-screen flex items-center overflow-hidden bg-[#010103] pt-20"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            {/* Main Title */}
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Gestão moderna</span><br/>
              <span className="text-white">para</span><br/>
              <span className="text-indigo-400">oficinas mecânicas</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Transforme sua oficina com uma plataforma completa e intuitiva. 
              Controle todos os aspectos do seu negócio em um único sistema.
            </p>
            
            {/* Benefits List */}
            <div className="mb-10 space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-gray-300">
                  {benefit}
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/cadastro" 
                className="bg-indigo-500 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all flex items-center justify-center group"
              >
                Criar Conta Grátis
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
              
              <a 
                href="#demonstracao" 
                className="bg-[#0A0A0A] border border-gray-800 text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-[#111] transition-all flex items-center justify-center"
              >
                Ver demonstração
              </a>
            </div>
          </div>
          
          {/* Dashboard Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Subtle Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-2xl blur-md opacity-50"></div>
              
              {/* Image Container */}
              <div className="relative bg-[#050505] p-2 rounded-2xl border border-indigo-500/20 shadow-xl overflow-hidden">
                <img 
                  src="/api/placeholder/800/500?text=Dashboard" 
                  alt="ConnectaSys Dashboard" 
                  className="w-full h-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}