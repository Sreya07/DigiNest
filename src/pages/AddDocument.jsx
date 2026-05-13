import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddDocument() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => navigate("/documents"), 900);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Add document</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">This upload is mocked for the hackathon prototype.</p>
      {saved && <div className="mt-5 rounded-2xl bg-emerald-50 p-4 font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">Document saved successfully.</div>}
      <form onSubmit={handleSubmit} className="mt-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2">
          {["Document Title", "Document Number", "Issue Date", "Expiry Date"].map((label) => (
            <label key={label} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {label}
              <input required={label !== "Expiry Date"} type={label.includes("Date") ? "date" : "text"} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
          ))}
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Category
            <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              {["Identity", "Education", "Health", "Finance", "Vehicle", "Property", "Family", "Others"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-6 grid place-items-center rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50 p-8 text-center dark:border-indigo-800 dark:bg-indigo-950/40">
          <UploadCloud className="text-indigo-600 dark:text-indigo-300" size={36} />
          <p className="mt-3 font-semibold text-slate-900 dark:text-white">Upload file mock area</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">PDF, image, or scanned copy placeholder</p>
        </div>
        <div className="mt-6 rounded-3xl bg-slate-50 p-5 dark:bg-slate-800">
          <h2 className="font-bold text-slate-950 dark:text-white">Custom fields</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Field name" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Field value" />
          </div>
        </div>
        <button className="mt-6 rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700" type="submit">Save Document</button>
      </form>
    </div>
  );
}
