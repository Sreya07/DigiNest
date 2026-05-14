import { Check, Clock, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import EmotionCard from "../components/EmotionCard";
import ColorBadge from "../components/ColorBadge";
import PrivacyMeter from "../components/PrivacyMeter";
import { consentRequests } from "../data/mockData";
import { listConsents, updateConsentStatus } from "../services/api";

export default function ConsentRequests() {
  const [requests, setRequests] = useState(consentRequests);

  useEffect(() => {
    let mounted = true;

    listConsents().then((items) => {
      if (mounted) {
        setRequests(items);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  function updateStatus(id, status) {
    setRequests((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
    updateConsentStatus(id, status).then((updated) => {
      if (updated) {
        setRequests((items) => items.map((item) => (item.id === id ? updated : item)));
      }
    });
  }

  const pending = requests.filter(r => r.status === "Pending");
  const approved = requests.filter(r => r.status === "Approved");
  const total = requests.length;

  const getSensitivityRisk = (sensitivity) => {
    return sensitivity === "High" ? 75 : sensitivity === "Medium" ? 45 : 20;
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Consent Requests</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Review, approve, or narrow data access requests. You control which fields get shared.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <EmotionCard
          title="Pending Review"
          description={`${pending.length} await your decision`}
          emotion="reminder"
          icon={Clock}
        >
          <p className="text-3xl font-bold">{pending.length}</p>
        </EmotionCard>
        <EmotionCard
          title="Active Access"
          description={`${approved.length} approved access`}
          emotion="trust"
          icon={Check}
        >
          <p className="text-3xl font-bold">{approved.length}</p>
        </EmotionCard>
        <EmotionCard
          title="Total Requests"
          description={`${total} all-time requests`}
          emotion="professional"
        >
          <p className="text-3xl font-bold">{total}</p>
        </EmotionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {requests.map((request) => {
          const riskLevel = getSensitivityRisk(request.sensitivity);
          const statusColor = getStatusColor(request.status);

          return (
            <div
              key={request.id}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <div className={`bg-gradient-to-r ${statusColor.gradient} text-white p-5 flex items-start justify-between`}>
                <div className="flex-1">
                  <h2 className="text-lg font-bold">{request.requester}</h2>
                  <p className="text-sm opacity-90 mt-1">{request.purpose}</p>
                </div>
                <ColorBadge
                  status={
                    request.status === "Approved" ? "verified" :
                    request.status === "Pending" ? "pending" :
                    "disabled"
                  }
                  size="sm"
                  className="text-white"
                />
              </div>

              <div className="p-5 space-y-4">
                <PrivacyMeter
                  riskLevel={riskLevel}
                  title="Data Risk Level"
                  description={`${request.sensitivity} sensitivity - ${request.duration} duration`}
                />

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Info label="Document" value={request.document} />
                  <Info label="Duration" value={request.duration} />
                  <div className="col-span-2">
                    <Info label="Fields Requested" value={request.fields.join(", ")} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-3">
                  <button
                    onClick={() => updateStatus(request.id, "Approved")}
                    disabled={request.status === "Approved"}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 font-medium text-white transition"
                  >
                    <Check size={16} /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(request.id, "Rejected")}
                    disabled={request.status === "Rejected"}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 font-medium text-white transition"
                  >
                    <X size={16} /> Reject
                  </button>
                  <button
                    onClick={() => updateStatus(request.id, "Modified")}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 px-4 py-2 font-medium text-blue-700 dark:text-blue-200 transition"
                  >
                    <SlidersHorizontal size={16} /> Modify
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/30">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Consent Best Practices</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>Share only minimum required fields.</li>
          <li>Set time limits on access instead of permanent sharing.</li>
          <li>Review active access monthly.</li>
          <li>Revoke immediately if trust is compromised.</li>
        </ul>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="mt-1 font-medium text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

function getStatusColor(status) {
  return {
    Pending: { gradient: "from-yellow-400 to-amber-400", dot: "bg-yellow-500" },
    Approved: { gradient: "from-emerald-500 to-green-400", dot: "bg-emerald-500" },
    Rejected: { gradient: "from-red-600 to-rose-500", dot: "bg-red-500" },
    Modified: { gradient: "from-blue-600 to-cyan-500", dot: "bg-blue-500" },
    Expired: { gradient: "from-slate-600 to-gray-500", dot: "bg-slate-500" },
  }[status] || { gradient: "from-slate-600 to-gray-500", dot: "bg-slate-500" };
}
