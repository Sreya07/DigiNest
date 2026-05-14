import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { documents } from "../data/mockData";

export default function AddLifeEvent() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => navigate("/life-events"), 900);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Add life event</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">Capture a moment and connect it with trusted records.</p>
      {saved && <div className="mt-5 rounded-lg bg-emerald-50 p-4 font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">Life event saved successfully.</div>}
      <form onSubmit={handleSubmit} className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Event title
            <input required className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Date/year
            <input required className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="2026 or 2026-05-14" />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 md:col-span-2">
            Description
            <textarea required rows="4" className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Linked document
            <select className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              {documents.map((document) => <option key={document.id}>{document.title}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Importance
            <select className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              {["Small Moment", "Important", "Major Milestone", "Life-Changing"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Visibility
            <select className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              {["Only Me", "Selected Family Members", "Family Group"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-6 grid place-items-center rounded-lg border-2 border-dashed border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-950/40">
          <ImagePlus className="text-emerald-600 dark:text-emerald-300" size={36} />
          <p className="mt-3 font-semibold text-slate-900 dark:text-white">Image upload mock</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Add a memory photo placeholder</p>
        </div>
        <button className="mt-6 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600" type="submit">Save Life Event</button>
      </form>
    </div>
  );
}
