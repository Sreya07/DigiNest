import { Accessibility } from "lucide-react";
import { useEffect, useState } from "react";

export default function ElderModeToggle() {
  const [enabled, setEnabled] = useState(() => localStorage.getItem("elderMode") === "true");

  useEffect(() => {
    document.body.classList.toggle("elder-mode", enabled);
    localStorage.setItem("elderMode", String(enabled));
  }, [enabled]);

  return (
    <button
      type="button"
      onClick={() => setEnabled((value) => !value)}
      className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-sm shadow-sm transition ${
        enabled
          ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-200"
          : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      }`}
      title="Elder mode"
    >
      <Accessibility size={16} />
      <span className="hidden sm:inline">Elder</span>
    </button>
  );
}
