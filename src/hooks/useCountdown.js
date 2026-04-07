import { useEffect, useState } from "react";

export const useCountdown = (start = 3, onFinish) => {
  const [count, setCount] = useState(start);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;
    if (count <= 0) {
      onFinish?.();
      setActive(false);
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, active, onFinish]);

  return { count, active };
}

export default useCountdown;