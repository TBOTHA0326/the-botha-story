"use client";

import { useEffect, useState } from "react";

export default function ScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setVisible(false);
    window.addEventListener("scroll", hide, { once: true, passive: true });
    return () => window.removeEventListener("scroll", hide);
  }, []);

  if (!visible) return null;

  return (
    <div className="scroll-hint">
      <p className="scroll-hint__label">Only scroll down, not sideways</p>
      <span className="scroll-hint__chevron" />
      <span className="scroll-hint__chevron" />
    </div>
  );
}
