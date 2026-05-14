import {
  Bell,
  Clock3,
  FileText,
  GitBranch,
  HeartHandshake,
  History,
  Home,
  Landmark,
  Settings,
  ShieldCheck,
  Users,
  MapPin,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const navItems = [
  { to: "/dashboard", labelKey: "dashboard", icon: Home },
  { to: "/documents", labelKey: "documents", icon: FileText },
  { to: "/mindmap", labelKey: "documentMindmap", icon: MapPin },
  { to: "/consents", labelKey: "consent", icon: ShieldCheck },
  { to: "/history", labelKey: "history", icon: History },
  { to: "/life-events", labelKey: "lifeEvents", icon: HeartHandshake },
  { to: "/family", labelKey: "family", icon: Users },
  { to: "/reminders", labelKey: "reminders", icon: Bell },
  { to: "/life-graph", labelKey: "lifeGraph", icon: GitBranch },
  { to: "/settings", labelKey: "settings", icon: Settings },
];

export default function Sidebar() {
  const { t } = useLanguage();

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white/90 p-5 backdrop-blur lg:sticky lg:top-0 lg:block dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
          <Landmark size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-950 dark:text-white">{t("appName")}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t("appSubtitle")}</p>
        </div>
      </div>
      <nav className="mt-8 space-y-1">
        {navItems.map(({ to, labelKey, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
              }`
            }
          >
            <Icon size={18} />
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-emerald-50 p-4 dark:from-indigo-950 dark:to-emerald-950">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Clock3 size={17} /> {t("privacyPulse")}
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t("privacyPulseText")}</p>
      </div>
    </aside>
  );
}
