// Simulando login mockado SEM chamada axios
export const login = async (email, password) => {
  // Dados de login fixos (mock)
  const mockEmail = 'augusto.morais@memt.com.br';
  const mockPassword = '123456';

  if (email === mockEmail && password === mockPassword) {
    // Simula token salvo
    localStorage.setItem('token', 'mocked-token-123');
    return true;
  }

  return false;
};
