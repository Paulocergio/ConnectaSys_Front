"use client";

import ModalAddGeneric from "../../components/Modals/ModalAddGeneric";
import ConfirmDeleteModal from "../../components/Modals/ModalConfirmDelete";
import ModalEditGeneric from "../../components/Modals/ModalEditGeneric";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table/Table";
import {
  showSuccess,
  showError,
  ToastContainerWrapper,
} from "../../components/Toast/ToastNotification";
import {
  GetCustomer,
  deleteCustomer,
  createCustomer,
  updateCustomer,
} from "../../services/api/customerService";
import CustomerFormFields from "./CustomerFormFields";
import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

// Dados iniciais para novo cliente
const initialCustomerData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  documentNumber: "",
  address: "",
  isActive: true,
};

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialCustomerData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  const fetchCustomers = async () => {
    try {
      const res = await GetCustomer();
      setCustomers(res.data);
    } catch (error) {
      showError("Erro ao carregar clientes");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Função para abrir modal de adicionar
  const handleAddClick = () => {
    setFormData(initialCustomerData);
    setIsAddModalOpen(true);
  };

  // Função para abrir modal de editar
  const handleEditClick = (customer) => {
    const { createdAt, updatedAt, deletedAt, password, ...cleaned } = customer;
    setFormData({ ...cleaned, id: customer.id }); // <-- este ID precisa estar presente!
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "").slice(0, 11);
      newValue =
        cleaned.length <= 10
          ? cleaned.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3")
          : cleaned.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));
  };

  // Função para salvar edição
  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    console.log("🔧 Submetendo edição", formData);

    try {
      const { password, updatedAt, createdAt, ...sanitizedData } = formData;

      if (!formData.id) {
        showError("ID do cliente ausente. Não é possível editar.");
        return;
      }

      await updateCustomer(formData.id, sanitizedData);
      await fetchCustomers();

      showSuccess("Cliente atualizado com sucesso");
      setIsModalOpen(false);
    } catch (error) {
      console.error("❌ Erro ao atualizar:", error);
      showError(error.message || "Erro ao atualizar cliente");
    }
  };

  // Função para salvar novo cliente
  const handleSave = async () => {
    try {
      // Validação básica
      if (!formData.firstName || !formData.lastName || !formData.email) {
        showError("Preencha os campos obrigatórios: Nome, Sobrenome e Email");
        return;
      }

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        documentNumber: formData.documentNumber,
        address: formData.address,
        isActive: formData.isActive,
      };

      await createCustomer(payload);
      await fetchCustomers();
      showSuccess("Cliente adicionado com sucesso");
      setIsAddModalOpen(false);
      setFormData(initialCustomerData); // Reset form
    } catch (error) {
      const backendMessage = error?.response?.data?.error || "Erro ao adicionar cliente.";
      showError(backendMessage);
    }
  };

  // Função para confirmar exclusão
  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteCustomer(itemToDelete.id);
        setCustomers((prev) => prev.filter((c) => c.id !== itemToDelete.id));
        showSuccess(`Cliente ${itemToDelete.firstName} excluído com sucesso`);
      } catch (error) {
        showError("Erro ao excluir cliente");
      } finally {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
      }
    }
  };

  // Função para fechar modais e resetar estados
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setFormData(initialCustomerData);
  };

  const handleCloseEditModal = () => {
    setIsModalOpen(false);
    setFormData(initialCustomerData);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const columns = [
    {
      key: "name",
      title: "Nome Completo",
      sortable: true,
      render: (_, c) => `${c.firstName} ${c.lastName}`,
    },
    {
      key: "email",
      title: "Email",
      sortable: true,
      render: (_, c) => c.email,
    },
    {
      key: "phone",
      title: "Telefone",
      sortable: false,
      render: (_, c) => c.phone || "NÃO INFORMADO",
    },
    {
      key: "documentNumber",
      title: "Documento",
      sortable: false,
      render: (_, c) => c.documentNumber || "NÃO INFORMADO",
    },
    {
      key: "address",
      title: "Endereço",
      sortable: false,
      render: (_, c) => c.address || "NÃO INFORMADO",
    },
    {
      key: "createdAt",
      title: "Criado em",
      sortable: true,
      render: (_, c) =>
        new Date(c.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      key: "isActive",
      title: "Status",
      sortable: false,
      render: (_, c) =>
        c.isActive ? (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            ATIVO
          </span>
        ) : (
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            INATIVO
          </span>
        ),
    },
    {
      key: "actions",
      title: "Ações",
      sortable: false,
      render: (_, c) => (
        <div className="flex gap-3">
          <button
            onClick={() => handleEditClick(c)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Editar cliente"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => {
              setItemToDelete(c);
              setIsDeleteModalOpen(true);
            }}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Excluir cliente"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Table
          title="Clientes"
          data={customers}
          columns={columns}
          striped
          onAddClick={handleAddClick}
        />
      </main>

      {isAddModalOpen && (
        <ModalAddGeneric
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          onSave={handleSave}
          title="Adicionar Cliente"
        >
          <CustomerFormFields formData={formData} onChange={handleChange} />
        </ModalAddGeneric>
      )}

      <ModalEditGeneric
        isOpen={isModalOpen}
        onClose={handleCloseEditModal}
        formData={formData}
        onChange={handleChange}
        onSave={handleSubmit}
        title="Editar Cliente"
      >
        <CustomerFormFields formData={formData} onChange={handleChange} />
      </ModalEditGeneric>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        itemName={`${itemToDelete?.firstName || ""} ${itemToDelete?.lastName || ""}`.trim()}
      />

      <ToastContainerWrapper />
    </div>
  );
}
