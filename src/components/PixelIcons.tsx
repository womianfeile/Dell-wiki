type IconProps = {
  className?: string;
};

export function PixelMenuIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" shapeRendering="crispEdges">
      <rect x="4" y="6" width="4" height="2" fill="currentColor" />
      <rect x="10" y="6" width="10" height="2" fill="currentColor" />
      <rect x="4" y="11" width="14" height="2" fill="currentColor" />
      <rect x="18" y="11" width="2" height="2" fill="currentColor" />
      <rect x="4" y="16" width="6" height="2" fill="currentColor" />
      <rect x="12" y="16" width="8" height="2" fill="currentColor" />
    </svg>
  );
}

export function PixelCalendarIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" shapeRendering="crispEdges">
      <rect x="5" y="4" width="14" height="2" fill="currentColor" />
      <rect x="6" y="6" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="8" y="2" width="2" height="4" fill="currentColor" />
      <rect x="14" y="2" width="2" height="4" fill="currentColor" />
      <rect x="8" y="10" width="3" height="3" fill="currentColor" />
      <rect x="13" y="10" width="3" height="3" fill="currentColor" />
    </svg>
  );
}

export function PixelLayoutIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" shapeRendering="crispEdges">
      <rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="6" y="6" width="4" height="12" fill="currentColor" />
      <rect x="12" y="6" width="6" height="4" fill="currentColor" />
      <rect x="12" y="12" width="6" height="6" fill="currentColor" />
    </svg>
  );
}

export function PixelProfileIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" shapeRendering="crispEdges">
      <rect x="5" y="4" width="14" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="8" y="7" width="8" height="5" rx="2" fill="currentColor" />
      <rect x="7" y="14" width="10" height="3" fill="currentColor" />
    </svg>
  );
}

export function PixelMoonIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" shapeRendering="crispEdges" fill="currentColor">
      <path d="M18 22H8v-2h10v2ZM8 20H6v-2h2v2Zm12 0h-2v-2h2v2ZM6 18H4v-2h2v2Zm16 0h-2v-4h-2v-2h2v-2h2v8ZM4 16H2V6h2v10Zm14 0h-6v-2h6v2Zm-6-2h-2v-2h2v2Zm-2-2H8V6h2v6ZM6 6H4V4h2v2Zm8-2h-2v2h-2V4H6V2h8v2Z" />
    </svg>
  );
}

export function PixelSunIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" shapeRendering="crispEdges">
      <rect x="10" y="8" width="4" height="2" fill="currentColor" />
      <rect x="10" y="14" width="4" height="2" fill="currentColor" />
      <rect x="8" y="10" width="2" height="4" fill="currentColor" />
      <rect x="14" y="10" width="2" height="4" fill="currentColor" />
      <rect x="11" y="2" width="2" height="4" fill="currentColor" />
      <rect x="11" y="18" width="2" height="4" fill="currentColor" />
      <rect x="2" y="11" width="4" height="2" fill="currentColor" />
      <rect x="18" y="11" width="4" height="2" fill="currentColor" />
      <rect x="5" y="5" width="2" height="2" fill="currentColor" />
      <rect x="17" y="5" width="2" height="2" fill="currentColor" />
      <rect x="5" y="17" width="2" height="2" fill="currentColor" />
      <rect x="17" y="17" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

export function PixelHeartIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" shapeRendering="crispEdges">
      <rect x="6" y="4" width="4" height="4" fill="currentColor" />
      <rect x="14" y="4" width="4" height="4" fill="currentColor" />
      <rect x="4" y="8" width="8" height="4" fill="currentColor" />
      <rect x="12" y="8" width="8" height="4" fill="currentColor" />
      <rect x="6" y="12" width="12" height="4" fill="currentColor" />
      <rect x="8" y="16" width="8" height="4" fill="currentColor" />
      <rect x="10" y="20" width="4" height="2" fill="currentColor" />
    </svg>
  );
}

export function PixelMailIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" shapeRendering="crispEdges" fill="currentColor">
      <path d="M20 20H4v-2h16v2ZM4 18H2V6h2v12Zm18 0h-2V6h2v12Zm-8-4h-4v-2h4v2Zm-4-2H8v-2h2v2Zm6 0h-2v-2h2v2Zm-8-2H6V8h2v2Zm10 0h-2V8h2v2Zm2-4H4V4h16v2Z" />
    </svg>
  );
}
