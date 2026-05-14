import { Plus, Settings2, X, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { familyAPI } from "../services/api";

const PERMISSIONS = ["Can View", "Can Edit", "Can Share"];

export default function FamilyGroup() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null); // "add" | { type:"permission", member }
  const [editMember, setEditMember] = useState(null);

  useEffect(() => { fetchMembers(); }, []);

  async function fetchMembers() {
    setLoading(true); setError("");
    try {
      const { data } = await familyAPI.list();
      setMembers(data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load family members.");
    } finally { setLoading(false); }
  }

  async function addMember(event) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    try {
      const { data } = await familyAPI.add({
        name: fd.get("name"),
        relation: fd.get("relation"),
        permissions: ["Can View"],
      });
      setMembers((m) => [...m, data.data]);
      setModal(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add member.");
    }
  }

  async function removeMember(id) {
    try {
      await familyAPI.remove(id);
      setMembers((m) => m.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to remove member.");
    }
  }

  async function togglePermission(memberId, perm) {
    const member = members.find((m) => m._id === memberId);
    if (!member) return;
    const current = member.permissions || [];
    const updated = current.includes(perm)
      ? current.filter((p) => p !== perm)
      : [...current, perm];
    try {
      const { data } = await familyAPI.update(memberId, { permissions: updated });
      setMembers((m) => m.map((item) => item._id === memberId ? data.data : item));
      if (editMember?._id === memberId) setEditMember(data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update permissions.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Family Group</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Manage family documents with clear permission boundaries.</p>
        </div>
        <button onClick={() => setModal("add")}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700" type="button">
          <Plus size={18} /> Add family member
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 size={36} className="animate-spin text-indigo-600" /></div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-4">
          {members.map((member) => (
            <div key={member._id} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-400 text-lg font-bold text-white">
                {member.relation?.[0] || "?"}
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">{member.name}</h2>
              <p className="text-slate-500 dark:text-slate-400">{member.relation}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {PERMISSIONS.map((perm) => (
                  <span key={perm} className={`rounded-full px-3 py-1 text-xs font-semibold ${(member.permissions || []).includes(perm) ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200" : "bg-slate-100 text-slate-400 dark:bg-slate-800"}`}>
                    {perm}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <button onClick={() => { setEditMember(member); setModal("permission"); }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200 text-sm" type="button">
                  <Settings2 size={15} /> Permissions
                </button>
                <button onClick={() => removeMember(member._id)}
                  className="rounded-2xl bg-red-50 px-3 py-2 text-red-500 hover:bg-red-100 dark:bg-red-950 dark:text-red-300" type="button">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {members.length === 0 && (
            <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
              <p className="text-slate-500 dark:text-slate-400">No family members yet. Add one to get started.</p>
            </div>
          )}
        </div>
      )}

      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Child Document Section</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {["Birth Certificate", "Vaccination Record", "School Admission Document"].map((item) => (
            <div key={item} className="rounded-2xl bg-blue-50 p-5 font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-200">{item}</div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <button onClick={() => { setModal(null); setEditMember(null); }}
              className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-slate-100 dark:bg-slate-800" type="button" aria-label="Close">
              <X size={18} />
            </button>

            {modal === "add" ? (
              <form onSubmit={addMember}>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">Add family member</h2>
                <input name="name" required className="mt-5 w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-white outline-none" placeholder="Name" />
                <input name="relation" required className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-white outline-none" placeholder="Relation (e.g. Mother)" />
                <button className="mt-5 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700" type="submit">Add member</button>
              </form>
            ) : editMember ? (
              <div>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">Edit Permissions — {editMember.name}</h2>
                <div className="mt-5 space-y-3">
                  {PERMISSIONS.map((perm) => (
                    <label key={perm} className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                      <span className="font-medium text-slate-800 dark:text-slate-100">{perm}</span>
                      <input type="checkbox"
                        checked={(editMember.permissions || []).includes(perm)}
                        onChange={() => togglePermission(editMember._id, perm)}
                        className="h-5 w-5 accent-indigo-600" />
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
