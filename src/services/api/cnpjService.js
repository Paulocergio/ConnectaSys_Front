import axios from "axios";

export async function fetchCnpjData(cnpj) {
  const cleaned = cnpj.replace(/\D/g, "");
  if (cleaned.length !== 14) throw new Error("CNPJ inválido");

  try {
    const response = await axios.get(`https://publica.cnpj.ws/cnpj/${cleaned}`);
    const est = response.data.estabelecimento;
    return {
      razao_social: response.data.razao_social,
      email: est?.email,
      telefone1: est?.telefone1,
      logradouro: est?.logradouro,
      numero: est?.numero,
      cidade: est?.cidade?.nome,
      estado: est?.estado?.sigla,
      cep: est?.cep,
    };
  } catch (error) {
    console.error("Erro ao buscar CNPJ:", error);
    throw new Error("Erro ao consultar o CNPJ");
  }
}
