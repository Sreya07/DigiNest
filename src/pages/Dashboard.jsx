import { Bell, FilePlus2, FileText, HeartHandshake, Share2, ShieldCheck, Users, Brain, Heart, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import DocumentCard from "../components/DocumentCard";
import ReminderCard from "../components/ReminderCard";
import StatCard from "../components/StatCard";
import EmotionCard from "../components/EmotionCard";
import ColorBadge from "../components/ColorBadge";
import PrivacyMeter from "../components/PrivacyMeter";
import { consentRequests, documents, familyMembers, graphData, lifeEvents, reminders } from "../data/mockData";

const actions = [
  ["/documents/add", "Add Document", FilePlus2],
  ["/share/aadhaar", "Share Document", Share2],
  ["/mindmap", "View Mindmap", Brain],
  ["/family", "Add Family Member", Users],
  ["/reminders", "View Reminders", Bell],
];

export default function Dashboard() {
  const pending = consentRequests.filter((item) => item.status === "Pending");
  const activeReminders = reminders.filter((item) => item.status !== "Completed");
  const expiringDocs = documents.filter((doc) => doc.status && doc.status.includes("Expir"));

  return (
    <div className="space-y-6">
      {/* Welcome Card - Blue (Trust) */}
      <EmotionCard
        title="Welcome back, Aarav!"
        description="Your citizen records are organized, protected, and ready. 10 documents total."
        emotion="trust"
        icon={ShieldCheck}
      >
        <p className="text-sm opacity-90">Review pending consent requests, renew important documents, and keep your family timeline up to date.</p>
      </EmotionCard>

      {/* Quick Action Buttons */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {actions.map(([to, label, Icon]) => (
          <Link
            key={label}
            to={to}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white dark:bg-slate-900 px-4 py-3 font-semibold text-slate-800 dark:text-slate-100 shadow-sm hover:shadow-md dark:hover:bg-slate-800 transition"
          >
            <Icon size={18} /> {label}
          </Link>
        ))}
      </div>

      {/* Emotional Color Dashboard Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Blue Card: Trust */}
        <EmotionCard
          title="Document Health Score"
          description="All identity proofs verified and current"
          emotion="trust"
          icon={CheckCircle2}
        >
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Verified Documents</span>
                <span className="font-bold">7/10</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/30">
                <div className="w-7/10 h-full rounded-full bg-white transition-all" />
              </div>
            </div>
          </div>
        </EmotionCard>

        {/* Green Card: Safety */}
        <EmotionCard
          title="Health & Safety Status"
          description="Vaccination records up to date"
          emotion="safety"
          icon={Heart}
        >
          <div className="space-y-3">
            <p className="text-sm opacity-90">✓ Vaccination Record - Active</p>
            <p className="text-sm opacity-90">✓ Health Insurance - Active until 31 Mar 2026</p>
          </div>
        </EmotionCard>

        {/* Yellow Card: Reminders */}
        <EmotionCard
          title="Action Items & Renewals"
          description={`${activeReminders.length} upcoming reminders`}
          emotion="reminder"
          icon={Bell}
        >
          <div className="space-y-2 text-sm opacity-90">
            {activeReminders.slice(0, 2).map((rem) => (
              <p key={rem.id}>• {rem.title}</p>
            ))}
            <Link to="/reminders" className="inline-block mt-2 underline opacity-100 font-medium hover:opacity-80">
              View all →
            </Link>
          </div>
        </EmotionCard>

        {/* Pink Card: Family */}
        <EmotionCard
          title="Family Records"
          description={`${familyMembers.length} family members`}
          emotion="family"
          icon={Users}
        >
          <div className="space-y-2 text-sm opacity-90">
            {familyMembers.slice(0, 2).map((member) => (
              <p key={member.id}>• {member.name} ({member.relation})</p>
            ))}
            <Link to="/family" className="inline-block mt-2 underline opacity-100 font-medium hover:opacity-80">
              Manage family →
            </Link>
          </div>
        </EmotionCard>

        {/* Purple Card: Intelligence/Mindmap */}
        <EmotionCard
          title="Document Intelligence"
          description="Explore connected document clusters"
          emotion="intelligence"
          icon={Brain}
        >
          <div className="space-y-3 text-sm opacity-90">
            <p>View how your documents relate to each other through an AI-powered mindmap.</p>
            <Link
              to="/mindmap"
              className="inline-block mt-2 bg-white/30 hover:bg-white/40 px-3 py-1 rounded font-medium transition"
            >
              Explore Mindmap →
            </Link>
          </div>
        </EmotionCard>

        {/* Red Card: Risk/Urgent */}
        <EmotionCard
          title="Urgent Attention"
          description={`${expiringDocs.length} documents need action`}
          emotion="risk"
          icon={AlertTriangle}
        >
          <div className="space-y-2 text-sm opacity-90">
            {expiringDocs.map((doc) => (
              <p key={doc.id}>• {doc.title} - {doc.status}</p>
            ))}
          </div>
        </EmotionCard>
      </div>

      {/* Privacy Meter and Active Sharing */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-4">Recent Documents</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {documents.slice(0, 4).map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-4">Consent & Access</h2>
            <PrivacyMeter
              riskLevel={pending.length * 25}
              title="Active Access Risk"
              description={pending.length > 0 ? `${pending.length} pending request${pending.length !== 1 ? 's' : ''}` : "All access reviewed"}
            />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-3 uppercase tracking-wide">Pending Consents</h3>
            {pending.length > 0 ? (
              <div className="space-y-3">
                {pending.slice(0, 2).map((consent) => (
                  <div key={consent.id} className="rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30 p-3">
                    <p className="font-medium text-yellow-900 dark:text-yellow-100 text-sm">{consent.requester}</p>
                    <p className="text-xs text-yellow-800 dark:text-yellow-200 mt-1">{consent.purpose}</p>
                    <ColorBadge status="pending" size="sm" className="mt-2" />
                  </div>
                ))}
                {pending.length > 2 && (
                  <Link
                    to="/consents"
                    className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View all {pending.length} requests →
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-400">No pending requests</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-3 uppercase tracking-wide">Upcoming Reminders</h3>
            <div className="space-y-2">
              {activeReminders.slice(0, 3).map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Life Graph Section */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
        <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-4">Life Timeline</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={graphData}>
              <XAxis dataKey="year" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                fill="#93c5fd"
                className="dark:fill-blue-950"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
