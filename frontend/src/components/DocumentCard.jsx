import { FileText, PenLine, Share2, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import ColorBadge from "./ColorBadge";

const emotionColors = {
  trust: { bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-200", bar: "bg-blue-600" },
  safety: { bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-700 dark:text-emerald-200", bar: "bg-emerald-500" },
  reminder: { bg: "bg-amber-50 dark:bg-amber-950", text: "text-amber-700 dark:text-amber-200", bar: "bg-amber-400" },
  success: { bg: "bg-orange-50 dark:bg-orange-950", text: "text-orange-700 dark:text-orange-200", bar: "bg-orange-500" },
  family: { bg: "bg-rose-50 dark:bg-rose-950", text: "text-rose-700 dark:text-rose-200", bar: "bg-rose-500" },
  intelligence: { bg: "bg-violet-50 dark:bg-violet-950", text: "text-violet-700 dark:text-violet-200", bar: "bg-violet-600" },
  risk: { bg: "bg-red-50 dark:bg-red-950", text: "text-red-700 dark:text-red-200", bar: "bg-red-600" },
  professional: { bg: "bg-slate-50 dark:bg-slate-800", text: "text-slate-700 dark:text-slate-200", bar: "bg-slate-600" },
};

export default function DocumentCard({ document }) {
  const emotion = document.emotion || "trust";
  const emotionColor = emotionColors[emotion];

  return (
    <div className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className={`h-1 ${emotionColor.bar}`} />

      <div className="p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className={`grid h-12 w-12 place-items-center rounded-lg ${emotionColor.bg} ${emotionColor.text} shrink-0`}>
            <FileText size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold text-slate-950 dark:text-white">{document.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{document.category}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-xs">Issued</p>
            <p className="font-medium text-slate-900 dark:text-white mt-1">{document.issueDate}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-xs">Expiry</p>
            <p className="font-medium text-slate-900 dark:text-white mt-1">{document.expiryDate}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <ColorBadge
            status={
              document.status === "Verified" ? "verified" :
                document.status && document.status.includes("Expir") ? "expiring" :
                  "pending"
            }
            size="sm"
          />
          {document.sensitivity && (
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${document.sensitivity === "High"
                ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
                : "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
              }`}>
              {document.sensitivity} Sensitivity
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link
            to={`/documents/${document.id}`}
            className="rounded-lg bg-slate-900 px-3 py-2 text-center font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
          >
            View
          </Link>
          <Link
            to={`/share/${document.id}`}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-700 transition hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-200 dark:hover:bg-blue-900"
          >
            <Share2 size={15} /> Share
          </Link>
          <Link
            to={`/mindmap?focus=${document.category}`}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-violet-50 px-3 py-2 font-medium text-violet-700 transition hover:bg-violet-100 dark:bg-violet-950 dark:text-violet-200 dark:hover:bg-violet-900"
          >
            <Brain size={15} /> Map
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-amber-50 px-3 py-2 font-medium text-amber-700 transition hover:bg-amber-100 dark:bg-amber-950 dark:text-amber-200 dark:hover:bg-amber-900"
          >
            <PenLine size={15} /> Correct
          </button>
        </div>
      </div>
    </div>
  );
}
