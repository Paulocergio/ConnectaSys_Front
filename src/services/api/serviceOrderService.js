// src/services/api/serviceOrderService.js
import api from "./axiosInstance";

export async function GetServiceOrders() {
  return await api.get("/ServiceOrders");
}

export async function createServiceOrder(payload) {
  return await api.post("/ServiceOrders", payload);
}

export async function updateServiceOrder(id, payload) {
  return await api.put(`/ServiceOrders/${id}`, payload);
}

export async function deleteServiceOrder(id) {
  return await api.delete(`/ServiceOrders/${id}`);
}