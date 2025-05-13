// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // você pode adicionar headers, interceptors aqui
});

export default axiosInstance;
