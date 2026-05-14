import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDocument } from "../services/api";

export default function AddDocument() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await createDocument({
      title: data.get("title"),
      number: data.get("number"),
      issueDate: data.get("issueDate"),
      expiryDate: data.get("expiryDate") || "Lifetime",
      category: data.get("category"),
      sensitivity: data.get("sensitivity"),
      fields: {
        [data.get("customField") || "Custom Field"]: data.get("customValue") || "Pending",
      },
    });

    setSaved(true);
    window.setTimeout(() => navigate("/documents"), 900);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Add document</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">This upload is mocked for the hackathon prototype.</p>
      {saved && <div className="mt-5 rounded-lg bg-emerald-50 p-4 font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">Document saved successfully.</div>}
      <form onSubmit={handleSubmit} className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Document Title", "title"],
            ["Document Number", "number"],
            ["Issue Date", "issueDate"],
            ["Expiry Date", "expiryDate"],
          ].map(([label, name]) => (
            <label key={label} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {label}
              <input name={name} required={label !== "Expiry Date"} type={label.includes("Date") ? "date" : "text"} className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
          ))}
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Category
            <select name="category" className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              {["Identity", "Education", "Health", "Finance", "Vehicle", "Property", "Family", "Others"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Sensitivity
            <select name="sensitivity" className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              {["Low", "Medium", "High"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-6 grid place-items-center rounded-lg border-2 border-dashed border-blue-200 bg-blue-50 p-8 text-center dark:border-blue-800 dark:bg-blue-950/40">
          <UploadCloud className="text-blue-600 dark:text-blue-300" size={36} />
          <p className="mt-3 font-semibold text-slate-900 dark:text-white">Upload file mock area</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">PDF, image, or scanned copy placeholder</p>
        </div>
        <div className="mt-6 rounded-lg bg-slate-50 p-5 dark:bg-slate-800">
          <h2 className="font-bold text-slate-950 dark:text-white">Custom fields</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <input name="customField" className="rounded-lg border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Field name" />
            <input name="customValue" className="rounded-lg border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Field value" />
          </div>
        </div>
        <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700" type="submit">Save Document</button>
      </form>
    </div>
  );
}
