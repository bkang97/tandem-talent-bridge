
import * as React from "react"

// Breakpoint values in pixels
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
}

export type Breakpoint = keyof typeof breakpoints

/**
 * Hook to detect if viewport is below a specified breakpoint
 * @param breakpoint - The breakpoint to check against (defaults to md)
 * @returns boolean indicating if the viewport is below the breakpoint
 */
export function useBreakpoint(breakpoint: Breakpoint = "md") {
  const [isBelow, setIsBelow] = React.useState<boolean | undefined>(undefined)
  
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoints[breakpoint] - 1}px)`)
    
    const onChange = () => {
      setIsBelow(window.innerWidth < breakpoints[breakpoint])
    }
    
    mql.addEventListener("change", onChange)
    onChange() // Initial check
    
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])
  
  return !!isBelow
}

/**
 * Legacy hook that checks if the viewport is below the mobile breakpoint (md)
 * @returns boolean indicating if the viewport is below the mobile breakpoint
 */
export function useIsMobile() {
  return useBreakpoint("md")
}
