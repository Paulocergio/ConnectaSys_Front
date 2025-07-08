// src/services/api/userService.js
import api from "./axiosInstance.js";


export async function getUsers() {
  const response = await api.get("/Users");
  return {
    data: response.data.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? "",
      isActive: user.isActive,
      password: user.password,
      createdAt: user.createdAt,
    })),
  };
}

export async function deleteUser(id) {
  return api.delete(`/Users/${id}`);
}
export async function updateUser(id, data) {
  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone ?? "",
    password: data.password,
    isActive: data.isActive,
  };

  return api.put(`/Users/${id}`, payload);
}
export async function createUser(data) {
  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone ?? "",
    password: data.password,
    isActive: data.isActive,
  };
  return api.post(`/Users`, payload);
}
