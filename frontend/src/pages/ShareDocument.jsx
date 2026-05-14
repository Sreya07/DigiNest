import { Eye, EyeOff, LockKeyhole, ShieldCheck, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { documents } from "../data/mockData";
import { createShareLink } from "../services/api";

const allFields = ["Name", "Date of Birth", "Address", "Last 4 Digits", "Document Number", "Issue Date", "Expiry Date", "Photo"];
const durations = ["10 minutes", "1 hour", "1 day", "7 days", "Custom"];

export default function ShareDocument() {
  const { id } = useParams();
  const document = documents.find((item) => item.id === id) || documents[0];
  const [selected, setSelected] = useState(["Name", "Last 4 Digits", "Issue Date"]);
  const [duration, setDuration] = useState("10 minutes");
  const [organization, setOrganization] = useState("City Scholarship Board");
  const [purpose, setPurpose] = useState("Eligibility verification");
  const [success, setSuccess] = useState(false);
  const [shareLink, setShareLink] = useState(null);

  const hidden = useMemo(() => allFields.filter((field) => !selected.includes(field)), [selected]);

  function toggle(field) {
    setSelected((items) => (items.includes(field) ? items.filter((item) => item !== field) : [...items, field]));
  }

  function generateShareRequest() {
    createShareLink({
      documentId: document.id,
      requester: organization,
      purpose,
      fields: selected,
      duration,
    }).then((link) => {
      setShareLink(link);
      setSuccess(true);
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Selective sharing demo</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">Share only what is needed</h1>
        <p className="mt-2 max-w-3xl text-slate-500 dark:text-slate-400">Choose exact document fields, set a time limit, and generate consent-based access that expires automatically.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="rounded-lg bg-blue-50 p-5 dark:bg-blue-950/40">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-blue-600 text-white">
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
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {allFields.map((field) => (
              <label key={field} className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition ${selected.includes(field) ? "border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950" : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"}`}>
                <span className="font-medium text-slate-800 dark:text-slate-100">{field}</span>
                <input checked={selected.includes(field)} onChange={() => toggle(field)} type="checkbox" className="h-5 w-5 accent-indigo-600" />
              </label>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Requester organization name
              <input value={organization} onChange={(event) => setOrganization(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Purpose
              <input value={purpose} onChange={(event) => setPurpose(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
          </div>

          <h3 className="mt-6 text-lg font-bold text-slate-950 dark:text-white">Access duration</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {durations.map((item) => (
              <button key={item} onClick={() => setDuration(item)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${duration === item ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`} type="button">
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-emerald-500 text-white">
              <LockKeyhole size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Live sharing preview</p>
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{organization || "Requester"}</h2>
            </div>
          </div>
          <div className="mt-6 rounded-lg bg-slate-50 p-5 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Purpose</p>
            <p className="font-semibold text-slate-950 dark:text-white">{purpose || "Purpose will appear here"}</p>
          </div>
          <div className="mt-5 grid gap-3">
            {selected.map((field) => (
              <div key={field} className="flex items-center justify-between rounded-lg bg-emerald-50 p-4 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                <span><b>{field}</b>: {document.fields[field] || "Selected for sharing"}</span>
                <Eye size={18} />
              </div>
            ))}
            {hidden.map((field) => (
              <div key={field} className="flex items-center justify-between rounded-lg bg-slate-100 p-4 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <span><b>{field}</b>: Hidden</span>
                <EyeOff size={18} />
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            <p className="font-bold">Duration: {duration}</p>
            <p className="mt-1 text-sm">Access will expire automatically after the selected time.</p>
          </div>
          <button onClick={generateShareRequest} className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-4 font-bold text-white shadow-sm hover:bg-blue-700" type="button">
            Generate Share Request
          </button>
        </section>
      </div>

      {success && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl dark:bg-slate-900">
            <button onClick={() => setSuccess(false)} className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-slate-100 dark:bg-slate-800" type="button" aria-label="Close success modal"><X size={18} /></button>
            <ShieldCheck className="text-emerald-500" size={42} />
            <h2 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">Share request generated</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Selected fields were shared for the selected duration. Access will expire automatically.</p>
            {shareLink && (
              <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Request ID: <span className="font-semibold text-slate-950 dark:text-white">{shareLink.id}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
