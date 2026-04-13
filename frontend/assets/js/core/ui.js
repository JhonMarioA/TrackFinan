export function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}

export function showError(selector, message) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.classList.remove("hidden");
  el.textContent = message;
}

export function hideError(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.classList.add("hidden");
  el.textContent = "";
}

export function renderSimpleTable(tbodySelector, rows, columns) {
  const tbody = document.querySelector(tbodySelector);
  if (!tbody) return;
  tbody.innerHTML = rows
    .map((row) => `<tr>${columns.map((col) => `<td>${row[col] ?? ""}</td>`).join("")}</tr>`)
    .join("");
}
