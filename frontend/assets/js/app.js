import { logoutSession } from "./core/auth.js";

const logoutButton = document.querySelector("#logoutBtn");
if (logoutButton) {
  logoutButton.addEventListener("click", logoutSession);
}

const links = document.querySelectorAll(".nav-link");
const current = window.location.pathname.split("/").pop();
links.forEach((link) => {
  const href = link.getAttribute("href");
  if (href === current) {
    link.classList.add("active");
  }
});
