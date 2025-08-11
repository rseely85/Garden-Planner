import { useEffect, useRef, useState } from 'react';

export default function useResizeObserver() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    let frame = 0;
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { inlineSize: width, blockSize: height } =
        entry.contentBoxSize?.[0] || entry.contentRect;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setSize({ width, height }));
    });

    obs.observe(ref.current);
    return () => {
      cancelAnimationFrame(frame);
      obs.disconnect();
    };
  }, []);

  return [ref, size];
}