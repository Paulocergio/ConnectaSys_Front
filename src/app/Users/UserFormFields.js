"use client";

import { User, Mail, Phone, Lock } from "lucide-react";

export default function UserFormFields({ formData, onChange, showIsActive = false }) {
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
      <InputField
        label="Senha"
        name="password"
        icon={<Lock />}
        type="password"
        value={formData.password}
        onChange={onChange}
      />

      {showIsActive && (
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={onChange}
            id="isActive"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Usuário ativo
          </label>
        </div>
      )}
    </>
  );
}

const InputField = ({ label, name, icon, value, onChange, type = "text", required = false }) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
      {icon} {label} {required && "*"}
    </label>
    <input
      type={type}
      name={name}
      value={value ?? ""}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
