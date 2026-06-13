import { cn } from "../../lib/utils";
import RSkeleton, { SkeletonTheme } from 'react-loading-skeleton';

/**
 * Simple Skeleton component wrapper around react-loading-skeleton
 * Usage: <Skeleton width={280} height={28} borderRadius={8} />
 */
function Skeleton({ 
  width = '100%', 
  height = 20, 
  borderRadius = 4,
  circle = false,
  count = 1,
  gap = 8,
  className = '',
  containerClassName = '',
  style = {},
  ...props 
}) {
  const items = Array.from({ length: count });
  
  return (
    <div 
      className={cn('flex flex-col', containerClassName)} 
      style={{ gap: `${gap}px` }}
    >
      {items.map((_, i) => (
        <SkeletonTheme key={i} baseColor="#e6e6e6" highlightColor="#f3f3f3">
          <RSkeleton
            width={width}
            height={height}
            borderRadius={circle ? height : borderRadius}
            circle={circle}
            className={className}
            style={style}
            {...props}
          />
        </SkeletonTheme>
      ))}
    </div>
  );
}

export { Skeleton };
export default Skeleton;
