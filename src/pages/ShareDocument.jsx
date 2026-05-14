import { Eye, EyeOff, LockKeyhole, ShieldCheck, X, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { documentsAPI, consentsAPI } from "../services/api";

const durations = ["10 minutes", "1 hour", "1 day", "7 days", "Custom"];

export default function ShareDocument() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selected, setSelected] = useState([]);
  const [duration, setDuration] = useState("10 minutes");
  const [organization, setOrganization] = useState("");
  const [purpose, setPurpose] = useState("");
  const [success, setSuccess] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    async function fetchDoc() {
      try {
        const { data } = await documentsAPI.get(id);
        setDocument(data.data);
        const allFields = Object.keys(data.data.fields || {});
        // Select first 3 by default if available
        setSelected(allFields.slice(0, 3));
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load document.");
      } finally {
        setLoading(false);
      }
    }
    fetchDoc();
  }, [id]);

  const allFields = useMemo(() => document ? Object.keys(document.fields || {}) : [], [document]);
  const hidden = useMemo(() => allFields.filter((field) => !selected.includes(field)), [selected, allFields]);

  function toggle(field) {
    setSelected((items) => (items.includes(field) ? items.filter((item) => item !== field) : [...items, field]));
  }

  async function handleShare() {
    if (!organization || !purpose) {
      setError("Please provide a requester organization and purpose.");
      return;
    }
    setSharing(true);
    setError("");
    try {
      // For the demo, we create an "Approved" consent request directly to simulate a share
      await consentsAPI.create({
        requester: organization,
        purpose,
        document: document.title,
        fields: selected,
        duration,
        sensitivity: document.sensitivity || "Medium",
        status: "Approved"
      });
      setSuccess(true);
      setTimeout(() => navigate("/history"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to share document.");
      setSharing(false);
    }
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 size={36} className="animate-spin text-indigo-600" /></div>;
  if (!document) return <div className="p-6 text-red-500">Document not found</div>;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Selective sharing demo</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">Share only what is needed</h1>
        <p className="mt-2 max-w-3xl text-slate-500 dark:text-slate-400">Choose exact document fields, set a time limit, and generate consent-based access that expires automatically.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <section className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5 dark:from-slate-800 dark:to-indigo-950">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-600 text-white">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Selected document</p>
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{document.title}</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{document.category} - {document.status}</p>
              </div>
            </div>
          </div>

          <h3 className="mt-6 text-lg font-bold text-slate-950 dark:text-white">Field permissions</h3>
          {allFields.length === 0 ? (
            <p className="mt-2 text-slate-500">No custom fields found to share.</p>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {allFields.map((field) => (
                <label key={field} className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${selected.includes(field) ? "border-indigo-300 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-950" : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"}`}>
                  <span className="font-medium text-slate-800 dark:text-slate-100">{field}</span>
                  <input checked={selected.includes(field)} onChange={() => toggle(field)} type="checkbox" className="h-5 w-5 accent-indigo-600" />
                </label>
              ))}
            </div>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Requester organization name <span className="text-red-500">*</span>
              <input value={organization} onChange={(event) => setOrganization(event.target.value)} placeholder="e.g. City Bank" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Purpose <span className="text-red-500">*</span>
              <input value={purpose} onChange={(event) => setPurpose(event.target.value)} placeholder="e.g. Loan verification" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
          </div>

          <h3 className="mt-6 text-lg font-bold text-slate-950 dark:text-white">Access duration</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {durations.map((item) => (
              <button key={item} onClick={() => setDuration(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${duration === item ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`} type="button">
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-white to-indigo-50 p-6 shadow-xl shadow-indigo-100 dark:border-slate-800 dark:from-slate-900 dark:to-indigo-950 dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500 text-white">
              <LockKeyhole size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Live sharing preview</p>
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{organization || "Requester"}</h2>
            </div>
          </div>
          <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Purpose</p>
            <p className="font-semibold text-slate-950 dark:text-white">{purpose || "Purpose will appear here"}</p>
          </div>
          <div className="mt-5 grid gap-3">
            {selected.map((field) => (
              <div key={field} className="flex items-center justify-between rounded-2xl bg-emerald-50 p-4 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                <span><b>{field}</b>: {document.fields[field] || "Selected for sharing"}</span>
                <Eye size={18} />
              </div>
            ))}
            {hidden.map((field) => (
              <div key={field} className="flex items-center justify-between rounded-2xl bg-slate-100 p-4 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <span><b>{field}</b>: Hidden</span>
                <EyeOff size={18} />
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            <p className="font-bold">Duration: {duration}</p>
            <p className="mt-1 text-sm">Access will expire automatically after the selected time.</p>
          </div>
          <button disabled={sharing || allFields.length === 0} onClick={handleShare} className="mt-6 flex justify-center items-center gap-2 w-full rounded-2xl bg-indigo-600 px-5 py-4 font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 dark:shadow-none disabled:opacity-50" type="button">
            {sharing ? <Loader2 size={18} className="animate-spin" /> : null}
            {sharing ? "Generating Link..." : "Generate Share Request"}
          </button>
        </section>
      </div>

      {success && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 text-center">
            <ShieldCheck className="text-emerald-500 mx-auto" size={48} />
            <h2 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">Share request generated</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Selected fields were shared. Access history updated.</p>
            <Loader2 className="animate-spin mx-auto mt-4 text-indigo-500" size={24} />
          </div>
        </div>
      )}
    </div>
  );
}
