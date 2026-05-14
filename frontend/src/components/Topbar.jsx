import { Bell, Landmark, Search, UserRound, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import ElderModeToggle from "./ElderModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

const mobileNav = [
  ["/dashboard", "home"],
  ["/documents", "docs"],
  ["/share/aadhaar", "share"],
  ["/consents", "consent"],
  ["/settings", "more"],
];

export default function Topbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!showUserMenu) return undefined;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 sm:px-6">
      <div className="mx-auto flex max-w-[1440px] items-center gap-3">
        <Link to="/dashboard" className="flex items-center gap-2 lg:hidden">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-white">
            <Landmark size={20} />
          </div>
          <span className="font-bold text-slate-950 dark:text-white">{t("appName")}</span>
        </Link>
        <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 md:flex dark:border-slate-700 dark:bg-slate-900">
          <Search size={18} className="text-slate-400" />
          <input className="w-full bg-transparent text-sm outline-none dark:text-white" placeholder={t("searchPlaceholder")} />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <ElderModeToggle />
          <ThemeToggle />
<<<<<<< HEAD:frontend/src/components/Topbar.jsx
          <button className="hidden h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm sm:grid dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" type="button" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-950">
            <UserRound size={18} />
          </div>
        </div>
      </div>
      <nav className="mx-auto mt-3 flex max-w-[1440px] gap-2 overflow-x-auto pb-1 lg:hidden">
        {mobileNav.map(([to, label]) => (
=======
          <button className="hidden h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm sm:grid dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" type="button" aria-label={t("notifications")}>
            <Bell size={18} />
          </button>
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
              title={user?.name || "User"}
              aria-label={t("openUserMenu")}
              aria-expanded={showUserMenu}
              aria-haspopup="menu"
            >
              <UserRound size={18} />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900" role="menu">
                <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t("loggedInAs")}</p>
                  <p className="mt-1 truncate text-sm font-medium text-slate-900 dark:text-white">{user?.name || "User"}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email || "No email found"}</p>
                  <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">{t("accountSaved")}</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-slate-100 dark:text-red-400 dark:hover:bg-slate-800"
                  role="menuitem"
                >
                  <LogOut size={16} />
                  {t("logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {mobileNav.map(([to, labelKey]) => (
>>>>>>> main:src/components/Topbar.jsx
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
                isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300"
              }`
            }
          >
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
