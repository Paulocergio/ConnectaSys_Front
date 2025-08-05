"use client";
import { Phone } from "lucide-react";
import { memo } from "react";

const PhoneInput = memo(({ value, onChange, name = "phone", label = "Telefone", errorMessage }) => {
  const formatPhone = (value) => {
    if (!value) return value;
    
    // Remove tudo que não é dígito
    const nums = value.replace(/\D/g, '');
    
    // Remove o +55 inicial se estiver digitando
    const cleanNums = nums.replace(/^55/, '');
    const length = cleanNums.length;
    
    if (length === 0) {
      return '+55';
    } else if (length <= 2) {
      return `+55 (${cleanNums}`;
    } else if (length <= 7) {
      return `+55 (${cleanNums.slice(0, 2)}) ${cleanNums.slice(2)}`;
    } else {
      return `+55 (${cleanNums.slice(0, 2)}) ${cleanNums.slice(2, 7)}-${cleanNums.slice(7, 11)}`;
    }
  };

  const handleChange = (e) => {
    const formattedValue = formatPhone(e.target.value);
    
    onChange({
      target: {
        name,
        value: formattedValue
      }
    });
  };

  return (
    <div className="mb-4">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <Phone size={18} /> {label}
      </label>
      <input
        type="tel"
        name={name}
        value={value || ''}
        onChange={handleChange}
        maxLength={18} 
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="+55 (DD) 00000-0000"
      />
      {errorMessage && <p className="text-sm text-red-600 mt-1">{errorMessage}</p>}
    </div>
  );
});

export default PhoneInput;