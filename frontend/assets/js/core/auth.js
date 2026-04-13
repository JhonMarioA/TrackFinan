import { clearToken, getToken, saveToken } from "./storage.js";

export function isAuthenticated() {
  return Boolean(getToken());
}

export function loginSession(token) {
  saveToken(token);
}

export function logoutSession() {
  clearToken();
  window.location.href = "./login.html";
}
