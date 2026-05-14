import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

const options = ["English", "Hindi", "Telugu"];

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "English");

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <label className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
      <Languages size={16} />
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        className="bg-transparent text-sm outline-none"
        aria-label="Select language"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
