"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table/Table";
import ModalAddGeneric from "../../components/Modals/ModalAddGeneric";
import SuppliersFormFields from "./suppliersFormFields";
import { createSupplier } from "../../services/api/supplierService";
import { showError, showSuccess } from "../../components/Toast/ToastNotification";

const initialSupplierData = {
  company_name: "",
  contact_name: "",
  emailError: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip_code: "",
  country: "",
  tax_id: "",
  is_active: true,
};

export default function Suppliers() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialSupplierData);
  const [suppliers, setSuppliers] = useState([]);

  const toggleSidebar = useCallback(() => setIsSidebarCollapsed((prev) => !prev), []);

  const handleAddClick = useCallback(() => {
    setFormData(initialSupplierData);
    setIsModalOpen(true);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFill = useCallback((newData) => {
    setFormData((prev) => {
      const updated = { ...prev };
      if (!prev.company_name) updated.company_name = newData.company_name || prev.company_name;
      if (!prev.address) updated.address = newData.address || prev.address;
      if (!prev.city) updated.city = newData.city || prev.city;
      if (!prev.state) updated.state = newData.state || prev.state;
      if (!prev.zip_code) updated.zip_code = newData.zip_code || prev.zip_code;
      if (!prev.country) updated.country = newData.country || prev.country;
      return updated;
    });
  }, []);

  const handleSave = useCallback(async () => {
    try {
      await createSupplier(formData);
      showSuccess("Fornecedor adicionado com sucesso!");
      setIsModalOpen(false);
      setFormData(initialSupplierData);
    } catch (error) {
      console.error(error);

      if (error.response?.data?.error === "Email já existe") {
        setFormData((prev) => ({
          ...prev,
          emailError: "Este e-mail já está cadastrado",
        }));
      } else {
        showError(error?.response?.data?.error || "Erro ao adicionar fornecedor.");
      }
    }
  }, [formData]);

  const memoizedFormFields = useMemo(
    () => <SuppliersFormFields formData={formData} onChange={handleChange} onFill={handleFill} />,
    [formData, handleChange, handleFill]
  );

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Table title="Fornecedores" data={suppliers} onAddClick={handleAddClick} />

        <ModalAddGeneric
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          title="Adicionar Fornecedor"
          key={isModalOpen ? "modal-open" : "modal-closed"}
        >
          {memoizedFormFields}
        </ModalAddGeneric>
      </main>
    </div>
  );
}
