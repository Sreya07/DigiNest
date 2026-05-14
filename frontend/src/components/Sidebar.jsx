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
    <aside className="hidden h-screen w-64 shrink-0 border-r border-slate-200 bg-white p-4 lg:sticky lg:top-0 lg:block dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-3 rounded-lg px-2 py-2">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-white">
          <Landmark size={22} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-950 dark:text-white">DigiNest</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Citizen document vault</p>
        </div>
      </div>
      <nav className="mt-6 space-y-1">
        {navItems.map(({ to, labelKey, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-950/50 dark:text-blue-200 dark:ring-blue-900"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
              }`
            }
          >
            <Icon size={18} />
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>
      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Clock3 size={17} /> {t("privacyPulse")}
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t("privacyPulseText")}</p>
      </div>
    </aside>
  );
}
