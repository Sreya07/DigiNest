import {
  BookOpen,
  BriefcaseBusiness,
  Car,
  FileText,
  HeartPulse,
  Home,
  IdCard,
  Plus,
  Search,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DocumentCard from "../components/DocumentCard";
import { documents as localDocuments } from "../data/mockData";
import { listDocuments } from "../services/api";

const categoryMeta = {
  All: { Icon: FileText, className: "text-slate-700 bg-slate-100 dark:text-slate-200 dark:bg-slate-800" },
  Identity: { Icon: IdCard, className: "text-blue-700 bg-blue-50 dark:text-blue-200 dark:bg-blue-950" },
  Education: { Icon: BookOpen, className: "text-violet-700 bg-violet-50 dark:text-violet-200 dark:bg-violet-950" },
  Health: { Icon: HeartPulse, className: "text-emerald-700 bg-emerald-50 dark:text-emerald-200 dark:bg-emerald-950" },
  Finance: { Icon: WalletCards, className: "text-slate-700 bg-slate-100 dark:text-slate-200 dark:bg-slate-800" },
  Vehicle: { Icon: Car, className: "text-orange-700 bg-orange-50 dark:text-orange-200 dark:bg-orange-950" },
  Property: { Icon: Home, className: "text-slate-700 bg-slate-100 dark:text-slate-200 dark:bg-slate-800" },
  Family: { Icon: Users, className: "text-rose-700 bg-rose-50 dark:text-rose-200 dark:bg-rose-950" },
  Others: { Icon: BriefcaseBusiness, className: "text-slate-700 bg-slate-100 dark:text-slate-200 dark:bg-slate-800" },
};

const categories = Object.keys(categoryMeta);

export default function Documents() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState(localDocuments);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    listDocuments({ category, query }).then((items) => {
      if (mounted) {
        setFiltered(items);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [category, query]);

  const categoryStats = useMemo(() => {
    return categories.reduce((stats, item) => {
      stats[item] = item === "All" ? localDocuments.length : localDocuments.filter((doc) => doc.category === item).length;
      return stats;
    }, {});
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Document Wallet</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Verified records, clean filters, and consent-first actions.</p>
        </div>
        <Link
          to="/documents/add"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} /> Add Document
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Search className="text-slate-400" size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent outline-none placeholder-slate-400 dark:text-white"
            placeholder="Search by title, number, or category"
          />
        </label>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <span className="font-semibold text-slate-950 dark:text-white">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
          {loading && <span className="ml-2 text-blue-600 dark:text-blue-300">syncing</span>}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((item) => {
          const isActive = category === item;
          const { Icon, className } = categoryMeta[item];

          return (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-lg border p-3 text-left transition ${
                isActive
                  ? "border-blue-300 bg-blue-50 ring-2 ring-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:ring-blue-950"
                  : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              }`}
              type="button"
            >
              <div className="flex items-center gap-3">
                <div className={`grid h-10 w-10 place-items-center rounded-lg ${className}`}>
                  <Icon size={19} />
                </div>
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">{item}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{categoryStats[item] || 0} records</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((document) => <DocumentCard key={document.id} document={document} />)
        ) : (
          <div className="col-span-full rounded-lg border-2 border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
            <Zap size={44} className="mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No documents found</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Try another search term or category filter.</p>
            <Link
              to="/documents/add"
              className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700"
            >
              Add First Document
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
