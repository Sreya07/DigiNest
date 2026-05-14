// Auth helpers — uses JWT stored in localStorage (no Firebase)

export function getToken() {
  return localStorage.getItem("diginest_token");
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem("diginest_user") || "null");
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem("diginest_token");
  localStorage.removeItem("diginest_user");
  window.location.href = "/login";
}
