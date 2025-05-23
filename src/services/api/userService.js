// src/services/api/userService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export async function getUsers() {
  const response = await api.get('/Users');
  return {
    data: response.data.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phone ?? 'Não informado',
      isActive: user.isActive,
      password: user.password,
      createdAt: user.createdAt,
    }))
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
    phone: data.phoneNumber,
    isActive: data.isActive
  };

  return api.put(`/Users/${id}`, payload);
}


