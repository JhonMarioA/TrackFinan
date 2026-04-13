import { reportsApi } from "../api/reports.api.js";
import { requireAuth } from "../core/guard.js";

requireAuth();

const money = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" });

function defaultRange() {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);
  return { startDate: first, endDate: last };
}

async function loadData(filters) {
  const [expenses, balance] = await Promise.all([
    reportsApi.expensesByCategory(filters),
    reportsApi.balance(filters),
  ]);

  const list = document.querySelector("#expensesByCategoryList");
  list.innerHTML = expenses.map((item) => `<li><strong>${item.category}</strong> - ${money.format(Number(item.total || 0))}</li>`).join("");

  const resume = document.querySelector("#balanceResume");
  resume.textContent = `Ingresos: ${money.format(Number(balance?.income || 0))} | Gastos: ${money.format(Number(balance?.expense || 0))} | Balance: ${money.format(Number(balance?.balance || 0))}`;
}

const filterForm = document.querySelector("#reportFilterForm");

filterForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  await loadData({
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  });
});

(async function init() {
  const range = defaultRange();
  filterForm.elements.startDate.value = range.startDate;
  filterForm.elements.endDate.value = range.endDate;
  await loadData(range);
})();
