"use client";

import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contato" className="bg-[#101218] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <h4 className="text-2xl font-bold text-white">
                Connecta<span className="text-indigo-400">Sys</span>
              </h4>
            </div>
            <p className="mb-4 max-w-md text-gray-400">
              Transformando oficinas mecânicas com tecnologia e soluções inovadoras desde 2018.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-start">
              <MapPin className="text-indigo-400 mr-3 flex-shrink-0 mt-1" size={20} />
              <p>Rua Dinis Dias, 510 - CEP: 30295-260<br />Belo Horizonte, MG</p>
            </div>
            
            <div className="flex items-center">
              <Phone className="text-indigo-400 mr-3 flex-shrink-0" size={20} />
              <p>(31) 3333-4444</p>
            </div>
            
            <div className="flex items-center">
              <Mail className="text-indigo-400 mr-3 flex-shrink-0" size={20} />
              <p>contato@connectasys.com.br</p>
            </div>
            
            <div className="flex items-center">
              <Clock className="text-indigo-400 mr-3 flex-shrink-0" size={20} />
              <p>Segunda a Sexta, 8h às 18h</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800/50 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} ConnectaSys. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}