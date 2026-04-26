import { budgetsApi } from "../api/budgets.api.js";
import { categoriesApi } from "../api/categories.api.js";
import { requireAuth } from "../core/guard.js";
import { hideError, showError } from "../core/ui.js";

requireAuth();

const money = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" });
let categories = [];
const budgetsById = new Map();
let editingBudgetId = null;

function closeEditor() {
  editingBudgetId = null;
  document.querySelector("#editBudgetCard")?.classList.add("hidden");
  document.querySelector("#editBudgetForm")?.reset();
}

function openEditor(budget) {
  editingBudgetId = budget.id;
  const form = document.querySelector("#editBudgetForm");
  form.elements.amount.value = String(budget.amount);
  document.querySelector("#editBudgetCard")?.classList.remove("hidden");
  document.querySelector("#editBudgetCard")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function loadCategories() {
  const select = document.querySelector("#budgetCategorySelect");
  categories = await categoriesApi.list();
  select.innerHTML = categories.map((row) => `<option value="${row.id}">${row.name}</option>`).join("");
}

function categoryName(categoryId) {
  const row = categories.find((item) => item.id === categoryId);
  return row ? row.name : categoryId;
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

async function loadBudgets() {
  const rows = await budgetsApi.list();
  budgetsById.clear();
  rows.forEach((row) => {
    budgetsById.set(row.id, row);
  });

  const tbody = document.querySelector("#budgetsTbody");
  tbody.innerHTML = rows
    .map(
      (row, index) =>
        `<tr>
          <td>${index + 1}</td>
          <td>${categoryName(row.category_id)}</td>
          <td>${money.format(Number(row.amount || 0))}</td>
          <td>${row.month}</td>
          <td>${row.year}</td>
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
  hideError("#budgetsError");
  await Promise.all([loadCategories(), loadStatus(), loadBudgets()]);
}

document.querySelector("#budgetForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  try {
    const formData = new FormData(form);

    await budgetsApi.create({
      category_id: Number(formData.get("category_id")),
      amount: Number(formData.get("amount")),
      month: Number(formData.get("month")),
      year: Number(formData.get("year")),
    });

    form.reset();
    await refreshView();
  } catch (error) {
    showError("#budgetsError", error.message);
  }
});

document.querySelector("#budgetsTbody")?.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  try {
    hideError("#budgetsError");
    const id = Number(button.dataset.id);

    if (button.dataset.action === "delete") {
      const confirmed = window.confirm("¿Deseas eliminar este presupuesto?");
      if (!confirmed) return;
      await budgetsApi.remove(id);
      if (editingBudgetId === id) {
        closeEditor();
      }
      await refreshView();
      return;
    }

    const budget = budgetsById.get(id);
    if (!budget) {
      showError("#budgetsError", "No se pudo cargar el presupuesto seleccionado");
      return;
    }

    openEditor(budget);
  } catch (error) {
    showError("#budgetsError", error.message);
  }
});

document.querySelector("#editBudgetForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;

  if (!editingBudgetId) {
    showError("#budgetsError", "No hay presupuesto seleccionado para editar");
    return;
  }

  try {
    hideError("#budgetsError");
    const formData = new FormData(form);
    const amount = Number(formData.get("amount"));

    if (!Number.isFinite(amount) || amount <= 0) {
      showError("#budgetsError", "El monto debe ser un número mayor a 0");
      return;
    }

    await budgetsApi.update(editingBudgetId, { amount });
    closeEditor();
    await refreshView();
  } catch (error) {
    showError("#budgetsError", error.message);
  }
});

document.querySelector("#cancelEditBudgetBtn")?.addEventListener("click", () => {
  closeEditor();
});

(async function init() {
  await refreshView();
})();
