import { UploadCloud, Loader2, CheckCircle2, AlertCircle, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { documentsAPI } from "../services/api";

const CATEGORIES = ["Identity", "Education", "Health", "Finance", "Vehicle", "Property", "Family", "Others"];
const EMOTIONS = ["trust", "professional", "success", "risk", "intelligence", "safety", "family", "reminder"];
const SENSITIVITIES = ["Low", "Medium", "High"];

export default function AddDocument() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    title: "", number: "", issueDate: "", expiryDate: "",
    category: "Identity", emotion: "professional", sensitivity: "Medium",
    description: "", status: "Verified",
  });
  const [customFields, setCustomFields] = useState([{ key: "", value: "" }]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleFieldChange(i, part, val) {
    setCustomFields((fields) => fields.map((f, idx) => idx === i ? { ...f, [part]: val } : f));
  }

  function addField() { setCustomFields((f) => [...f, { key: "", value: "" }]); }
  function removeField(i) { setCustomFields((f) => f.filter((_, idx) => idx !== i)); }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.title || !form.category) {
      setError("Title and category are required.");
      return;
    }
    setLoading(true); setError("");

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v); });

    // Build custom fields object (filter empty)
    const fieldsObj = {};
    customFields.forEach(({ key, value }) => { if (key.trim()) fieldsObj[key.trim()] = value; });
    fd.append("fields", JSON.stringify(fieldsObj));

    if (file) fd.append("file", file);

    try {
      await documentsAPI.create(fd);
      setSuccess(true);
      setTimeout(() => navigate("/documents"), 1200);
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Add Document</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">Upload a file — stored in MongoDB GridFS with metadata.</p>

      {success && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
          <CheckCircle2 size={20} /> Document saved successfully! Redirecting…
        </div>
      )}
      {error && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

        {/* Core fields */}
        <div className="grid gap-4 md:grid-cols-2">
          {[["title", "Document Title", "text"], ["number", "Document Number", "text"], ["issueDate", "Issue Date", "date"], ["expiryDate", "Expiry Date", "date"]].map(([name, label, type]) => (
            <label key={name} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {label}{name === "title" && <span className="text-red-500"> *</span>}
              <input name={name} type={type} value={form[name]} onChange={handleChange}
                required={name === "title"}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
          ))}
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Category <span className="text-red-500">*</span>
            <select name="category" value={form.category} onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Sensitivity
            <select name="sensitivity" value={form.sensitivity} onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              {SENSITIVITIES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Emotion Tag
            <select name="emotion" value={form.emotion} onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              {EMOTIONS.map((e) => <option key={e}>{e}</option>)}
            </select>
          </label>
          <label className="col-span-full block text-sm font-medium text-slate-700 dark:text-slate-200">
            Description
            <input name="description" value={form.description} onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Optional short description" />
          </label>
        </div>

        {/* File upload */}
        <div
          onClick={() => fileRef.current?.click()}
          className="cursor-pointer grid place-items-center rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50 p-8 text-center dark:border-indigo-800 dark:bg-indigo-950/40 hover:border-indigo-400 transition"
        >
          <UploadCloud className="text-indigo-600 dark:text-indigo-300" size={36} />
          <p className="mt-3 font-semibold text-slate-900 dark:text-white">
            {file ? file.name : "Click to upload file"}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">PDF, JPEG, PNG or WebP — max 20 MB</p>
          <input ref={fileRef} type="file" accept=".pdf,image/*" className="hidden"
            onChange={(e) => setFile(e.target.files[0] || null)} />
        </div>

        {/* Custom fields */}
        <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-950 dark:text-white">Custom Fields</h2>
            <button type="button" onClick={addField} className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              <Plus size={15} /> Add field
            </button>
          </div>
          <div className="space-y-3">
            {customFields.map((field, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input value={field.key} onChange={(e) => handleFieldChange(i, "key", e.target.value)}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-2 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white text-sm" placeholder="Field name" />
                <input value={field.value} onChange={(e) => handleFieldChange(i, "value", e.target.value)}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-2 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white text-sm" placeholder="Field value" />
                {customFields.length > 1 && (
                  <button type="button" onClick={() => removeField(i)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button disabled={loading} className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60" type="submit">
          {loading ? <Loader2 size={18} className="animate-spin" /> : null}
          {loading ? "Saving…" : "Save Document"}
        </button>
      </form>
    </div>
  );
}
