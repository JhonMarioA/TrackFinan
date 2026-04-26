import { accountsApi } from "../api/accounts.api.js";
import { categoriesApi } from "../api/categories.api.js";
import { requireAuth } from "../core/guard.js";
import { hideError, showError } from "../core/ui.js";

requireAuth();

let transactionTypeMap = new Map();
const categoriesById = new Map();
let editingCategoryId = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function closeEditor() {
  editingCategoryId = null;
  document.querySelector("#editCategoryCard")?.classList.add("hidden");
  document.querySelector("#editCategoryForm")?.reset();
}

function openEditor(category) {
  editingCategoryId = category.id;
  const form = document.querySelector("#editCategoryForm");
  form.elements.name.value = category.name || "";
  document.querySelector("#editCategoryCard")?.classList.remove("hidden");
  document.querySelector("#editCategoryCard")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function loadTransactionTypes() {
  const select = document.querySelector("#transactionTypeSelect");
  const data = await accountsApi.transactionTypes();
  transactionTypeMap = new Map(data.map((type) => [type.id, type.name]));
  select.innerHTML = data.map((type) => `<option value="${type.id}">${type.name}</option>`).join("");
}

async function loadCategories() {
  const tbody = document.querySelector("#categoriesTbody");
  const rows = await categoriesApi.list();
  categoriesById.clear();
  rows.forEach((row) => {
    categoriesById.set(row.id, row);
  });

  tbody.innerHTML = rows
    .map(
      (row, index) =>
        `<tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(row.name)}</td>
          <td>${escapeHtml(transactionTypeMap.get(row.transaction_type_id) || row.transaction_type_id)}</td>
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
  hideError("#categoriesError");
  await Promise.all([loadTransactionTypes(), loadCategories()]);
}

document.querySelector("#categoryForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  try {
    const formData = new FormData(form);
    await categoriesApi.create({
      name: formData.get("name"),
      transaction_type_id: Number(formData.get("transaction_type_id")),
    });
    form.reset();
    await refreshView();
  } catch (error) {
    showError("#categoriesError", error.message);
  }
});

document.querySelector("#categoriesTbody")?.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  hideError("#categoriesError");

  try {
    const id = Number(button.dataset.id);

    if (button.dataset.action === "edit") {
      const category = categoriesById.get(id);
      if (!category) {
        showError("#categoriesError", "No se pudo cargar la categoría seleccionada");
        return;
      }
      openEditor(category);
      return;
    }

    if (button.dataset.action === "delete") {
      const confirmed = window.confirm("¿Deseas eliminar esta categoría?");
      if (!confirmed) return;
      await categoriesApi.remove(id);
      if (editingCategoryId === id) {
        closeEditor();
      }
    }

    await refreshView();
  } catch (error) {
    showError("#categoriesError", error.message);
  }
});

document.querySelector("#editCategoryForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;

  if (!editingCategoryId) {
    showError("#categoriesError", "No hay categoría seleccionada para editar");
    return;
  }

  try {
    hideError("#categoriesError");
    const formData = new FormData(form);
    await categoriesApi.update(editingCategoryId, {
      name: String(formData.get("name") || "").trim(),
    });
    closeEditor();
    await refreshView();
  } catch (error) {
    showError("#categoriesError", error.message);
  }
});

document.querySelector("#cancelEditCategoryBtn")?.addEventListener("click", () => {
  closeEditor();
});

(async function init() {
  await refreshView();
})();
