import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [isXSmall, setIsXSmall] = useState(window.innerWidth < 576);
  const [isSmall, setIsSmall] = useState(window.innerWidth < 768);
  const [isMedium, setIsMedium] = useState(window.innerWidth < 992);
  const [isLarge, setIsLarge] = useState(window.innerWidth < 1200);

  const handleResize = () => {
    setIsXSmall(window.innerWidth <= 576);
    setIsSmall(window.innerWidth <= 768);
    setIsMedium(window.innerWidth <= 992);
    setIsLarge(window.innerWidth <= 1200);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return { isXSmall, isSmall, isMedium, isLarge };
};

export default useWindowSize;
