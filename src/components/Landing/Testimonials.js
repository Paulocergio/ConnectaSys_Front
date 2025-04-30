"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, MessageSquare, User, MapPin } from 'lucide-react';

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const autoplayTimerRef = useRef(null);
  
  const testimonials = [
    {
      id: 1,
      name: "Rafael Oliveira",
      role: "Proprietário de Oficina",
      location: "Belo Horizonte, MG",
      avatar: "/api/placeholder/128/128?text=RO",
      content: "Desde que implementei o ConnectaSys, reduzi em 40% o tempo gasto com tarefas administrativas. Agora consigo focar no que realmente importa: servir meus clientes com qualidade.",
      rating: 5,
      highlight: "40% menos tempo em tarefas administrativas",
      company: "Oficina do Rafael"
    },
    {
      id: 2,
      name: "Fernanda Santos",
      role: "Gerente Financeira",
      location: "São Paulo, SP",
      avatar: "/api/placeholder/128/128?text=FS",
      content: "O controle financeiro do sistema é impressionante. Consigo visualizar exatamente a lucratividade de cada serviço e identificar oportunidades de melhoria.",
      rating: 5,
      highlight: "Visualização exata da lucratividade",
      company: "Auto Center Express"
    },
    {
      id: 3,
      name: "Carlos Mendes",
      role: "Mecânico Chefe",
      location: "Curitiba, PR",
      avatar: "/api/placeholder/128/128?text=CM",
      content: "A gestão de ordens de serviço facilitou muito o meu dia a dia. Todas as informações em um só lugar, sem papelada e sem confusão.",
      rating: 4,
      highlight: "Sem papelada, sem confusão",
      company: "Mendes Automecânica"
    },
    {
      id: 4,
      name: "Mariana Costa",
      role: "Atendente",
      location: "Rio de Janeiro, RJ",
      avatar: "/api/placeholder/128/128?text=MC",
      content: "Atender os clientes ficou muito mais fácil. Consigo acessar todo o histórico do veículo em segundos, o que impressiona nossos clientes.",
      rating: 5,
      highlight: "Histórico completo em segundos",
      company: "Oficina Carioca"
    },
    {
      id: 5,
      name: "Paulo Ribeiro",
      role: "Dono de Rede de Oficinas",
      location: "Brasília, DF",
      avatar: "/api/placeholder/128/128?text=PR",
      content: "Com 3 unidades para administrar, o ConnectaSys se tornou indispensável. A visão consolidada e os relatórios detalhados me ajudam a tomar decisões estratégicas.",
      rating: 5,
      highlight: "Visão consolidada para múltiplas unidades",
      company: "Rede AutoPaulo"
    }
  ];
  
  // Setup autoplay
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayEnabled) {
        autoplayTimerRef.current = setInterval(() => {
          nextSlide();
        }, 6000);
      }
    };
    
    const stopAutoplay = () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
    
    startAutoplay();
    
    return () => stopAutoplay();
  }, [currentSlide, autoplayEnabled]);
  
  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prevSlide) => (prevSlide - 1 + testimonials.length) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };
  
  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };
  
  const pauseAutoplay = () => {
    setAutoplayEnabled(false);
  };
  
  const resumeAutoplay = () => {
    setAutoplayEnabled(true);
  };
  
  return (
    <section 
      id="depoimentos" 
      className="py-24 px-6 relative overflow-hidden"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Background with gradient and patterns */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030912] to-[#070F1E] z-0"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      {/* Quote Symbol Background */}
      <div className="absolute top-1/4 left-1/4 text-indigo-900/10 opacity-20">
        <Quote size={400} />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-indigo-500/10 px-4 py-1.5 rounded-full text-indigo-400 font-medium text-sm mb-6 border border-indigo-500/20">
            <MessageSquare size={14} className="mr-2" />
            Histórias de sucesso
          </div>
          
          <h3 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
            O que nossos clientes dizem
          </h3>
          
          <p className="text-gray-400 max-w-xl mx-auto">
            Confira como o ConnectaSys está transformando oficinas mecânicas em todo o Brasil.
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="relative bg-gradient-to-b from-[#060D1A] to-[#040810] rounded-2xl border border-gray-800/50 p-1 shadow-xl">
          {/* Inner Container with Gradient Border Effect */}
          <div className="bg-[#050B16] rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-purple-500/5 z-0"></div>
            
            {/* Main Carousel */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-all duration-600 ease-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      {/* Left Column - Avatar and Info */}
                      <div className="md:col-span-4 flex flex-col items-center md:items-start">
                        <div className="relative mb-4 group">
                          {/* Avatar with Decorative Ring */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#050B16]">
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover bg-[#091020]"
                            />
                          </div>
                        </div>
                        
                        {/* User Info */}
                        <div className="text-center md:text-left mb-8">
                          <h4 className="font-semibold text-white text-xl mb-1">{testimonial.name}</h4>
                          <p className="text-gray-400">{testimonial.role}</p>
                          <p className="text-gray-500 text-sm">{testimonial.company}</p>
                          
                          {/* Stars */}
                          <div className="mt-4 flex justify-center md:justify-start">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={`${
                                  i < testimonial.rating 
                                    ? 'text-yellow-500 fill-yellow-500' 
                                    : 'text-gray-600'
                                } mr-1`}
                              />
                            ))}
                          </div>
                          
                          {/* Location */}
                          <div className="mt-4 flex items-center justify-center md:justify-start text-sm text-gray-500">
                            <MapPin size={14} className="mr-1" />
                            {testimonial.location}
                          </div>
                        </div>
                        
                        {/* Highlight Box */}
                        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-lg p-4 border border-indigo-500/20 hidden md:block">
                          <p className="text-indigo-300 text-sm font-medium">
                            <span className="text-indigo-400 mr-2">→</span>
                            {testimonial.highlight}
                          </p>
                        </div>
                      </div>
                      
                      {/* Right Column - Testimonial Content */}
                      <div className="md:col-span-8 relative">
                        {/* Large Quote Mark */}
                        <Quote 
                          size={60} 
                          className="absolute -top-4 -left-2 text-indigo-500/20" 
                        />
                        
                        {/* Testimonial Text */}
                        <div className="bg-[#070E1D]/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-indigo-500/10 relative ml-4">
                          <p className="text-gray-300 md:text-lg leading-relaxed italic">
                            "{testimonial.content}"
                          </p>
                          
                          {/* Mobile Highlight */}
                          <div className="mt-6 md:hidden">
                            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-lg p-3 border border-indigo-500/20">
                              <p className="text-indigo-300 text-sm font-medium">
                                {testimonial.highlight}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button 
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg focus:outline-none hover:shadow-indigo-500/25 z-10 transition-all hover:scale-110"
              onClick={prevSlide}
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg focus:outline-none hover:shadow-indigo-500/25 z-10 transition-all hover:scale-110"
              onClick={nextSlide}
              aria-label="Próximo depoimento"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center mt-10 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-10 bg-gradient-to-r from-indigo-500 to-purple-600' : 'w-3 bg-gray-700 hover:bg-gray-600'
              }`}
              aria-label={`Ir para depoimento ${index + 1}`}
            >
              {currentSlide === index && (
                <span className="absolute inset-0 rounded-full animate-pulse bg-indigo-500/30"></span>
              )}
            </button>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Oficinas atendidas", value: "1,200+" },
            { label: "Avaliação média", value: "4.9/5" },
            { label: "Estados", value: "27" },
            { label: "Horas economizadas", value: "125,000+" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#060D1A]/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <a 
            href="/cadastro" 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium shadow-xl hover:shadow-indigo-500/25 inline-flex items-center transition-all hover:-translate-y-1"
          >
            Experimente gratuitamente
            <ChevronRight size={20} className="ml-2" />
          </a>
          <p className="text-gray-500 mt-4 text-sm">
            Junte-se a milhares de oficinas que economizam tempo e aumentam seus lucros.
          </p>
        </div>
      </div>
      
      {/* Add this to your CSS for animations */}
      <style jsx>{`
        .duration-600 {
          transition-duration: 600ms;
        }
      `}</style>
    </section>
  );
}