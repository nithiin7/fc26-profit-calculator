import { useEffect, useRef, useState } from 'react';

export const useAnimatedNumber = (
  target: number,
  duration: number = 400
): number => {
  const [displayValue, setDisplayValue] = useState(target);
  const startValueRef = useRef(target);

  useEffect(() => {
    // Update the ref to current display value before starting new animation
    startValueRef.current = displayValue;

    let startTimestamp: number | null = null;
    const startValue = startValueRef.current;
    const difference = target - startValue;

    if (difference === 0) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);

      const newValue = startValue + difference * ease;
      setDisplayValue(newValue);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  return displayValue;
};
