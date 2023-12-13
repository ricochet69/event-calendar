import { useState, useEffect, useRef } from "react";

const useResizeObserver = (thresholdWidth: number) => {
  const [hasResized, setHasResized] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;

        // Check if the width has reached a certain amount
        if (width < thresholdWidth) {
          setHasResized(true);
        } else {
          setHasResized(false);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [thresholdWidth]);

  return { containerRef, hasResized };
};

export default useResizeObserver;
