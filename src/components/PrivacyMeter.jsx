import { AlertTriangle, CheckCircle2 } from "lucide-react";

export default function PrivacyMeter({ riskLevel = 50, title = "Privacy Risk", description }) {
  // Determine color and icon based on risk level
  let riskColor, riskBg, riskIcon, riskLabel;
  
  if (riskLevel <= 33) {
    riskColor = "bg-emerald-500";
    riskBg = "bg-emerald-50 dark:bg-emerald-950/30";
    riskIcon = CheckCircle2;
    riskLabel = "Low Risk";
  } else if (riskLevel <= 66) {
    riskColor = "bg-yellow-500";
    riskBg = "bg-yellow-50 dark:bg-yellow-950/30";
    riskIcon = AlertTriangle;
    riskLabel = "Medium Risk";
  } else {
    riskColor = "bg-red-500";
    riskBg = "bg-red-50 dark:bg-red-950/30";
    riskIcon = AlertTriangle;
    riskLabel = "High Risk";
  }

  const RiskIcon = riskIcon;

  return (
    <div className={`rounded-2xl ${riskBg} p-4 border border-current border-opacity-20`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-950 dark:text-white">{title}</h3>
          {description && <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>}
        </div>
        <RiskIcon size={20} className={riskColor === "bg-emerald-500" ? "text-emerald-600" : riskColor === "bg-yellow-500" ? "text-yellow-600" : "text-red-600"} />
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${riskColor}`}
          style={{ width: `${riskLevel}%` }}
        />
      </div>

      {/* Risk label and percentage */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{riskLabel}</span>
        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{riskLevel}%</span>
      </div>
    </div>
  );
}
