import { ArrowRight, Bell, Brain, FileCheck2, Landmark, Lock, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

const features = [
  {
    icon: Lock,
    title: "Selective sharing",
    description: "Share only the fields an institution needs, with a clear expiry time.",
  },
  {
    icon: Bell,
    title: "Renewal reminders",
    description: "Track passport, license, health, school, and family deadlines in one place.",
  },
  {
    icon: Brain,
    title: "Document intelligence",
    description: "Understand how identity, education, finance, and family records connect.",
  },
  {
    icon: Users,
    title: "Family access",
    description: "Give relatives simple permissions without handing over your full vault.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-600 text-white shadow-sm">
              <Landmark size={22} />
            </div>
            <span className="text-xl font-bold">DigiNest</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white/70 dark:text-slate-200 dark:hover:bg-slate-900">
              Login
            </Link>
            <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
              Register
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-[86vh] overflow-hidden bg-slate-50 pt-24 dark:bg-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.96),rgba(255,255,255,0.74)_48%,rgba(239,246,255,0.82))] dark:bg-[linear-gradient(120deg,rgba(2,6,23,0.98),rgba(2,6,23,0.84)_48%,rgba(15,23,42,0.92))]" />
          <img
            src={heroImage}
            alt="Layered secure document vault"
            className="absolute bottom-12 right-0 hidden w-[420px] max-w-[45vw] opacity-80 lg:block"
          />
          <div className="relative mx-auto flex min-h-[calc(86vh-6rem)] max-w-7xl flex-col justify-center px-5 pb-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white/80 px-3 py-2 text-sm font-medium text-blue-700 shadow-sm dark:border-blue-900 dark:bg-slate-900/80 dark:text-blue-200">
                <ShieldCheck size={16} />
                Consent-first citizen document vault
              </div>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                DigiNest
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Rebuild your DigiLocker experience with a cleaner dashboard, selective data sharing, family permissions, renewal alerts, and a lightweight backend API.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                  Get Started <ArrowRight size={18} />
                </Link>
                <Link to="/login" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/80 px-6 py-3 font-semibold text-slate-800 transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100">
                  View Demo
                </Link>
              </div>
            </div>

            <div className="mt-14 grid max-w-4xl gap-3 sm:grid-cols-3">
              {[
                ["10", "stored records"],
                ["3", "active shares"],
                ["100%", "field-level control"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
                  <p className="text-2xl font-bold text-slate-950 dark:text-white">{value}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">A cleaner document workflow</h2>
              <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
                The interface is built around repeatable actions: find, review, share, revoke, and renew.
              </p>
            </div>
            <FileCheck2 className="text-blue-600 dark:text-blue-300" size={32} />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200">
                    <Icon size={21} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <p>(c) 2026 DigiNest. Privacy first, always.</p>
      </footer>
    </div>
  );
}
