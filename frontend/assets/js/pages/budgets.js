import { budgetsApi } from "../api/budgets.api.js";
import { categoriesApi } from "../api/categories.api.js";
import { requireAuth } from "../core/guard.js";

requireAuth();

const money = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" });

async function loadCategories() {
  const select = document.querySelector("#budgetCategorySelect");
  const rows = await categoriesApi.list();
  select.innerHTML = rows.map((row) => `<option value="${row.id}">${row.name}</option>`).join("");
}

async function loadStatus() {
  const rows = await budgetsApi.status();
  const list = document.querySelector("#budgetStatusList");
  list.innerHTML = rows
    .map(
      (row) =>
        `<li><strong>${row.category}</strong> ${row.percentage}% - ${money.format(Number(row.spent || 0))} / ${money.format(Number(row.limit_amount || 0))}</li>`
    )
    .join("");
}

document.querySelector("#budgetForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  await budgetsApi.create({
    category_id: Number(formData.get("category_id")),
    amount: Number(formData.get("amount")),
    month: Number(formData.get("month")),
    year: Number(formData.get("year")),
  });

  event.currentTarget.reset();
  await loadStatus();
});

(async function init() {
  await Promise.all([loadCategories(), loadStatus()]);
})();
