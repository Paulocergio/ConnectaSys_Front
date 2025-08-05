"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table/Table";
import ModalAddGeneric from "../../components/Modals/ModalAddGeneric";
import ModalEditGeneric from "../../components/Modals/ModalEditGeneric";
import ModalConfirmDelete from "../../components/Modals/ModalConfirmDelete";
import { updateSupplier, deleteSupplier } from "../../services/api/supplierService";
import SuppliersFormFields from "./suppliersFormFields";
import { createSupplier, getSuppliers } from "../../services/api/supplierService";
import {
  showSuccess,
  showError,
  ToastContainerWrapper,
} from "../../components/Toast/ToastNotification";
import { Edit, Trash2 } from "lucide-react";

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

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState(initialSupplierData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleEditClick = (supplier) => {
    setFormData({
      id: supplier.id,
      company_name: supplier.companyName || "",
      contact_name: supplier.contactName || "",
      email: supplier.email || "",
      phone: supplier.phone || "",
      address: supplier.address || "",
      city: supplier.city || "",
      state: supplier.state || "",
      zip_code: supplier.zipCode || "",
      country: supplier.country || "",
      tax_id: supplier.taxId || "",
      is_active: supplier.isActive ?? true,
    });
    setSelectedSupplier(supplier);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDeleteModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await updateSupplier(selectedSupplier.id, formData);
      await fetchSuppliers();
      showSuccess("Fornecedor atualizado com sucesso!");
      setIsEditModalOpen(false);
    } catch (error) {
      showError("Erro ao atualizar fornecedor.");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteSupplier(selectedSupplier.id);
      await fetchSuppliers();
      showSuccess("Fornecedor excluído com sucesso!");
      setIsDeleteModalOpen(false);
    } catch (error) {
      showError("Erro ao excluir fornecedor.");
    }
  };

  const fetchSuppliers = useCallback(async () => {
    try {
      const response = await getSuppliers();
      const sorted = response.data.sort((a, b) => a.companyName.localeCompare(b.companyName));
      setSuppliers(sorted);
    } catch (error) {
      showError("Erro ao carregar fornecedores.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const handleAddClick = () => {
    setFormData(initialSupplierData);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFill = (newData) => {
    setFormData((prev) => {
      const updated = { ...prev };
      if (!prev.company_name) updated.company_name = newData.company_name || prev.company_name;
      if (!prev.address) updated.address = newData.address || prev.address;
      if (!prev.city) updated.city = newData.city || prev.city;
      if (!prev.state) updated.state = newData.state || prev.state;
      if (!prev.zip_code) updated.zip_code = newData.zip_code || prev.zip_code;
      if (!prev.country) updated.country = newData.country || prev.country;
      if (!prev.email) updated.email = newData.email || prev.email;
      if (!prev.phone) updated.phone = newData.phone || prev.phone;
      return updated;
    });
  };

  const handleSave = async () => {
    try {
      await createSupplier(formData);
      await fetchSuppliers();
      showSuccess("Fornecedor adicionado com sucesso!");
      setIsModalOpen(false);
      setFormData(initialSupplierData);
    } catch (error) {
      if (error.response?.data?.error === "Email já existe") {
        showError("Este e-mail já está cadastrado");
      } else {
        showError(error?.response?.data?.error || "Erro ao adicionar fornecedor.");
      }
    }
  };

  const columns = [
    {
      key: "companyName",
      title: "Empresa",
      sortable: true,
      render: (value) => String(value).toUpperCase(),
    },
    {
      key: "contactName",
      title: "Contato",
      sortable: true,
      render: (value) => String(value).toUpperCase(),
    },
    {
      key: "email",
      title: "Email",
      sortable: false,
      render: (value) => String(value).toUpperCase(),
    },
    {
      key: "phone",
      title: "Telefone",
      sortable: false,
      render: (value) => String(value).toUpperCase(),
    },
    {
      key: "address",
      title: "Endereço",
      sortable: false,
      render: (value) => String(value).toUpperCase(),
    },
    {
      key: "city",
      title: "Cidade",
      sortable: false,
      render: (value) => String(value).toUpperCase(),
    },
    {
      key: "state",
      title: "Estado",
      sortable: false,
      render: (value) => String(value).toUpperCase(),
    },
    {
      key: "zipCode",
      title: "CEP",
      sortable: false,
      render: (value) => String(value).toUpperCase(),
    },
    {
      key: "country",
      title: "País",
      sortable: false,
      render: (value) => String(value).toUpperCase(),
    },
    {
      key: "taxId",
      title: "CNPJ/CPF",
      sortable: false,
      render: (value) => String(value).toUpperCase(),
    },
    {
      key: "isActive",
      title: "Status",
      render: (value) =>
        value ? (
          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
            ATIVO
          </span>
        ) : (
          <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
            INATIVO
          </span>
        ),
    },
    {
      key: "actions",
      title: "Ações",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <button
            title="Editar"
            className="text-[#2563eb] hover:opacity-80 transition"
            onClick={() => handleEditClick(row)}
          >
            <Edit size={18} />
          </button>
          <button
            title="Excluir"
            className="text-[#dc2626] hover:opacity-80 transition"
            onClick={() => handleDeleteClick(row)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  const memoizedFormFields = useMemo(
    () => <SuppliersFormFields formData={formData} onChange={handleChange} onFill={handleFill} />,
    [formData, handleChange, handleFill]
  );

  if (loading) return <p>Carregando fornecedores…</p>;

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={collapsed} toggleSidebar={() => setCollapsed((c) => !c)} />

      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Table
          title="Fornecedores"
          data={suppliers}
          columns={columns}
          striped
          onAddClick={handleAddClick}
        />

        <ModalAddGeneric
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          title="Adicionar Fornecedor"
        >
          {memoizedFormFields}
        </ModalAddGeneric>

        <ModalEditGeneric
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdate}
          title="Editar Fornecedor"
        >
          {memoizedFormFields}
        </ModalEditGeneric>

        <ModalConfirmDelete
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          itemName={selectedSupplier?.companyName}
        />
      </main>

      <ToastContainerWrapper />
    </div>
  );
}