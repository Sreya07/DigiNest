import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import {
  accessHistory,
  consentRequests,
  documents,
  familyMembers,
  graphData,
  lifeEvents,
  reminders,
} from "./data.js";

const PORT = Number(process.env.PORT || 4000);
const API_PREFIX = "/api";

const state = {
  consents: consentRequests.map((item) => ({ ...item })),
  documents: documents.map((item) => ({ ...item })),
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  response.end(JSON.stringify(payload));
}

function notFound(response) {
  sendJson(response, 404, {
    error: "Not found",
    message: "The requested DigiNest API route does not exist.",
  });
}

async function readJson(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return null;
  }
}

function getDashboardSummary() {
  const pendingConsents = state.consents.filter((item) => item.status === "Pending");
  const activeReminders = reminders.filter((item) => item.status !== "Completed");
  const expiringDocuments = state.documents.filter((doc) => doc.status?.toLowerCase().includes("expir"));
  const verifiedDocuments = state.documents.filter((doc) => doc.status === "Verified");
  const activeShares = accessHistory.filter((item) => item.status === "Active");

  return {
    profile: {
      name: "Aarav Sharma",
      location: "Hyderabad, Telangana",
    },
    metrics: {
      totalDocuments: state.documents.length,
      verifiedDocuments: verifiedDocuments.length,
      pendingConsents: pendingConsents.length,
      activeReminders: activeReminders.length,
      activeShares: activeShares.length,
      expiringDocuments: expiringDocuments.length,
      documentHealthScore: Math.round((verifiedDocuments.length / state.documents.length) * 100),
    },
    recentDocuments: state.documents.slice(0, 4),
    pendingConsents: pendingConsents.slice(0, 3),
    reminders: activeReminders.slice(0, 5),
    expiringDocuments,
    graphData,
  };
}

function listDocuments(url) {
  const query = url.searchParams.get("q")?.trim().toLowerCase() || "";
  const category = url.searchParams.get("category") || "All";

  return state.documents.filter((document) => {
    const matchesCategory = category === "All" || document.category === category;
    const matchesQuery =
      query.length === 0 ||
      document.title.toLowerCase().includes(query) ||
      document.category.toLowerCase().includes(query) ||
      document.number.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });
}

async function handleRoute(request, response) {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host}`);
  const path = url.pathname;

  if (!path.startsWith(API_PREFIX)) {
    notFound(response);
    return;
  }

  if (request.method === "GET" && path === `${API_PREFIX}/health`) {
    sendJson(response, 200, {
      status: "ok",
      service: "DigiNest API",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  if (request.method === "GET" && path === `${API_PREFIX}/dashboard`) {
    sendJson(response, 200, getDashboardSummary());
    return;
  }

  if (request.method === "GET" && path === `${API_PREFIX}/documents`) {
    sendJson(response, 200, listDocuments(url));
    return;
  }

  const documentMatch = path.match(/^\/api\/documents\/([^/]+)$/);
  if (request.method === "GET" && documentMatch) {
    const document = state.documents.find((item) => item.id === documentMatch[1]);
    document ? sendJson(response, 200, document) : notFound(response);
    return;
  }

  if (request.method === "POST" && path === `${API_PREFIX}/documents`) {
    const body = await readJson(request);

    if (!body || !body.title || !body.category) {
      sendJson(response, 400, {
        error: "Invalid document",
        message: "A document title and category are required.",
      });
      return;
    }

    const document = {
      id: body.id || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      title: body.title,
      category: body.category,
      emotion: body.emotion || "trust",
      issueDate: body.issueDate || new Date().toISOString().slice(0, 10),
      expiryDate: body.expiryDate || "Lifetime",
      status: body.status || "Pending review",
      sensitivity: body.sensitivity || "Medium",
      number: body.number || "Pending",
      description: body.description || "Uploaded through DigiNest",
      fields: body.fields || {},
    };

    state.documents.unshift(document);
    sendJson(response, 201, document);
    return;
  }

  if (request.method === "GET" && path === `${API_PREFIX}/consents`) {
    sendJson(response, 200, state.consents);
    return;
  }

  const consentMatch = path.match(/^\/api\/consents\/(\d+)\/status$/);
  if (request.method === "PATCH" && consentMatch) {
    const body = await readJson(request);
    const nextStatus = body?.status;
    const allowedStatuses = new Set(["Pending", "Approved", "Rejected", "Modified"]);

    if (!allowedStatuses.has(nextStatus)) {
      sendJson(response, 400, {
        error: "Invalid status",
        message: "Status must be Pending, Approved, Rejected, or Modified.",
      });
      return;
    }

    const id = Number(consentMatch[1]);
    const consent = state.consents.find((item) => item.id === id);

    if (!consent) {
      notFound(response);
      return;
    }

    consent.status = nextStatus;
    sendJson(response, 200, consent);
    return;
  }

  if (request.method === "GET" && path === `${API_PREFIX}/history`) {
    sendJson(response, 200, accessHistory);
    return;
  }

  if (request.method === "GET" && path === `${API_PREFIX}/reminders`) {
    sendJson(response, 200, reminders);
    return;
  }

  if (request.method === "GET" && path === `${API_PREFIX}/family`) {
    sendJson(response, 200, familyMembers);
    return;
  }

  if (request.method === "GET" && path === `${API_PREFIX}/life-events`) {
    sendJson(response, 200, lifeEvents);
    return;
  }

  if (request.method === "GET" && path === `${API_PREFIX}/life-graph`) {
    sendJson(response, 200, graphData);
    return;
  }

  if (request.method === "POST" && path === `${API_PREFIX}/share-links`) {
    const body = await readJson(request);

    if (!body || !body.documentId || !Array.isArray(body.fields) || body.fields.length === 0) {
      sendJson(response, 400, {
        error: "Invalid share request",
        message: "A document id and at least one shared field are required.",
      });
      return;
    }

    const document = state.documents.find((item) => item.id === body.documentId);

    if (!document) {
      notFound(response);
      return;
    }

    sendJson(response, 201, {
      id: randomUUID(),
      documentId: document.id,
      documentTitle: document.title,
      requester: body.requester || "Verified requester",
      purpose: body.purpose || "Document verification",
      fields: body.fields,
      duration: body.duration || "10 minutes",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      status: "Active",
    });
    return;
  }

  notFound(response);
}

const server = createServer((request, response) => {
  handleRoute(request, response).catch((error) => {
    console.error(error);
    sendJson(response, 500, {
      error: "Internal server error",
      message: "DigiNest API could not complete the request.",
    });
  });
});

server.listen(PORT, () => {
  console.log(`DigiNest API listening on http://localhost:${PORT}${API_PREFIX}`);
});
