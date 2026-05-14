import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { lifeEventsAPI, documentsAPI } from "../services/api";
import { Loader2 } from "lucide-react";

const filters = ["All", "Education", "Health", "Identity", "Family", "Personal"];

export default function LifeGraph() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [graphData, setGraphData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [eventsRes, docsRes] = await Promise.all([
          lifeEventsAPI.list(),
          documentsAPI.list()
        ]);
        
        const events = eventsRes.data.data;
        const docs = docsRes.data.data;

        // Aggregate by year
        const yearMap = {};

        // Process Documents
        docs.forEach(doc => {
          if (!doc.issueDate) return;
          const year = doc.issueDate.substring(0, 4);
          if (!yearMap[year]) yearMap[year] = { year, count: 0, items: [], categories: new Set() };
          yearMap[year].count += 1;
          yearMap[year].items.push(`[Document] ${doc.title}`);
          yearMap[year].categories.add(doc.category || "Personal");
        });

        // Process Life Events
        events.forEach(ev => {
          if (!ev.date) return;
          const year = ev.date.substring(0, 4);
          if (!yearMap[year]) yearMap[year] = { year, count: 0, items: [], categories: new Set() };
          yearMap[year].count += 1;
          yearMap[year].items.push(`[Life Event] ${ev.title}`);
          // Default event mapping to categories could be improved, using "Personal"
          yearMap[year].categories.add("Personal");
        });

        const sortedData = Object.values(yearMap)
          .map(y => ({ ...y, categories: Array.from(y.categories) }))
          .sort((a, b) => a.year.localeCompare(b.year));

        setGraphData(sortedData);
        if (sortedData.length > 0) {
          setSelected(sortedData[sortedData.length - 1]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredData = graphData.filter(d => 
    activeFilter === "All" ? true : d.categories.includes(activeFilter)
  );

  if (loading) return <div className="flex justify-center py-24"><Loader2 size={36} className="animate-spin text-indigo-600" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Life Graph</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">A year-wise view of documents and life events, pulled dynamically from MongoDB.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full px-4 py-2 text-sm font-semibold ${activeFilter === filter ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300"}`} type="button">
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="h-[430px] rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {filteredData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} onClick={(event) => event?.activePayload?.[0]?.payload && setSelected(event.activePayload[0].payload)}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="year" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500">
              No data for this filter
            </div>
          )}
        </section>
        <aside className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {selected ? (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400">Selected year</p>
              <h2 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">{selected.year}</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{selected.count} documents/events found.</p>
              <div className="mt-5 space-y-3 overflow-y-auto max-h-[250px] pr-2">
                {selected.items.map((item, i) => (
                  <div key={i} className="rounded-2xl bg-indigo-50 p-4 font-medium text-sm text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">
                    {item}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500">
              Select a bar to view details
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
