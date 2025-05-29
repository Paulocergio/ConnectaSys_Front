
'use client';

import { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import Table from '../../components/Table/Table';
import Sidebar from '../../components/Sidebar';
import ModalEditGeneric from '../../components/Modals/ModalEditGeneric';
import ModalAddGeneric from '../../components/Modals/ModalAddGeneric';
import ConfirmDeleteModal from '../../components/Modals/ModalConfirmDelete';
import { GetCustomer, deleteCustomer, createCustomer } from '../../services/api/customerService';
import { showSuccess, showError, ToastContainerWrapper } from '../../components/Toast/ToastNotification';

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // <-- ADICIONADO AQUI
  const [formData, setFormData] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  const fetchCustomers = async () => {
    const res = await GetCustomer();
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleEditClick = (customer) => {
    setFormData(customer);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('✅ Dados salvos (simulado):', formData);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteCustomer(itemToDelete.id);
        setCustomers((prev) => prev.filter(c => c.id !== itemToDelete.id));
        showSuccess(`Cliente ${itemToDelete.firstName} excluído com sucesso`);
      } catch (error) {
        showError('❌ Erro ao excluir cliente');
      } finally {
        setIsDeleteModalOpen(false);
      }
    }
  };

  const columns = [
    { key: 'name', title: 'Nome Completo', sortable: true, render: (_, c) => `${c.firstName} ${c.lastName}` },
    { key: 'email', title: 'Email', sortable: true, render: (_, c) => c.email },
    { key: 'phone', title: 'Telefone', sortable: false, render: (_, c) => c.phone || 'NÃO INFORMADO' },
    { key: 'documentNumber', title: 'Documento', sortable: false, render: (_, c) => c.documentNumber || 'NÃO INFORMADO' },
    { key: 'address', title: 'Endereço', sortable: false, render: (_, c) => c.address || 'NÃO INFORMADO' },
    {
      key: 'createdAt', title: 'Criado em', sortable: true,
      render: (_, c) =>
        new Date(c.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        })
    },
    {
      key: 'isActive', title: 'Status', sortable: false,
      render: (_, c) =>
        c.isActive ? (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">ATIVO</span>
        ) : (
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs">INATIVO</span>
        )
    },
    {
      key: 'actions', title: 'Ações', sortable: false,
      render: (_, c) => (
        <div className="flex gap-3">
          <button onClick={() => handleEditClick(c)} className="text-blue-600">
            <Edit size={16} />
          </button>
          <button onClick={() => { setItemToDelete(c); setIsDeleteModalOpen(true); }} className="text-red-600">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
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
          onAddClick={() => setIsAddModalOpen(true)}
        />

        {isAddModalOpen && (
          <ModalAddGeneric
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={async (newData) => {
              try {
                const payload = {
                  firstName: newData.firstName,
                  lastName: newData.lastName,
                  email: newData.email,
                  phone: newData.phone,
                  password: newData.password,
                  isActive: true,
                };
                await createCustomer(payload);
                await fetchCustomers();
                showSuccess('CLIENTE ADICIONADO COM SUCESSO');
                setIsAddModalOpen(false);
              } catch (error) {
                const backendMessage = error?.response?.data?.error || 'Erro ao adicionar cliente.';
                showError(backendMessage);
              }
            }}
            fields={[
              { name: 'firstName', label: 'Nome' },
              { name: 'lastName', label: 'Sobrenome' },
              { name: 'email', label: 'Email' },
              { name: 'phone', label: 'Telefone' },
              { name: 'documentNumber', label: 'Documento' }, // NOVO
              { name: 'address', label: 'Endereço' },         // NOVO
              { name: 'password', label: 'Senha', type: 'password' },
            ]}

            title="Adicionar Cliente"
          />
        )}
      </main>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={`${itemToDelete?.firstName} ${itemToDelete?.lastName}`}
      />

      <ModalEditGeneric
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        title="Editar Cliente"
        labels={{
          documentNumber: 'Documento',
          firstName: 'Nome',
          lastName: 'Sobrenome',
          email: 'Email',
          phone: 'Telefone',
          address: 'Endereço',
          password: 'Senha',
          updatedAt: 'Atualizado em',
          isActive: 'Ativo',
        }}
        checkboxLast={true}
      />

      <ToastContainerWrapper />
    </div>
  );
}
