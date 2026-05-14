import { Bell, FilePlus2, FileText, Share2, ShieldCheck, Users, Brain, Heart, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import DocumentCard from "../components/DocumentCard";
import ReminderCard from "../components/ReminderCard";
import EmotionCard from "../components/EmotionCard";
import ColorBadge from "../components/ColorBadge";
import PrivacyMeter from "../components/PrivacyMeter";
import { documentsAPI, consentsAPI, remindersAPI, familyAPI } from "../services/api";

const actions = [
  ["/documents/add", "Add Document", FilePlus2],
  ["/documents", "My Documents", FileText],
  ["/mindmap", "View Mindmap", Brain],
  ["/family", "Family Group", Users],
  ["/reminders", "Reminders", Bell],
];

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [consents, setConsents] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [family, setFamily] = useState([]);
  const [loading, setLoading] = useState(true);

  // Read user from localStorage
  const user = JSON.parse(localStorage.getItem("diginest_user") || "{}");

  useEffect(() => {
    async function loadAll() {
      try {
        const [docsRes, consentsRes, remindersRes, familyRes] = await Promise.allSettled([
          documentsAPI.list(),
          consentsAPI.list(),
          remindersAPI.list(),
          familyAPI.list(),
        ]);
        if (docsRes.status === "fulfilled") setDocuments(docsRes.value.data.data);
        if (consentsRes.status === "fulfilled") setConsents(consentsRes.value.data.data);
        if (remindersRes.status === "fulfilled") setReminders(remindersRes.value.data.data);
        if (familyRes.status === "fulfilled") setFamily(familyRes.value.data.data);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  const pending = consents.filter((c) => c.status === "Pending");
  const activeReminders = reminders.filter((r) => r.status !== "Completed");
  const expiringDocs = documents.filter((d) => d.status && d.status.includes("Expir"));
  const verifiedDocs = documents.filter((d) => d.status === "Verified");

  // Build simple life graph data from documents by year
  const graphData = Object.values(
    documents.reduce((acc, doc) => {
      const year = doc.issueDate ? doc.issueDate.substring(0, 4) : "Unknown";
      if (!acc[year]) acc[year] = { year, count: 0 };
      acc[year].count += 1;
      return acc;
    }, {})
  ).sort((a, b) => a.year.localeCompare(b.year));

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 size={40} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <EmotionCard
        title={`Welcome back, ${user.name || "User"}!`}
        description={`Your citizen records — ${documents.length} document${documents.length !== 1 ? "s" : ""} secured.`}
        emotion="trust"
        icon={ShieldCheck}
      >
        <p className="text-sm opacity-90">Review pending consent requests, renew expiring documents, and keep your family timeline up to date.</p>
      </EmotionCard>

      {/* Quick Actions */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {actions.map(([to, label, Icon]) => (
          <Link key={label} to={to}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white dark:bg-slate-900 px-4 py-3 font-semibold text-slate-800 dark:text-slate-100 shadow-sm hover:shadow-md dark:hover:bg-slate-800 transition">
            <Icon size={18} /> {label}
          </Link>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <EmotionCard title="Document Health Score" description="Verified documents in your vault" emotion="trust" icon={CheckCircle2}>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Verified</span>
              <span className="font-bold">{verifiedDocs.length}/{documents.length}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/30">
              <div className="h-full rounded-full bg-white transition-all"
                style={{ width: documents.length ? `${(verifiedDocs.length / documents.length) * 100}%` : "0%" }} />
            </div>
          </div>
        </EmotionCard>

        <EmotionCard title="Family Records" description={`${family.length} family member${family.length !== 1 ? "s" : ""}`} emotion="family" icon={Users}>
          <div className="space-y-2 text-sm opacity-90">
            {family.slice(0, 2).map((m) => (
              <p key={m._id}>• {m.name} ({m.relation})</p>
            ))}
            <Link to="/family" className="inline-block mt-2 underline opacity-100 font-medium hover:opacity-80">Manage family →</Link>
          </div>
        </EmotionCard>

        <EmotionCard title="Action Items & Renewals" description={`${activeReminders.length} upcoming reminder${activeReminders.length !== 1 ? "s" : ""}`} emotion="reminder" icon={Bell}>
          <div className="space-y-2 text-sm opacity-90">
            {activeReminders.slice(0, 2).map((r) => (
              <p key={r._id}>• {r.title}</p>
            ))}
            <Link to="/reminders" className="inline-block mt-2 underline opacity-100 font-medium hover:opacity-80">View all →</Link>
          </div>
        </EmotionCard>

        <EmotionCard title="Document Intelligence" description="Explore connected document clusters" emotion="intelligence" icon={Brain}>
          <div className="space-y-3 text-sm opacity-90">
            <p>View how your documents relate through an AI-powered mindmap.</p>
            <Link to="/mindmap" className="inline-block mt-2 bg-white/30 hover:bg-white/40 px-3 py-1 rounded font-medium transition">Explore Mindmap →</Link>
          </div>
        </EmotionCard>

        <EmotionCard title="Health & Safety" description="Keep family health records current" emotion="safety" icon={Heart}>
          <div className="space-y-2 text-sm opacity-90">
            {documents.filter((d) => d.category === "Health").slice(0, 2).map((d) => (
              <p key={d._id}>✓ {d.title} — {d.status}</p>
            ))}
            {documents.filter((d) => d.category === "Health").length === 0 && (
              <p>No health documents yet. <Link to="/documents/add" className="underline">Add one →</Link></p>
            )}
          </div>
        </EmotionCard>

        <EmotionCard title="Urgent Attention" description={`${expiringDocs.length} document${expiringDocs.length !== 1 ? "s" : ""} need action`} emotion="risk" icon={AlertTriangle}>
          <div className="space-y-2 text-sm opacity-90">
            {expiringDocs.length > 0 ? expiringDocs.map((d) => (
              <p key={d._id}>• {d.title} — {d.status}</p>
            )) : <p>✓ All documents are current</p>}
          </div>
        </EmotionCard>
      </div>

      {/* Recent Docs + Consent sidebar */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-4">Recent Documents</h2>
          {documents.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {documents.slice(0, 4).map((doc) => (
                <DocumentCard key={doc._id} document={{ ...doc, id: doc._id }} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
              <p className="text-slate-500 dark:text-slate-400 mb-4">No documents yet.</p>
              <Link to="/documents/add" className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700">Add First Document</Link>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-4">Consent & Access</h2>
            <PrivacyMeter
              riskLevel={pending.length * 25}
              title="Active Access Risk"
              description={pending.length > 0 ? `${pending.length} pending request${pending.length !== 1 ? "s" : ""}` : "All access reviewed"}
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-3 uppercase tracking-wide">Pending Consents</h3>
            {pending.length > 0 ? (
              <div className="space-y-3">
                {pending.slice(0, 2).map((consent) => (
                  <div key={consent._id} className="rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30 p-3">
                    <p className="font-medium text-yellow-900 dark:text-yellow-100 text-sm">{consent.requester}</p>
                    <p className="text-xs text-yellow-800 dark:text-yellow-200 mt-1">{consent.purpose}</p>
                    <ColorBadge status="pending" size="sm" className="mt-2" />
                  </div>
                ))}
                <Link to="/consents" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  View all {pending.length} requests →
                </Link>
              </div>
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-400">No pending requests</p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-3 uppercase tracking-wide">Upcoming Reminders</h3>
            <div className="space-y-2">
              {activeReminders.slice(0, 3).map((r) => (
                <ReminderCard key={r._id} reminder={{ ...r, id: r._id }} />
              ))}
              {activeReminders.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">No active reminders</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Life Graph */}
      {graphData.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-4">Document Timeline</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}>
                <XAxis dataKey="year" />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="#93c5fd" className="dark:fill-blue-950" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
