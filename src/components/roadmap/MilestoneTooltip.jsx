export default function MilestoneTooltip({ milestone, x, y }) {
  if (!milestone) return null;

  return (
    <div
      className="absolute z-50 p-4 w-72 rounded-[2rem] shadow-2xl pointer-events-none transition-all duration-300 opacity-100 scale-100"
      style={{
        left: x,
        top: y - 160,
        transform: "translate(-50%, -100%)",
      }}
    >
      <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-white/40 dark:border-slate-700/50"></div>
      <div className="relative">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-lg">
            {milestone.year}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {milestone.source === 'document' ? 'Document' : 'User Added'}
          </span>
        </div>
        
        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight mb-2">
          {milestone.title}
        </h3>
        
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed font-medium">
          {milestone.description}
        </p>
        
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
          <span className="capitalize">{milestone.category}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
          {milestone.documents?.length > 0 ? (
            <span className="text-emerald-600 dark:text-emerald-400">
              {milestone.documents.length} doc{milestone.documents.length !== 1 ? 's' : ''}
            </span>
          ) : (
            <span>No docs</span>
          )}
        </div>
      </div>
      
      {/* Premium Tooltip Arrow */}
      <div className="absolute left-1/2 -bottom-2 w-4 h-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-r border-white/40 dark:border-slate-700/50 transform -translate-x-1/2 rotate-45"></div>
    </div>
  );
}
