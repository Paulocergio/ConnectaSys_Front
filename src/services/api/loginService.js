const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function login(email, password) {
  try {
    const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.message || "Erro desconhecido ao fazer login.";

      return false;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "user-data",
        JSON.stringify({
          email: data.email,
          token: data.token,
        })
      );
    }

    return true;
  } catch (error) {
    console.error("Erro na requisição de login:", error);
    return false;
  }
}
