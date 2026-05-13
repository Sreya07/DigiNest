import { useState } from "react";
import { Moon, Sun, Palette, Users, Bell, Lock, Eye, EyeOff } from "lucide-react";
import EmotionCard from "../components/EmotionCard";

export default function Settings() {
  const [settings, setSettings] = useState({
    language: "English",
    theme: "System",
    colorMode: "emotional",
    interfaceMode: "Manual",
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Settings & Preferences</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Customize your DigiNest experience with appearance, language, and privacy controls.</p>
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
              {["English", "Hindi", "Telugu"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => updateSetting("language", lang)}
                  className={`rounded-lg px-4 py-2 font-medium transition ${
                    settings.language === lang
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </SettingGroup>

          {/* Theme */}
          <SettingGroup title="Theme Mode" description="Choose light, dark, or automatic based on system">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "Light", icon: Sun },
                { name: "Dark", icon: Moon },
                { name: "Auto", value: "System", icon: Palette },
                { name: "Emotional", value: "emotional", icon: Palette },
              ].map((mode) => {
                const Icon = mode.icon;
                const value = mode.value || mode.name;
                return (
                  <button
                    key={value}
                    onClick={() => updateSetting("theme", value)}
                    className={`rounded-lg px-4 py-3 font-medium transition flex flex-col items-center gap-2 ${
                      settings.theme === value
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

          {/* Color Psychology Mode */}
          <SettingGroup
            title="Color Psychology Mode"
            description="Enhanced emotion-based document identification system"
          >
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 cursor-pointer">
                <input
                  type="radio"
                  name="colorMode"
                  checked={settings.colorMode === "emotional"}
                  onChange={() => updateSetting("colorMode", "emotional")}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">Enhanced (Recommended)</p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">Full color psychology - each document type has its own emotion</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer hover:border-slate-400 dark:hover:border-slate-600">
                <input
                  type="radio"
                  name="colorMode"
                  checked={settings.colorMode === "standard"}
                  onChange={() => updateSetting("colorMode", "standard")}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Standard</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Classic blue & neutral color scheme</p>
                </div>
              </label>
            </div>
          </SettingGroup>

          {/* Interface Mode */}
          <SettingGroup title="Interface Mode" description="Choose your interaction style">
            <div className="space-y-3">
              {[
                {
                  name: "Manual Mode",
                  desc: "Full control with detailed options and granular settings",
                },
                {
                  name: "Voice-Assisted Mode",
                  desc: "Voice commands and guided workflows (requires microphone)",
                },
                {
                  name: "Elder/Simple Mode",
                  desc: "Larger text, simplified actions, and reduced visual complexity",
                },
              ].map((mode) => (
                <label
                  key={mode.name}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition ${
                    settings.interfaceMode === mode.name
                      ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="interfaceMode"
                    checked={settings.interfaceMode === mode.name}
                    onChange={() => updateSetting("interfaceMode", mode.name)}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{mode.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{mode.desc}</p>
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
            { emoji: "👤", color: "blue", name: "Identity", desc: "Trust, strength" },
            { emoji: "❤️", color: "green", name: "Health", desc: "Safety, wellness" },
            { emoji: "🔔", color: "yellow", name: "Reminders", desc: "Attention, clarity" },
            { emoji: "👨‍👩‍👧", color: "pink", name: "Family", desc: "Love, connection" },
            { emoji: "🧠", color: "purple", name: "Intelligence", desc: "Creativity, AI" },
            { emoji: "⚠️", color: "red", name: "Risk", desc: "Urgency, action" },
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
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div
          className={`w-12 h-7 rounded-full transition ${
            checked
              ? "bg-blue-600"
              : "bg-slate-300 dark:bg-slate-600"
          }`}
        />
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5`}
        />
      </div>
    </label>
  );
}
