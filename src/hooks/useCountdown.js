// src/hooks/useCountdown.js
import { useEffect, useRef, useState } from "react";

/**
 * useCountdown(startSeconds)
 * - returns { seconds, running, start, reset, stop }
 */
export default function useCountdown(initialSeconds = 120) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(ref.current);
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [running]);

  const start = () => {
    setSeconds(initialSeconds);
    setRunning(true);
  };
  const reset = () => {
    if (ref.current) clearInterval(ref.current);
    setSeconds(initialSeconds);
    setRunning(false);
  };
  const stop = () => {
    if (ref.current) clearInterval(ref.current);
    setRunning(false);
  };

  return { seconds, running, start, reset, stop, setSeconds };
}
