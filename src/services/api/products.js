import api from "./axiosInstance.js";


function extractErrorMessage(error, fallbackMessage) {
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return fallbackMessage;
}

export async function getAllProducts() {
  try {
return await api.get("/Products/products");

  } catch (error) {
    throw new Error(extractErrorMessage(error, "Erro ao buscar produtos."));
  }
}

export async function createProduct(payload) {
  return await api.post("/Products/products", payload);
}

export async function createStockEntry(payload) {
  return await api.post("/Stock/entries", payload);
}

export async function updateProduct(id, payload) {
  return await api.put(`/Products/products/${id}`, payload);
}

export async function deleteProduct(id) {
  return await api.delete(`/Products/products/${id}`);
}
