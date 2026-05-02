export default function GeometricProgress({
  raised = 0,
  target = 1,
  showNumbers = true,
}) {
  const pct = Math.min(100, Math.round((raised / target) * 100));

  return (
    <div>
      <div className="relative h-3 bg-primary/8 rounded-full overflow-hidden mb-2">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, var(--deep-oasis), var(--solar-gold))`,
          }}
        />
        <div
          className="absolute inset-y-0 left-0 opacity-30 mix-blend-overlay"
          style={{
            width: `${pct}%`,
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.15) 6px, rgba(255,255,255,0.15) 12px)`,
          }}
        />
      </div>
      {showNumbers && (
        <div className="flex items-center justify-between text-xs font-jakarta">
          <span className="text-primary font-semibold">
            ${raised.toLocaleString()} raised
          </span>
          <span className="text-muted-foreground">
            of ${target.toLocaleString()} · {pct}%
          </span>
        </div>
      )}
    </div>
  );
}
