import { accountsApi } from "../api/accounts.api.js";
import { requireAuth } from "../core/guard.js";
import { hideError, showError } from "../core/ui.js";

requireAuth();

let typeMap = new Map();
const accountsById = new Map();
let editingAccountId = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function closeEditor() {
  editingAccountId = null;
  document.querySelector("#editAccountCard")?.classList.add("hidden");
  document.querySelector("#editAccountForm")?.reset();
}

function openEditor(account) {
  editingAccountId = account.id;
  const form = document.querySelector("#editAccountForm");
  form.elements.name.value = account.name || "";
  document.querySelector("#editAccountCard")?.classList.remove("hidden");
  document.querySelector("#editAccountCard")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function loadTypes() {
  const select = document.querySelector("#typeSelect");
  const data = await accountsApi.types();
  typeMap = new Map(data.map((type) => [type.id, type.name]));
  select.innerHTML = data.map((type) => `<option value="${type.id}">${type.name}</option>`).join("");
}

async function loadAccounts() {
  const tbody = document.querySelector("#accountsTbody");
  const rows = await accountsApi.list();
  accountsById.clear();
  rows.forEach((row) => {
    accountsById.set(row.id, row);
  });

  tbody.innerHTML = rows
    .map(
      (row, index) =>
        `<tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(row.name)}</td>
          <td>${escapeHtml(typeMap.get(row.type_id) || row.type_id)}</td>
          <td>
            <div class="table-actions">
              <button class="btn btn-ghost" type="button" data-action="edit" data-id="${row.id}">Editar</button>
              <button class="btn btn-danger" type="button" data-action="delete" data-id="${row.id}">Eliminar</button>
            </div>
          </td>
        </tr>`
    )
    .join("");
}

async function refreshView() {
  hideError("#accountsError");
  await Promise.all([loadTypes(), loadAccounts()]);
}

document.querySelector("#accountForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  try {
    const formData = new FormData(form);
    await accountsApi.create({
      name: formData.get("name"),
      type_id: Number(formData.get("type_id")),
    });
    form.reset();
    await refreshView();
  } catch (error) {
    showError("#accountsError", error.message);
  }
});

document.querySelector("#accountsTbody")?.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  hideError("#accountsError");

  try {
    const id = Number(button.dataset.id);

    if (button.dataset.action === "edit") {
      const account = accountsById.get(id);
      if (!account) {
        showError("#accountsError", "No se pudo cargar la cuenta seleccionada");
        return;
      }
      openEditor(account);
      return;
    }

    if (button.dataset.action === "delete") {
      const confirmed = window.confirm("¿Deseas eliminar esta cuenta?");
      if (!confirmed) return;
      await accountsApi.remove(id);
      if (editingAccountId === id) {
        closeEditor();
      }
    }

    await refreshView();
  } catch (error) {
    showError("#accountsError", error.message);
  }
});

document.querySelector("#editAccountForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;

  if (!editingAccountId) {
    showError("#accountsError", "No hay cuenta seleccionada para editar");
    return;
  }

  try {
    hideError("#accountsError");
    const formData = new FormData(form);
    await accountsApi.update(editingAccountId, {
      name: String(formData.get("name") || "").trim(),
    });
    closeEditor();
    await refreshView();
  } catch (error) {
    showError("#accountsError", error.message);
  }
});

document.querySelector("#cancelEditAccountBtn")?.addEventListener("click", () => {
  closeEditor();
});

(async function init() {
  await refreshView();
})();
