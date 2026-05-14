export default function StatCard({ title, value, icon: Icon, tone = "indigo" }) {
  const tones = {
    indigo: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200",
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200",
    slate: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{value}</p>
        </div>
        {Icon && (
          <div className={`grid h-11 w-11 place-items-center rounded-lg ${tones[tone]}`}>
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}
