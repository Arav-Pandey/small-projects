import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    // cleanup if value changes before delay is over
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
