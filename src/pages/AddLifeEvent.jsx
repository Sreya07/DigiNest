import { ImagePlus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { lifeEventsAPI, documentsAPI } from "../services/api";

const IMPORTANCE = ["Important", "Major Milestone", "Life-Changing"];
const VISIBILITY = ["Only Me", "Family Group", "Selected Family Members"];

export default function AddLifeEvent() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [docTitles, setDocTitles] = useState([]);
  const [form, setForm] = useState({
    title: "", date: "", description: "",
    importance: "Important", visibility: "Only Me", document: "",
  });

  useEffect(() => {
    documentsAPI.list()
      .then(({ data }) => setDocTitles(data.data.map((d) => d.title)))
      .catch(() => {});
  }, []);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true); setError("");
    try {
      await lifeEventsAPI.create(form);
      setSaved(true);
      setTimeout(() => navigate("/life-events"), 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save life event.");
    } finally { setLoading(false); }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Add Life Event</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">Capture a moment and connect it with trusted records.</p>

      {saved && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
          <CheckCircle2 size={20} /> Life event saved! Redirecting…
        </div>
      )}
      {error && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Event title <span className="text-red-500">*</span>
            <input required name="title" value={form.title} onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Date / Year
            <input name="date" value={form.date} onChange={handleChange}
              placeholder="2026 or 2026-05-14"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 md:col-span-2">
            Description
            <textarea name="description" value={form.description} onChange={handleChange}
              rows={3} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white resize-none" />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Linked document
            <select name="document" value={form.document} onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              <option value="">— None —</option>
              {docTitles.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Importance
            <select name="importance" value={form.importance} onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              {IMPORTANCE.map((i) => <option key={i}>{i}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Visibility
            <select name="visibility" value={form.visibility} onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              {VISIBILITY.map((v) => <option key={v}>{v}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-6 grid place-items-center rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-950/40">
          <ImagePlus className="text-emerald-600 dark:text-emerald-300" size={36} />
          <p className="mt-3 font-semibold text-slate-900 dark:text-white">Memory photo</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Photo upload coming soon</p>
        </div>

        <button disabled={loading}
          className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600 disabled:opacity-60" type="submit">
          {loading ? <Loader2 size={18} className="animate-spin" /> : null}
          {loading ? "Saving…" : "Save Life Event"}
        </button>
      </form>
    </div>
  );
}
