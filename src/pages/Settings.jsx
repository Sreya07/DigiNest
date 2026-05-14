import { useState } from "react";
import { Lock, LogOut, Moon, Palette, Sun, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Settings() {
  const { logout, user } = useAuth();
  const { language, languages, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    theme: "System",
    colorMode: "emotional",
    interfaceMode: "Manual Mode",
    aiConsent: true,
    autoExpire: true,
    alerts: true,
  });

  function updateSetting(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function toggleSetting(key) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">{t("settingsTitle")}</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">{t("settingsDescription")}</p>
      </div>

      <SectionHeader icon={Palette} title={t("appearanceTheme")} tone="blue">
        <div className="space-y-6 p-6">
          <SettingGroup title={t("language")} description={t("languageDescription")}>
            <div className="grid grid-cols-3 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`rounded-lg px-4 py-2 font-medium transition ${
                    language === lang.code
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {lang.nativeLabel}
                </button>
              ))}
            </div>
          </SettingGroup>

          <SettingGroup title={t("themeMode")} description={t("themeModeDescription")}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: t("light"), value: "Light", icon: Sun },
                { label: t("dark"), value: "Dark", icon: Moon },
                { label: t("auto"), value: "System", icon: Palette },
                { label: t("emotional"), value: "emotional", icon: Palette },
              ].map((mode) => {
                const Icon = mode.icon;

                return (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => updateSetting("theme", mode.value)}
                    className={`flex flex-col items-center gap-2 rounded-lg px-4 py-3 font-medium transition ${
                      settings.theme === mode.value
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-xs">{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </SettingGroup>

          <SettingGroup title={t("colorPsychologyMode")} description={t("colorPsychologyDescription")}>
            <div className="space-y-3">
              <RadioOption
                name="colorMode"
                checked={settings.colorMode === "emotional"}
                onChange={() => updateSetting("colorMode", "emotional")}
                title={t("enhancedRecommended")}
                description={t("enhancedDescription")}
                active
              />
              <RadioOption
                name="colorMode"
                checked={settings.colorMode === "standard"}
                onChange={() => updateSetting("colorMode", "standard")}
                title={t("standard")}
                description={t("standardDescription")}
              />
            </div>
          </SettingGroup>

          <SettingGroup title={t("interfaceMode")} description={t("interfaceModeDescription")}>
            <div className="space-y-3">
              {[
                { label: t("manualMode"), value: "Manual Mode", desc: t("manualDescription") },
                { label: t("voiceMode"), value: "Voice-Assisted Mode", desc: t("voiceDescription") },
                { label: t("elderMode"), value: "Elder/Simple Mode", desc: t("elderDescription") },
              ].map((mode) => (
                <label
                  key={mode.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition ${
                    settings.interfaceMode === mode.value
                      ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30"
                      : "border-slate-200 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="interfaceMode"
                    checked={settings.interfaceMode === mode.value}
                    onChange={() => updateSetting("interfaceMode", mode.value)}
                    className="h-4 w-4"
                  />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{mode.label}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{mode.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </SettingGroup>
        </div>
      </SectionHeader>

      <SectionHeader icon={Lock} title={t("privacySecurity")} tone="emerald">
        <div className="space-y-4 p-6">
          <Toggle
            label={t("requireAiConsent")}
            checked={settings.aiConsent}
            onChange={() => toggleSetting("aiConsent")}
            description={t("requireAiConsentDescription")}
          />
          <Toggle
            label={t("autoExpireLinks")}
            checked={settings.autoExpire}
            onChange={() => toggleSetting("autoExpire")}
            description={t("autoExpireLinksDescription")}
          />
          <Toggle
            label={t("showAccessAlerts")}
            checked={settings.alerts}
            onChange={() => toggleSetting("alerts")}
            description={t("showAccessAlertsDescription")}
          />
        </div>
      </SectionHeader>

      <SectionHeader icon={Users} title={t("sessionAccount")} tone="red">
        <div className="space-y-4 p-6">
          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400">{t("loggedInAs")}:</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">{user?.name || "User"}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email || "No email found"}</p>
          </div>

          <div className="grid gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm dark:border-emerald-900 dark:bg-emerald-950/30 sm:grid-cols-2">
            <div>
              <p className="font-semibold text-emerald-950 dark:text-emerald-100">{t("databaseStatus")}</p>
              <p className="mt-1 text-emerald-800 dark:text-emerald-200">{t("databaseStatusDescription")}</p>
            </div>
            <div className="space-y-1 text-emerald-900 dark:text-emerald-100">
              <p>
                <span className="font-medium">{t("collection")}:</span> users
              </p>
              <p>
                <span className="font-medium">{t("savedFields")}:</span> name, email, password hash
              </p>
              {user?.id && (
                <p>
                  <span className="font-medium">{t("userId")}:</span> {user.id}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700"
          >
            <LogOut size={18} />
            {t("logout")}
          </button>
        </div>
      </SectionHeader>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-4 text-lg font-bold text-slate-950 dark:text-white">{t("colorReference")}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { marker: "ID", name: t("identity"), desc: t("identityDesc") },
            { marker: "HL", name: t("health"), desc: t("healthDesc") },
            { marker: "RM", name: t("remindersLegend"), desc: t("remindersDesc") },
            { marker: "FM", name: t("familyLegend"), desc: t("familyDesc") },
            { marker: "AI", name: t("intelligence"), desc: t("intelligenceDesc") },
            { marker: "!", name: t("risk"), desc: t("riskDesc") },
          ].map((item) => (
            <div key={item.name} className="flex items-start gap-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-sm font-bold text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
                {item.marker}
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-fuchsia-50 p-6 dark:border-purple-800 dark:from-purple-950/30 dark:to-fuchsia-950/30">
        <h3 className="mb-3 font-bold text-purple-900 dark:text-purple-100">{t("needHelp")}</h3>
        <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
          <li>• {t("helpDocs")}</li>
          <li>• {t("helpSupport")}</li>
          <li>• {t("helpCommunity")}</li>
        </ul>
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, tone, children }) {
  const toneClasses = {
    blue: "from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 text-blue-600",
    emerald: "from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50 text-emerald-600",
    red: "from-red-50 to-orange-50 dark:from-red-950/50 dark:to-orange-950/50 text-red-600",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className={`border-b border-slate-200 bg-gradient-to-r p-6 dark:border-slate-700 ${toneClasses[tone]}`}>
        <h2 className="flex items-center gap-3 text-xl font-bold text-slate-950 dark:text-white">
          <Icon size={24} className={toneClasses[tone].split(" ").at(-1)} />
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function SettingGroup({ title, description, children }) {
  return (
    <div>
      <label className="mb-3 block">
        <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
      </label>
      {children}
    </div>
  );
}

function RadioOption({ name, checked, onChange, title, description, active = false }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 ${
        active
          ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30"
          : "border-slate-200 bg-white hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="h-4 w-4" />
      <div>
        <p className={`font-medium ${active ? "text-blue-900 dark:text-blue-100" : "text-slate-900 dark:text-white"}`}>{title}</p>
        <p className={`text-sm ${active ? "text-blue-800 dark:text-blue-200" : "text-slate-600 dark:text-slate-400"}`}>{description}</p>
      </div>
    </label>
  );
}

function Toggle({ label, checked, onChange, description }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-slate-50 p-4 transition hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700">
      <div className="flex-1">
        <p className="font-medium text-slate-900 dark:text-white">{label}</p>
        {description && <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{description}</p>}
      </div>
      <div className="relative">
        <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
        <div className={`h-7 w-12 rounded-full transition ${checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"}`} />
        <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition-all peer-checked:translate-x-5" />
      </div>
    </label>
  );
}
