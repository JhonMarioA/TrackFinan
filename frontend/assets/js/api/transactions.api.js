import { api } from "./client.js";

function toQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, value);
    }
  });
  const query = search.toString();
  return query ? `?${query}` : "";
}

export const transactionsApi = {
  list: () => api.get("/transactions"),
  listWithFilters: (params) => api.get(`/transactions/filter${toQuery(params)}`),
  create: (payload) => api.post("/transactions", payload),
  update: (id, payload) => api.put(`/transactions/${id}`, payload),
  remove: (id) => api.delete(`/transactions/${id}`),
};
