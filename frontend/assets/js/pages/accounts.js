import { accountsApi } from "../api/accounts.api.js";
import { requireAuth } from "../core/guard.js";

requireAuth();

async function loadTypes() {
  const select = document.querySelector("#typeSelect");
  const data = await accountsApi.types();
  select.innerHTML = data.map((type) => `<option value="${type.id}">${type.name}</option>`).join("");
}

async function loadAccounts() {
  const tbody = document.querySelector("#accountsTbody");
  const rows = await accountsApi.list();
  tbody.innerHTML = rows
    .map((row) => `<tr><td>${row.id}</td><td>${row.name}</td><td>${row.type_id}</td></tr>`)
    .join("");
}

document.querySelector("#accountForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  await accountsApi.create({
    name: formData.get("name"),
    type_id: Number(formData.get("type_id")),
  });
  event.currentTarget.reset();
  await loadAccounts();
});

(async function init() {
  await Promise.all([loadTypes(), loadAccounts()]);
})();
