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
