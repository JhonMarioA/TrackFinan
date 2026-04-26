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
  const reportType = filters.reportType || "all";
  const showExpenses = reportType === "all" || reportType === "expenses-by-category";
  const showBalance = reportType === "all" || reportType === "balance";
  const showIncomeVsExpense = reportType === "all" || reportType === "income-vs-expense";

  document.querySelector("#expensesCard")?.classList.toggle("hidden", !showExpenses);
  document.querySelector("#balanceCard")?.classList.toggle("hidden", !showBalance);
  document.querySelector("#incomeVsExpenseCard")?.classList.toggle("hidden", !showIncomeVsExpense);

  const [expenses, balance, incomeVsExpense] = await Promise.all([
    showExpenses ? reportsApi.expensesByCategory(filters) : Promise.resolve([]),
    showBalance ? reportsApi.balance(filters) : Promise.resolve(null),
    showIncomeVsExpense ? reportsApi.incomeVsExpense() : Promise.resolve([]),
  ]);

  const list = document.querySelector("#expensesByCategoryList");
  if (showExpenses) {
    list.innerHTML = expenses.length
      ? expenses.map((item) => `<li><strong>${item.category}</strong> - ${money.format(Number(item.total || 0))}</li>`).join("")
      : "<li class=\"muted\">Sin datos para el rango seleccionado.</li>";
  }

  const resume = document.querySelector("#balanceResume");
  if (showBalance) {
    resume.textContent = `Ingresos: ${money.format(Number(balance?.income || 0))} | Gastos: ${money.format(Number(balance?.expense || 0))} | Balance: ${money.format(Number(balance?.balance || 0))}`;
  }

  if (showIncomeVsExpense) {
    const income = Number(incomeVsExpense.find((item) => item.type === "income")?.total || 0);
    const expense = Number(incomeVsExpense.find((item) => item.type === "expense")?.total || 0);
    const node = document.querySelector("#incomeVsExpenseResume");
    node.textContent = `Ingresos: ${money.format(income)} | Gastos: ${money.format(expense)} | Diferencia: ${money.format(income - expense)}`;
  }
}

const filterForm = document.querySelector("#reportFilterForm");
const refreshReportBtn = document.querySelector("#refreshReportBtn");

function currentFiltersFromForm() {
  const formData = new FormData(filterForm);
  return {
    reportType: formData.get("reportType"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  };
}

filterForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await loadData(currentFiltersFromForm());
});

refreshReportBtn?.addEventListener("click", async () => {
  await loadData(currentFiltersFromForm());
});

(async function init() {
  const range = defaultRange();
  filterForm.elements.startDate.value = range.startDate;
  filterForm.elements.endDate.value = range.endDate;
  filterForm.elements.reportType.value = "all";
  await loadData({ ...range, reportType: "all" });
})();
