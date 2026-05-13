import { useState, useRef, useEffect } from "react";
import { Search, Eye, EyeOff, Maximize2, Minimize2 } from "lucide-react";
import MindmapDetailPanel from "./MindmapDetailPanel";
import { mindmapData } from "../data/mindmapData";
import EmotionCard from "./EmotionCard";

const iconMap = {
  Fingerprint: "👤",
  BookOpen: "📚",
  Heart: "❤️",
  Users: "👨‍👩‍👧",
  CreditCard: "💳",
  Car: "🚗",
  Home: "🏠",
  ShieldCheck: "🛡️",
  Bell: "🔔",
};

export default function DocumentMindmap({ documents }) {
  const canvasRef = useRef(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSensitiveFields, setShowSensitiveFields] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedBranches, setExpandedBranches] = useState(new Set());

  const containerRef = useRef(null);
  const svgRef = useRef(null);

  // Calculate node positions in a circle
  const calculatePositions = () => {
    const centerX = isExpanded ? 600 : 400;
    const centerY = isExpanded ? 400 : 300;
    const radius = isExpanded ? 280 : 180;

    const positions = {};
    positions.center = { x: centerX, y: centerY };

    // Position branches in a circle
    mindmapData.branches.forEach((branch, index) => {
      const angle = (index / mindmapData.branches.length) * 2 * Math.PI - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      positions[branch.id] = { x, y };
    });

    return positions;
  };

  const positions = calculatePositions();

  // Filter branches based on search
  const filteredBranches = mindmapData.branches.filter(branch =>
    branch.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleBranchExpand = (branchId) => {
    const newSet = new Set(expandedBranches);
    if (newSet.has(branchId)) {
      newSet.delete(branchId);
    } else {
      newSet.add(branchId);
    }
    setExpandedBranches(newSet);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search document clusters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSensitiveFields(!showSensitiveFields)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title={showSensitiveFields ? "Hide sensitive fields" : "Show sensitive fields"}
          >
            {showSensitiveFields ? (
              <>
                <Eye size={18} />
                <span className="text-sm font-medium">Sensitive Shown</span>
              </>
            ) : (
              <>
                <EyeOff size={18} />
                <span className="text-sm font-medium">Sensitive Hidden</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            {isExpanded ? (
              <>
                <Minimize2 size={18} />
                <span className="text-sm font-medium">Compact</span>
              </>
            ) : (
              <>
                <Maximize2 size={18} />
                <span className="text-sm font-medium">Expand</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mindmap Visualization */}
      <div
        ref={containerRef}
        className={`relative rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden ${
          isExpanded ? "h-[900px]" : "h-[600px]"
        }`}
      >
        {/* SVG for connection lines */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        >
          {/* Draw lines from center to branches */}
          {filteredBranches.map((branch) => {
            const startPos = positions.center;
            const endPos = positions[branch.id];
            return (
              <line
                key={`line-${branch.id}`}
                x1={startPos.x}
                y1={startPos.y}
                x2={endPos.x}
                y2={endPos.y}
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray={selectedBranch?.id === branch.id ? "0" : "5,5"}
                opacity={selectedBranch?.id === branch.id ? 1 : 0.4}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Central Node */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{
            left: `${positions.center.x}px`,
            top: `${positions.center.y}px`,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-xl shadow-blue-200 dark:shadow-blue-900">
              <div className="text-center text-xs font-bold">My Citizen Data</div>
            </div>
          </div>
        </div>

        {/* Branch Nodes */}
        {filteredBranches.map((branch) => {
          const pos = positions[branch.id];
          const isSelected = selectedBranch?.id === branch.id;
          const icon = iconMap[branch.icon] || "📄";

          return (
            <div
              key={branch.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
              }}
              onClick={() => setSelectedBranch(isSelected ? null : branch)}
            >
              {/* Node Circle */}
              <div
                className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-lg ${
                  isSelected
                    ? `bg-gradient-to-br ${branch.color} text-white shadow-2xl scale-125`
                    : `bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 group-hover:scale-110 group-hover:shadow-xl`
                }`}
              >
                <div className="text-3xl mb-1">{icon}</div>
                <div className="text-xs font-bold text-center">{branch.label}</div>
              </div>

              {/* Label Below */}
              {isSelected && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                  {branch.documents.length} docs
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Text */}
      <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
        Click on any node to see documents, fields, and sharing recommendations
      </p>

      {/* Branch Details Panel */}
      <MindmapDetailPanel
        branch={selectedBranch}
        onClose={() => setSelectedBranch(null)}
        documents={documents}
        showSensitiveFields={showSensitiveFields}
      />

      {/* Alternative List View */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBranches.map((branch) => (
          <div
            key={branch.id}
            onClick={() => setSelectedBranch(branch)}
            className={`group rounded-2xl bg-gradient-to-br ${branch.color} text-white p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              selectedBranch?.id === branch.id ? "ring-4 ring-offset-2 ring-blue-400" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">{iconMap[branch.icon] || "📄"}</div>
              <span className="text-xs font-bold opacity-80 bg-white/20 px-2 py-1 rounded-full">
                {branch.documents.length} docs
              </span>
            </div>
            <h3 className="font-bold text-lg mb-1">{branch.label}</h3>
            <p className="text-sm opacity-90">{branch.description}</p>
            <div className="mt-3 pt-3 border-t border-white/30 text-xs opacity-75">
              Sensitivity: {branch.sensitivity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
