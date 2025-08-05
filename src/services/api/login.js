export async function login(email, password) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
      { email, password }
    );

    if (response.data?.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
    }

    return true;
  } catch (error) {
    console.error("❌ Erro ao fazer login:", error);
    return false;
  }
}
