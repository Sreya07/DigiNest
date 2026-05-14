export default function EmotionCard({ 
  title, 
  description, 
  emotion = "trust", 
  icon: Icon, 
  children, 
  className = "", 
  onClick 
}) {
  const tones = {
    trust: {
      accent: "bg-blue-600",
      icon: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
    },
    safety: {
      accent: "bg-emerald-500",
      icon: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
    },
    reminder: {
      accent: "bg-amber-400",
      icon: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200",
    },
    success: {
      accent: "bg-orange-500",
      icon: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-200",
    },
    family: {
      accent: "bg-rose-500",
      icon: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200",
    },
    intelligence: {
      accent: "bg-violet-600",
      icon: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-200",
    },
    risk: {
      accent: "bg-red-600",
      icon: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200",
    },
    professional: {
      accent: "bg-slate-600",
      icon: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    },
  };

  const tone = tones[emotion] || tones.trust;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${className} ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${tone.accent}`} />
      <div className="relative z-10 space-y-4 pt-1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {title && <h3 className="text-base font-semibold text-slate-950 dark:text-white">{title}</h3>}
            {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
          </div>
          {Icon && (
            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${tone.icon}`}>
              <Icon size={20} />
            </div>
          )}
        </div>
        <div className="text-slate-700 dark:text-slate-200">
          {children}
        </div>
      </div>
    </div>
  );
}
