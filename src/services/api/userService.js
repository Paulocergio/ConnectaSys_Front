// src/services/api/userService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7118/api'  // <— usa HTTPS
});

export function getUsers() {
  return api.get('/Users');
}
