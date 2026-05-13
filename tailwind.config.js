/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Emotion-based color palette
        emotion: {
          trust: "#2563eb",
          safety: "#10b981",
          reminder: "#eab308",
          success: "#f97316",
          family: "#ec4899",
          intelligence: "#a855f7",
          risk: "#dc2626",
          professional: "#475569",
          premium: "#0f172a",
        },
      },
      gradients: {
        trust: "from-blue-600 to-cyan-500",
        safety: "from-emerald-500 to-green-400",
        reminder: "from-yellow-400 to-amber-400",
        success: "from-orange-500 to-amber-500",
        family: "from-pink-500 to-rose-400",
        intelligence: "from-purple-600 to-fuchsia-500",
        risk: "from-red-600 to-rose-500",
        professional: "from-slate-600 to-gray-500",
        premium: "from-slate-950 to-black",
      },
      boxShadow: {
        "emotion-trust": "0 10px 25px -5px rgba(37, 99, 235, 0.2)",
        "emotion-safety": "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
        "emotion-reminder": "0 10px 25px -5px rgba(234, 179, 8, 0.2)",
        "emotion-success": "0 10px 25px -5px rgba(249, 115, 22, 0.2)",
        "emotion-family": "0 10px 25px -5px rgba(236, 72, 153, 0.2)",
        "emotion-intelligence": "0 10px 25px -5px rgba(168, 85, 247, 0.2)",
        "emotion-risk": "0 10px 25px -5px rgba(220, 38, 38, 0.2)",
      },
    },
  },
  plugins: [],
}
