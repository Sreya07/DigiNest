import {
  Bell, Clock3, FileText, GitBranch, HeartHandshake,
  History, Home, Landmark, Settings, ShieldCheck, Users, MapPin, LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { getUser, logout } from "../services/firebase";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/documents", label: "Documents", icon: FileText },
  { to: "/mindmap", label: "Document Mindmap", icon: MapPin },
  { to: "/consents", label: "Consent", icon: ShieldCheck },
  { to: "/history", label: "History", icon: History },
  { to: "/life-events", label: "Life Events", icon: HeartHandshake },
  { to: "/family", label: "Family", icon: Users },
  { to: "/reminders", label: "Reminders", icon: Bell },
  { to: "/life-graph", label: "Life Graph", icon: GitBranch },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const user = getUser();

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white/90 p-5 backdrop-blur lg:sticky lg:top-0 lg:flex lg:flex-col dark:border-slate-800 dark:bg-slate-950/90">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
          <Landmark size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-950 dark:text-white">DigiNest</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Citizen document vault</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-8 space-y-1 flex-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
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
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="mt-4 rounded-3xl bg-gradient-to-br from-indigo-50 to-emerald-50 p-4 dark:from-indigo-950 dark:to-emerald-950">
        {user && (
          <div className="mb-3 flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Clock3 size={17} /> Privacy pulse
        </div>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">All links auto-expire on schedule.</p>
        <button
          onClick={logout}
          className="mt-3 flex w-full items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950 transition"
        >
          <LogOut size={15} /> Sign out
        </button>
      </div>
    </aside>
  );
}
