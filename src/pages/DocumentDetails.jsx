import { Clock, ExternalLink, History, Share2, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { documents } from "../data/mockData";

export default function DocumentDetails() {
  const { id } = useParams();
  const document = documents.find((item) => item.id === id) || documents[0];
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summaryAllowed, setSummaryAllowed] = useState(false);
  const [correctionOpen, setCorrectionOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">{document.title}</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Detailed view with consent-aware actions.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid aspect-[4/3] place-items-center rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 text-center dark:from-slate-800 dark:to-indigo-950">
            <div>
              <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">Document preview</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{document.title}</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-300">{document.number}</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">Category<br /><b>{document.category}</b></div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">Status<br /><b>{document.status}</b></div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">Issued<br /><b>{document.issueDate}</b></div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">Expiry<br /><b>{document.expiryDate}</b></div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">Document fields</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Object.entries(document.fields).map(([key, value]) => (
                <div key={key} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{key}</p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link to={`/share/${document.id}`} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white"><Share2 size={18} /> Share Selected Fields</Link>
            <button onClick={() => setSummaryOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-200" type="button"><Sparkles size={18} /> Generate AI Summary</button>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200" type="button"><Clock size={18} /> Set Reminder</button>
            <button onClick={() => setCorrectionOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-200" type="button"><ExternalLink size={18} /> Correct/Update on Official Site</button>
            <Link to="/history" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white dark:bg-white dark:text-slate-950"><History size={18} /> View Access History</Link>
          </div>
        </div>
      </div>

      {summaryOpen && (
        <Modal onClose={() => setSummaryOpen(false)}>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">AI summary permission</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Do you allow AI to read this document and generate a simple summary?</p>
          {!summaryAllowed ? (
            <button onClick={() => setSummaryAllowed(true)} className="mt-5 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white" type="button">Allow and generate</button>
          ) : (
            <div className="mt-5 rounded-2xl bg-indigo-50 p-4 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">
              This {document.title} is verified, linked to your profile, and can be shared with selected fields only. Sensitive fields remain hidden unless you explicitly select them.
            </div>
          )}
        </Modal>
      )}

      {correctionOpen && (
        <Modal onClose={() => setCorrectionOpen(false)}>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Official update portal</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">You will be redirected to the official government portal to update this document.</p>
          <button className="mt-5 rounded-2xl bg-amber-500 px-5 py-3 font-semibold text-white" type="button">Continue mock redirect</button>
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
