'use client';

import { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser, createUser } from '../../services/api/userService';
import Sidebar from '../../components/Sidebar';
import Table from '../../components/Table/Table';
import { Edit, Trash2, Plus, Users } from 'lucide-react';
import ModalEditGeneric from '../../components/Modals/ModalEditGeneric';
import ModalAddGeneric from '../../components/Modals/ModalAddGeneric';
import ModalConfirmDelete from '../../components/Modals/ModalConfirmDelete';

import { showSuccess, showError, ToastContainerWrapper } from '../../components/Toast/ToastNotification';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleEditClick = (user) => {
    const normalized = {
      ...user,
      password: '',
    };
    setSelectedItem(normalized);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteUser(itemToDelete.id);
        setUsers(prev => prev.filter(u => u.id !== itemToDelete.id));
        showSuccess('EXCLUÍDO COM SUCESSO');
      } catch (error) {
        showError('ERRO AO EXCLUIR USUÁRIO');
      } finally {
        setIsDeleteModalOpen(false);
      }
    }
  };

  useEffect(() => {
    getUsers()
      .then(res => {
        const sorted = res.data.sort((a, b) => {
          const nameA = `${a.firstName ?? ''} ${a.lastName ?? ''}`.toLowerCase();
          const nameB = `${b.firstName ?? ''} ${b.lastName ?? ''}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });
        setUsers(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      key: 'name',
      title: 'Nome',
      sortable: true,
      render: (_, user) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold uppercase text-xs">
            {`${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`}
          </div>
          <div>
            <div className="font-semibold text-slate-800 uppercase">
              {`${user.firstName} ${user.lastName}`.toUpperCase()}
            </div>
            <div className="text-xs text-slate-500 uppercase">
              {user.email?.toUpperCase()}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'phone',
      title: 'Telefone',
      sortable: false,
      render: (_, user) => {
        const formatPhone = (phone) => {
          const cleaned = phone?.replace(/\D/g, '');
          if (!cleaned) return 'NÃO INFORMADO';
          if (cleaned.length <= 10) {
            return cleaned.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
          } else {
            return cleaned.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
          }
        };
        return formatPhone(user.phone);
      }
    },
    {
      key: 'createdAt',
      title: 'Criado em',
      sortable: true,
      render: value =>
        new Date(value).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
    },
    {
      key: 'isActive',
      title: 'Status',
      sortable: false,
      render: value => (
        value ? (
          <span className="inline-flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            ATIVO
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            INATIVO
          </span>
        )
      )
    },
    {
      key: 'actions',
      title: 'Ações',
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
      )
    }
  ];

  if (loading) return <p>Carregando usuários…</p>;

  return (
    <div className="flex h-screen">
      <Sidebar
        isCollapsed={collapsed}
        toggleSidebar={() => setCollapsed(c => !c)}
      />
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Table
          title={
            <div className="text-xl font-semibold text-slate-800">
              Usuários
            </div>
          }
          data={users}
          columns={columns}
          striped
          onAddClick={() => setIsAddModalOpen(true)}
        >
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
                    isActive: true
                  };
                  await createUser(payload);
                  const res = await getUsers();
                  const sorted = res.data.sort((a, b) => {
                    const nameA = `${a.firstName ?? ''} ${a.lastName ?? ''}`.toLowerCase();
                    const nameB = `${b.firstName ?? ''} ${b.lastName ?? ''}`.toLowerCase();
                    return nameA.localeCompare(nameB);
                  });

                  setUsers(sorted);
                  showSuccess('USUÁRIO ADICIONADO COM SUCESSO');
                  setIsAddModalOpen(false);
                  console.log('[ModalAddGeneric] Modal fechado após sucesso.');
                } catch (error) {
                  console.error('[ModalAddGeneric] Erro ao adicionar usuário:', error);
                  const backendMessage = error?.response?.data?.error || 'Erro ao adicionar usuário.';
                  showError(backendMessage);
                }
              }}

              fields={[
                { name: 'firstName', label: 'Nome' },
                { name: 'lastName', label: 'Sobrenome' },
                { name: 'email', label: 'Email' },
                { name: 'phone', label: 'Telefone' },
                { name: 'password', label: 'Senha', type: 'password' }
              ]}
              title="Adicionar Usuário"
            />
          )}
        </Table>
      </main>

      <ModalEditGeneric
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        title="Editar Usuário"
        onSave={async (newData) => {
          try {
            const payload = {
              firstName: newData.firstName,
              lastName: newData.lastName,
              email: newData.email,
              phone: newData.phone,
              password: newData.password,
              isActive: newData.isActive
            };

            await updateUser(newData.id, payload);
            const res = await getUsers();
            const sorted = res.data.sort((a, b) => {
              const nameA = `${a.firstName ?? ''} ${a.lastName ?? ''}`.toLowerCase();
              const nameB = `${b.firstName ?? ''} ${b.lastName ?? ''}`.toLowerCase();
              return nameA.localeCompare(nameB);
            });

            setUsers(sorted);
            showSuccess('USUÁRIO ATUALIZADO COM SUCESSO');
            setIsModalOpen(false);
          } catch (error) {
            showError('ERRO AO ATUALIZAR USUÁRIO');
          }
        }}
      />

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
