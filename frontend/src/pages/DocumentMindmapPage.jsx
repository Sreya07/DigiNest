import { Zap, Book } from "lucide-react";
import DocumentMindmap from "../components/DocumentMindmap";
import { documents } from "../data/mockData";

export default function DocumentMindmapPage() {
  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Document Mindmap</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Explore your citizen data as an interconnected knowledge graph. Understand relationships between documents, fields, and sharing recommendations.
            </p>
          </div>
          <button className="flex shrink-0 items-center gap-2 rounded-lg bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700">
            <Zap size={18} />
            Generate AI Summary
          </button>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">How It Works</h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">The mindmap shows how your documents and data are connected. Each colored cluster represents a logical group of related information.</p>
        </div>
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Privacy First</h3>
          <p className="text-sm text-green-800 dark:text-green-200">Color coding helps you understand sensitivity levels. Highly sensitive fields can be toggled to remain hidden during sharing decisions.</p>
        </div>
        <div className="rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-950">
          <h3 className="font-semibold text-violet-900 dark:text-violet-100 mb-2">Smart Sharing</h3>
          <p className="text-sm text-purple-800 dark:text-purple-200">Get AI-powered recommendations on which fields are safe to share with different types of institutions.</p>
        </div>
      </div>

      <DocumentMindmap documents={documents} />

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
          <Book size={20} />
          Color Meanings
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500" />
            <span className="text-sm text-slate-700 dark:text-slate-300"><strong>Blue:</strong> Trust & Identity</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-green-400" />
            <span className="text-sm text-slate-700 dark:text-slate-300"><strong>Green:</strong> Safety & Health</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500" />
            <span className="text-sm text-slate-700 dark:text-slate-300"><strong>Purple:</strong> Intelligence & Education</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-400" />
            <span className="text-sm text-slate-700 dark:text-slate-300"><strong>Pink:</strong> Family & Relationships</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-amber-500" />
            <span className="text-sm text-slate-700 dark:text-slate-300"><strong>Orange:</strong> Success & Vehicles</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-slate-600 to-gray-500" />
            <span className="text-sm text-slate-700 dark:text-slate-300"><strong>Gray:</strong> Professional & Finance</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-amber-400" />
            <span className="text-sm text-slate-700 dark:text-slate-300"><strong>Yellow:</strong> Reminders & Actions</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-600 to-rose-500" />
            <span className="text-sm text-slate-700 dark:text-slate-300"><strong>Red:</strong> Risk & Urgent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
