export default function PageSkeleton({ rows = 3 }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <div className="skeleton h-64 sm:h-80 w-full rounded-none mb-8" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Stat row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-24 rounded-2xl" />
          ))}
        </div>
        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="skeleton h-48 rounded-2xl" />
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
