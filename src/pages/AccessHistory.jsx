import { ShieldAlert, Eye, EyeOff, AlertTriangle, CheckCircle2, X, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import EmotionCard from "../components/EmotionCard";
import ColorBadge from "../components/ColorBadge";
import { accessAPI, documentsAPI } from "../services/api";

export default function AccessHistory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [documentFilter, setDocumentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [docTitles, setDocTitles] = useState([]);

  useEffect(() => {
    fetchLogs();
    fetchDocTitles();
  }, []);

  async function fetchLogs() {
    setLoading(true); setError("");
    try {
      const { data } = await accessAPI.list();
      setItems(data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load access history.");
    } finally { setLoading(false); }
  }

  async function fetchDocTitles() {
    try {
      const { data } = await documentsAPI.list();
      setDocTitles(data.data.map((d) => d.title));
    } catch { /* non-critical */ }
  }

  async function revoke(id) {
    try {
      const { data } = await accessAPI.revoke(id);
      setItems((list) => list.map((item) => item._id === id ? data.data : item));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to revoke access.");
    }
  }

  const filtered = useMemo(() =>
    items.filter((item) => {
      const byDoc = documentFilter === "All" || item.document === documentFilter;
      const bySt = statusFilter === "All" || item.status === statusFilter;
      return byDoc && bySt;
    }), [documentFilter, items, statusFilter]);

  const activeCount = items.filter((i) => i.status === "Active").length;
  const expiredCount = items.filter((i) => i.status === "Expired").length;
  const revokedCount = items.filter((i) => i.status === "Revoked").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Access History</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Track who accessed your data. Revoke access anytime.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <EmotionCard title="Active Access" description={`${activeCount} current`} emotion="trust" icon={Eye}>
          <p className="text-3xl font-bold">{activeCount}</p>
        </EmotionCard>
        <EmotionCard title="Expired" description={`${expiredCount} auto-expired`} emotion="reminder" icon={AlertTriangle}>
          <p className="text-3xl font-bold">{expiredCount}</p>
        </EmotionCard>
        <EmotionCard title="Revoked" description={`${revokedCount} manually stopped`} emotion="success" icon={CheckCircle2}>
          <p className="text-3xl font-bold">{revokedCount}</p>
        </EmotionCard>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Filter by Document</label>
          <select value={documentFilter} onChange={(e) => setDocumentFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2 dark:text-white focus:outline-none">
            <option>All</option>
            {docTitles.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Filter by Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2 dark:text-white focus:outline-none">
            {["All", "Active", "Expired", "Revoked"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 size={36} className="animate-spin text-indigo-600" /></div>
      ) : (
        <div className="space-y-4">
          {filtered.length > 0 ? filtered.map((item) => {
            const statusColor = getStatusColor(item.status);
            return (
              <div key={item._id} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-md transition">
                <div className={`bg-gradient-to-r ${statusColor.gradient} text-white p-4 flex items-start justify-between`}>
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{getStatusIcon(item.status)}</div>
                    <div>
                      <h3 className="font-semibold">{item.actor}</h3>
                      <p className="text-sm opacity-90">{item.document}</p>
                    </div>
                  </div>
                  <ColorBadge status={item.status === "Active" ? "shared" : "disabled"} size="sm" />
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Date & Time</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1 text-sm">{new Date(item.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Fields Accessed</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1 text-sm">{(item.fields || []).join(", ") || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Expires</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1 text-sm">
                      {item.expiry ? new Date(item.expiry).toLocaleString() : "—"}
                    </p>
                  </div>
                  <div className="flex items-end justify-end gap-2">
                    {item.status === "Active" ? (
                      <button onClick={() => revoke(item._id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-sm font-medium transition">
                        <X size={16} /> Revoke
                      </button>
                    ) : (
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.status}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
              <ShieldAlert size={48} className="mx-auto mb-4 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No access records found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your filters</p>
            </div>
          )}
        </div>
      )}

      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800 p-6">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">📋 Understanding Access History</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>Active:</strong> Current access — shared data can still be viewed</li>
          <li>• <strong>Expired:</strong> Time limit passed — access automatically revoked</li>
          <li>• <strong>Revoked:</strong> Manually stopped — access terminated immediately</li>
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
  return { Active: <Eye size={20} />, Expired: <EyeOff size={20} />, Revoked: <X size={20} /> }[status] || <ShieldAlert size={20} />;
}
