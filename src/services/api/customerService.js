// src/services/api/userService.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export async function createCustomer(data) {
  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone ?? "",
    documentNumber: data.documentNumber ?? "",
    address: data.address ?? "",
    password: data.password,
    isActive: data.isActive,
  };
  return api.post(`/Customers`, payload);
}

export async function GetCustomer() {
  const response = await api.get("/Customers");
  return {
    data: response.data.map((user) => ({
      id: user.id,
      documentNumber: user.documentNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? "",
      isActive: user.isActive,
      password: user.password,
      createdAt: user.createdAt,
      address: user.address,
      deletedAt: user.deletedAt,
      updatedAt: user.updatedAt,
    })),
  };
}

export async function updateCustomer(id, formData) {
  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    documentNumber: formData.documentNumber,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    isActive: formData.isActive,
  };
  try {
    const response = await api.put(`/Customers/${id}`, payload);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Erro ao atualizar cliente");
  }
}

export async function deleteCustomer(id) {
  return api.delete(`/Customers/${id}`);
}
