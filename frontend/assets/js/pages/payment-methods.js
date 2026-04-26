import { paymentMethodsApi } from "../api/paymentMethods.api.js";
import { requireAuth } from "../core/guard.js";
import { hideError, showError } from "../core/ui.js";

requireAuth();

const methodsById = new Map();
let editingMethodId = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function closeEditor() {
  editingMethodId = null;
  document.querySelector("#editMethodCard")?.classList.add("hidden");
  document.querySelector("#editMethodForm")?.reset();
}

function openEditor(method) {
  editingMethodId = method.id;
  const form = document.querySelector("#editMethodForm");
  form.elements.name.value = method.name || "";
  document.querySelector("#editMethodCard")?.classList.remove("hidden");
  document.querySelector("#editMethodCard")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function loadMethods() {
  const tbody = document.querySelector("#methodsTbody");
  const rows = await paymentMethodsApi.list();
  methodsById.clear();
  rows.forEach((row) => {
    methodsById.set(row.id, row);
  });

  tbody.innerHTML = rows
    .map(
      (row, index) =>
        `<tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(row.name)}</td>
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

document.querySelector("#methodForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  try {
    hideError("#methodsError");
    const formData = new FormData(form);
    await paymentMethodsApi.create({ name: formData.get("name") });
    form.reset();
    await loadMethods();
  } catch (error) {
    showError("#methodsError", error.message);
  }
});

document.querySelector("#methodsTbody")?.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  try {
    hideError("#methodsError");
    const id = Number(button.dataset.id);

    if (button.dataset.action === "edit") {
      const method = methodsById.get(id);
      if (!method) {
        showError("#methodsError", "No se pudo cargar el método seleccionado");
        return;
      }
      openEditor(method);
      return;
    }

    if (button.dataset.action === "delete") {
      const confirmed = window.confirm("¿Deseas eliminar este método de pago?");
      if (!confirmed) return;
      await paymentMethodsApi.remove(id);
      if (editingMethodId === id) {
        closeEditor();
      }
    }

    await loadMethods();
  } catch (error) {
    showError("#methodsError", error.message);
  }
});

document.querySelector("#editMethodForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;

  if (!editingMethodId) {
    showError("#methodsError", "No hay método seleccionado para editar");
    return;
  }

  try {
    hideError("#methodsError");
    const formData = new FormData(form);
    await paymentMethodsApi.update(editingMethodId, {
      name: String(formData.get("name") || "").trim(),
    });
    closeEditor();
    await loadMethods();
  } catch (error) {
    showError("#methodsError", error.message);
  }
});

document.querySelector("#cancelEditMethodBtn")?.addEventListener("click", () => {
  closeEditor();
});

(async function init() {
  await loadMethods();
})();
