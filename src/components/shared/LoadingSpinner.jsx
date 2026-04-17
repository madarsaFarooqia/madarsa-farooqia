// Islamic crescent-star loading spinner
export default function LoadingSpinner({ size = 'md', text = '' }) {
  const sizes = { sm: 'w-8 h-8', md: 'w-14 h-14', lg: 'w-20 h-20' };
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} relative crescent-spin`}>
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" stroke="hsl(var(--border))" strokeWidth="3"/>
          <path
            d="M30 8 C18 8, 8 18, 8 30 C8 42, 18 52, 30 52 C24 46, 20 38.5, 20 30 C20 21.5, 24 14, 30 8Z"
            fill="hsl(var(--accent))"
          />
          <circle cx="38" cy="14" r="3.5" fill="hsl(var(--accent))" />
        </svg>
      </div>
      {text && <p className="text-sm text-muted-foreground font-inter">{text}</p>}
    </div>
  );
}