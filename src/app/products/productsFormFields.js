"use client";

import { memo } from "react";
import { Package, ScanBarcode, FileText, Hash } from "lucide-react";

const InputField = memo(
  ({ label, name, icon, value, onChange, required, errorMessage, maxLength, type = "text" }) => {
    return (
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          {icon} {label} {required && "*"}
        </label>
        <input
          type={type}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errorMessage && <p className="text-sm text-red-600 mt-1">{errorMessage}</p>}
      </div>
    );
  }
);

const ProductFormFields = memo(({ formData, onChange }) => {
  return (
    <>
      <InputField
        label="Nome do Produto"
        name="product_name"
        icon={<Package size={18} />}
        value={formData.product_name}
        onChange={onChange}
        required
      />
      <InputField
        label="Código de Barras"
        name="barcode"
        icon={<ScanBarcode size={18} />}
        value={formData.barcode}
        onChange={onChange}
        maxLength={50}
      />
      <InputField
        label="Descrição"
        name="description"
        icon={<FileText size={18} />}
        value={formData.description}
        onChange={onChange}
      />
      <InputField
        label="Quantidade Inicial"
        name="quantity"
        icon={<Hash size={18} />}
        value={formData.quantity}
        onChange={onChange}
        type="number"
        required
      />
    </>
  );
});

export default ProductFormFields;
