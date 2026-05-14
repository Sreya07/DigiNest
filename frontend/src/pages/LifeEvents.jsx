import { Plus, Upload, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useLifeMilestones } from "../context/LifeMilestonesContext";
import LifeRoadmapCanvas from "../components/roadmap/LifeRoadmapCanvas";
import { useState, useMemo } from "react";

export default function LifeEvents() {
  const { lifeMilestones } = useLifeMilestones();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "identity", label: "Identity" },
    { id: "education", label: "Education" },
    { id: "career", label: "Career" },
    { id: "family", label: "Family" },
    { id: "health", label: "Health" },
    { id: "finance", label: "Finance" },
    { id: "property", label: "Property" },
    { id: "other", label: "Personal" },
  ];

  const filteredMilestones = useMemo(() => {
    if (activeFilter === "all") return lifeMilestones;
    // Map "other" to personal, etc. if needed, but we use the ID exactly as category
    return lifeMilestones.filter(m => m.category === activeFilter);
  }, [lifeMilestones, activeFilter]);

  return (
    <div className="space-y-6 h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Life Roadmap</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Your documents, memories, and milestones arranged as a living journey.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/documents/add" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-3 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Upload size={18} /> Upload Document
          </Link>
          <Link to="/life-events/add" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
            <Plus size={18} /> Add Life Event
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 shrink-0">
        <div className="flex items-center gap-2 mr-2 text-slate-400 dark:text-slate-500">
          <Filter size={16} />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === filter.id
                ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900 shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800"
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex-1 relative rounded-[2rem] overflow-hidden shadow-sm border border-slate-200/50 dark:border-slate-800/50">
        <LifeRoadmapCanvas milestones={filteredMilestones} />
      </div>
    </div>
  );
}
