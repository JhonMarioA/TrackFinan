import { accountsApi } from "../api/accounts.api.js";
import { categoriesApi } from "../api/categories.api.js";
import { paymentMethodsApi } from "../api/paymentMethods.api.js";
import { transactionsApi } from "../api/transactions.api.js";
import { requireAuth } from "../core/guard.js";

requireAuth();

const money = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" });

function fillSelect(id, rows, labelField = "name") {
  const select = document.querySelector(id);
  select.innerHTML = rows.map((row) => `<option value="${row.id}">${row[labelField]}</option>`).join("");
}

async function loadDependencies() {
  const [accounts, categories, methods] = await Promise.all([
    accountsApi.list(),
    categoriesApi.list(),
    paymentMethodsApi.list(),
  ]);

  fillSelect("#accountSelect", accounts);
  fillSelect("#categorySelect", categories);
  fillSelect("#paymentMethodSelect", methods);
}

async function loadTransactions() {
  const rows = await transactionsApi.list();
  const tbody = document.querySelector("#transactionsTbody");
  tbody.innerHTML = rows
    .map(
      (row) =>
        `<tr><td>${row.id}</td><td>${row.account_id}</td><td>${row.category_id}</td><td>${money.format(Number(row.amount || 0))}</td><td>${row.description || ""}</td></tr>`
    )
    .join("");
}

document.querySelector("#transactionForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  await transactionsApi.create({
    account_id: Number(formData.get("account_id")),
    category_id: Number(formData.get("category_id")),
    payment_method_id: Number(formData.get("payment_method_id")),
    amount: Number(formData.get("amount")),
    description: formData.get("description") || "",
  });

  event.currentTarget.reset();
  await Promise.all([loadDependencies(), loadTransactions()]);
});

(async function init() {
  await Promise.all([loadDependencies(), loadTransactions()]);
})();
