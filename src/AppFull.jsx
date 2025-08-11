// src/AppFull.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import "./planner-theme.css";

/**
 * Read the “logical canvas” size that your planner uses.
 * (These are already defined in planner-theme.css as CSS variables.)
 */
function useBaseSize() {
  return useMemo(() => {
    const styles = getComputedStyle(document.documentElement);
    const w = parseInt(styles.getPropertyValue("--planner-width"), 10) || 1200;
    const h = parseInt(styles.getPropertyValue("--planner-height"), 10) || 1000;
    return { w, h };
  }, []);
}

/** Debounced window resize */
function useDebouncedResize(fn, delay = 120) {
  const t = useRef();
  useEffect(() => {
    const on = () => {
      clearTimeout(t.current);
      t.current = setTimeout(fn, delay);
    };
    window.addEventListener("resize", on);
    return () => {
      clearTimeout(t.current);
      window.removeEventListener("resize", on);
    };
  }, [fn, delay]);
}

export default function AppFull() {
  // IMPORTANT: this is the only container class we use in “full”
  const hostRef = useRef(null);
  const { w: BASE_W, h: BASE_H } = useBaseSize();
  const [scale, setScale] = useState(1);

  const recalc = () => {
    const el = hostRef.current;
    if (!el) return;
    const { clientWidth, clientHeight } = el;

    // Fit the whole logical canvas (BASE_W x BASE_H) into the viewport.
    const sx = clientWidth / BASE_W;
    const sy = clientHeight / BASE_H;
    setScale(Math.max(0.5, Math.min(sx, sy))); // don’t get comically tiny
  };

  useEffect(recalc, [BASE_W, BASE_H]);
  useDebouncedResize(recalc);

  const hostStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "hidden", // no page scroll in full
    background: "#FAFAFA",
  };

  const wrapperStyle = {
    width: `${BASE_W}px`,
    height: `${BASE_H}px`,
    transform: `scale(${scale})`,
    transformOrigin: "top center",
  };

  return (
    <div ref={hostRef} className="app-container full" style={hostStyle}>
      {/* DO NOT use 'embedded' here. */}
      <div className="compact-wrapper" style={wrapperStyle}>
        {/* ===== YOUR PLANNER UI GOES HERE =====
           Paste the inner planner markup (controls + grids/table) that you
           currently render in the embedded app — NOT its outer wrapper.
           Concretely, open src/AppEmbedded.jsx and copy from:
             <div className="planner-root">   …through…   </div> (its closing)
           Then paste that block in place of the simple header below. */}
        <div className="planner-root">
          <div className="planner-header">
            <div className="planner-title">Sunset Oaks Garden Planner — Full</div>
            <div className="version-tag">Full preview</div>
          </div>
          {/* Replace the block below with your real controls + grids */}
          <div className="planner-grids">
            <div className="garden-grid-outer">
              <div className="garden-grid-inner" />
            </div>
            <div className="mirror-grid-outer">
              <div className="mirror-grid-inner" />
            </div>
          </div>
        </div>
        {/* ===== END PASTE AREA ===== */}
      </div>
    </div>
  );
}