import { X, BookOpen, Fingerprint, Heart, Users, CreditCard, Car, Home, ShieldCheck, Bell } from "lucide-react";
import ColorBadge from "./ColorBadge";

const iconMap = {
  Fingerprint,
  BookOpen,
  Heart,
  Users,
  CreditCard,
  Car,
  Home,
  ShieldCheck,
  Bell,
};

export default function MindmapDetailPanel({ 
  branch, 
  onClose, 
  documents,
  showSensitiveFields = false 
}) {
  if (!branch) return null;

  const Icon = iconMap[branch.icon];
  const branchDocs = documents.filter(doc => branch.documents.includes(doc.id));

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 shadow-2xl overflow-y-auto z-50 flex flex-col">
      {/* Header */}
      <div className={`sticky top-0 bg-gradient-to-br ${branch.color} text-white p-6 shadow-lg`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {Icon && <Icon size={28} />}
              <h2 className="text-2xl font-bold">{branch.label}</h2>
            </div>
            <p className="text-sm opacity-90">{branch.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Sensitivity Level */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Sensitivity Level</h3>
          <ColorBadge 
            status={branch.sensitivity === "high" ? "risk" : branch.sensitivity === "medium" ? "pending" : "verified"}
          />
        </div>

        {/* Documents in Branch */}
        {branchDocs.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Documents</h3>
            <div className="space-y-2">
              {branchDocs.map(doc => (
                <div key={doc.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{doc.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{doc.category}</p>
                  </div>
                  <ColorBadge 
                    status={doc.status === "Verified" ? "verified" : doc.status === "Expires in 45 days" ? "expiring" : "pending"}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fields */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Key Fields</h3>
          <div className="space-y-2">
            {branch.fields.map((field, idx) => (
              <div 
                key={idx}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  field.sensitivity === "high" && !showSensitiveFields
                    ? "bg-red-50 dark:bg-red-900/20"
                    : "bg-slate-50 dark:bg-slate-800"
                }`}
              >
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">{field.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{field.sensitivity} sensitivity</p>
                </div>
                {field.sensitivity === "high" && !showSensitiveFields && (
                  <div className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">Hidden</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sharing Recommendation */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Sharing Recommendation</h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">{branch.recommendation}</p>
        </div>

        {/* Related Reminders */}
        {branch.relatedReminders.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Related Reminders</h3>
            <div className="space-y-2">
              {branch.relatedReminders.map((reminder, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <Bell size={14} className="text-yellow-600 dark:text-yellow-400 shrink-0" />
                  <span className="text-sm text-yellow-800 dark:text-yellow-200">{reminder}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-4 space-y-2">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">
          Generate AI Summary
        </button>
        <button className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium py-2 rounded-lg transition">
          Share This Cluster
        </button>
      </div>
    </div>
  );
}
