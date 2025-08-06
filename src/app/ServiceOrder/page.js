"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table/Table";
import ModalAddGeneric from "../../components/Modals/ModalAddGeneric";
import ModalEditGeneric from "../../components/Modals/ModalEditGeneric";
import ConfirmDeleteModal from "../../components/Modals/ModalConfirmDelete";
import {
  showSuccess,
  showError,
  ToastContainerWrapper,
} from "../../components/Toast/ToastNotification";
import {
  GetServiceOrders,
  createServiceOrder,
  updateServiceOrder,
  deleteServiceOrder,
} from "../../services/api/serviceOrderService";
import ServiceOrderFormFields from "./ServiceOrderFormFilds";
import { Edit, Trash2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { GetCustomer } from "../../services/api/customerService";

const initialFormData = {
  customerId: "",
  serviceType: "",
  status: "OPEN",
  scheduledDate: "",
  openedDate: "",
  vehicleId: null,
  totalAmount: 0,
  closedAt: null,
};

export default function ServiceOrderPage() {
  useAuth();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [customers, setCustomers] = useState([]);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await GetCustomer();
        setCustomers(res.data);
      } catch (err) {
        showError("Erro ao carregar clientes.");
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (customers.length > 0) {
      fetchData();
    }
  }, [customers]);

  const fetchData = async () => {
    try {
      const res = await GetServiceOrders();
      const updatedData = res.data.map((order) => {
        const customer = customers.find((c) => c.id === order.customer_id);
        return {
          ...order,
          clientName: customer
            ? `${customer.firstName} ${customer.lastName}`
            : "Cliente não encontrado",
          serviceType: order.description || "", // Maps to description
          scheduledDate: order.opened_at || "", // Adjust if needed based on backend
          openedDate: order.opened_at || "", // Maps to opened_at
          technician: order.technician || "", // Maps to technician
          totalAmount: order.total_amount || 0,
          closedAt: order.closed_at || null,
        };
      });
      setData(updatedData);
    } catch {
      showError("Erro ao carregar ordens de serviço");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = () => {
    setFormData(initialFormData);
    setIsAddModalOpen(true);
  };

  const handleEdit = (item) => {
    setFormData({
      ...item,
      customerId: item.customer_id,
      serviceType: item.description || "",
      openedDate: item.opened_at ? new Date(item.opened_at).toISOString().split("T")[0] : "",
      scheduledDate: item.scheduled_date
        ? new Date(item.scheduled_date).toISOString().split("T")[0]
        : "",
      totalAmount: item.total_amount || 0,
      closedAt: item.closed_at || null,
    });
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    const scheduledDateISO = formData.scheduledDate
      ? new Date(`${formData.scheduledDate}T00:00:00`).toISOString()
      : null;
    const openedAtISO = formData.openedDate
      ? new Date(`${formData.openedDate}T00:00:00`).toISOString()
      : new Date().toISOString();

    const payload = {
      customer_id: formData.customerId,
      vehicle_id: formData.vehicleId,
      description: formData.serviceType,
      scheduled_date: formData.scheduledDate
        ? new Date(`${formData.scheduledDate}T00:00:00`).toISOString()
        : null,
      opened_at: formData.openedDate
        ? new Date(`${formData.openedDate}T00:00:00`).toISOString()
        : new Date().toISOString(),
      total_amount: formData.totalAmount,
      status: formData.status,
      closed_at: formData.closedAt,
    };

    try {
      await createServiceOrder(payload);
      fetchData();
      showSuccess("Ordem de serviço criada com sucesso");
      setIsAddModalOpen(false);
    } catch (error) {
      showError("Erro ao criar ordem de serviço");
    }
  };

  const handleUpdate = async () => {
    const payload = {
      customer_id: formData.customerId,
      vehicle_id: formData.vehicleId,
      description: formData.serviceType,
      technician: formData.technician,
      scheduled_date: formData.scheduledDate
        ? new Date(`${formData.scheduledDate}T00:00:00`).toISOString()
        : null,
      opened_at: formData.openedDate
        ? new Date(`${formData.openedDate}T00:00:00`).toISOString()
        : formData.opened_at,
      total_amount: formData.totalAmount,
      status: formData.status,
      closed_at: formData.closedAt,
    };

    try {
      await updateServiceOrder(formData.id, payload);
      fetchData();
      showSuccess("Ordem de serviço atualizada com sucesso");
      setIsEditModalOpen(false);
    } catch (error) {
      showError("Erro ao atualizar ordem de serviço");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteServiceOrder(itemToDelete.id);
      fetchData();
      showSuccess("Ordem de serviço excluída com sucesso");
    } catch {
      showError("Erro ao excluir ordem de serviço");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };
const columns = [
  { key: "clientName", title: "Cliente", sortable: true },
  { key: "serviceType", title: "Tipo de Serviço", sortable: true },
  {
    key: "totalAmount",
    title: "Valor Total",
    sortable: true,
    render: (_, row) =>
      row.totalAmount?.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }) || "R$ 0,00",
  },
  { key: "status", title: "Status", sortable: true },
  {
    key: "scheduledDate",
    title: "Data Agendada",
    sortable: true,
    render: (_, r) => {
      if (!r.scheduledDate) return "Não informada";
      return new Date(r.scheduledDate).toLocaleDateString("pt-BR");
    },
  },
  {
    key: "openedDate",
    title: "Data de Abertura",
    sortable: true,
    render: (_, r) => {
      if (!r.openedDate) return "Não informada";
      return new Date(r.openedDate).toLocaleDateString("pt-BR");
    },
  },
  {
    key: "actions",
    title: "Ações",
    render: (_, row) => (
      <div className="flex gap-3">
        <button onClick={() => handleEdit(row)} className="text-blue-600">
          <Edit size={16} />
        </button>
        <button
          onClick={() => {
            setItemToDelete(row);
            setIsDeleteModalOpen(true);
          }}
          className="text-red-600"
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
        <Table title="Ordens de Serviço" data={data} columns={columns} onAddClick={handleAdd} />
      </main>

      <ModalAddGeneric
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSave}
        title="Nova Ordem de Serviço"
      >
        <ServiceOrderFormFields formData={formData} onChange={handleChange} customers={customers} />
      </ModalAddGeneric>

      <ModalEditGeneric
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        formData={formData}
        onChange={handleChange}
        onSave={handleUpdate}
        title="Editar Ordem de Serviço"
      >
        <ServiceOrderFormFields formData={formData} onChange={handleChange} customers={customers} />
      </ModalEditGeneric>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={itemToDelete?.clientName || ""}
      />

      <ToastContainerWrapper />
    </div>
  );
}
