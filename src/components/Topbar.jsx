import { Bell, Landmark, Search, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ElderModeToggle from "./ElderModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

const mobileNav = [
  ["/dashboard", "Home"],
  ["/documents", "Docs"],
  ["/share/aadhaar", "Share"],
  ["/consents", "Consent"],
  ["/settings", "More"],
];

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-slate-50/85 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85 sm:px-6">
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="flex items-center gap-2 lg:hidden">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
            <Landmark size={20} />
          </div>
          <span className="font-bold text-slate-950 dark:text-white">DigiNest</span>
        </Link>
        <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm md:flex dark:border-slate-700 dark:bg-slate-900">
          <Search size={18} className="text-slate-400" />
          <input className="w-full bg-transparent text-sm outline-none dark:text-white" placeholder="Search documents, family records, requests" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <ElderModeToggle />
          <ThemeToggle />
          <button className="hidden h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm sm:grid dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" type="button" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950">
            <UserRound size={18} />
          </div>
        </div>
      </div>
      <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {mobileNav.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                isActive ? "bg-indigo-600 text-white" : "bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
