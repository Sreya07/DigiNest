import { Clock, ExternalLink, History, Share2, Sparkles, X, Loader2, AlertCircle, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { documentsAPI } from "../services/api";

export default function DocumentDetails() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summaryAllowed, setSummaryAllowed] = useState(false);
  const [correctionOpen, setCorrectionOpen] = useState(false);

  useEffect(() => {
    async function fetchDoc() {
      try {
        const { data } = await documentsAPI.get(id);
        setDoc(data.data);
      } catch (err) {
        setError(err.response?.data?.error || "Document not found.");
      } finally {
        setLoading(false);
      }
    }
    fetchDoc();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center py-24"><Loader2 size={36} className="animate-spin text-indigo-600" /></div>
  );

  if (error || !doc) return (
    <div className="flex items-center gap-3 rounded-xl bg-red-50 p-6 text-red-700 dark:bg-red-950 dark:text-red-300">
      <AlertCircle size={22} /> {error || "Document not found."}
    </div>
  );

  const fields = doc.fields instanceof Map ? Object.fromEntries(doc.fields) : (doc.fields || {});
  const fileUrl = documentsAPI.fileUrl(doc._id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">{doc.title}</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Consent-aware document view.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {doc.fileId ? (
            <div className="rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[4/3] flex items-center justify-center">
              {doc.fileContentType?.startsWith("image/") ? (
                <img src={fileUrl} alt={doc.title} className="w-full h-full object-contain" />
              ) : (
                <div className="text-center p-6">
                  <p className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wide">PDF Document</p>
                  <p className="mt-2 font-bold text-slate-900 dark:text-white">{doc.title}</p>
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                    <Download size={16} /> View PDF
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="grid aspect-[4/3] place-items-center rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-indigo-950 text-center">
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">No file attached</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{doc.title}</h2>
                <p className="mt-2 text-slate-500 dark:text-slate-300">{doc.number}</p>
              </div>
            </div>
          )}
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">Category<br /><b>{doc.category}</b></div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">Status<br /><b>{doc.status}</b></div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">Issued<br /><b>{doc.issueDate || "—"}</b></div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">Expiry<br /><b>{doc.expiryDate || "Lifetime"}</b></div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">Document Fields</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Object.entries(fields).length > 0 ? Object.entries(fields).map(([key, value]) => (
                <div key={key} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{key}</p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">{value}</p>
                </div>
              )) : (
                <p className="text-slate-500 col-span-2">No custom fields.</p>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link to={`/share/${doc._id}`} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white">
              <Share2 size={18} /> Share Selected Fields
            </Link>
            <button onClick={() => setSummaryOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-200" type="button">
              <Sparkles size={18} /> Generate AI Summary
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200" type="button">
              <Clock size={18} /> Set Reminder
            </button>
            <button onClick={() => setCorrectionOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-200" type="button">
              <ExternalLink size={18} /> Correct on Official Site
            </button>
            <Link to="/history" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white dark:bg-white dark:text-slate-950">
              <History size={18} /> View Access History
            </Link>
            {doc.fileId && (
              <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-50 px-4 py-3 font-semibold text-purple-700 dark:bg-purple-950 dark:text-purple-200">
                <Download size={18} /> Download File
              </a>
            )}
          </div>
        </div>
      </div>

      {summaryOpen && (
        <Modal onClose={() => setSummaryOpen(false)}>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">AI Summary Permission</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Allow AI to read this document and generate a simple summary?</p>
          {!summaryAllowed ? (
            <button onClick={() => setSummaryAllowed(true)} className="mt-5 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white" type="button">Allow and generate</button>
          ) : (
            <div className="mt-5 rounded-2xl bg-indigo-50 p-4 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">
              {doc.title} is verified, linked to your profile, and can be shared with selected fields only. Sensitive fields remain hidden unless explicitly selected.
            </div>
          )}
        </Modal>
      )}

      {correctionOpen && (
        <Modal onClose={() => setCorrectionOpen(false)}>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Official Update Portal</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">You will be redirected to the official government portal to update this document.</p>
          <button className="mt-5 rounded-2xl bg-amber-500 px-5 py-3 font-semibold text-white" type="button">Continue to portal</button>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
        <button onClick={onClose} className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-slate-100 dark:bg-slate-800" type="button" aria-label="Close modal"><X size={18} /></button>
        {children}
      </div>
    </div>
  );
}
