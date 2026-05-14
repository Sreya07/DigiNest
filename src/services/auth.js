import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
const LOCAL_USERS_KEY = "diginest.localUsers";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1200,
});

function getLocalUsers() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLocalUsers(users) {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

function createLocalSession(user) {
  const token = `local-dev-token-${user.id}`;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return { token, user };
}

function isNetworkFailure(error) {
  return error.code === "ERR_NETWORK" || error.code === "ECONNABORTED" || !error.response;
}

function getNameFromEmail(email) {
  return email.split("@")[0] || "User";
}

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (name, email, password) => {
    try {
      const response = await api.post("/register", { name, email, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      if (!isNetworkFailure(error)) throw error;

      const normalizedEmail = email.trim().toLowerCase();
      const users = getLocalUsers();
      const existingUser = users.find((user) => user.email === normalizedEmail);

      if (existingUser) {
        const duplicateError = new Error("This email is already registered locally. Please login instead.");
        duplicateError.response = { data: { error: duplicateError.message } };
        throw duplicateError;
      }

      const user = {
        id: `local-${Date.now()}`,
        name: name.trim(),
        email: normalizedEmail,
        storage: "local development fallback",
      };

      users.push({ ...user, password });
      saveLocalUsers(users);
      return createLocalSession(user);
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      if (!isNetworkFailure(error)) throw error;

      const normalizedEmail = email.trim().toLowerCase();
      const users = getLocalUsers();
      const localUser = users.find((user) => user.email === normalizedEmail && user.password === password);

      if (localUser) {
        const user = { ...localUser };
        delete user.password;
        return createLocalSession(user);
      }

      const user = {
        id: `local-${Date.now()}`,
        name: getNameFromEmail(normalizedEmail),
        email: normalizedEmail,
        storage: "local development fallback",
      };

      users.push({ ...user, password });
      saveLocalUsers(users);
      return createLocalSession(user);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  verifyToken: async () => {
    try {
      const response = await api.post("/verify");
      return response.data;
    } catch (error) {
      if (isNetworkFailure(error)) {
        const user = authService.getCurrentUser();
        return user ? { valid: true, user } : null;
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    }
  },
};
