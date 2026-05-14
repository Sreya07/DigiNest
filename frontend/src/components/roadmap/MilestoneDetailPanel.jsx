import { X, Calendar, FileText, Image as ImageIcon, Tag } from "lucide-react";

export default function MilestoneDetailPanel({ milestone, onClose }) {
  if (!milestone) return null;

  return (
    <div className="absolute top-4 right-4 bottom-4 w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 transform">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
        <div>
          <div className="flex gap-2 items-center mb-2">
            <span className="text-xs font-bold px-2 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-lg uppercase tracking-wider">
              {milestone.year}
            </span>
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg">
              {milestone.importance}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            {milestone.title}
          </h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 flex-1 overflow-y-auto space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <FileText size={16} className="text-slate-400" /> Description
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {milestone.description || "No description provided."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <span className="block text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
              <Tag size={14} /> Category
            </span>
            <span className="font-semibold text-slate-900 dark:text-white capitalize">
              {milestone.category}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <span className="block text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
              <Calendar size={14} /> Source
            </span>
            <span className="font-semibold text-slate-900 dark:text-white capitalize">
              {milestone.source}
            </span>
          </div>
        </div>

        {milestone.documents?.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <FileText size={16} className="text-emerald-500" /> Attached Documents
            </h3>
            <div className="space-y-2">
              {milestone.documents.map(doc => (
                <div key={doc.id} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <FileText size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{doc.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{doc.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {milestone.images?.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <ImageIcon size={16} className="text-blue-500" /> Memories
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {milestone.images.map(img => (
                <div key={img.id} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 overflow-hidden">
                  {img.url ? (
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={24} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex gap-3">
        <button className="flex-1 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          Edit
        </button>
        <button className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-colors">
          Add Document
        </button>
      </div>
    </div>
  );
}
