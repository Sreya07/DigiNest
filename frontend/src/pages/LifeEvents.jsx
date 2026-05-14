import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { lifeEvents } from "../data/mockData";

export default function LifeEvents() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Life events</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">A warm timeline where official records meet family moments.</p>
        </div>
        <Link to="/life-events/add" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 font-semibold text-white">
          <Plus size={18} /> Add Event
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {lifeEvents.map((event, index) => (
          <article key={event.id} className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="absolute right-5 top-5 text-6xl font-black text-indigo-50 dark:text-slate-800">{String(index + 1).padStart(2, "0")}</div>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{event.date}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{event.title}</h2>
            <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">{event.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200">{event.importance}</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">{event.visibility}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{event.document}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
