import React from 'react';

export default function RoadPath({ width, height }) {
  const pathSegments = [];
  const midY = height / 2;
  pathSegments.push(`M 0 ${midY}`);
  
  const step = 600; 
  const amplitude = height * 0.35;

  for (let x = 0; x < width + step; x += step) {
    const cp1x = x + step * 0.33;
    const cp1y = midY - amplitude * 1.5;
    
    const cp2x = x + step * 0.66;
    const cp2y = midY + amplitude * 1.5;
    
    const endX = x + step;
    const endY = midY;

    pathSegments.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`);
  }

  const d = pathSegments.join(" ");

  // Generate some random decorative sparkles along the path bounds
  const sparkles = React.useMemo(() => {
    const s = [];
    for (let i = 0; i < width / 100; i++) {
      s.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    return s;
  }, [width, height]);

  return (
    <svg 
      width={width} 
      height={height} 
      className="absolute top-0 left-0 pointer-events-none"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="gardenGlow">
          <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="gardenGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a7f3d0" /> {/* emerald-200 */}
          <stop offset="25%" stopColor="#ddd6fe" /> {/* violet-200 */}
          <stop offset="50%" stopColor="#fbcfe8" /> {/* pink-200 */}
          <stop offset="75%" stopColor="#fde68a" /> {/* amber-200 */}
          <stop offset="100%" stopColor="#bae6fd" /> {/* sky-200 */}
        </linearGradient>
        <linearGradient id="gardenGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#047857" /> {/* emerald-700 */}
          <stop offset="25%" stopColor="#6d28d9" /> {/* violet-700 */}
          <stop offset="50%" stopColor="#be185d" /> {/* pink-700 */}
          <stop offset="75%" stopColor="#b45309" /> {/* amber-700 */}
          <stop offset="100%" stopColor="#0369a1" /> {/* sky-700 */}
        </linearGradient>
      </defs>

      {/* Decorative background sparkles */}
      {sparkles.map((s, i) => (
        <circle 
          key={i} 
          cx={s.x} 
          cy={s.y} 
          r={s.r} 
          fill="currentColor" 
          opacity={s.opacity}
          className="text-emerald-400 dark:text-emerald-300"
        />
      ))}

      {/* Shadow/Glow layer */}
      <path 
        d={d} 
        fill="none" 
        stroke="url(#gardenGradientLight)" 
        strokeWidth="60" 
        strokeLinecap="round"
        className="opacity-50 dark:hidden"
        filter="url(#gardenGlow)"
      />
      <path 
        d={d} 
        fill="none" 
        stroke="url(#gardenGradientDark)" 
        strokeWidth="60" 
        strokeLinecap="round"
        className="hidden dark:block opacity-60"
        filter="url(#gardenGlow)"
      />
      
      {/* Main road body - light mode */}
      <path 
        d={d} 
        fill="none" 
        stroke="#f8fafc" 
        strokeWidth="40" 
        strokeLinecap="round"
        className="dark:hidden"
      />
      
      {/* Main road body - dark mode */}
      <path 
        d={d} 
        fill="none" 
        stroke="#0f172a" 
        strokeWidth="40" 
        strokeLinecap="round"
        className="hidden dark:block"
      />
      
      {/* Dashed center line */}
      <path 
        d={d} 
        fill="none" 
        stroke="url(#gardenGradientLight)" 
        strokeWidth="4" 
        strokeLinecap="round"
        strokeDasharray="16 24"
        className="dark:hidden opacity-80"
      />
      <path 
        d={d} 
        fill="none" 
        stroke="url(#gardenGradientDark)" 
        strokeWidth="4" 
        strokeLinecap="round"
        strokeDasharray="16 24"
        className="hidden dark:block opacity-80"
      />
    </svg>
  );
}
