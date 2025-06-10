export const formatDocument = (value) => {
  const doc = value.replace(/\D/g, "");

  if (doc.length <= 11) {
    // CPF
    return doc
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    // CNPJ
    return doc
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
};

export const validateDocumentLength = (value) => {
  const doc = value.replace(/\D/g, "");
  return doc.length <= 14;
};
