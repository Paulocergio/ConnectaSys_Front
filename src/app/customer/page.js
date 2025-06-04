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
    setFormData({ ...cleaned, id: customer.id });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Função para salvar edição
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { password, updatedAt, createdAt, ...sanitizedData } = formData;
      await updateCustomer(formData.id, sanitizedData);
      await fetchCustomers();
      showSuccess("Cliente atualizado com sucesso");
      setIsModalOpen(false);
    } catch (error) {
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

      {/* Modal para adicionar cliente */}
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

      {/* Modal para editar cliente */}
      <ModalEditGeneric
        isOpen={isModalOpen}
        onClose={handleCloseEditModal}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        title="Editar Cliente"
        labels={{
          firstName: "Nome",
          lastName: "Sobrenome",
          documentNumber: "Documento",
          email: "Email",
          phone: "Telefone",
          address: "Endereço",
          isActive: "Ativo",
        }}
        fields={[
          { name: "firstName" },
          { name: "lastName" },
          { name: "documentNumber" },
          { name: "email" },
          { name: "phone" },
          { name: "address" },
          { name: "isActive", type: "checkbox" },
        ]}
        checkboxLast={true}
      />

      {/* Modal de confirmação de exclusão */}
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
