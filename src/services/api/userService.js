// src/services/api/userService.js
import api from "./axiosInstance.js";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});



export async function getUsers() {
  const response = await api.get("/User");
  return {
    data: response.data.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? "",
      isActive: user.isActive,
      createdAt: user.createdAt,
      role: user.role,
    })),
  };
}


// DELETE: remove usuário por ID
export async function deleteUser(id) {
  return api.delete(`/User/${id}`);
}

// PUT: atualiza usuário
export async function updateUser(id, data) {
  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone ?? "",
    password: data.password,
    isActive: data.isActive,
     role: data.role, 
  };

  return api.put(`/User/${id}`, payload);
}

// POST: cria novo usuário
export async function createUser(data) {
  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone ?? "",
    password: data.password,
    isActive: data.isActive,
    role: data.role,
  };
  return api.post(`/User`, payload);
}
