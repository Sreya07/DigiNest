import { ImagePlus, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLifeMilestones } from "../context/LifeMilestonesContext";

export default function AddLifeEvent() {
  const navigate = useNavigate();
  const { addMilestone } = useLifeMilestones();
  const [saved, setSaved] = useState(false);
  const [noDocuments, setNoDocuments] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const dateStr = formData.get("date");
    const yearMatch = dateStr.match(/\d{4}/);
    const year = yearMatch ? parseInt(yearMatch[0], 10) : new Date().getFullYear();

    const newMilestone = {
      id: `custom-${Date.now()}`,
      title: formData.get("title"),
      date: dateStr,
      year: year,
      description: formData.get("description"),
      category: formData.get("category"),
      source: "user",
      eventKind: "life_event",
      importance: formData.get("importance"),
      documents: noDocuments ? [] : [{ id: `doc-${Date.now()}`, name: "Uploaded Document Placeholder", type: "document" }],
      images: []
    };

    addMilestone(newMilestone);
    setSaved(true);
    window.setTimeout(() => navigate("/life-events"), 900);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Add life event</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">Capture a moment and connect it with trusted records.</p>
      {saved && <div className="mt-5 rounded-2xl bg-emerald-50 p-4 font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">Life event saved successfully. Redirecting...</div>}
      <form onSubmit={handleSubmit} className="mt-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Event title
            <input name="title" required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Date/year
            <input name="date" required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="2026 or 2026-05-14" />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 md:col-span-2">
            Description
            <textarea name="description" required rows="4" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Event category
            <select name="category" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              {["identity", "education", "career", "health", "finance", "property", "family", "other"].map((cat) => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Importance
            <select name="importance" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              {[
                { label: "Small Moment", val: "small" },
                { label: "Important", val: "important" },
                { label: "Major Milestone", val: "major" }
              ].map((item) => <option key={item.val} value={item.val}>{item.label}</option>)}
            </select>
          </label>
        </div>
        
        <div className="mt-6 flex items-center gap-2">
          <input 
            type="checkbox" 
            id="noDocuments" 
            className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
            checked={noDocuments}
            onChange={(e) => setNoDocuments(e.target.checked)}
          />
          <label htmlFor="noDocuments" className="text-sm font-medium text-slate-700 dark:text-slate-200">
            No documents for this event
          </label>
        </div>

        {!noDocuments && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="grid place-items-center rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-950/40 cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors">
              <FileText className="text-emerald-600 dark:text-emerald-300" size={36} />
              <p className="mt-3 font-semibold text-slate-900 dark:text-white">Upload Documents</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">PDF, DOC, certificates</p>
            </div>
            <div className="grid place-items-center rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50 p-8 text-center dark:border-blue-800 dark:bg-blue-950/40 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
              <ImagePlus className="text-blue-600 dark:text-blue-300" size={36} />
              <p className="mt-3 font-semibold text-slate-900 dark:text-white">Upload Images</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Add a memory photo placeholder</p>
            </div>
          </div>
        )}

        <button className="mt-6 rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600 w-full md:w-auto" type="submit">Save Life Event</button>
      </form>
    </div>
  );
}
