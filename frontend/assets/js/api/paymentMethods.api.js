import { api } from "./client.js";

export const paymentMethodsApi = {
  list: () => api.get("/payment-methods"),
  create: (payload) => api.post("/payment-methods", payload),
  update: (id, payload) => api.put(`/payment-methods/${id}`, payload),
  remove: (id) => api.delete(`/payment-methods/${id}`),
};
