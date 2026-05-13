import { FileText, PenLine, Share2, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import ColorBadge from "./ColorBadge";

const emotionColors = {
  trust: { bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-200", gradient: "from-blue-600 to-cyan-500" },
  safety: { bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-700 dark:text-emerald-200", gradient: "from-emerald-500 to-green-400" },
  reminder: { bg: "bg-yellow-50 dark:bg-yellow-950", text: "text-yellow-700 dark:text-yellow-200", gradient: "from-yellow-400 to-amber-400" },
  success: { bg: "bg-orange-50 dark:bg-orange-950", text: "text-orange-700 dark:text-orange-200", gradient: "from-orange-500 to-amber-500" },
  family: { bg: "bg-pink-50 dark:bg-pink-950", text: "text-pink-700 dark:text-pink-200", gradient: "from-pink-500 to-rose-400" },
  intelligence: { bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-700 dark:text-purple-200", gradient: "from-purple-600 to-fuchsia-500" },
  risk: { bg: "bg-red-50 dark:bg-red-950", text: "text-red-700 dark:text-red-200", gradient: "from-red-600 to-rose-500" },
  professional: { bg: "bg-slate-50 dark:bg-slate-800", text: "text-slate-700 dark:text-slate-200", gradient: "from-slate-600 to-gray-500" },
};

export default function DocumentCard({ document }) {
  const emotion = document.emotion || "trust";
  const emotionColor = emotionColors[emotion];

  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Color header */}
      <div className={`h-2 bg-gradient-to-r ${emotionColor.gradient}`} />

      <div className="p-5 space-y-4">
        {/* Icon and Title */}
        <div className="flex items-start gap-3">
          <div className={`grid h-12 w-12 place-items-center rounded-lg ${emotionColor.bg} ${emotionColor.text} shrink-0`}>
            <FileText size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold text-slate-950 dark:text-white">{document.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{document.category}</p>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-3">
            <p className="text-slate-500 dark:text-slate-400 text-xs">Issued</p>
            <p className="font-medium text-slate-900 dark:text-white mt-1">{document.issueDate}</p>
          </div>
          <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-3">
            <p className="text-slate-500 dark:text-slate-400 text-xs">Expiry</p>
            <p className="font-medium text-slate-900 dark:text-white mt-1">{document.expiryDate}</p>
          </div>
        </div>

        {/* Status Badge */}
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
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              document.sensitivity === "High" 
                ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
                : "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
            }`}>
              {document.sensitivity} Sensitivity
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link 
            to={`/documents/${document.id}`} 
            className="rounded-lg bg-slate-900 dark:bg-white px-3 py-2 text-center font-medium text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition"
          >
            View
          </Link>
          <Link 
            to={`/share/${document.id}`} 
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-blue-50 dark:bg-blue-950 px-3 py-2 font-medium text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
          >
            <Share2 size={15} /> Share
          </Link>
          <Link
            to={`/mindmap?focus=${document.category}`}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-purple-50 dark:bg-purple-950 px-3 py-2 font-medium text-purple-700 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-900 transition"
          >
            <Brain size={15} /> Map
          </Link>
          <button 
            type="button" 
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-amber-50 dark:bg-amber-950 px-3 py-2 font-medium text-amber-700 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900 transition"
          >
            <PenLine size={15} /> Correct
          </button>
        </div>
      </div>
    </div>
  );
}
