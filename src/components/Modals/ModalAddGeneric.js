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
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="
        relative bg-white rounded-2xl shadow-2xl w-full max-w-lg
        animate-in zoom-in-95 slide-in-from-bottom-4 duration-300
        border border-gray-200/50
      ">

        <div className="flex items-center gap-3 p-6 border-b border-gray-100">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <div className="grid grid-cols-2 gap-4">
                {fields.filter(f => f.name !== 'isActive').map(field => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      {field.label}
                    </label>
                    {field.type === 'password' ? (
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
                          className="
                            w-full px-4 py-3 text-sm text-gray-900 placeholder-gray-500
                            bg-white border border-gray-300 rounded-xl
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                            hover:border-gray-400 transition-all duration-200
                            shadow-sm hover:shadow-md
                          "
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(prev => !prev)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    ) : (
                      <input
                        type={field.type || 'text'}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}...`}
                        className="
                          w-full px-4 py-3 text-sm text-gray-900 placeholder-gray-500
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

              {fields.some(f => f.name === 'isActive') && (
                <div className="pt-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData['isActive'] || false}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      id="checkbox-isActive"
                    />
                    <label htmlFor="checkbox-isActive" className="text-sm font-medium text-gray-700">
                      Ativo
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="
                  px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl
                  hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200
                  transition-all duration-200 shadow-sm hover:shadow-md
                "
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="
                  px-6 py-2.5 text-sm font-medium text-white rounded-xl
                  bg-blue-600 hover:bg-blue-700
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  transition-all duration-200 shadow-lg hover:shadow-xl
                  transform hover:scale-105 active:scale-95
                "
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Salvar
                </span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
