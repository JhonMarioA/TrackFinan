import { accountsApi } from "../api/accounts.api.js";
import { categoriesApi } from "../api/categories.api.js";
import { requireAuth } from "../core/guard.js";

requireAuth();

async function loadTransactionTypes() {
  const select = document.querySelector("#transactionTypeSelect");
  const data = await accountsApi.transactionTypes();
  select.innerHTML = data.map((type) => `<option value="${type.id}">${type.name}</option>`).join("");
}

async function loadCategories() {
  const tbody = document.querySelector("#categoriesTbody");
  const rows = await categoriesApi.list();
  tbody.innerHTML = rows
    .map((row) => `<tr><td>${row.id}</td><td>${row.name}</td><td>${row.transaction_type_id}</td></tr>`)
    .join("");
}

document.querySelector("#categoryForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  await categoriesApi.create({
    name: formData.get("name"),
    transaction_type_id: Number(formData.get("transaction_type_id")),
  });
  event.currentTarget.reset();
  await loadCategories();
});

(async function init() {
  await Promise.all([loadTransactionTypes(), loadCategories()]);
})();
