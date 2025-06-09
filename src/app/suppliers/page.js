"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table/Table";
import ModalAddGeneric from "../../components/Modals/ModalAddGeneric";
import SuppliersFormFields from "./suppliersFormFields";
import { createSupplier } from "../../services/api/supplierService";
import { showError, showSuccess } from "../../components/Toast/ToastNotification";

const initialSupplierData = {
  company_name: "",
  contact_name: "",
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

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);


  const handleAddClick = () => {
    setFormData(initialSupplierData);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await createSupplier(formData);
      showSuccess("Fornecedor adicionado com sucesso!");

      setIsModalOpen(false);
      setFormData(initialSupplierData);


    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.error || "Erro ao adicionar fornecedor.";
      showError(msg);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Table
          title="Fornecedores"
          data={suppliers}
          onAddClick={handleAddClick} 
        />

        <ModalAddGeneric
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          title="Adicionar Fornecedor"
        >
          <SuppliersFormFields formData={formData} onChange={handleChange} />
        </ModalAddGeneric>
      </main>
    </div>
  );
}
