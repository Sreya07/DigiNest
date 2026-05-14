import { Plus, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { lifeEventsAPI } from "../services/api";

const IMPORTANCE = ["Important", "Major Milestone", "Life-Changing"];
const VISIBILITY = ["Only Me", "Family Group", "Selected Family Members"];

const emotionColors = {
  "Major Milestone": "from-blue-600 to-cyan-500",
  "Life-Changing": "from-purple-600 to-fuchsia-500",
  "Important": "from-emerald-500 to-green-400",
};

export default function LifeEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    title: "", date: "", description: "",
    importance: "Important", visibility: "Only Me", document: "",
  });

  useEffect(() => { fetchEvents(); }, []);

  async function fetchEvents() {
    setLoading(true); setError("");
    try {
      const { data } = await lifeEventsAPI.list();
      setEvents(data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load life events.");
    } finally { setLoading(false); }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.title) return;
    try {
      const { data } = await lifeEventsAPI.create(form);
      setEvents((ev) => [...ev, data.data]);
      setForm({ title: "", date: "", description: "", importance: "Important", visibility: "Only Me", document: "" });
      setShowAdd(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create event.");
    }
  }

  async function handleDelete(id) {
    try {
      await lifeEventsAPI.delete(id);
      setEvents((ev) => ev.filter((e) => e._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete event.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Life Events</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Your personal timeline of milestones and memories.</p>
        </div>
        <button onClick={() => setShowAdd((v) => !v)}
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
          <Plus size={18} /> Add Life Event
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-3">
          <h2 className="font-bold text-slate-900 dark:text-white">New Life Event</h2>
          <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Event title" className="w-full rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white outline-none" />
          <div className="grid grid-cols-2 gap-3">
            <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white outline-none" />
            <input value={form.document} onChange={(e) => setForm((f) => ({ ...f, document: e.target.value }))}
              placeholder="Linked document (optional)" className="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white outline-none" />
            <select value={form.importance} onChange={(e) => setForm((f) => ({ ...f, importance: e.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white outline-none">
              {IMPORTANCE.map((i) => <option key={i}>{i}</option>)}
            </select>
            <select value={form.visibility} onChange={(e) => setForm((f) => ({ ...f, visibility: e.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white outline-none">
              {VISIBILITY.map((v) => <option key={v}>{v}</option>)}
            </select>
          </div>
          <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Description (optional)" rows={2}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white outline-none resize-none" />
          <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700">Save Event</button>
        </form>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 size={36} className="animate-spin text-indigo-600" /></div>
      ) : (
        <div className="relative border-l-2 border-indigo-200 dark:border-indigo-800 ml-4 space-y-8 pl-8">
          {events.length === 0 && (
            <p className="text-slate-500 dark:text-slate-400">No life events yet. Add your first milestone!</p>
          )}
          {events.map((event) => {
            const gradient = emotionColors[event.importance] || "from-slate-500 to-slate-600";
            return (
              <div key={event._id} className="relative">
                {/* Timeline dot */}
                <div className={`absolute -left-11 top-1 h-5 w-5 rounded-full bg-gradient-to-br ${gradient} border-4 border-white dark:border-slate-950`} />
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full text-white bg-gradient-to-r ${gradient}`}>
                          {event.importance}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{event.visibility}</span>
                        {event.date && <span className="text-xs text-slate-500 dark:text-slate-400">📅 {event.date}</span>}
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-slate-950 dark:text-white">{event.title}</h3>
                      {event.description && <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm">{event.description}</p>}
                      {event.document && (
                        <p className="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400">📎 {event.document}</p>
                      )}
                    </div>
                    <button onClick={() => handleDelete(event._id)} className="text-red-400 hover:text-red-600 shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
