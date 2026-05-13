import { Plus, Settings2, X } from "lucide-react";
import { useState } from "react";
import { familyMembers } from "../data/mockData";

export default function FamilyGroup() {
  const [members, setMembers] = useState(familyMembers);
  const [modal, setModal] = useState(null);

  function addMember(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setMembers((items) => [
      ...items,
      { id: Date.now(), name: data.get("name"), relation: data.get("relation"), permissions: ["Can View"] },
    ]);
    setModal(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Family group</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Manage family documents with clear permission boundaries.</p>
        </div>
        <button onClick={() => setModal("add")} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white" type="button">
          <Plus size={18} /> Add family member
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {members.map((member) => (
          <div key={member.id} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-400 text-lg font-bold text-white">
              {member.relation[0]}
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">{member.name}</h2>
            <p className="text-slate-500 dark:text-slate-400">{member.relation}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Can View", "Can Edit", "Can Share"].map((permission) => (
                <span key={permission} className={`rounded-full px-3 py-1 text-xs font-semibold ${member.permissions.includes(permission) ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200" : "bg-slate-100 text-slate-400 dark:bg-slate-800"}`}>
                  {permission}
                </span>
              ))}
            </div>
            <button onClick={() => setModal("permission")} className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200" type="button">
              <Settings2 size={17} /> Edit permissions
            </button>
          </div>
        ))}
      </div>

      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Child document section</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {["Birth Certificate", "Vaccination Record", "School Admission Document"].map((item) => (
            <div key={item} className="rounded-2xl bg-blue-50 p-5 font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-200">{item}</div>
          ))}
        </div>
      </section>

      {modal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <button onClick={() => setModal(null)} className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-slate-100 dark:bg-slate-800" type="button" aria-label="Close modal"><X size={18} /></button>
            {modal === "add" ? (
              <form onSubmit={addMember}>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">Add family member</h2>
                <input name="name" required className="mt-5 w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Name" />
                <input name="relation" required className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Relation" />
                <button className="mt-5 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white" type="submit">Add member</button>
              </form>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">Permission editor</h2>
                <p className="mt-3 text-slate-600 dark:text-slate-300">Toggle Can View, Can Edit, and Can Share permissions in a real implementation. This visual editor is mocked for the demo.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
