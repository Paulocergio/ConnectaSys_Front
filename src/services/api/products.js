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

export async function getAllProducts() {
  try {
return await api.get("/Products/products");

  } catch (error) {
    throw new Error(extractErrorMessage(error, "Erro ao buscar produtos."));
  }
}


