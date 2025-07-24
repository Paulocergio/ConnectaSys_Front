// services/login.js
import axios from "axios";

export async function login(email, password) {
  try {
    const response = await axios.post(
      "https://localhost:32771/api/Auth/login", // coloque aqui a URL real da sua API
      { email, password }
    );

    // Salva o token no localStorage, se quiser reutilizar depois
    if (response.data?.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
    }

    return true;
  } catch (error) {
    console.error("❌ Erro ao fazer login:", error);
    return false;
  }
}
