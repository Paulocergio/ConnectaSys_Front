import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // ajuste conforme seu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
