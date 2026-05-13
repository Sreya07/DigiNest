export default function EmotionCard({ 
  title, 
  description, 
  emotion = "trust", 
  icon: Icon, 
  children, 
  className = "", 
  onClick 
}) {
  const emotionGradients = {
    trust: "from-blue-600 to-cyan-500",
    safety: "from-emerald-500 to-green-400",
    reminder: "from-yellow-400 to-amber-400",
    success: "from-orange-500 to-amber-500",
    family: "from-pink-500 to-rose-400",
    intelligence: "from-purple-600 to-fuchsia-500",
    risk: "from-red-600 to-rose-500",
    professional: "from-slate-600 to-gray-500",
  };

  const emotionShadows = {
    trust: "shadow-emotion-trust",
    safety: "shadow-emotion-safety",
    reminder: "shadow-emotion-reminder",
    success: "shadow-emotion-success",
    family: "shadow-emotion-family",
    intelligence: "shadow-emotion-intelligence",
    risk: "shadow-emotion-risk",
  };

  const gradient = emotionGradients[emotion] || emotionGradients.trust;
  const shadow = emotionShadows[emotion] || "";

  return (
    <div
      onClick={onClick}
      className={`group overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 ${shadow} ${className} ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {title && <h3 className="text-lg font-bold">{title}</h3>}
            {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
          </div>
          {Icon && <Icon size={28} className="shrink-0 opacity-80" />}
        </div>
        {children}
      </div>
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
