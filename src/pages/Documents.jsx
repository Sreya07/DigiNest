import { Plus, Search, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DocumentCard from "../components/DocumentCard";
import { documents } from "../data/mockData";

const categoryColors = {
  All: { color: "from-slate-600 to-slate-500", icon: "📋" },
  Identity: { color: "from-blue-600 to-cyan-500", icon: "👤" },
  Education: { color: "from-purple-600 to-fuchsia-500", icon: "📚" },
  Health: { color: "from-emerald-500 to-green-400", icon: "❤️" },
  Finance: { color: "from-slate-600 to-gray-500", icon: "💳" },
  Vehicle: { color: "from-orange-500 to-amber-500", icon: "🚗" },
  Property: { color: "from-gray-700 to-slate-800", icon: "🏠" },
  Family: { color: "from-pink-500 to-rose-400", icon: "👨‍👩‍👧" },
  Others: { color: "from-slate-400 to-slate-500", icon: "📄" },
};

const categories = Object.keys(categoryColors);

export default function Documents() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return documents.filter((document) => {
      const matchesCategory = category === "All" || document.category === category;
      const matchesQuery = document.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const categoryStats = useMemo(() => {
    const stats = {};
    categories.forEach(cat => {
      if (cat === "All") {
        stats[cat] = documents.length;
      } else {
        stats[cat] = documents.filter(doc => doc.category === cat).length;
      }
    });
    return stats;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Document Wallet</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Verified records with color-coded emotions and privacy-first actions.</p>
        </div>
        <Link 
          to="/documents/add" 
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-3 font-semibold text-white transition shadow-lg"
        >
          <Plus size={18} /> Add Document
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 shadow-sm">
        <Search className="text-slate-400" size={19} />
        <input 
          value={query} 
          onChange={(event) => setQuery(event.target.value)} 
          className="w-full bg-transparent outline-none dark:text-white placeholder-slate-400" 
          placeholder="Search by document title..." 
        />
      </div>

      {/* Category Filter with Colors */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Filter by Emotion & Category</p>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((cat) => {
            const isActive = category === cat;
            const categoryInfo = categoryColors[cat];
            const count = categoryStats[cat] || 0;

            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`group relative overflow-hidden rounded-lg p-4 transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-br ${categoryInfo.color} text-white shadow-lg scale-105`
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{categoryInfo.icon}</div>
                  <p className={`font-bold text-sm ${isActive ? "text-white" : "text-slate-900 dark:text-white"}`}>
                    {cat}
                  </p>
                  <p className={`text-xs mt-1 ${isActive ? "text-white/80" : "text-slate-600 dark:text-slate-400"}`}>
                    {count} {count === 1 ? "doc" : "docs"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-700">
        <p className="font-medium text-slate-700 dark:text-slate-300">
          Showing <span className="font-bold text-slate-950 dark:text-white">{filtered.length}</span> document{filtered.length !== 1 ? "s" : ""}
          {category !== "All" && ` in ${category}`}
          {query && ` matching "${query}"`}
        </p>
        {filtered.length === 0 && (
          <Link to="/documents/add" className="text-sm font-semibold text-blue-600 hover:underline">
            Add one now →
          </Link>
        )}
      </div>

      {/* Documents Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
            <Zap size={48} className="mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No documents found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search or filters</p>
            <Link 
              to="/documents/add"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Add First Document
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
