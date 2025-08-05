// ✅ loginService.js
export async function login(email, password) {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    return data; // ⬅️ Retorna o token e dados do usuário
  } catch (error) {
    console.error("Erro no login:", error);
    return null;
  }
}
