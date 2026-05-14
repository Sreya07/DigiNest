import { AlertTriangle, Bell, Brain, CheckCircle2, FilePlus2, Heart, Share2, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import ColorBadge from "../components/ColorBadge";
import DocumentCard from "../components/DocumentCard";
import EmotionCard from "../components/EmotionCard";
import PrivacyMeter from "../components/PrivacyMeter";
import ReminderCard from "../components/ReminderCard";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { consentRequests, documents, familyMembers, graphData, reminders } from "../data/mockData";

const actions = [
  ["/documents/add", "addDocument", FilePlus2],
  ["/share/aadhaar", "shareDocument", Share2],
  ["/mindmap", "viewMindmap", Brain],
  ["/family", "addFamilyMember", Users],
  ["/reminders", "viewReminders", Bell],
];

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const pending = consentRequests.filter((item) => item.status === "Pending");
  const activeReminders = reminders.filter((item) => item.status !== "Completed");
  const expiringDocs = documents.filter((doc) => doc.status && doc.status.includes("Expir"));
  const displayName = user?.name?.split(" ")[0] || "Aarav";

  return (
    <div className="space-y-6">
      <EmotionCard
        title={t("welcomeBack", { name: displayName })}
        description={t("recordsReady")}
        emotion="trust"
        icon={ShieldCheck}
      >
        <p className="text-sm opacity-90">{t("reviewPending")}</p>
      </EmotionCard>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {actions.map(([to, labelKey, Icon]) => (
          <Link
            key={labelKey}
            to={to}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-slate-800 shadow-sm transition hover:shadow-md dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <Icon size={18} /> {t(labelKey)}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <EmotionCard title={t("documentHealthScore")} description={t("identityProofs")} emotion="trust" icon={CheckCircle2}>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>{t("verifiedDocuments")}</span>
                <span className="font-bold">7/10</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/30">
                <div className="h-full rounded-full bg-white transition-all" style={{ width: "70%" }} />
              </div>
            </div>
          </div>
        </EmotionCard>

        <EmotionCard title={t("healthSafetyStatus")} description={t("vaccinationRecords")} emotion="safety" icon={Heart}>
          <div className="space-y-3">
            <p className="text-sm opacity-90">✓ {t("vaccinationActive")}</p>
            <p className="text-sm opacity-90">✓ {t("healthInsuranceActive")}</p>
          </div>
        </EmotionCard>

        <EmotionCard
          title={t("actionItemsRenewals")}
          description={t("upcomingReminders", { count: activeReminders.length })}
          emotion="reminder"
          icon={Bell}
        >
          <div className="space-y-2 text-sm opacity-90">
            {activeReminders.slice(0, 2).map((rem) => (
              <p key={rem.id}>• {rem.title}</p>
            ))}
            <Link to="/reminders" className="mt-2 inline-block font-medium underline opacity-100 hover:opacity-80">
              {t("viewAll")} →
            </Link>
          </div>
        </EmotionCard>

        <EmotionCard title={t("familyRecords")} description={t("familyMembers", { count: familyMembers.length })} emotion="family" icon={Users}>
          <div className="space-y-2 text-sm opacity-90">
            {familyMembers.slice(0, 2).map((member) => (
              <p key={member.id}>• {member.name} ({member.relation})</p>
            ))}
            <Link to="/family" className="mt-2 inline-block font-medium underline opacity-100 hover:opacity-80">
              {t("manageFamily")} →
            </Link>
          </div>
        </EmotionCard>

        <EmotionCard title={t("documentIntelligence")} description={t("exploreClusters")} emotion="intelligence" icon={Brain}>
          <div className="space-y-3 text-sm opacity-90">
            <p>{t("mindmapDescription")}</p>
            <Link to="/mindmap" className="mt-2 inline-block rounded bg-white/30 px-3 py-1 font-medium transition hover:bg-white/40">
              {t("exploreMindmap")} →
            </Link>
          </div>
        </EmotionCard>

        <EmotionCard title={t("urgentAttention")} description={t("documentsNeedAction", { count: expiringDocs.length })} emotion="risk" icon={AlertTriangle}>
          <div className="space-y-2 text-sm opacity-90">
            {expiringDocs.map((doc) => (
              <p key={doc.id}>• {doc.title} - {doc.status}</p>
            ))}
          </div>
        </EmotionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-bold text-slate-950 dark:text-white">{t("recentDocuments")}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {documents.slice(0, 4).map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="mb-4 text-lg font-bold text-slate-950 dark:text-white">{t("consentAccess")}</h2>
            <PrivacyMeter
              riskLevel={pending.length * 25}
              title={t("activeAccessRisk")}
              description={
                pending.length > 0
                  ? t("pendingRequests", { count: pending.length, plural: pending.length !== 1 ? "s" : "" })
                  : t("allAccessReviewed")
              }
            />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-950 dark:text-white">{t("pendingConsents")}</h3>
            {pending.length > 0 ? (
              <div className="space-y-3">
                {pending.slice(0, 2).map((consent) => (
                  <div key={consent.id} className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950/30">
                    <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">{consent.requester}</p>
                    <p className="mt-1 text-xs text-yellow-800 dark:text-yellow-200">{consent.purpose}</p>
                    <ColorBadge status="pending" size="sm" className="mt-2" />
                  </div>
                ))}
                {pending.length > 2 && (
                  <Link to="/consents" className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400">
                    {t("viewAllRequests", { count: pending.length })} →
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-400">{t("noPendingRequests")}</p>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-950 dark:text-white">{t("upcomingRemindersTitle")}</h3>
            <div className="space-y-2">
              {activeReminders.slice(0, 3).map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-4 text-lg font-bold text-slate-950 dark:text-white">{t("lifeTimeline")}</h2>
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
    </div>
  );
}
