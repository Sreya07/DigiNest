import { ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setLocalError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const errorMessage = localError || error;

  return (
<<<<<<< HEAD:frontend/src/pages/Login.jsx
    <div className="grid min-h-screen place-items-center bg-slate-50 px-4 dark:bg-slate-950">
      <form onSubmit={(event) => { event.preventDefault(); navigate("/dashboard"); }} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-blue-600 text-white">
=======
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-600 text-white">
>>>>>>> main:src/pages/Login.jsx
          <ShieldCheck size={28} />
        </div>
        <h1 className="mt-5 text-center text-3xl font-bold text-slate-950 dark:text-white">Welcome back</h1>
        <p className="mt-2 text-center text-slate-500 dark:text-slate-400">Login to your DigiNest account</p>
        
        {errorMessage && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {errorMessage}
          </div>
        )}
        
        <label className="mt-8 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
<<<<<<< HEAD:frontend/src/pages/Login.jsx
        <input type="email" required className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="you@example.com" />
        <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
        <input type="password" required className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="password" />
        <button className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700" type="submit">Login</button>
=======
        <input 
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" 
          placeholder="you@example.com" 
        />
        
        <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
        <input 
          type="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white" 
          placeholder="••••••••" 
        />
        
        <button 
          className="mt-6 w-full rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        
>>>>>>> main:src/pages/Login.jsx
        <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
          New to DigiNest? <Link className="font-semibold text-blue-600 dark:text-blue-300" to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
