import { accountsApi } from "../api/accounts.api.js";
import { categoriesApi } from "../api/categories.api.js";
import { paymentMethodsApi } from "../api/paymentMethods.api.js";
import { transactionsApi } from "../api/transactions.api.js";
import { requireAuth } from "../core/guard.js";
import { hideError, showError } from "../core/ui.js";

requireAuth();

const money = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" });
let deps = { accounts: [], categories: [], methods: [] };
const transactionsById = new Map();
let editingTransactionId = null;

function fillSelect(id, rows, labelField = "name") {
  const select = document.querySelector(id);
  select.innerHTML = rows.map((row) => `<option value="${row.id}">${row[labelField]}</option>`).join("");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function lookupName(list, id) {
  const row = list.find((item) => item.id === id);
  return row ? row.name : id;
}

function closeEditor() {
  editingTransactionId = null;
  document.querySelector("#editTransactionCard")?.classList.add("hidden");
  document.querySelector("#editTransactionForm")?.reset();
}

function openEditor(transaction) {
  editingTransactionId = transaction.id;
  const form = document.querySelector("#editTransactionForm");

  form.elements.account_id.value = String(transaction.account_id);
  form.elements.category_id.value = String(transaction.category_id);
  form.elements.payment_method_id.value = String(transaction.payment_method_id);
  form.elements.amount.value = String(transaction.amount);
  form.elements.description.value = transaction.description || "";

  document.querySelector("#editTransactionCard")?.classList.remove("hidden");
  document.querySelector("#editTransactionCard")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function loadDependencies() {
  const [accounts, categories, methods] = await Promise.all([
    accountsApi.list(),
    categoriesApi.list(),
    paymentMethodsApi.list(),
  ]);

  deps = { accounts, categories, methods };

  fillSelect("#accountSelect", accounts);
  fillSelect("#categorySelect", categories);
  fillSelect("#paymentMethodSelect", methods);
  fillSelect("#editAccountSelect", accounts);
  fillSelect("#editCategorySelect", categories);
  fillSelect("#editPaymentMethodSelect", methods);
}

async function loadTransactions() {
  const rows = await transactionsApi.list();
  transactionsById.clear();
  rows.forEach((row) => {
    transactionsById.set(row.id, row);
  });

  const tbody = document.querySelector("#transactionsTbody");
  tbody.innerHTML = rows
    .map(
      (row, index) =>
        `<tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(lookupName(deps.accounts, row.account_id))}</td>
          <td>${escapeHtml(lookupName(deps.categories, row.category_id))}</td>
          <td>${escapeHtml(lookupName(deps.methods, row.payment_method_id))}</td>
          <td>${money.format(Number(row.amount || 0))}</td>
          <td>${escapeHtml(row.description || "")}</td>
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
  hideError("#transactionsError");
  await Promise.all([loadDependencies(), loadTransactions()]);
}

document.querySelector("#transactionForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  try {
    const formData = new FormData(form);

    await transactionsApi.create({
      account_id: Number(formData.get("account_id")),
      category_id: Number(formData.get("category_id")),
      payment_method_id: Number(formData.get("payment_method_id")),
      amount: Number(formData.get("amount")),
      description: formData.get("description") || "",
    });

    form.reset();
    await refreshView();
  } catch (error) {
    showError("#transactionsError", error.message);
  }
});

document.querySelector("#transactionsTbody")?.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  try {
    hideError("#transactionsError");
    const id = Number(button.dataset.id);

    if (button.dataset.action === "delete") {
      const confirmed = window.confirm("¿Deseas eliminar esta transacción?");
      if (!confirmed) return;
      await transactionsApi.remove(id);
      if (editingTransactionId === id) {
        closeEditor();
      }
      await refreshView();
      return;
    }

    const transaction = transactionsById.get(id);
    if (!transaction) {
      showError("#transactionsError", "No se pudo cargar la transacción seleccionada");
      return;
    }

    openEditor(transaction);
  } catch (error) {
    showError("#transactionsError", error.message);
  }
});

document.querySelector("#editTransactionForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;

  if (!editingTransactionId) {
    showError("#transactionsError", "No hay transacción seleccionada para editar");
    return;
  }

  try {
    hideError("#transactionsError");
    const formData = new FormData(form);

    await transactionsApi.update(editingTransactionId, {
      account_id: Number(formData.get("account_id")),
      category_id: Number(formData.get("category_id")),
      payment_method_id: Number(formData.get("payment_method_id")),
      amount: Number(formData.get("amount")),
      description: formData.get("description") || "",
    });

    closeEditor();
    await refreshView();
  } catch (error) {
    showError("#transactionsError", error.message);
  }
});

document.querySelector("#cancelEditTransactionBtn")?.addEventListener("click", () => {
  closeEditor();
});

(async function init() {
  await refreshView();
})();
