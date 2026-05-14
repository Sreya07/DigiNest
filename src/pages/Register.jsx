import { ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data } = await authAPI.register({ name, email, password });
      localStorage.setItem("diginest_token", data.token);
      localStorage.setItem("diginest_user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500 text-white">
          <ShieldCheck size={28} />
        </div>
        <h1 className="mt-5 text-center text-3xl font-bold text-slate-950 dark:text-white">
          Create your nest
        </h1>
        <p className="mt-2 text-center text-slate-500 dark:text-slate-400">
          Secure document vault — powered by MongoDB.
        </p>

        {error && (
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Full Name
        </label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          placeholder="Aarav Sharma"
        />
        <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          placeholder="you@example.com"
        />
        <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          placeholder="Min. 6 characters"
        />
        <button
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-600 disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : null}
          {loading ? "Creating account…" : "Register"}
        </button>
        <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
          Already registered?{" "}
          <Link
            className="font-semibold text-indigo-600 dark:text-indigo-300"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
