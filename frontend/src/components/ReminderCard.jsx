import { CalendarClock } from "lucide-react";

export default function ReminderCard({ reminder }) {
  const urgent = reminder.status === "Urgent";
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className={`grid h-11 w-11 place-items-center rounded-lg ${urgent ? "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-200" : "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-200"}`}>
        <CalendarClock size={21} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-900 dark:text-white">{reminder.title}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{reminder.group} - {reminder.date}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${urgent ? "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200"}`}>
        {reminder.status}
      </span>
    </div>
  );
}
