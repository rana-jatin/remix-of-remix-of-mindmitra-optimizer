import { useMemo } from "react";

export function MoodChart({ data }: { data: { day: string; value: number }[] }) {
  const W = 320;
  const H = 130;
  const pad = 18;
  const max = 10;

  const { points, area, gridY } = useMemo(() => {
    const step = (W - pad * 2) / (data.length - 1);
    const pts = data.map((d, i) => {
      const x = pad + i * step;
      const y = H - pad - (d.value / max) * (H - pad * 2);
      return [x, y] as const;
    });
    // smooth curve using quadratic midpoints
    let path = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [px, py] = pts[i - 1];
      const [cx, cy] = pts[i];
      const mx = (px + cx) / 2;
      const my = (py + cy) / 2;
      path += ` Q${px},${py} ${mx},${my}`;
    }
    path += ` T${pts[pts.length - 1][0]},${pts[pts.length - 1][1]}`;
    const areaPath = `${path} L${pts[pts.length - 1][0]},${H - pad} L${pts[0][0]},${H - pad} Z`;
    const grid = [2, 5, 8].map((v) => H - pad - (v / max) * (H - pad * 2));
    return { points: { path, pts }, area: areaPath, gridY: grid };
  }, [data]);

  const avg = (data.reduce((s, d) => s + d.value, 0) / data.length).toFixed(1);

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-2xl font-semibold text-foreground">{avg}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          7-day avg
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-32 w-full" role="img" aria-label="7-day mood trend">
        <defs>
          <linearGradient id="moodFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="moodStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--primary-glow)" />
          </linearGradient>
        </defs>
        {gridY.map((y, i) => (
          <line
            key={i}
            x1={pad}
            x2={W - pad}
            y1={y}
            y2={y}
            stroke="var(--border)"
            strokeDasharray="2 4"
            strokeWidth="1"
          />
        ))}
        <path d={area} fill="url(#moodFill)" />
        <path
          d={points.path}
          stroke="url(#moodStroke)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.pts.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="var(--background)" />
            <circle cx={x} cy={y} r="3.5" fill="var(--primary)" />
          </g>
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        {data.map((d) => (
          <span key={d.day}>{d.day}</span>
        ))}
      </div>
    </div>
  );
}
