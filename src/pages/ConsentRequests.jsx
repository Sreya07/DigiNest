import { Check, SlidersHorizontal, X, Clock, Plus, Send, FileText } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import EmotionCard from "../components/EmotionCard";
import ColorBadge from "../components/ColorBadge";
import PrivacyMeter from "../components/PrivacyMeter";
import { consentRequests } from "../data/mockData";

export default function ConsentRequests() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "sent" ? "sent" : "received";
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const [requests, setRequests] = useState(consentRequests);
  const [sentRequests] = useState([
    {
      id: 101,
      targetUser: "Meera Sharma",
      purpose: "Family health history check",
      document: "Health Insurance",
      fields: ["Policy Number", "Coverage"],
      duration: "1 week",
      sensitivity: "High",
      status: "Pending",
    },
    {
      id: 102,
      targetUser: "Rohan Sharma",
      purpose: "Property transfer verification",
      document: "Property Document",
      fields: ["Document Number", "Address"],
      duration: "1 month",
      sensitivity: "High",
      status: "Approved",
    }
  ]);

  function updateStatus(id, status) {
    setRequests((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  const pending = requests.filter(r => r.status === "Pending");
  const approved = requests.filter(r => r.status === "Approved");
  const total = requests.length;

  const getSensitivityRisk = (sensitivity) => {
    return sensitivity === "High" ? 75 : sensitivity === "Medium" ? 45 : 20;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Data Requests</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Manage incoming consent requests and view the data you've requested from others.</p>
        </div>
        <Link to="/requests/new" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition shadow-sm">
          <Plus size={18} /> Request Document
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-px">
        <button
          onClick={() => setActiveTab("received")}
          className={`px-5 py-2.5 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "received" 
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400" 
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          Received Requests
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`px-5 py-2.5 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "sent" 
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400" 
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          Sent Requests
        </button>
      </div>

      {activeTab === "received" ? (
        <>
          {/* Summary Cards */}
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

          {/* Requests Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {requests.map((request) => {
              const riskLevel = getSensitivityRisk(request.sensitivity);
              const statusColor = getStatusColor(request.status);

              return (
                <div
                  key={request.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  {/* Header Bar with Emotion Color */}
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

                  {/* Content */}
                  <div className="p-5 space-y-4">
                    {/* Privacy Risk Meter */}
                    <PrivacyMeter
                      riskLevel={riskLevel}
                      title="Data Risk Level"
                      description={`${request.sensitivity} sensitivity - ${request.duration} duration`}
                    />

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <Info label="Document" value={request.document} />
                      <Info label="Duration" value={request.duration} />
                      <div className="col-span-2">
                        <Info label="Fields Requested" value={request.fields.join(", ")} />
                      </div>
                    </div>

                    {/* Action Buttons */}
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
        </>
      ) : (
        /* Sent Requests View */
        <div className="grid gap-6 lg:grid-cols-2">
          {sentRequests.map((request) => {
            const statusColor = getStatusColor(request.status);
            
            return (
              <div
                key={request.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-md transition relative"
              >
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${statusColor.gradient}`}></div>
                
                <div className="p-5 pl-7 space-y-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">To: {request.targetUser}</p>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <FileText size={18} className="text-blue-500" /> {request.document}
                      </h3>
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold shadow-sm ${request.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                      {request.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    "{request.purpose}"
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Info label="Sensitivity" value={request.sensitivity} />
                    <Info label="Duration" value={request.duration} />
                    <div className="col-span-2">
                      <Info label="Fields Requested" value={request.fields.join(", ")} />
                    </div>
                  </div>

                  {request.status === "Pending" && (
                    <div className="pt-2 flex justify-end">
                      <button className="text-sm font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300">
                        Cancel Request
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info Section */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800 p-6 mt-8">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">🛡️ Consent Best Practices</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• Share only minimum required fields</li>
          <li>• Set time limits on access (never permanent)</li>
          <li>• Review active access monthly</li>
          <li>• Revoke immediately if trust is compromised</li>
        </ul>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-3">
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
