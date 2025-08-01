import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});


function extractErrorMessage(error, fallbackMessage) {
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return fallbackMessage;
}


export async function createSupplier(data) {
  const payload = {
    companyName: data.company_name,
    contactName: data.contact_name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    state: data.state,
    zipCode: data.zip_code,
    country: data.country,
    taxId: data.tax_id,
    isActive: data.is_active,
  };

  try {
    const response = await api.post(`/Suppliers`, payload);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Erro ao criar fornecedor."));
  }
}


export async function getSuppliers() {
  try {
    return await api.get("/Suppliers");
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Erro ao buscar fornecedores."));
  }
}


export async function updateSupplier(id, data) {
  const payload = {
    companyName: data.company_name,
    contactName: data.contact_name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    state: data.state,
    zipCode: data.zip_code,
    country: data.country,
    taxId: data.tax_id,
    isActive: data.is_active,
  };

  try {
    const response = await api.put(`/Suppliers/${id}`, payload);
    return response.data;
  } catch (error) {
    const status = error?.response?.status;
    if (status === 404) throw new Error("Fornecedor não encontrado.");
    if (status === 500) throw new Error("Erro interno no servidor.");
    throw new Error(extractErrorMessage(error, "Erro ao atualizar fornecedor."));
  }
}


export async function deleteSupplier(id) {
  try {
    const response = await api.delete(`/Suppliers/${id}`);
    return response.data;
  } catch (error) {
    const status = error?.response?.status;
    if (status === 404) throw new Error("Fornecedor não encontrado para exclusão.");
    if (status === 500) throw new Error("Erro interno ao excluir fornecedor.");
    throw new Error(extractErrorMessage(error, "Erro ao excluir fornecedor."));
  }
}
