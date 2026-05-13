import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { graphData } from "../data/mockData";

const filters = ["Education", "Health", "Identity", "Family", "Personal"];

export default function LifeGraph() {
  const [activeFilter, setActiveFilter] = useState("Education");
  const [selected, setSelected] = useState(graphData[graphData.length - 1]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Life graph</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">A year-wise view of documents and life events.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full px-4 py-2 text-sm font-semibold ${activeFilter === filter ? "bg-indigo-600 text-white" : "bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300"}`} type="button">
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="h-[430px] rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={graphData} onClick={(event) => event?.activePayload?.[0]?.payload && setSelected(event.activePayload[0].payload)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <aside className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Selected year</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">{selected.year}</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{selected.count} documents/events found. Filter focus: {activeFilter}.</p>
          <div className="mt-5 space-y-3">
            {selected.items.map((item) => (
              <div key={item} className="rounded-2xl bg-indigo-50 p-4 font-semibold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">{item}</div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
