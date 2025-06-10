"use client";
import { memo, useState, useRef, useCallback } from "react";
import { User, Mail, Phone, FileText, MapPin } from "lucide-react";
import { debounce } from "lodash";
import { fetchCnpjData } from "../../services/api/cnpjService";
import { formatDocument, validateDocumentLength } from "../suppliers/documentFormatter";

const InputField = memo(
  ({ label, name, icon, value, onChange, onInput, type, required, errorMessage, maxLength }) => {
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
          onInput={onInput}
          required={required}
          maxLength={maxLength}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errorMessage && <p className="text-sm text-red-600 mt-1">{errorMessage}</p>}
      </div>
    );
  }
);

const SuppliersFormFields = memo(({ formData, onChange, onFill }) => {
  const [docError, setDocError] = useState("");
  const [fieldLabel, setFieldLabel] = useState("CPF/CNPJ");
  const lastDocRef = useRef("");

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      const formattedValue = formatDocument(value);

      const rawValue = formattedValue.replace(/\D/g, "");
      if (rawValue.length > 14) return;

      e.target.value = formattedValue;
      onChange(e);

      if (rawValue.length === 11) setFieldLabel("CPF");
      else if (rawValue.length === 14) setFieldLabel("CNPJ");
      else setFieldLabel("CPF/CNPJ");
    },
    [onChange]
  );

  const handleDocInput = useCallback(
    debounce(async (value) => {
      const doc = value.replace(/\D/g, "");
      if (doc === lastDocRef.current) return;

      lastDocRef.current = doc;

      if (doc.length === 14) {
        // CNPJ
        try {
          const data = await fetchCnpjData(doc);
          const est = data.estabelecimento;

          onFill({
            company_name: data.razao_social || "",
            address: [data.logradouro, data.numero].filter(Boolean).join(", "),
            city: data.cidade || "",
            state: data.estado || "",
            zip_code: data.cep || "",
            country: "Brasil",
            email: data.email || "",
            phone: data.telefone1 || "",
            tax_id: formatDocument(doc),
          });

          setDocError("");
        } catch (error) {
          setDocError("⚠️ API de CNPJ indisponível. Preencha os dados manualmente.");
        }
      } else if (doc.length === 11) {
        // CPF
        setDocError("");
        onFill({
          tax_id: formatDocument(doc),
        });
      }
    }, 500),
    [onFill]
  );

  return (
    <>
      <InputField
        label={fieldLabel}
        name="tax_id"
        icon={<FileText size={18} />}
        value={formData.tax_id}
        onChange={handleChange}
        onInput={(e) => handleDocInput(e.target.value)}
        errorMessage={docError}
        maxLength={18}
      />
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
        icon={<Mail size={18} />}
        value={formData.email}
        onChange={(e) => {
          if (formData.emailError) {
            onChange({
              target: {
                name: "emailError",
                value: "",
              },
            });
          }
          onChange(e);
        }}
        type="email"
        errorMessage={formData.emailError}
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
      <InputField label="Cidade" name="city" value={formData.city} onChange={onChange} />
      <InputField label="Estado" name="state" value={formData.state} onChange={onChange} />
      <InputField label="CEP" name="zip_code" value={formData.zip_code} onChange={onChange} />
      <InputField label="País" name="country" value={formData.country} onChange={onChange} />
    </>
  );
});

export default SuppliersFormFields;
