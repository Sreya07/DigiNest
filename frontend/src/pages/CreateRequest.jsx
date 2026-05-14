import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Clock, FileText, Send, User } from "lucide-react";

export default function CreateRequest() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => navigate("/consents?tab=sent"), 900);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Request Document</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Request specific data fields from another user's vault.</p>
      </div>

      {saved && (
        <div className="rounded-2xl bg-emerald-50 p-4 font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
          Request sent successfully. Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-6 md:grid-cols-2">
          
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 md:col-span-2">
            <span className="flex items-center gap-2 mb-2"><User size={16} className="text-blue-500" /> Target User</span>
            <input required placeholder="Enter username or email" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 transition" />
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-2 mb-2"><FileText size={16} className="text-emerald-500" /> Document Requested</span>
            <input required placeholder="e.g., 10th Marksheet, PAN Card" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-emerald-400 transition" />
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-2 mb-2"><Shield size={16} className="text-amber-500" /> Sensitivity Level</span>
            <select required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-amber-400 transition">
              <option value="Low">Low (Basic Info)</option>
              <option value="Medium">Medium (Standard IDs)</option>
              <option value="High">High (Financial/Health)</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 md:col-span-2">
            Purpose of Request
            <textarea required rows="3" placeholder="Explain why you need this document" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 transition" />
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-2 mb-2"><Clock size={16} className="text-purple-500" /> Duration</span>
            <select required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-purple-400 transition">
              <option value="1 hour">1 hour</option>
              <option value="1 day">1 day</option>
              <option value="1 week">1 week</option>
              <option value="1 month">1 month</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Fields Requested
            <input required placeholder="e.g., Name, Issue Date, Number" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 transition" />
          </label>

        </div>
        
        <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
          <button type="button" onClick={() => navigate("/consents")} className="rounded-2xl px-6 py-3 font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition">
            Cancel
          </button>
          <button type="submit" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition">
            <Send size={18} /> Send Request
          </button>
        </div>
      </form>
    </div>
  );
}
