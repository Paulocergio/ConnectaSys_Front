"use client";

import ModalAddGeneric from "../../components/Modals/ModalAddGeneric";
import ModalConfirmDelete from "../../components/Modals/ModalConfirmDelete";
import ModalEditGeneric from "../../components/Modals/ModalEditGeneric";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table/Table";
import {
  showSuccess,
  showError,
  ToastContainerWrapper,
} from "../../components/Toast/ToastNotification";
import { getUsers, deleteUser, updateUser, createUser } from "../../services/api/userService";
import UserFormFields from "./UserFormFields";
import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

const initialUserData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  isActive: true,
  role: "Admin",
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const [formData, setFormData] = useState(initialUserData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const roleToLabel = {
  Admin: "Administrador",
  Manager: "Gerente",
  Mechanic: "Mecânico",
  Receptionist: "Recepcionista",
  Supervisor: "Supervisor",
  Accountant: "Contador",
};


  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      const sorted = res.data.sort((a, b) => {
        const nameA = `${a.firstName ?? ""} ${a.lastName ?? ""}`.toLowerCase();
        const nameB = `${b.firstName ?? ""} ${b.lastName ?? ""}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      setUsers(sorted);
    } catch (error) {
      showError("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setFormData({ ...user, password: "" });
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
  } else if (typeof value === "string" && name !== "email" && name !== "password") {
    newValue = value.toUpperCase();
  }

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : newValue,
  }));
};

  const handleSubmit = async (e) => {
    e?.preventDefault(); 

    try {
      const { password, ...payload } = formData;
      await updateUser(formData.id, payload);
      await fetchUsers();
      showSuccess("USUÁRIO ATUALIZADO COM SUCESSO");
      setIsModalOpen(false);
    } catch {
      showError("ERRO AO ATUALIZAR USUÁRIO");
    }
  };

  const handleSave = async () => {
    try {
      await createUser(formData);
      await fetchUsers();
      showSuccess("USUÁRIO ADICIONADO COM SUCESSO");
      setIsAddModalOpen(false);
      setFormData(initialUserData);
    } catch (error) {
      const backendMessage = error?.response?.data?.error || "Erro ao adicionar usuário.";
      showError(backendMessage);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteUser(itemToDelete.id);
      setUsers((prev) => prev.filter((u) => u.id !== itemToDelete.id));
      showSuccess(`Usuário ${itemToDelete.firstName} excluído com sucesso`);
    } catch {
      showError("ERRO AO EXCLUIR USUÁRIO");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const columns = [
    {
      key: "name",
      title: "Nome",
      sortable: true,
      render: (_, user) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold uppercase text-xs">
            {`${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`}
          </div>
          <div>
            <div className="font-semibold text-slate-800 uppercase">
              {`${user.firstName} ${user.lastName}`.toUpperCase()}
            </div>
            <div className="text-xs text-slate-500 uppercase">{user.email?.toUpperCase()}</div>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      title: "Telefone",
      sortable: false,
      render: (_, user) => {
        const cleaned = user.phone?.replace(/\D/g, "");
        if (!cleaned) return "NÃO INFORMADO";
        return cleaned.length <= 10
          ? cleaned.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3")
          : cleaned.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
      },
    },
    {
      key: "createdAt",
      title: "Criado em",
      sortable: true,
      render: (value) =>
        new Date(value).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  {
  key: "role",
  title: "Cargo",
  sortable: false,
  render: (_, user) => {
    const roleMap = {
      Admin: { label: "Administrador", color: "bg-indigo-600" },
      Manager: { label: "Gerente", color: "bg-blue-600" },
      Mechanic: { label: "Mecânico", color: "bg-gray-700" },
      Receptionist: { label: "Recepcionista", color: "bg-green-600" },
      Supervisor: { label: "Supervisor", color: "bg-orange-600" },
      Accountant: { label: "Contador", color: "bg-purple-600" },
    };

    const role = roleMap[user.role] || { label: user.role, color: "bg-slate-400" };

    return (
      <span className={`inline-block px-3 py-1 text-white text-xs font-semibold rounded-full ${role.color}`}>
        {role.label.toUpperCase()}
      </span>
    );
  },
},


    {
      key: "isActive",
      title: "Status",
      sortable: false,
      render: (value) =>
        value ? (
          <span className="inline-flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            ATIVO
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            INATIVO
          </span>
        ),
    },
    
    {
      key: "actions",
      title: "Ações",
      sortable: false,
      render: (_, user) => (
        <div className="flex items-center gap-3">
          <button
            title="Editar"
            className="text-slate-500 hover:text-blue-600"
            onClick={() => handleEditClick(user)}
          >
            <Edit size={16} />
          </button>
          <button
            title="Excluir"
            className="text-slate-500 hover:text-red-600"
            onClick={() => {
              setItemToDelete(user);
              setIsDeleteModalOpen(true);
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];



  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={collapsed} toggleSidebar={() => setCollapsed((c) => !c)} />
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Table
          title="Usuários"
          data={users}
          columns={columns}
          striped
          onAddClick={() => {
            setFormData(initialUserData);
            setIsAddModalOpen(true);
          }}
        />

        {isAddModalOpen && (
          <ModalAddGeneric
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleSave}
            title="Adicionar Usuário"
          >
            <UserFormFields formData={formData} onChange={handleChange} />
          </ModalAddGeneric>
        )}
      </main>

      {isModalOpen && (
        <ModalEditGeneric
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSubmit}
          title="Editar Usuário"
        >
          <UserFormFields formData={formData} onChange={handleChange} showIsActive={true} />
        </ModalEditGeneric>
      )}

      <ModalConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.firstName}
      />

      <ToastContainerWrapper />
    </div>
  );
}
