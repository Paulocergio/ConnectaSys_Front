import axios from "axios";

export async function fetchCnpjData(cnpj) {
  const cleaned = cnpj.replace(/\D/g, "");
  if (cleaned.length !== 14) throw new Error("CNPJ inválido");

  try {
    const response = await axios.get(`https://publica.cnpj.ws/cnpj/${cleaned}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar CNPJ:", error);
    throw new Error("Erro ao consultar o CNPJ");
  }
}
