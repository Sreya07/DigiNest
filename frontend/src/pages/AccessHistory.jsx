import { ShieldAlert, Eye, EyeOff, AlertTriangle, CheckCircle2, X } from "lucide-react";
import { useMemo, useState } from "react";
import EmotionCard from "../components/EmotionCard";
import ColorBadge from "../components/ColorBadge";
import { accessHistory, documents } from "../data/mockData";

export default function AccessHistory() {
  const [items, setItems] = useState(accessHistory);
  const [documentFilter, setDocumentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const byDoc = documentFilter === "All" || item.document === documentFilter;
      const byStatus = statusFilter === "All" || item.status === statusFilter;
      return byDoc && byStatus;
    });
  }, [documentFilter, items, statusFilter]);

  const activeCount = items.filter(i => i.status === "Active").length;
  const expiredCount = items.filter(i => i.status === "Expired").length;
  const revokedCount = items.filter(i => i.status === "Revoked").length;

  function revoke(id) {
    setItems((list) => list.map((item) => (item.id === id ? { ...item, status: "Revoked" } : item)));
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Access History</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Track who accessed your data and when. You maintain full control to revoke access.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <EmotionCard
          title="Active Access"
          description={`${activeCount} current access`}
          emotion="trust"
          icon={Eye}
        >
          <p className="text-3xl font-bold">{activeCount}</p>
        </EmotionCard>
        <EmotionCard
          title="Expired"
          description={`${expiredCount} automatically expired`}
          emotion="reminder"
          icon={AlertTriangle}
        >
          <p className="text-3xl font-bold">{expiredCount}</p>
        </EmotionCard>
        <EmotionCard
          title="Revoked"
          description={`${revokedCount} manually stopped`}
          emotion="success"
          icon={CheckCircle2}
        >
          <p className="text-3xl font-bold">{revokedCount}</p>
        </EmotionCard>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Filter by Document</label>
          <select
            value={documentFilter}
            onChange={(event) => setDocumentFilter(event.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All</option>
            {documents.map((document) => (
              <option key={document.id}>{document.title}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Filter by Status</label>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {["All", "Active", "Expired", "Revoked"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((item) => {
            const statusColor = getStatusColor(item.status);
            const statusIcon = getStatusIcon(item.status);

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                <div className={`bg-gradient-to-r ${statusColor.gradient} text-white p-4 flex items-start justify-between`}>
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="mt-1">{statusIcon}</div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">{item.actor}</h3>
                      <p className="text-sm opacity-90">{item.document}</p>
                    </div>
                  </div>
                  <ColorBadge
                    status={
                      item.status === "Active" ? "shared" :
                      item.status === "Expired" ? "disabled" :
                      "disabled"
                    }
                    size="sm"
                    className="text-white shrink-0"
                  />
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Date & Time</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1">{item.dateTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Fields Accessed</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1 text-sm">{item.fields.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Duration</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1">
                      {calculateDuration(item.dateTime, item.expiry)}
                    </p>
                  </div>
                  <div className="flex items-end justify-end gap-2 sm:col-span-2 lg:col-span-1">
                    {item.status === "Active" && (
                      <button
                        onClick={() => revoke(item.id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-sm font-medium transition"
                      >
                        <X size={16} /> Revoke
                      </button>
                    )}
                    {item.status !== "Active" && (
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.status}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-lg border-2 border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
            <ShieldAlert size={48} className="mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No access records found</h3>
            <p className="text-slate-600 dark:text-slate-400">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/30">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Understanding Access History</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li><strong>Active:</strong> Current access - shared data can still be viewed.</li>
          <li><strong>Expired:</strong> Time limit passed - access automatically revoked.</li>
          <li><strong>Revoked:</strong> Manually stopped - access terminated immediately.</li>
          <li>Review regularly to ensure only necessary parties have access.</li>
        </ul>
      </div>
    </div>
  );
}

function getStatusColor(status) {
  return {
    Active: { gradient: "from-emerald-500 to-green-400" },
    Expired: { gradient: "from-slate-600 to-gray-500" },
    Revoked: { gradient: "from-red-600 to-rose-500" },
  }[status] || { gradient: "from-slate-600 to-gray-500" };
}

function getStatusIcon(status) {
  return {
    Active: <Eye size={20} />,
    Expired: <EyeOff size={20} />,
    Revoked: <X size={20} />,
  }[status] || <ShieldAlert size={20} />;
}

function calculateDuration(start, end) {
  // Simple duration calculation for mock data
  try {
    const startDate = new Date(start.split(" ")[0]);
    const endDate = new Date(end.split(" ")[0]);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return `${days} days`;
  } catch {
    return "1 day";
  }
}
