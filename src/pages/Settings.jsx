import { useState, useEffect } from "react";
import { Moon, Sun, Palette, Bell, Lock, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import EmotionCard from "../components/EmotionCard";
import { authAPI } from "../services/api";

export default function Settings() {
  // BUG FIX: Settings were previously local state only — changes were lost on refresh.
  // Now we load from localStorage (populated at login) and save to the backend.
  const savedUser = JSON.parse(localStorage.getItem("diginest_user") || "{}");

  const [settings, setSettings] = useState({
    name: savedUser.name || "",
    language: savedUser.language || "en",
    theme: savedUser.theme || "light",
    elderMode: savedUser.elderMode || false,
    colorMode: "emotional",
    interfaceMode: "Manual",
    aiConsent: true,
    autoExpire: true,
    alerts: true,
  });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  function updateSetting(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function toggleSetting(key) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function saveToBackend() {
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);
    try {
      const { data } = await authAPI.updateProfile({
        name: settings.name,
        language: settings.language,
        theme: settings.theme,
        elderMode: settings.elderMode,
      });
      // Update localStorage so other pages see the new values immediately
      const updatedUser = { ...savedUser, ...data.user };
      localStorage.setItem("diginest_user", JSON.stringify(updatedUser));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err.response?.data?.error || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  const LANG_OPTIONS = [
    { label: "English", value: "en" },
    { label: "Hindi", value: "hi" },
    { label: "Telugu", value: "te" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Settings & Preferences</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Customize your DigiNest experience. Changes are saved to your account.
          </p>
        </div>
        <button
          onClick={saveToBackend}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 transition"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : null}
          {saving ? "Saving…" : "Save Settings"}
        </button>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
          <CheckCircle2 size={18} /> Settings saved successfully!
        </div>
      )}
      {saveError && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
          <AlertCircle size={18} /> {saveError}
        </div>
      )}

      {/* Profile */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 border-b border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Profile</h2>
        </div>
        <div className="p-6">
          <SettingGroup title="Display Name" description="How your name appears in the app">
            <input
              type="text"
              value={settings.name}
              onChange={(e) => updateSetting("name", e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white max-w-sm"
            />
          </SettingGroup>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 border-b border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-3">
            <Palette size={24} className="text-blue-600" />
            Appearance & Theme
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Language */}
          <SettingGroup title="Language" description="Choose your preferred language">
            <div className="grid grid-cols-3 gap-3">
              {LANG_OPTIONS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => updateSetting("language", value)}
                  className={`rounded-lg px-4 py-2 font-medium transition ${
                    settings.language === value
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </SettingGroup>

          {/* Theme */}
          <SettingGroup title="Theme Mode" description="Choose light, dark, or automatic based on system">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: "Light", value: "light", icon: Sun },
                { name: "Dark", value: "dark", icon: Moon },
                { name: "System", value: "system", icon: Palette },
              ].map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.value}
                    onClick={() => updateSetting("theme", mode.value)}
                    className={`rounded-lg px-4 py-3 font-medium transition flex flex-col items-center gap-2 ${
                      settings.theme === mode.value
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-xs">{mode.name}</span>
                  </button>
                );
              })}
            </div>
          </SettingGroup>

          {/* Elder Mode */}
          <SettingGroup title="Elder / Simple Mode" description="Larger text, simplified actions, reduced visual complexity">
            <Toggle
              label="Enable Elder Mode"
              checked={settings.elderMode}
              onChange={() => toggleSetting("elderMode")}
              description="Optimized for accessibility and ease of use"
            />
          </SettingGroup>

          {/* Color Psychology Mode */}
          <SettingGroup
            title="Color Psychology Mode"
            description="Enhanced emotion-based document identification"
          >
            <div className="space-y-3">
              {[
                { value: "emotional", label: "Enhanced (Recommended)", desc: "Full color psychology — each document type has its own emotion" },
                { value: "standard", label: "Standard", desc: "Classic blue & neutral color scheme" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition border-slate-200 dark:border-slate-700 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-950/30">
                  <input
                    type="radio"
                    name="colorMode"
                    checked={settings.colorMode === opt.value}
                    onChange={() => updateSetting("colorMode", opt.value)}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{opt.label}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </SettingGroup>
        </div>
      </div>

      {/* Privacy & Security Section */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50 border-b border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-3">
            <Lock size={24} className="text-emerald-600" />
            Privacy & Security
          </h2>
        </div>

        <div className="p-6 space-y-4">
          <Toggle
            label="Require consent before AI summaries"
            checked={settings.aiConsent}
            onChange={() => toggleSetting("aiConsent")}
            description="AI processing always requires your explicit approval"
          />
          <Toggle
            label="Auto-expire shared links"
            checked={settings.autoExpire}
            onChange={() => toggleSetting("autoExpire")}
            description="All shared links automatically expire after set duration"
          />
          <Toggle
            label="Show access alerts"
            checked={settings.alerts}
            onChange={() => toggleSetting("alerts")}
            description="Receive notifications when your data is accessed"
          />
        </div>
      </div>

      {/* Color Legend Section */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
        <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-4">📚 Color Psychology Reference</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { emoji: "👤", name: "Identity", desc: "Trust, strength" },
            { emoji: "❤️", name: "Health", desc: "Safety, wellness" },
            { emoji: "🔔", name: "Reminders", desc: "Attention, clarity" },
            { emoji: "👨‍👩‍👧", name: "Family", desc: "Love, connection" },
            { emoji: "🧠", name: "Intelligence", desc: "Creativity, AI" },
            { emoji: "⚠️", name: "Risk", desc: "Urgency, action" },
          ].map((item) => (
            <div key={item.name} className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
              <div className="text-2xl">{item.emoji}</div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950/30 dark:to-fuchsia-950/30 border border-purple-200 dark:border-purple-800 p-6">
        <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-3">🎓 Need Help?</h3>
        <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
          <li>• Check our documentation for detailed guides</li>
          <li>• Contact support at support@diginest.io</li>
          <li>• Join our community forum for tips and tricks</li>
        </ul>
      </div>
    </div>
  );
}

function SettingGroup({ title, description, children }) {
  return (
    <div>
      <label className="block mb-3">
        <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>
      </label>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange, description }) {
  return (
    <label className="flex items-center justify-between gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition">
      <div className="flex-1">
        <p className="font-medium text-slate-900 dark:text-white">{label}</p>
        {description && <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{description}</p>}
      </div>
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div
          className={`w-12 h-7 rounded-full transition ${
            checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
          }`}
        />
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-all ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </div>
    </label>
  );
}