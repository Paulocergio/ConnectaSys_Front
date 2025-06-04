'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Calendar, Lock } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600">
              Preencha os dados abaixo para criar sua conta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <User className="w-4 h-4" />
                Nome completo *
              </label>
              <input
                name="nome"
                value={formData.nome || ''}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4" />
                Email *
              </label>
              <input
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4" />
                Telefone
              </label>
              <input
                name="telefone"
                value={formData.telefone || ''}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4" />
                Data de Nascimento
              </label>
              <input
                name="dataNascimento"
                type="date"
                value={formData.dataNascimento || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <Lock className="w-4 h-4" />
                Senha *
              </label>
              <div className="relative">
                <input
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.senha || ''}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <Lock className="w-4 h-4" />
                Confirmar Senha *
              </label>
              <div className="relative">
                <input
                  name="confirmarSenha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmarSenha || ''}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-2">* Campos obrigatórios</p>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Cadastrar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
