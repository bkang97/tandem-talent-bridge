
import * as React from "react"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export function useBreakpoint(breakpoint: Breakpoint) {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoints[breakpoint]}px)`)
    
    const onChange = () => {
      setIsAboveBreakpoint(mql.matches)
    }
    
    mql.addEventListener("change", onChange)
    setIsAboveBreakpoint(mql.matches)
    
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return !!isAboveBreakpoint
}

export function useBreakpointValue<T>(values: Record<Breakpoint, T>): T {
  const [currentValue, setCurrentValue] = React.useState<T>(values.xs)
  
  React.useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth
      
      if (width >= breakpoints["2xl"]) {
        setCurrentValue(values["2xl"])
      } else if (width >= breakpoints.xl) {
        setCurrentValue(values.xl)
      } else if (width >= breakpoints.lg) {
        setCurrentValue(values.lg)
      } else if (width >= breakpoints.md) {
        setCurrentValue(values.md)
      } else if (width >= breakpoints.sm) {
        setCurrentValue(values.sm)
      } else {
        setCurrentValue(values.xs)
      }
    }
    
    window.addEventListener("resize", checkBreakpoint)
    checkBreakpoint()
    
    return () => window.removeEventListener("resize", checkBreakpoint)
  }, [values])
  
  return currentValue
}
