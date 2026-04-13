import { isAuthenticated } from "./auth.js";

export function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = "./login.html";
  }
}

export function redirectIfAuthenticated() {
  if (isAuthenticated()) {
    window.location.href = "./dashboard.html";
  }
}
