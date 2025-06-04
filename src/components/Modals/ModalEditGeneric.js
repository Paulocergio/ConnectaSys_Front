'use client';

import { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Lock,
  UserPlus
} from 'lucide-react';

export default function ModalAddGeneric({
  isOpen,
  onClose,
  onSave,
  fields = [],
  title = 'Cadastro de Usuário'
}) {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (name === 'telefone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 11);
      newValue = cleaned.length <= 10
        ? cleaned.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3')
        : cleaned.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          {/* Header com ícone do lado esquerdo */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
              <p className="text-sm text-gray-500">Preencha os dados abaixo para criar sua conta.</p>
            </div>
          </div>

          {/* Campos do formulário */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-5 h-5 text-gray-500" />
                Nome completo *
              </label>
              <input
                name="nome"
                value={formData.nome || ''}
                onChange={handleChange}
                placeholder="Nome completo..."
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white
                           text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-gray-300"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-5 h-5 text-gray-500" />
                Email *
              </label>
              <input
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Email..."
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white
                           text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-gray-300"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-5 h-5 text-gray-500" />
                Telefone
              </label>
              <input
                name="telefone"
                value={formData.telefone || ''}
                onChange={handleChange}
                placeholder="Telefone..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white
                           text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-gray-300"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                Data de Nascimento
              </label>
              <input
                name="dataNascimento"
                type="date"
                value={formData.dataNascimento || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white
                           text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-gray-300"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-5 h-5 text-gray-500" />
                Senha *
              </label>
              <div className="relative">
                <input
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.senha || ''}
                  onChange={handleChange}
                  placeholder="Senha..."
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl pr-12
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white
                             text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-5 h-5 text-gray-500" />
                Confirmar Senha *
              </label>
              <div className="relative">
                <input
                  name="confirmarSenha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmarSenha || ''}
                  onChange={handleChange}
                  placeholder="Confirmar senha..."
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl pr-12
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white
                             text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-8">* Campos obrigatórios</p>

          {/* Botões menores */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 
                         hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                         rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200
                         text-sm font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <UserPlus className="w-4 h-4" />
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}