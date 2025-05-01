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
     <section id="sobre" className="relative min-h-screen flex items-center overflow-hidden bg-white text-black pt-20">
      {/* Starfield background */}
      <div className="absolute inset-0 z-0">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            {/* Main Title */}
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Gestão moderna</span><br/>
              <span className="text-white">para</span><br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient">
                oficinas mecânicas
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Transforme sua oficina com uma plataforma completa e intuitiva. 
              Controle todos os aspectos do seu negócio em um único sistema.
            </p>
            
            {/* Benefits List */}
            <div className="mb-10 space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="text-gray-300 transition-all"
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animation: 'fadeInLeft 0.8s ease-out forwards'
                  }}
                >
                  {benefit}
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/cadastro" 
                className="relative overflow-hidden group bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-gradient-slow text-white px-8 py-4 rounded-xl font-medium text-lg transition-all flex items-center justify-center"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute -inset-x-1 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300 blur-sm"></span>
                <span className="absolute -inset-y-1 -right-1 w-0.5 bg-gradient-to-b from-indigo-300 to-purple-300 blur-sm"></span>
                <span className="absolute -inset-y-1 -left-1 w-0.5 bg-gradient-to-b from-purple-300 to-indigo-300 blur-sm"></span>
                <span className="absolute -inset-x-1 -top-1 h-0.5 bg-gradient-to-r from-purple-300 to-indigo-300 blur-sm"></span>
                <span className="relative">Criar Conta Grátis</span>
                <ArrowRight size={18} className="ml-2 relative transition-transform group-hover:translate-x-1" />
              </a>
              
              <a 
                href="#demonstracao" 
                className="relative overflow-hidden group border border-indigo-500/30 bg-[#0A0A0A]/50 backdrop-blur-md text-white px-8 py-4 rounded-xl font-medium text-lg transition-all flex items-center justify-center"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative">Ver demonstração</span>
              </a>
            </div>
          </div>
          
          {/* Ultra premium visual element */}
          <div className="lg:w-1/2 flex justify-center items-center perspective">
            <div className="relative w-full max-w-lg h-96 scene-3d">
              {/* Holographic effect container */}
              <div className="hologram absolute inset-0 rounded-full bg-gradient-to-r from-indigo-900/10 to-purple-900/10 blur-3xl opacity-30 pulse-glow"></div>
              
              {/* Floating platforms with 3D effect */}
              <div className="platform-base absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#060A1A]/80 rounded-full border border-indigo-500/10 backdrop-blur-sm shadow-xl rotate-x-45 float-slow z-10">
                <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
              </div>
              
              {/* Central dashboard 3D element */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 perspective preserve-3d float-rotate z-20">
                <div className="w-80 h-56 bg-gradient-to-br from-[#0C1228] to-[#161E42] rounded-xl p-4 shadow-intense border border-indigo-500/20 backdrop-blur-md transform rotate-x-10 rotate-y-5">
                  {/* Top bar with translucent glass effect */}
                  <div className="flex justify-between items-center mb-3 border-b border-indigo-500/10 pb-2">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-red-400"></div>
                      <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-xs text-indigo-300 font-semibold tracking-wider">ConnectaSys</div>
                    <div className="flex space-x-1 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 pulse"></div>
                      <div className="text-[8px] text-green-400">ONLINE</div>
                    </div>
                  </div>
                  
                  {/* Dashboard content with glowing accents */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="col-span-1 h-16 rounded-lg glass-panel p-2 glow-border-indigo">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-[8px] text-indigo-300 font-medium">Faturamento</div>
                        <div className="w-1 h-1 rounded-full bg-indigo-500 pulse"></div>
                      </div>
                      <div className="text-white text-sm font-bold">R$1.000.000</div>
                      <div className="flex items-center">
                        <div className="text-[8px] text-green-400">+32%</div>
                        <svg className="w-2 h-2 ml-0.5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="col-span-1 h-16 rounded-lg glass-panel p-2 glow-border-purple">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-[8px] text-purple-300 font-medium">Clientes</div>
                        <div className="w-1 h-1 rounded-full bg-purple-500 pulse"></div>
                      </div>
                      <div className="text-white text-sm font-bold">1000</div>
                      <div className="flex items-center">
                        <div className="text-[8px] text-green-400">+12%</div>
                        <svg className="w-2 h-2 ml-0.5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated chart */}
                  <div className="h-20 rounded-lg glass-panel p-2 glow-border-blue relative overflow-hidden">
                    <div className="absolute top-2 left-2 text-[8px] text-blue-300 font-medium">Desempenho Anual</div>
                    
                    {/* Animated 3D chart with depth effect */}
                    <div className="absolute inset-x-0 bottom-0 h-14 px-2 flex items-end">
                      {[...Array(12)].map((_, i) => {
                        const heights = [30, 45, 25, 60, 40, 70, 55, 65, 50, 80, 60, 75];
                        return (
                          <div 
                            key={i} 
                            className="bar-3d mx-0.5 flex-1 bg-gradient-to-t from-blue-500/30 to-indigo-500/60 rounded-sm relative"
                            style={{ 
                              height: `${heights[i]}%`,
                              animation: `growBar 2s ease-out forwards`,
                              animationDelay: `${i * 0.1}s`,
                              transform: 'scaleY(0)',
                              transformOrigin: 'bottom'
                            }}
                          >
                            <div className="absolute inset-x-0 top-0 h-0.5 bg-blue-400/50 blur-sm"></div>
                            <div className="absolute inset-y-0 right-0 w-0.5 bg-blue-400/30 blur-sm"></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Shadow beneath the dashboard */}
                <div className="absolute w-64 h-8 bg-indigo-900/20 blur-xl rounded-full -bottom-4 left-1/2 transform -translate-x-1/2"></div>
              </div>
              
              {/* Orbiting elements with realistic 3D motion */}
              <div className="orbital-system absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="orbital-ring absolute inset-0 rounded-full border border-indigo-500/10 transform rotate-x-60 rotate-z-25"></div>
                <div className="orbital-ring absolute inset-2 rounded-full border border-purple-500/10 transform rotate-x-65 rotate-z-45"></div>
                <div className="orbital-ring absolute inset-4 rounded-full border border-blue-500/10 transform rotate-x-30 rotate-z-15"></div>
                
                {/* Orbiting elements */}
                <div className="orbital-element absolute" style={{
                  top: '10%',
                  left: '70%',
                  animation: 'orbit3D 15s linear infinite',
                  transform: 'rotate3d(1, 0.2, 0.3, 45deg)'
                }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-glow-indigo flex items-center justify-center transform hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                </div>
                
                <div className="orbital-element absolute" style={{
                  top: '75%',
                  left: '30%',
                  animation: 'orbit3D 20s linear infinite',
                  animationDelay: '-5s',
                  transform: 'rotate3d(0.2, 1, 0.1, 60deg)'
                }}>
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-glow-purple flex items-center justify-center transform hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                
                <div className="orbital-element absolute" style={{
                  top: '40%',
                  left: '15%',
                  animation: 'orbit3D 12s linear infinite',
                  animationDelay: '-3s',
                  transform: 'rotate3d(0.5, 0.2, 1, 30deg)'
                }}>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-glow-blue flex items-center justify-center transform hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Glowing accent points */}
              <div className="glow-point absolute w-1 h-1 rounded-full bg-indigo-500 shadow-glow-indigo opacity-70" style={{top: '20%', left: '60%'}}></div>
              <div className="glow-point absolute w-1 h-1 rounded-full bg-purple-500 shadow-glow-purple opacity-70" style={{top: '70%', left: '30%'}}></div>
              <div className="glow-point absolute w-1 h-1 rounded-full bg-blue-500 shadow-glow-blue opacity-70" style={{top: '40%', left: '80%'}}></div>
              <div className="glow-point absolute w-1 h-1 rounded-full bg-indigo-500 shadow-glow-indigo opacity-70" style={{top: '80%', left: '70%'}}></div>
              <div className="glow-point absolute w-1 h-1 rounded-full bg-purple-500 shadow-glow-purple opacity-70" style={{top: '30%', left: '20%'}}></div>
              
              {/* Particle system */}
              <div className="particles absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i}
                    className="particle absolute w-0.5 h-0.5 rounded-full bg-white opacity-50"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `particleFlow ${5 + Math.random() * 10}s infinite linear`,
                      animationDelay: `${Math.random() * 5}s`
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Connection lines with gradient and animation */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#6366F1" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                
                <path 
                  d="M120,60 Q200,30 280,90" 
                  stroke="url(#lineGradient1)" 
                  strokeWidth="1" 
                  fill="none" 
                  strokeDasharray="5,5"
                  className="animated-line"
                />
                <path 
                  d="M90,180 Q160,150 240,120" 
                  stroke="url(#lineGradient2)" 
                  strokeWidth="1" 
                  fill="none" 
                  strokeDasharray="5,5" 
                  className="animated-line"
                  style={{animationDelay: '1s'}}
                />
                <path 
                  d="M50,100 Q120,170 180,140" 
                  stroke="url(#lineGradient1)" 
                  strokeWidth="1" 
                  fill="none" 
                  strokeDasharray="5,5"
                  className="animated-line"
                  style={{animationDelay: '2s'}}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add this to your CSS/Styles */}
      <style jsx>{`
        /* 3D and perspective styles */
        .perspective {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .rotate-x-10 {
          transform: rotateX(10deg);
        }
        
        .rotate-x-30 {
          transform: rotateX(30deg);
        }
        
        .rotate-x-45 {
          transform: rotateX(45deg);
        }
        
        .rotate-x-60 {
          transform: rotateX(60deg);
        }
        
        .rotate-x-65 {
          transform: rotateX(65deg);
        }
        
        .rotate-y-5 {
          transform: rotateY(5deg);
        }
        
        .rotate-z-15 {
          transform: rotateZ(15deg);
        }
        
        .rotate-z-25 {
          transform: rotateZ(25deg);
        }
        
        .rotate-z-45 {
          transform: rotateZ(45deg);
        }
        
        /* Shadow and glow effects */
        .shadow-intense {
          box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.2), 0 10px 10px -5px rgba(99, 102, 241, 0.1);
        }
        
        .shadow-glow-indigo {
          box-shadow: 0 0 15px 2px rgba(99, 102, 241, 0.4);
        }
        
        .shadow-glow-purple {
          box-shadow: 0 0 15px 2px rgba(139, 92, 246, 0.4);
        }
        
        .shadow-glow-blue {
          box-shadow: 0 0 15px 2px rgba(59, 130, 246, 0.4);
        }
        
        /* Glass and panel styles */
        .glass-panel {
          background: rgba(15, 23, 42, 0.3);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(99, 102, 241, 0.1);
        }
        
        .glow-border-indigo {
          box-shadow: inset 0 0 0 1px rgba(99, 102, 241, 0.2);
        }
        
        .glow-border-purple {
          box-shadow: inset 0 0 0 1px rgba(139, 92, 246, 0.2);
        }
        
        .glow-border-blue {
          box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.2);
        }
        
        /* Animation keyframes */
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes orbit3D {
          0% { transform: rotate3d(1, 0.5, 0.2, 0deg) translateX(70px) translateZ(30px); }
          50% { transform: rotate3d(1, 0.5, 0.2, 180deg) translateX(70px) translateZ(-30px); }
          100% { transform: rotate3d(1, 0.5, 0.2, 360deg) translateX(70px) translateZ(30px); }
        }
        
        @keyframes float-rotate {
          0% { transform: translateY(0) rotateX(10deg) rotateY(5deg); }
          50% { transform: translateY(-10px) rotateX(15deg) rotateY(-5deg); }
          100% { transform: translateY(0) rotateX(10deg) rotateY(5deg); }
        }
        
        @keyframes float-slow {
          0% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
          100% { transform: translateY(0) rotate(-3deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        @keyframes growBar {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        
        @keyframes particleFlow {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-100px, -50px); opacity: 0; }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes lineFlow {
          0% { stroke-dashoffset: 50; }
          100% { stroke-dashoffset: 0; }
        }
        
        /* Starfield animation - creates a beautiful space background */
        @keyframes animateStars {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
        
        #stars {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 
            ${Array.from({length: 50}, () => `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`).join(', ')};
          animation: animateStars 150s linear infinite;
        }
        
        #stars2 {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 
            ${Array.from({length: 50}, () => `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`).join(', ')};
          animation: animateStars 200s linear infinite;
        }
        
        #stars3 {
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: 
            ${Array.from({length: 50}, () => `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`).join(', ')};
          animation: animateStars 250s linear infinite;
        }
        
        /* Applied animations */
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        
        .float-rotate {
          animation: float-rotate 6s ease-in-out infinite;
        }
        
        .float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        
        .glow-point {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .animated-line {
          animation: lineFlow 4s linear infinite;
        }
        
        /* Grid pattern for platform */
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