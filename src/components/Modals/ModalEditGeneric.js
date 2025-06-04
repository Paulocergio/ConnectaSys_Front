'use client';

import {
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  FileText,
  MapPin
} from 'lucide-react';

export default function ModalEditGeneric({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  title = 'Editar',
  labels = {},
  fields = [],
  checkboxLast = false
}) {
  if (!isOpen) return null;

  const effectiveFields = fields.length > 0
    ? fields
    : Object.keys(formData || {}).map(name => ({
        name,
        type: typeof formData[name] === 'boolean' ? 'checkbox' : 'text'
      }));

  const inputKeys = effectiveFields
    .filter(field => field.type !== 'checkbox' && field.name !== 'id')
    .map(field => field.name);

  const checkboxKeys = effectiveFields
    .filter(field => field.type === 'checkbox')
    .map(field => field.name);

  const iconMap = {
    firstName: <User className="w-4 h-4" />,
    lastName: <User className="w-4 h-4" />,
    nome: <User className="w-4 h-4" />,
    sobrenome: <User className="w-4 h-4" />,
    documentNumber: <FileText className="w-4 h-4" />,
    documento: <FileText className="w-4 h-4" />,
    email: <Mail className="w-4 h-4" />,
    phone: <Phone className="w-4 h-4" />,
    telefone: <Phone className="w-4 h-4" />,
    address: <MapPin className="w-4 h-4" />,
    endereco: <MapPin className="w-4 h-4" />,
    password: <Lock className="w-4 h-4" />,
    confirmPassword: <Lock className="w-4 h-4" />,
    birthDate: <Calendar className="w-4 h-4" />,
  };

  const renderInput = (key, value) => {
    const icon = iconMap[key.toLowerCase()] || iconMap[key] || null;

    return (
      <div key={key} className="group relative">
        <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
          {icon}
          {labels[key] || key}
        </label>
        <input
          name={key}
          value={value ?? ''}
          onChange={onChange}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder={`Digite ${labels[key] || key}...`}
        />
      </div>
    );
  };

  const renderCheckbox = (key, value) => (
    <div key={key} className="group relative">
      <div className="flex items-center gap-2 p-2">
        <input
          type="checkbox"
          name={key}
          checked={value}
          onChange={onChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
          id={`checkbox-${key}`}
        />
        <label
          htmlFor={`checkbox-${key}`}
          className="text-sm font-medium text-gray-700 cursor-pointer"
        >
          {labels[key] || key}
        </label>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-700">{title}</h2>
            <p className="text-sm text-gray-500">Preencha os campos abaixo para editar os dados.</p>
          </div>

          {inputKeys.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inputKeys.map(key => renderInput(key, formData[key]))}
            </div>
          )}

          {checkboxKeys.length > 0 && (
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Configurações</h3>
              <div className="grid grid-cols-2 gap-2">
                {checkboxKeys.map(key => renderCheckbox(key, formData[key]))}
              </div>
            </div>
          )}

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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
