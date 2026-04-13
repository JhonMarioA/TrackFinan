import { api } from "./client.js";

export const accountsApi = {
  list: () => api.get("/accounts"),
  create: (payload) => api.post("/accounts", payload),
  update: (id, payload) => api.put(`/accounts/${id}`, payload),
  remove: (id) => api.delete(`/accounts/${id}`),
  types: () => api.get("/accounts/account-types"),
  transactionTypes: () => api.get("/accounts/transaction-types"),
};
