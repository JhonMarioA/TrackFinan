import { reportsApi } from "../api/reports.api.js";
import { budgetsApi } from "../api/budgets.api.js";
import { requireAuth } from "../core/guard.js";
import { setText } from "../core/ui.js";

requireAuth();

function formatMoney(value) {
  const number = Number(value || 0);
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(number);
}

function currentMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const toISO = (date) => date.toISOString().slice(0, 10);
  return { startDate: toISO(start), endDate: toISO(end) };
}

async function loadKpis() {
  const incomeExpense = await reportsApi.incomeVsExpense();
  const balance = await reportsApi.balance(currentMonthRange());

  const income = incomeExpense.find((item) => item.type === "income")?.total || 0;
  const expense = incomeExpense.find((item) => item.type === "expense")?.total || 0;

  setText("#incomeValue", formatMoney(income));
  setText("#expenseValue", formatMoney(expense));
  setText("#balanceValue", formatMoney(balance?.balance || 0));
}

async function loadBudgetStatus() {
  const list = document.querySelector("#budgetStatusList");
  const data = await budgetsApi.status();

  list.innerHTML = data
    .slice(0, 5)
    .map(
      (item) =>
        `<li><strong>${item.category}</strong> <span class="muted">${item.percentage}%</span> - ${formatMoney(item.spent)} / ${formatMoney(item.limit_amount)}</li>`
    )
    .join("");
}

async function loadExpensesByCategory() {
  const list = document.querySelector("#expensesByCategoryList");
  const data = await reportsApi.expensesByCategory(currentMonthRange());

  list.innerHTML = data
    .slice(0, 5)
    .map((item) => `<li><strong>${item.category}</strong> - ${formatMoney(item.total)}</li>`)
    .join("");
}

(async function init() {
  try {
    await Promise.all([loadKpis(), loadBudgetStatus(), loadExpensesByCategory()]);
  } catch (error) {
    console.error(error);
  }
})();
