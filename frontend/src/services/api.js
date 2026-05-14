import {
  accessHistory,
  consentRequests,
  documents,
  familyMembers,
  graphData,
  lifeEvents,
  reminders,
} from "../data/mockData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const localDashboard = {
  profile: {
    name: "Aarav Sharma",
    location: "Hyderabad, Telangana",
  },
  metrics: {
    totalDocuments: documents.length,
    verifiedDocuments: documents.filter((doc) => doc.status === "Verified").length,
    pendingConsents: consentRequests.filter((item) => item.status === "Pending").length,
    activeReminders: reminders.filter((item) => item.status !== "Completed").length,
    activeShares: accessHistory.filter((item) => item.status === "Active").length,
    expiringDocuments: documents.filter((doc) => doc.status?.toLowerCase().includes("expir")).length,
    documentHealthScore: Math.round(
      (documents.filter((doc) => doc.status === "Verified").length / documents.length) * 100,
    ),
  },
  recentDocuments: documents.slice(0, 4),
  pendingConsents: consentRequests.filter((item) => item.status === "Pending").slice(0, 3),
  reminders: reminders.filter((item) => item.status !== "Completed").slice(0, 5),
  expiringDocuments: documents.filter((doc) => doc.status?.toLowerCase().includes("expir")),
  graphData,
};

async function getJson(path, fallback) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`);

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    return await response.json();
  } catch {
    return fallback;
  }
}

async function sendJson(path, method, body, fallback) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    return await response.json();
  } catch {
    return fallback;
  }
}

export function getDashboard() {
  return getJson("/dashboard", localDashboard);
}

export function listDocuments({ category = "All", query = "" } = {}) {
  const params = new URLSearchParams();
  params.set("category", category);

  if (query) {
    params.set("q", query);
  }

  const fallback = documents.filter((document) => {
    const matchesCategory = category === "All" || document.category === category;
    const matchesQuery =
      query.length === 0 ||
      document.title.toLowerCase().includes(query.toLowerCase()) ||
      document.category.toLowerCase().includes(query.toLowerCase()) ||
      document.number.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return getJson(`/documents?${params.toString()}`, fallback);
}

export function listConsents() {
  return getJson("/consents", consentRequests);
}

export function updateConsentStatus(id, status) {
  const fallback = consentRequests.find((item) => item.id === id);
  return sendJson(`/consents/${id}/status`, "PATCH", { status }, fallback ? { ...fallback, status } : null);
}

export function createDocument(payload) {
  const fallback = {
    id: payload.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `local-${Date.now()}`,
    title: payload.title || "Untitled document",
    category: payload.category || "Others",
    emotion: payload.emotion || "trust",
    issueDate: payload.issueDate || new Date().toISOString().slice(0, 10),
    expiryDate: payload.expiryDate || "Lifetime",
    status: "Pending review",
    sensitivity: payload.sensitivity || "Medium",
    number: payload.number || "Pending",
    description: "Uploaded through DigiNest",
    fields: payload.fields || {},
  };

  return sendJson("/documents", "POST", payload, fallback);
}

export function createShareLink(payload) {
  const fallback = {
    id: `local-${Date.now()}`,
    documentId: payload.documentId,
    requester: payload.requester,
    purpose: payload.purpose,
    fields: payload.fields,
    duration: payload.duration,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    status: "Active",
  };

  return sendJson("/share-links", "POST", payload, fallback);
}

export const localData = {
  accessHistory,
  consentRequests,
  documents,
  familyMembers,
  graphData,
  lifeEvents,
  reminders,
};
