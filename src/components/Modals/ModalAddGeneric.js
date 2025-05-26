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
      const cleaned = value.replace(/\D/g, '').slice(0, 11); // limita a 11 dígitos
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="
        relative bg-white rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl
        animate-in zoom-in-95 slide-in-from-bottom-4 duration-300
        border border-gray-200/50 max-h-[95vh] sm:max-h-[90vh] flex flex-col
      ">

        {/* Header */}
        <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{title}</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-5">
            
            {/* Grid responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {fields.filter(f => f.name !== 'isActive').map(field => (
                <div key={field.name} className={`space-y-2 ${
                  field.type === 'textarea' || field.name === 'email' || field.name === 'phone' 
                    ? 'sm:col-span-2' 
                    : ''
                }`}>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'password' ? (
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
                        required={field.required}
                        className="
                          w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-900 placeholder-gray-500
                          bg-white border border-gray-300 rounded-xl
                          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                          hover:border-gray-400 transition-all duration-200
                          shadow-sm hover:shadow-md
                        "
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
                      >
                        {showPassword ? <EyeOff size={16} className="sm:w-5 sm:h-5" /> : <Eye size={16} className="sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
                      required={field.required}
                      rows={3}
                      className="
                        w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-900 placeholder-gray-500
                        bg-white border border-gray-300 rounded-xl resize-none
                        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                        hover:border-gray-400 transition-all duration-200
                        shadow-sm hover:shadow-md
                      "
                    />
                  ) : field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      required={field.required}
                      className="
                        w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-900
                        bg-white border border-gray-300 rounded-xl
                        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                        hover:border-gray-400 transition-all duration-200
                        shadow-sm hover:shadow-md
                      "
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
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
                      required={field.required}
                      className="
                        w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-900 placeholder-gray-500
                        bg-white border border-gray-300 rounded-xl
                        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                        hover:border-gray-400 transition-all duration-200
                        shadow-sm hover:shadow-md
                      "
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Checkbox separado */}
            {fields.some(f => f.name === 'isActive') && (
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData['isActive'] || false}
                      onChange={handleChange}
                      className="peer h-4 w-4 text-blue-600 focus:ring-blue-500 border-2 border-gray-300 rounded transition-all duration-200"
                      id="checkbox-isActive"
                    />
                    <div className="absolute inset-0 h-4 w-4 bg-blue-600 rounded opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                      <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <label htmlFor="checkbox-isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Ativo
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer fixo */}
        <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-6">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="
                w-full sm:w-auto px-4 sm:px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl
                hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200
                transition-all duration-200 shadow-sm hover:shadow-md
              "
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="
                w-full sm:w-auto px-4 sm:px-6 py-2.5 text-sm font-medium text-white rounded-xl
                bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
                transition-all duration-200 shadow-lg hover:shadow-xl
                transform hover:scale-105 active:scale-95
              "
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Salvar
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}