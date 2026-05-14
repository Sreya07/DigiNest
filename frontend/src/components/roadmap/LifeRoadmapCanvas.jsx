import { useState, useRef } from "react";
import RoadPath from "./RoadPath";
import MilestoneNode from "./MilestoneNode";
import MilestoneTooltip from "./MilestoneTooltip";
import MilestoneDetailPanel from "./MilestoneDetailPanel";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";

export default function LifeRoadmapCanvas({ milestones }) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [hoveredMilestone, setHoveredMilestone] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  // Roadmap Dimensions
  const step = 600;
  const canvasWidth = Math.max(1200, (milestones.length + 1) * 300);
  const canvasHeight = 620;

  // Calculate milestone positions
  const getMilestonePosition = (index, total) => {
    // Distribute them evenly along the x-axis
    const x = 300 + index * 300;

    const midY = canvasHeight / 2;
    const amplitude = canvasHeight * 0.35;
    const visualAmplitude = amplitude * 1.1;

    // Base y exactly on the curve
    const baseY = midY - visualAmplitude * Math.sin((x / step) * Math.PI * 2);

    return { x, y: baseY };
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.no-drag')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    if (e.shiftKey) {
      setPan(prev => ({ ...prev, x: prev.x - e.deltaY }));
    }
  };

  const handleZoomIn = () => setZoom(z => Math.min(1.8, z + 0.2));
  const handleZoomOut = () => setZoom(z => Math.max(0.6, z - 0.2));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-full min-h-[620px] overflow-hidden rounded-[2rem] shadow-inner bg-gradient-to-br from-orange-50 via-emerald-50/50 to-indigo-50 dark:from-slate-950 dark:via-emerald-950/20 dark:to-indigo-950 transition-colors duration-500">

      {/* Decorative background clouds / hills */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-300/30 dark:bg-purple-900/40 rounded-full blur-[100px] transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-300/30 dark:bg-emerald-900/40 rounded-full blur-[120px] transform translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-amber-200/30 dark:bg-amber-900/30 rounded-full blur-[90px] transform -translate-y-1/2"></div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 left-4 z-20 flex gap-2 no-drag">
        <button onClick={handleZoomOut} className="p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-sm text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all">
          <ZoomOut size={20} />
        </button>
        <button onClick={handleReset} className="p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-sm text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all">
          <Maximize size={20} />
        </button>
        <button onClick={handleZoomIn} className="p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-sm text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all">
          <ZoomIn size={20} />
        </button>
      </div>

      {/* Canvas Area */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div
          className="origin-top-left transition-transform duration-75"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            width: canvasWidth,
            height: canvasHeight,
          }}
        >
          <RoadPath width={canvasWidth} height={canvasHeight} />

          {milestones.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none no-drag">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/20 dark:border-slate-800 shadow-xl max-w-sm text-center">
                <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Welcome to your Journey</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Your life roadmap is ready. Add a life event or upload a document to plant your first milestone.</p>
              </div>
            </div>
          ) : (
            milestones.map((milestone, index) => {
              const { x, y } = getMilestonePosition(index, milestones.length);

              return (
                <div key={milestone.id}>
                  <MilestoneNode
                    milestone={milestone}
                    x={x}
                    y={y}
                    onClick={setSelectedMilestone}
                    onMouseEnter={() => setHoveredMilestone({ milestone, x, y })}
                    onMouseLeave={() => setHoveredMilestone(null)}
                  />
                  {hoveredMilestone?.milestone?.id === milestone.id && (
                    <MilestoneTooltip
                      milestone={milestone}
                      x={x}
                      y={y}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Detail Panel overlay */}
      <div className="no-drag">
        <MilestoneDetailPanel
          milestone={selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
        />
      </div>
    </div>
  );
}
