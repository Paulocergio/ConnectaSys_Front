"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Features() {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const features = [
    {
      id: 1,
      title: "Gestão de Clientes",
      description: "Mantenha todos os dados dos seus clientes organizados em um só lugar com histórico completo de serviços e lembretes automáticos.",
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    {
      id: 2,
      title: "Controle de Serviços",
      description: "Acompanhe todas as ordens de serviço desde a abertura até a conclusão com status em tempo real e notificações personalizadas.",
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
      )
    },
    {
      id: 3,
      title: "Controle Financeiro",
      description: "Monitore receitas, despesas e lucros com relatórios detalhados, dashboards interativos e previsões baseadas em IA.",
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      )
    }
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, y: -10 }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 15, scale: 1.2 }
  };

  const backgroundVariants = {
    initial: { opacity: 0.5 },
    hover: { opacity: 1 }
  };

  return (
    <section id="funcionalidades" className="py-24 px-6 bg-gradient-to-b from-[#050A14] to-[#0A1428]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-widest text-indigo-400 mb-3">Recursos Exclusivos</h2>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Funcionalidades Poderosas
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="relative overflow-hidden rounded-2xl"
              initial="initial"
              animate="animate"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut"
              }}
              onHoverStart={() => setHoveredCard(feature.id)}
              onHoverEnd={() => setHoveredCard(null)}
              variants={cardVariants}
            >
              {/* Background Gradient Layer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl"
                variants={backgroundVariants}
              />
              
              {/* Card Content */}
              <div className="relative bg-[#07101E]/90 p-8 rounded-2xl backdrop-blur-sm border border-indigo-500/30 h-full flex flex-col">
                {/* Icon */}
                <motion.div
                  className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 w-16 h-16 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20"
                  variants={iconVariants}
                >
                  {feature.icon}
                </motion.div>
                
                {/* Glow effect */}
                {hoveredCard === feature.id && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-30 -z-10"></div>
                )}
                
                {/* Text Content */}
                <h4 className="text-2xl font-bold mb-4 text-white">{feature.title}</h4>
                <p className="text-gray-300 leading-relaxed flex-grow">{feature.description}</p>
                
                {/* Indicator Line */}
                <div className="mt-6 pt-4 border-t border-indigo-500/20">
                  <div className="flex items-center text-indigo-300 text-sm font-medium">
                    <span>Saiba mais</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}