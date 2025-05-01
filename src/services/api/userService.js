


// src/services/authService.js
import axios from '@/utils/axiosInstance';

export const login = async (email, password) => {
  try {
    const response = await axios.post('/auth/login', { email, password });
    return response; // retornando o objeto completo
  } catch (error) {
    return error.response; // ainda retorna a resposta para tratar status != 200
  }
};

