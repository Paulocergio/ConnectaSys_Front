"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table/Table";
import ModalAddGeneric from "../../components/Modals/ModalAddGeneric";
import ModalEditGeneric from "../../components/Modals/ModalEditGeneric";
import ConfirmDeleteModal from "../../components/Modals/ModalConfirmDelete";

import {
  showSuccess,
  showError,
  ToastContainerWrapper,
}
  from "../../components/Toast/ToastNotification";



import { getAllProducts } from "../../services/api/products";
import { createProduct, updateProduct, deleteProduct, createStockEntry } from "../../services/api/products";
import ProductFormFields from "../products/productsFormFields";


import { Edit, Trash2 } from "lucide-react";

const initialProductData = {
  product_name: "",
  barcode: "",
  description: "",
  quantity: 0,
};


export default function Products() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(initialProductData);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      const normalized = res.data.map((p) => ({
        ...p,
        id: p.product_id, // para uso em edição/exclusão
      }));
      setProducts(normalized);
    } catch (error) {
      showError("Erro ao carregar produtos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddClick = () => {
    setFormData(initialProductData);
    setIsAddModalOpen(true);
  };

  const handleEditClick = (product) => {
    const { createdAt, updatedAt, deletedAt, ...cleaned } = product;
    setFormData({ ...cleaned, id: product.id });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.id) {
        showError("Produto sem ID para edição.");
        return;
      }

      await updateProduct(formData.id, formData);
      await fetchProducts();
      showSuccess("Produto atualizado com sucesso.");
      setIsModalOpen(false);
    } catch (error) {
      showError(error?.response?.data?.error || "Erro ao atualizar produto.");
    }
  };
  const handleSave = async () => {
    try {
      console.log("🚀 Início do handleSave");
      console.log("📦 Dados do formData:", formData);

      if (!formData.product_name || !formData.barcode) {
        showError("Preencha os campos obrigatórios: Nome e Código de Barras.");
        return;
      }

      const productPayload = {
        productName: formData.product_name,
        barcode: formData.barcode,
        description: formData.description,
      };

      console.log("📤 Enviando para /Products/products:", productPayload);
      const res = await createProduct(productPayload);
      const createdProduct = res.data;

      console.log("✅ Produto criado:", createdProduct);

      const stockPayload = {
        productId: createdProduct.product_id,
        quantity: Number(formData.quantity) || 0,
      };

      console.log("📤 Enviando para /Stock/entries:", stockPayload);
      await createStockEntry(stockPayload);

      await fetchProducts();
      setIsAddModalOpen(false);
      setFormData(initialProductData);
      showSuccess("Produto e estoque cadastrados com sucesso.");
    } catch (error) {
      console.error("❌ Erro ao salvar produto/estoque:", error);
      console.log("📄 Resposta do erro:", error?.response?.data);
      showError(error?.response?.data?.error || "Erro ao cadastrar produto.");
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(itemToDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== itemToDelete.id));
      showSuccess("Produto excluído com sucesso.");
    } catch (error) {
      showError("Erro ao excluir produto.");
    } finally {
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const columns = [
    {
      key: "product_name",
      title: "Produto",
      sortable: true,
      render: (_, p) => p.product_name,
    },
    {
      key: "barcode",
      title: "Código de Barras",
      sortable: true,
      render: (_, p) => p.barcode || "NÃO INFORMADO",
    },
    {
      key: "description",
      title: "Descrição",
      sortable: false,
      render: (_, p) => p.description || "—",
    },
    {
      key: "quantity",
      title: "Estoque",
      sortable: true,
      render: (_, p) => `${p.quantity ?? 0} un.`,
    },
    {
      key: "created_at",
      title: "Criado em",
      sortable: true,
      render: (_, p) =>
        new Date(p.created_at).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      key: "actions",
      title: "Ações",
      sortable: false,
      render: (_, p) => (
        <div className="flex gap-3">
          <button
            onClick={() => handleEditClick(p)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Editar produto"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => {
              setItemToDelete(p);
              setIsDeleteModalOpen(true);
            }}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Excluir produto"
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
          title="Produtos"
          data={products}
          columns={columns}
          striped
          onAddClick={handleAddClick}
        />
      </main>
      {isAddModalOpen && (
        <ModalAddGeneric
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSave}
          title="Adicionar Produto"
        >
          <ProductFormFields formData={formData} onChange={handleChange} />
        </ModalAddGeneric>
      )}


      <ModalEditGeneric
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onChange={handleChange}
        onSave={handleSubmit}
        title="Editar Produto"
      >

      </ModalEditGeneric>




      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.product_name || ""}
      />



    </div>
  );
}
