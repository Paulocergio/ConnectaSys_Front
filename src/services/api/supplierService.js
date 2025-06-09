import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export async function createSupplier(data) {
  const payload = {
    companyName: data.company_name,
    contactName: data.contact_name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    state: data.state,
    zipCode: data.zip_code,
    country: data.country,
    taxId: data.tax_id,
    isActive: data.is_active,
  };

  return api.post(`/Suppliers`, payload); 
}

export async function getSuppliers() {
  return api.get("/Suppliers");
}
