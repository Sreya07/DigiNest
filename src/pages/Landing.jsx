import { ArrowRight, Heart, Lock, Users, Brain, AlertCircle, CheckCircle2, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const emotionalFeatures = [
  {
    icon: Lock,
    color: "from-blue-600 to-cyan-500",
    title: "Trust Wallet",
    description: "Your identity proofs secured with selective field sharing",
    emotion: "Trust (Blue)",
  },
  {
    icon: Heart,
    color: "from-emerald-500 to-green-400",
    title: "Verified Safety",
    description: "Health & vaccinations verified and protected",
    emotion: "Safety (Green)",
  },
  {
    icon: AlertCircle,
    color: "from-yellow-400 to-amber-400",
    title: "Smart Reminders",
    description: "Never miss renewal deadlines with intelligent alerts",
    emotion: "Reminder (Yellow)",
  },
  {
    icon: Users,
    color: "from-pink-500 to-rose-400",
    title: "Family Nest",
    description: "Share family records with loved ones securely",
    emotion: "Family (Pink)",
  },
  {
    icon: Brain,
    color: "from-purple-600 to-fuchsia-500",
    title: "AI Mindmap",
    description: "Visualize your connected documents and data relationships",
    emotion: "Intelligence (Purple)",
  },
  {
    icon: AlertCircle,
    color: "from-red-600 to-rose-500",
    title: "Risk Alerts",
    description: "Stay aware of expiring and urgent documents",
    emotion: "Risk (Red)",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-950 dark:text-white">
      {/* Header */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
            <Landmark size={22} />
          </div>
          <span className="text-xl font-bold">DigiNest</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900">Login</Link>
          <Link to="/register" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold transition">Register</Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-5 py-16 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              {/* Left: Text Content */}
              <div>
                <p className="inline-flex rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 mb-6">
                  ✨ Color-Guided Citizen Document Intelligence
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                  Your documents, emotions, and life records in one trusted nest.
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  DigiNest uses color psychology to make document status emotionally understandable. Manage identity, health, family, education, and finance in a beautiful, privacy-first platform.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <Link to="/register" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 font-semibold transition shadow-lg">
                    Get Started <ArrowRight size={18} />
                  </Link>
                  <Link to="/login" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-900 px-6 py-3 font-semibold transition">
                    View Demo
                  </Link>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  🔒 No credit card required • 🚀 Available immediately • 💯 All documents encrypted
                </p>
              </div>

              {/* Right: Colorful Document Stack Visualization */}
              <div className="relative h-96 flex items-center justify-center">
                {/* Central target circle */}
                <div className="absolute inset-1/4 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center">
                  <div className="text-center">
                    <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Citizen Trust</p>
                  </div>
                </div>

                {/* Colorful document blocks radiating */}
                {/* Blue - Identity */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-20 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg -translate-y-8 flex items-center justify-center text-white font-bold text-xs">
                  ID
                </div>

                {/* Green - Verified/Safe */}
                <div className="absolute top-1/4 right-0 w-16 h-20 rounded-lg bg-gradient-to-br from-emerald-500 to-green-400 shadow-lg translate-x-8 flex items-center justify-center text-white font-bold text-xs">
                  SAFE
                </div>

                {/* Yellow - Reminder */}
                <div className="absolute bottom-1/4 right-1/4 w-16 h-20 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-400 shadow-lg translate-x-6 translate-y-6 flex items-center justify-center text-slate-900 font-bold text-xs">
                  REM
                </div>

                {/* Pink - Family */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-20 rounded-lg bg-gradient-to-br from-pink-500 to-rose-400 shadow-lg translate-y-8 flex items-center justify-center text-white font-bold text-xs">
                  FAM
                </div>

                {/* Purple - Intelligence */}
                <div className="absolute bottom-1/4 left-1/4 w-16 h-20 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-500 shadow-lg -translate-x-6 translate-y-6 flex items-center justify-center text-white font-bold text-xs">
                  AI
                </div>

                {/* Red - Urgent */}
                <div className="absolute top-1/4 left-0 w-16 h-20 rounded-lg bg-gradient-to-br from-red-600 to-rose-500 shadow-lg -translate-x-8 flex items-center justify-center text-white font-bold text-xs">
                  URG
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why DigiNest Uses Color Psychology</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Colors trigger emotional responses. DigiNest maps each document type to meaningful colors so you instantly understand status, sensitivity, and safety.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {emotionalFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
                >
                  {/* Colored header */}
                  <div className={`bg-gradient-to-br ${feature.color} p-6 text-white flex items-center justify-between`}>
                    <div>
                      <h3 className="text-lg font-bold">{feature.title}</h3>
                      <p className="text-xs opacity-80 mt-1">{feature.emotion}</p>
                    </div>
                    <Icon size={28} />
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-white dark:bg-slate-900">
                    <p className="text-slate-700 dark:text-slate-300">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Color Legend Section */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:py-24">
          <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 p-12">
            <h2 className="text-3xl font-bold mb-10 text-center">Color Psychology at Every Step</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { color: "from-blue-600 to-cyan-500", label: "Blue = Trust", desc: "Identity, strength, wisdom" },
                { color: "from-emerald-500 to-green-400", label: "Green = Safety", desc: "Health, verified, peace" },
                { color: "from-yellow-400 to-amber-400", label: "Yellow = Reminder", desc: "Attention, friendly guidance" },
                { color: "from-pink-500 to-rose-400", label: "Pink = Family", desc: "Love, relationships, care" },
                { color: "from-purple-600 to-fuchsia-500", label: "Purple = Intelligence", desc: "AI, creativity, premium" },
                { color: "from-red-600 to-rose-500", label: "Red = Urgent", desc: "Risk, action, expiration" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} shrink-0`} />
                  <div>
                    <p className="font-bold text-slate-950 dark:text-white">{item.label}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Organize Your Life?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of citizens protecting their documents with DigiNest. Start with free account today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 font-bold rounded-lg transition">
                Create Account <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-3 font-bold rounded-lg transition">
                Existing User
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-5 py-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-600 dark:text-slate-400 text-sm">
        <p>© 2026 DigiNest. All documents encrypted and secured. Privacy first, always.</p>
      </footer>
    </div>
  );
}
