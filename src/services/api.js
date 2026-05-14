import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach JWT token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("diginest_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally — clear session and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("diginest_token");
      localStorage.removeItem("diginest_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ── Auth ─────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  me: () => api.get("/auth/me"),
  updateProfile: (data) => api.patch("/auth/me", data),
};

// ── Documents ────────────────────────────────────────────────────────
export const documentsAPI = {
  list: (params) => api.get("/documents", { params }),
  get: (id) => api.get(`/documents/${id}`),
  create: (formData) =>
    api.post("/documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) => api.patch(`/documents/${id}`, data),
  delete: (id) => api.delete(`/documents/${id}`),

  // BUG FIX: The old fileUrl returned a bare URL without auth token.
  // <img src={url}> and <a href={url}> send NO Authorization header,
  // so the backend protect middleware rejected every file request with 401.
  // Fix: append the JWT as a ?token= query param so the backend can
  // verify it even for direct browser requests.
  fileUrl: (id) => {
    const token = localStorage.getItem("diginest_token") || "";
    return `${BASE_URL}/documents/${id}/file?token=${encodeURIComponent(token)}`;
  },
};

// ── Consents ─────────────────────────────────────────────────────────
export const consentsAPI = {
  list: () => api.get("/consents"),
  create: (data) => api.post("/consents", data),
  updateStatus: (id, status) => api.patch(`/consents/${id}`, { status }),
  delete: (id) => api.delete(`/consents/${id}`),
};

// ── Access History ───────────────────────────────────────────────────
export const accessAPI = {
  list: (params) => api.get("/access", { params }),
  log: (data) => api.post("/access", data),
  revoke: (id) => api.patch(`/access/${id}/revoke`),
};

// ── Reminders ────────────────────────────────────────────────────────
export const remindersAPI = {
  list: () => api.get("/reminders"),
  create: (data) => api.post("/reminders", data),
  update: (id, data) => api.patch(`/reminders/${id}`, data),
  delete: (id) => api.delete(`/reminders/${id}`),
};

// ── Family ───────────────────────────────────────────────────────────
export const familyAPI = {
  list: () => api.get("/family"),
  add: (data) => api.post("/family", data),
  update: (id, data) => api.patch(`/family/${id}`, data),
  remove: (id) => api.delete(`/family/${id}`),
};

// ── Life Events ──────────────────────────────────────────────────────
export const lifeEventsAPI = {
  list: () => api.get("/life-events"),
  create: (data) => api.post("/life-events", data),
  update: (id, data) => api.patch(`/life-events/${id}`, data),
  delete: (id) => api.delete(`/life-events/${id}`),
};

export default api;