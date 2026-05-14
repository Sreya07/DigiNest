import {
  AlertTriangle,
  Bell,
  Brain,
  CheckCircle2,
  FilePlus2,
  FileText,
  HeartHandshake,
  KeyRound,
  Share2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import DocumentCard from "../components/DocumentCard";
import PrivacyMeter from "../components/PrivacyMeter";
import ReminderCard from "../components/ReminderCard";
import StatCard from "../components/StatCard";
import { getDashboard } from "../services/api";

const actions = [
  ["/documents/add", "Add Document", FilePlus2],
  ["/share/aadhaar", "Share Document", Share2],
  ["/mindmap", "View Mindmap", Brain],
  ["/family", "Family Access", Users],
  ["/reminders", "Reminders", Bell],
];

export default function Dashboard() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    let mounted = true;

    getDashboard().then((data) => {
      if (mounted) {
        setOverview(data);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const metrics = overview?.metrics || {};
  const healthScore = metrics.documentHealthScore || 0;
  const pending = overview?.pendingConsents || [];
  const activeReminders = overview?.reminders || [];
  const expiringDocs = overview?.expiringDocuments || [];
  const recentDocuments = overview?.recentDocuments || [];
  const graphData = overview?.graphData || [];

  const syncLabel = useMemo(() => (overview ? "Backend synced" : "Loading secure workspace"), [overview]);

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
              <CheckCircle2 size={16} />
              {syncLabel}
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              Welcome back, {overview?.profile?.name || "Aarav"}.
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Your documents, consent requests, renewals, and family records are gathered into one clean control panel.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5 xl:w-[560px]">
            {actions.map(([to, label, Icon]) => (
              <Link
                key={label}
                to={to}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-blue-900 dark:hover:bg-blue-950"
              >
                <Icon size={17} /> {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Document Health" value={`${healthScore}%`} icon={ShieldCheck} tone="blue" />
        <StatCard title="Verified Records" value={`${metrics.verifiedDocuments || 0}/${metrics.totalDocuments || 0}`} icon={FileText} tone="emerald" />
        <StatCard title="Pending Consents" value={metrics.pendingConsents || 0} icon={KeyRound} tone="amber" />
        <StatCard title="Needs Attention" value={metrics.expiringDocuments || 0} icon={AlertTriangle} tone="rose" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Recent Documents</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Most relevant records from your vault.</p>
            </div>
            <Link to="/documents" className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
              View all
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {recentDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Consent & Access</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Pending decisions and live sharing risk.</p>
            <div className="mt-4">
              <PrivacyMeter
                riskLevel={Math.min((pending.length || 0) * 25, 100)}
                title="Active Access Risk"
                description={pending.length > 0 ? `${pending.length} pending request${pending.length !== 1 ? "s" : ""}` : "All access reviewed"}
              />
            </div>
            <div className="mt-4 space-y-3">
              {pending.slice(0, 2).map((consent) => (
                <div key={consent.id} className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
                  <p className="font-medium text-amber-950 dark:text-amber-100">{consent.requester}</p>
                  <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">{consent.purpose}</p>
                </div>
              ))}
              <Link to="/consents" className="inline-flex text-sm font-semibold text-blue-700 hover:underline dark:text-blue-300">
                Review consents
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Upcoming</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Renewals and deadlines.</p>
              </div>
              <HeartHandshake className="text-blue-600 dark:text-blue-300" size={22} />
            </div>
            <div className="mt-4 space-y-2">
              {activeReminders.slice(0, 3).map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Life Timeline</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Year-wise document and event activity.</p>
            </div>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}>
                <XAxis dataKey="year" />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#2563eb" fill="#bfdbfe" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-red-200 bg-red-50 p-5 shadow-sm dark:border-red-900 dark:bg-red-950/30">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white text-red-600 dark:bg-red-950 dark:text-red-200">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-red-950 dark:text-red-100">Action Queue</h2>
              <p className="mt-1 text-sm text-red-800 dark:text-red-200">Documents that need renewal or review.</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {expiringDocs.length > 0 ? (
              expiringDocs.map((doc) => (
                <div key={doc.id} className="rounded-lg bg-white p-3 text-sm dark:bg-slate-900">
                  <p className="font-semibold text-slate-950 dark:text-white">{doc.title}</p>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{doc.status}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-red-800 dark:text-red-200">No urgent renewals right now.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
