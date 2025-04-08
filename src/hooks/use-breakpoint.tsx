import * as React from "react"

export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export type Breakpoint = keyof typeof BREAKPOINTS;

export function useBreakpoint(breakpoint: Breakpoint) {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]}px)`);
    const onChange = () => {
      setIsAboveBreakpoint(mql.matches);
    };
    mql.addEventListener("change", onChange);
    onChange(); // Initialize with current window size
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isAboveBreakpoint;
}

// Keep backward compatibility with existing code
export function useIsMobile() {
  const isAboveMobile = useBreakpoint("md");
  return isAboveMobile === undefined ? undefined : !isAboveMobile;
}
