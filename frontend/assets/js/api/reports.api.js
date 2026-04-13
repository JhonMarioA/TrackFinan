import { api } from "./client.js";

function query(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, value);
    }
  });
  const text = search.toString();
  return text ? `?${text}` : "";
}

export const reportsApi = {
  incomeVsExpense: () => api.get("/reports/income-vs-expense"),
  expensesByCategory: (params) => api.get(`/reports/expenses-by-category${query(params)}`),
  balance: (params) => api.get(`/reports/balance${query(params)}`),
};
