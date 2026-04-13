import { api } from "./client.js";

export const budgetsApi = {
  list: () => api.get("/budgets"),
  status: () => api.get("/budgets/status"),
  create: (payload) => api.post("/budgets", payload),
  update: (id, payload) => api.put(`/budgets/${id}`, payload),
  remove: (id) => api.delete(`/budgets/${id}`),
};
