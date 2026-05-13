import { ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <form onSubmit={(event) => { event.preventDefault(); navigate("/dashboard"); }} className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500 text-white">
          <ShieldCheck size={28} />
        </div>
        <h1 className="mt-5 text-center text-3xl font-bold text-slate-950 dark:text-white">Create your nest</h1>
        <p className="mt-2 text-center text-slate-500 dark:text-slate-400">Mock registration keeps the prototype fast.</p>
        <label className="mt-8 block text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
        <input required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Aarav Sharma" />
        <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
        <input type="email" required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="you@example.com" />
        <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
        <input type="password" required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="••••••••" />
        <button className="mt-6 w-full rounded-2xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-600" type="submit">Register</button>
        <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
          Already registered? <Link className="font-semibold text-indigo-600 dark:text-indigo-300" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
