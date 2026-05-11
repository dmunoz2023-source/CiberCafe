// Hook para temporizador
import { useEffect, useRef, useState } from "react";

export default function useTimer(active) {
  const [seconds, setSeconds] = useState(0);
  const interval = useRef();

  useEffect(() => {
    if (active) {
      interval.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(interval.current);
    }
    return () => clearInterval(interval.current);
  }, [active]);

  return seconds;
}
