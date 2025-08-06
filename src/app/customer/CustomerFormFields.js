"use client";

import { User, Mail, Phone, FileText, MapPin } from "lucide-react";

export default function CustomerFormFields({ formData, onChange }) {
  return (
    <>
      <InputField
        label="Nome"
        name="firstName"
        icon={<User />} 
        value={formData.firstName}
        onChange={onChange}
        required
      />
      <InputField
        label="Sobrenome"
        name="lastName"
        icon={<User />}
        value={formData.lastName}
        onChange={onChange}
        required
      />
      <InputField
        label="Documento"
        name="documentNumber"
        icon={<FileText />}
        value={formData.documentNumber}
        onChange={onChange}
        required
      />
      <InputField
        label="Endereço"
        name="address"
        icon={<MapPin />}
        value={formData.address}
        onChange={onChange}
      />
      <InputField
        label="Email"
        name="email"
        icon={<Mail />}
        type="email"
        value={formData.email}
        onChange={onChange}
        required
      />
      <InputField
        label="Telefone"
        name="phone"
        icon={<Phone />}
        value={formData.phone}
        onChange={onChange}
      />
    </>
  );
}

const InputField = ({
  label,
  name,
  icon,
  value,
  onChange,
  type = "text",
  required = false,
}) => {
  const noUppercase = ["email", "phone"];

  // Força caixa alta para todos exceto email/telefone
  const displayValue = value && !noUppercase.includes(name)
    ? value.toUpperCase()
    : value ?? "";

  return (
    <div className="mb-4">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        {icon} {label} {required && "*"}
      </label>
      <input
        type={type}
        name={name}
        value={displayValue}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
