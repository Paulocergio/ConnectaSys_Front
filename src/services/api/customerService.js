// src/services/api/userService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export async function GetCustomer() {
  const response = await api.get('/Customers');
  return {
    data: response.data.map(user => ({
      id: user.id,
      documentNumber: user.documentNumber,  
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? '', 
      isActive: user.isActive,
      password: user.password,
      createdAt: user.createdAt,
      address: user.address,    
      deletedAt: user.deletedAt,  
      updatedAt: user.updatedAt   
    }))
  };
}

