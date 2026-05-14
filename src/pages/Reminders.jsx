import { AlertTriangle, Clock, CheckCircle2, Heart, FileText, CalendarDays, Bell, Loader2, AlertCircle, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import ReminderCard from "../components/ReminderCard";
import EmotionCard from "../components/EmotionCard";
import { remindersAPI } from "../services/api";

const reminderGroups = [
  { name: "Expiry", icon: AlertTriangle, color: "from-red-600 to-rose-500", desc: "Documents expiring soon" },
  { name: "Renewal", icon: Clock, color: "from-yellow-400 to-amber-400", desc: "Time to renew documents" },
  { name: "Correction", icon: FileText, color: "from-orange-500 to-amber-500", desc: "Updates needed" },
  { name: "Application Deadline", icon: CalendarDays, color: "from-blue-600 to-cyan-500", desc: "Important dates" },
  { name: "Child Vaccination", icon: Heart, color: "from-pink-500 to-rose-400", desc: "Family health" },
  { name: "Personal Event", icon: CheckCircle2, color: "from-purple-600 to-fuchsia-500", desc: "Memories & milestones" },
];

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", group: "Expiry", date: "", status: "Upcoming" });

  useEffect(() => { fetchReminders(); }, []);

  async function fetchReminders() {
    setLoading(true); setError("");
    try {
      const { data } = await remindersAPI.list();
      setReminders(data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load reminders.");
    } finally { setLoading(false); }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.title) return;
    try {
      const { data } = await remindersAPI.create(form);
      setReminders((r) => [...r, data.data]);
      setForm({ title: "", group: "Expiry", date: "", status: "Upcoming" });
      setShowAdd(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create reminder.");
    }
  }

  async function handleDelete(id) {
    try {
      await remindersAPI.delete(id);
      setReminders((r) => r.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete reminder.");
    }
  }

  const total = reminders.length;
  const urgentCount = reminders.filter((r) => r.status === "Urgent").length;
  const upcomingCount = reminders.filter((r) => r.status === "Upcoming").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Smart Reminders</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Stay ahead of renewals, deadlines, and family care.</p>
        </div>
        <button onClick={() => setShowAdd((v) => !v)}
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 transition">
          <Plus size={18} /> Add Reminder
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <form onSubmit={handleAdd} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-3">
          <h2 className="font-bold text-slate-900 dark:text-white">New Reminder</h2>
          <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Reminder title" className="w-full rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white outline-none" />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.group} onChange={(e) => setForm((f) => ({ ...f, group: e.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white outline-none">
              {reminderGroups.map((g) => <option key={g.name}>{g.name}</option>)}
            </select>
            <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white outline-none">
              {["Urgent", "Upcoming", "Completed"].map((s) => <option key={s}>{s}</option>)}
            </select>
            <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white outline-none" />
          </div>
          <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700">Save</button>
        </form>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <EmotionCard title="Total Reminders" description={`${total} tracked`} emotion="reminder" icon={Bell}>
          <p className="text-2xl font-bold">{total}</p>
        </EmotionCard>
        <EmotionCard title="Urgent" description="Need immediate attention" emotion="risk" icon={AlertTriangle}>
          <p className="text-2xl font-bold">{urgentCount}</p>
        </EmotionCard>
        <EmotionCard title="Upcoming" description="Scheduled for later" emotion="reminder" icon={Clock}>
          <p className="text-2xl font-bold">{upcomingCount}</p>
        </EmotionCard>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 size={36} className="animate-spin text-indigo-600" /></div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {reminderGroups.map((group) => {
            const Icon = group.icon;
            const groupItems = reminders.filter((r) => r.group === group.name);
            return (
              <div key={group.name} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
                <div className={`bg-gradient-to-r ${group.color} text-white p-5 flex items-start justify-between`}>
                  <div className="flex items-start gap-3">
                    <Icon size={24} />
                    <div>
                      <h2 className="text-xl font-bold">{group.name}</h2>
                      <p className="text-sm opacity-90">{group.desc}</p>
                    </div>
                  </div>
                  <span className="bg-white/30 text-white px-3 py-1 rounded-full text-sm font-bold">{groupItems.length}</span>
                </div>
                <div className="p-5 space-y-3">
                  {groupItems.length > 0 ? groupItems.map((reminder) => (
                    <div key={reminder._id} className="flex items-center justify-between">
                      <ReminderCard reminder={{ ...reminder, id: reminder._id }} />
                      <button onClick={() => handleDelete(reminder._id)} className="ml-2 text-red-400 hover:text-red-600 shrink-0">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400 py-4">No reminders in this category</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
