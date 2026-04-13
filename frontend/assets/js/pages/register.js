import { authApi } from "../api/auth.api.js";
import { redirectIfAuthenticated } from "../core/guard.js";
import { hideError, showError } from "../core/ui.js";

redirectIfAuthenticated();

const form = document.querySelector("#registerForm");
const button = document.querySelector("#submitBtn");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  hideError("#errorBox");
  button.disabled = true;

  const formData = new FormData(form);
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    await authApi.register(payload);
    window.location.href = "./login.html";
  } catch (error) {
    showError("#errorBox", error.message);
  } finally {
    button.disabled = false;
  }
});
