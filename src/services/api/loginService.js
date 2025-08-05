const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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

    return data;
  } catch (error) {
    console.error("Erro no login:", error);
    return null;
  }
}
