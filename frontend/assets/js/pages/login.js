import { authApi } from "../api/auth.api.js";
import { loginSession } from "../core/auth.js";
import { redirectIfAuthenticated } from "../core/guard.js";
import { hideError, showError } from "../core/ui.js";

redirectIfAuthenticated();

const form = document.querySelector("#loginForm");
const button = document.querySelector("#submitBtn");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  hideError("#errorBox");
  button.disabled = true;

  const formData = new FormData(form);
  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const result = await authApi.login(payload);
    loginSession(result.token);
    window.location.href = "./dashboard.html";
  } catch (error) {
    showError("#errorBox", error.message);
  } finally {
    button.disabled = false;
  }
});
