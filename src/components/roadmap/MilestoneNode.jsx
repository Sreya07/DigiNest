import { 
  Award, BookOpen, GraduationCap, Briefcase, Coins, Heart, 
  Car, Plane, ShieldPlus, Home, Sparkles, Camera
} from "lucide-react";

const getBadgeConfig = (category, title) => {
  const t = title.toLowerCase();
  let Icon = Sparkles;
  let bg = "bg-amber-100 dark:bg-amber-900/80";
  let text = "text-amber-700 dark:text-amber-300";
  let border = "border-amber-300 dark:border-amber-600";
  let pole = "bg-amber-400 dark:bg-amber-600";

  if (t.includes("birth") || category === "identity" || t.includes("person") || t.includes("baby")) {
    Icon = Award; bg = "bg-indigo-100 dark:bg-indigo-900/80"; text = "text-indigo-700 dark:text-indigo-300"; border = "border-indigo-300 dark:border-indigo-600"; pole = "bg-indigo-400 dark:bg-indigo-600";
  } else if (t.includes("grad") || t.includes("degree")) {
    Icon = GraduationCap; bg = "bg-blue-100 dark:bg-blue-900/80"; text = "text-blue-700 dark:text-blue-300"; border = "border-blue-300 dark:border-blue-600"; pole = "bg-blue-400 dark:bg-blue-600";
  } else if (category === "education" || t.includes("school") || t.includes("marksheet")) {
    Icon = BookOpen; bg = "bg-emerald-100 dark:bg-emerald-900/80"; text = "text-emerald-700 dark:text-emerald-300"; border = "border-emerald-300 dark:border-emerald-600"; pole = "bg-emerald-400 dark:bg-emerald-600";
  } else if (t.includes("job") || t.includes("intern") || category === "career") {
    Icon = Briefcase; bg = "bg-orange-100 dark:bg-orange-900/80"; text = "text-orange-700 dark:text-orange-300"; border = "border-orange-300 dark:border-orange-600"; pole = "bg-orange-400 dark:bg-orange-600";
  } else if (category === "finance" || t.includes("salary") || t.includes("coin") || t.includes("wallet")) {
    Icon = Coins; bg = "bg-yellow-100 dark:bg-yellow-900/80"; text = "text-yellow-700 dark:text-yellow-300"; border = "border-yellow-300 dark:border-yellow-600"; pole = "bg-yellow-400 dark:bg-yellow-600";
  } else if (category === "family" || t.includes("marriage")) {
    Icon = Heart; bg = "bg-pink-100 dark:bg-pink-900/80"; text = "text-pink-700 dark:text-pink-300"; border = "border-pink-300 dark:border-pink-600"; pole = "bg-pink-400 dark:bg-pink-600";
  } else if (category === "health" || t.includes("vaccination")) {
    Icon = ShieldPlus; bg = "bg-lime-100 dark:bg-lime-900/80"; text = "text-lime-700 dark:text-lime-300"; border = "border-lime-300 dark:border-lime-600"; pole = "bg-lime-400 dark:bg-lime-600";
  } else if (category === "property" || t.includes("house")) {
    Icon = Home; bg = "bg-teal-100 dark:bg-teal-900/80"; text = "text-teal-700 dark:text-teal-300"; border = "border-teal-300 dark:border-teal-600"; pole = "bg-teal-400 dark:bg-teal-600";
  } else if (t.includes("car") || t.includes("vehicle")) {
    Icon = Car; bg = "bg-orange-100 dark:bg-orange-900/80"; text = "text-orange-700 dark:text-orange-300"; border = "border-orange-300 dark:border-orange-600"; pole = "bg-orange-400 dark:bg-orange-600";
  } else if (t.includes("passport") || t.includes("travel")) {
    Icon = Plane; bg = "bg-sky-100 dark:bg-sky-900/80"; text = "text-sky-700 dark:text-sky-300"; border = "border-sky-300 dark:border-sky-600"; pole = "bg-sky-400 dark:bg-sky-600";
  } else if (category === "other") {
    Icon = Camera; bg = "bg-indigo-100 dark:bg-indigo-900/80"; text = "text-indigo-700 dark:text-indigo-300"; border = "border-indigo-300 dark:border-indigo-600"; pole = "bg-indigo-400 dark:bg-indigo-600";
  }

  return { Icon, bg, text, border, pole };
};

export default function MilestoneNode({ milestone, x, y, onClick, onMouseEnter, onMouseLeave }) {
  const { Icon, bg, text, border, pole } = getBadgeConfig(milestone.category, milestone.title);
  const isMajor = milestone.importance === "major";

  // Animation delay so they don't all float in sync
  const floatDelay = `${(x % 10) * 0.2}s`;
  
  // Height of the pole
  const poleHeight = 80;

  return (
    <div
      className="absolute flex flex-col items-center justify-end cursor-pointer group"
      style={{
        left: x,
        top: y,
        transform: `translate(-50%, -100%)`,
        zIndex: 10,
        height: poleHeight + 60, // accommodate pole and badge
      }}
      onClick={() => onClick(milestone)}
      onMouseEnter={() => onMouseEnter(milestone)}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className="relative flex flex-col items-center animate-float transition-transform duration-300 group-hover:-translate-y-2"
        style={{ animationDelay: floatDelay }}
      >
        {/* Glow effect for major milestones */}
        {isMajor && (
          <div className={`absolute top-0 w-16 h-16 rounded-full blur-md opacity-40 dark:opacity-60 animate-pulse ${pole}`} />
        )}
        
        {/* Circle Badge */}
        <div className={`relative flex items-center justify-center w-14 h-14 rounded-full ${bg} ${text} ${border} border-2 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg bg-opacity-90 backdrop-blur-sm z-10`}>
          <div className="animate-pulse-icon">
            <Icon size={24} strokeWidth={2} />
          </div>
          {isMajor && (
            <Sparkles className={`absolute -top-1 -right-1 w-4 h-4 ${text} animate-slow-spin`} />
          )}
        </div>

        {/* Pole */}
        <div className={`w-0.5 h-[60px] ${pole} opacity-80`} />
      </div>

      {/* Connection dot on the road */}
      <div className={`absolute bottom-0 w-3 h-3 rounded-full ${pole} border-2 border-white dark:border-slate-800 shadow-sm transform translate-y-1/2 transition-transform duration-300 group-hover:scale-125 z-0`} />
      
      {/* Year Label */}
      <div className="absolute -bottom-6 transition-opacity duration-300 opacity-90 group-hover:opacity-100 font-bold text-xs text-slate-700 dark:text-slate-300 drop-shadow-md">
        {milestone.year}
      </div>
    </div>
  );
}
