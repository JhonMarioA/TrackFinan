import { paymentMethodsApi } from "../api/paymentMethods.api.js";
import { requireAuth } from "../core/guard.js";

requireAuth();

async function loadMethods() {
  const tbody = document.querySelector("#methodsTbody");
  const rows = await paymentMethodsApi.list();
  tbody.innerHTML = rows.map((row) => `<tr><td>${row.id}</td><td>${row.name}</td></tr>`).join("");
}

document.querySelector("#methodForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  await paymentMethodsApi.create({ name: formData.get("name") });
  event.currentTarget.reset();
  await loadMethods();
});

(async function init() {
  await loadMethods();
})();
