import { Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, languages, setLanguage, t } = useLanguage();

  return (
    <label className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
      <Languages size={16} />
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        className="bg-transparent text-sm outline-none"
        aria-label={t("selectLanguage")}
      >
        {languages.map((option) => (
          <option key={option.code} value={option.code}>
            {option.nativeLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
