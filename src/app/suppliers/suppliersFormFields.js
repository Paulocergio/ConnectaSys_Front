import { User, Mail, Phone, FileText, MapPin } from "lucide-react";



export default function SuppliersFormFields({ formData, onChange }) {
  return (
    <>
      <InputField
        label="Razão Social"
        name="company_name"
        icon={<User />}
        value={formData.company_name}
        onChange={onChange}
        required
      />

      <InputField
        label="Nome do Contato"
        name="contact_name"
        icon={<User />}
        value={formData.contact_name}
        onChange={onChange}
      />

      <InputField
        label="E-mail"
        name="email"
        icon={<Mail />}
        value={formData.email}
        onChange={onChange}
        type="email"
      />

      <InputField
        label="Telefone"
        name="phone"
        icon={<Phone />}
        value={formData.phone}
        onChange={onChange}
      />

      <InputField
        label="Endereço"
        name="address"
        icon={<MapPin />}
        value={formData.address}
        onChange={onChange}
      />

      <InputField
        label="Cidade"
        name="city"
        value={formData.city}
        onChange={onChange}
      />

      <InputField
        label="Estado"
        name="state"
        value={formData.state}
        onChange={onChange}
      />

      <InputField
        label="CEP"
        name="zip_code"
        value={formData.zip_code}
        onChange={onChange}
      />

      <InputField
        label="País"
        name="country"
        value={formData.country}
        onChange={onChange}
      />

      <InputField
        label="CNPJ / Tax ID"
        name="tax_id"
        icon={<FileText />}
        value={formData.tax_id}
        onChange={onChange}
      />
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