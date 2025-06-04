'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function ModalAddGeneric({
  isOpen,
  onClose,
  onSave,
  fields = [],
  title = 'Adicionar'
}) {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const initialData = fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || (field.type === 'checkbox' ? false : '');
        return acc;
      }, {});
      setFormData(initialData);
    }
  }, [isOpen, fields]);

  if (!isOpen) return null;

  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 11);
      if (cleaned.length <= 10) {
        newValue = cleaned.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else {
        newValue = cleaned.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : newValue
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const regularFields = fields.filter(f => f.name !== 'isActive' && f.type !== 'checkbox');
  const checkboxFields = fields.filter(f => f.name === 'isActive' || f.type === 'checkbox');

  const renderInput = (field) => {
    const value = formData[field.name] || '';

    return (
      <div key={field.name} className="group relative">
        <label className="block text-sm font-semibold text-slate-700 mb-1.5 
                          tracking-wide uppercase text-xs">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
          {field.type === 'password' ? (
            <>
              <input
                type={showPassword ? 'text' : 'password'}
                name={field.name}
                value={value}
                onChange={handleChange}
                placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
                required={field.required}
                className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm
                           border border-slate-200/60 rounded-lg
                           focus:bg-white focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/10
                           transition-all duration-300 ease-out
                           text-slate-800 placeholder:text-slate-400
                           shadow-sm hover:shadow-md focus:shadow-lg
                           group-hover:border-slate-300/60 text-sm max-w-[200px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-violet-600 transition-colors p-1"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </>
          ) : field.type === 'textarea' ? (
            <textarea
              name={field.name}
              value={value}
              onChange={handleChange}
              placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
              required={field.required}
              rows={3}
              className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm
                         border border-slate-200/60 rounded-lg
                         focus:bg-white focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/10
                         transition-all duration-300 ease-out
                         text-slate-800 placeholder:text-slate-400
                         shadow-sm hover:shadow-md focus:shadow-lg
                         group-hover:border-slate-300/60 text-sm resize-none max-w-[200px]"
            />
          ) : field.type === 'select' ? (
            <select
              name={field.name}
              value={value}
              onChange={handleChange}
              required={field.required}
              className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm
                         border border-slate-200/60 rounded-lg
                         focus:bg-white focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/10
                         transition-all duration-300 ease-out
                         text-slate-800
                         shadow-sm hover:shadow-md focus:shadow-lg
                         group-hover:border-slate-300/60 text-sm max-w-[200px]"
            >
              <option value="">Selecione...</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type || 'text'}
              name={field.name}
              value={value}
              onChange={handleChange}
              placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
              required={field.required}
              className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm
                         border border-slate-200/60 rounded-lg
                         focus:bg-white focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/10
                         transition-all duration-300 ease-out
                         text-slate-800 placeholder:text-slate-400
                         shadow-sm hover:shadow-md focus:shadow-lg
                         group-hover:border-slate-300/60 text-sm max-w-[200px]"
            />
          )}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400/5 to-blue-400/5 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>
    );
  };

  const renderCheckbox = (field) => (
    <div key={field.name} className="group relative">
      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gradient-to-r 
                      hover:from-violet-50/50 hover:to-blue-50/50 transition-all duration-300">
        <div className="relative">
          <input
            type="checkbox"
            name={field.name}
            checked={formData[field.name] || false}
            onChange={handleChange}
            className="h-4 w-4 text-violet-600 bg-white border-2 border-slate-300 rounded-md
                       focus:ring-2 focus:ring-violet-400/20 transition-all duration-200
                       checked:border-violet-500 checked:bg-violet-500"
            id={`checkbox-${field.name}`}
          />
          {formData[field.name] && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <label
          htmlFor={`checkbox-${field.name}`}
          className="text-sm font-medium text-slate-700 cursor-pointer select-none
                     group-hover:text-slate-800 transition-colors"
        >
          {field.label || 'Ativo'}
        </label>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Premium */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-violet-900/20 to-blue-900/40 
                   backdrop-blur-md transition-all duration-500"
        onClick={onClose}
      />

      {/* Modal Container - Compacto e Centralizado */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl 
                      w-full max-w-md mx-auto
                      border border-white/40 shadow-violet-500/10
                      transform transition-all duration-500 ease-out scale-100">

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/30 via-transparent to-blue-50/30 pointer-events-none" />

        {/* Header Compacto */}
        <div className="relative px-5 py-3 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Ícone Premium */}
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-600 rounded-lg 
                                flex items-center justify-center shadow-md shadow-violet-500/25
                                hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-violet-400 to-blue-500 rounded-lg opacity-20 blur-sm" />
              </div>

              {/* Título Elegante */}
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 
                               bg-clip-text text-transparent">
                  {title}
                </h2>
                <p className="text-xs text-slate-500">Preencha os campos</p>
              </div>
            </div>

            {/* Botão Fechar Premium */}
            <button
              onClick={onClose}
              className="group p-1.5 hover:bg-slate-100/60 rounded-lg transition-all duration-300
                         hover:rotate-90 transform"
            >
              <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Conteúdo Compacto */}
        <div className="relative px-5 py-4">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Grid de Inputs em 2 Colunas Compacto */}
            {regularFields.length > 0 && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {regularFields.map(field => renderInput(field))}
              </div>
            )}

            {/* Seção de Checkboxes Compacta */}
            {checkboxFields.length > 0 && (
              <div className="pt-2">
                <h3 className="text-sm font-semibold text-slate-700 mb-2 
                               tracking-wide uppercase text-xs">
                  Configurações
                </h3>
                <div className="grid grid-cols-2 gap-1">
                  {checkboxFields.map(field => renderCheckbox(field))}
                </div>
              </div>
            )}

          </form>
        </div>

        {/* Footer Compacto */}
        <div className="relative px-5 py-3 bg-gradient-to-r from-slate-50/80 to-slate-100/40 
                        border-t border-slate-200/50 backdrop-blur-sm">
          <div className="flex justify-end gap-2">
            {/* Botão Cancelar */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 font-semibold rounded-lg
                         hover:bg-white/60 border border-slate-200/60
                         transition-all duration-300 ease-out
                         hover:shadow-md hover:scale-105 active:scale-95 text-sm"
            >
              Cancelar
            </button>

            {/* Botão Salvar Premium */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="relative px-5 py-2 bg-gradient-to-r from-violet-600 to-blue-600 
                         text-white font-semibold rounded-lg shadow-md shadow-violet-500/25
                         hover:from-violet-700 hover:to-blue-700 hover:shadow-lg hover:shadow-violet-500/30
                         transition-all duration-300 ease-out
                         hover:scale-105 active:scale-95
                         border border-violet-500/20 text-sm"
            >
              <span className="relative z-10">Salvar</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent 
                              rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Efeitos de Luz */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-1 
                        bg-gradient-to-r from-transparent via-violet-400/50 to-transparent blur-sm" />
      </div>
    </div>
  );
}