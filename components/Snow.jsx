"use client";

import { useEffect, useState } from "react";

const FLAKE_COUNT = 60;

const generateFlakes = () =>
  Array.from({ length: FLAKE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 0.4 + Math.random() * 0.8,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * -14,
  }));

export const Snow = () => {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    // Randomized positions must be generated client-side only, after mount,
    // to avoid a server/client markup mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFlakes(generateFlakes());
  }, []);

  return (
    <div className="snow" aria-hidden="true">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="snow__flake"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}rem`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
};
