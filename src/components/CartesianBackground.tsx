import React, { useEffect, useRef } from 'react';

export type Intensity = 'ambient' | 'showcase';

export interface CartesianBackgroundProps {
  intensity?: Intensity;
  className?: string;
  gridSize?: number;
}

/**
 * Cartesian Red background — canonical DS motif do JPGLabs.
 *
 * intensity:
 *   - 'ambient'   — grid + eixos + tilt/parallax (Login, Layout, Portfolio bg)
 *   - 'showcase'  — ambient + origem pulsando, orbit, trajectory + leading dot
 *
 * Referência canônica: prototypes/d9-cartesian-red-showcase.html
 */

// DS defaults (ambient — valores de produto, não showcase-tuned)
const BASE_TILT = 3;
const TILT_X_AMP = 1.6;
const TILT_Y_AMP = 1.2;
const PARALLAX_INTENSITY = 0.03;

export const CartesianBackground: React.FC<CartesianBackgroundProps> = ({
  intensity = 'ambient',
  className = '',
  gridSize = 48,
}) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let rafId = 0;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };

    const onPointerMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;

      const host = containerRef.current;
      const grid = gridRef.current;
      if (host && grid) {
        const rect = host.getBoundingClientRect();
        const ccx = rect.left + rect.width / 2;
        const ccy = rect.top + rect.height / 2;
        const dx = (pos.x - ccx) * -PARALLAX_INTENSITY;
        const dy = (pos.y - ccy) * -PARALLAX_INTENSITY;
        const px = rect.width > 0 ? (pos.x - ccx) / rect.width : 0;
        const py = rect.height > 0 ? (pos.y - ccy) / rect.height : 0;
        const tilt = BASE_TILT + px * TILT_X_AMP - py * TILT_Y_AMP;
        grid.style.transform = `translate(${dx}px, ${dy}px) rotate(${tilt}deg)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  const majorSize = gridSize * 4;
  const gridStyle: React.CSSProperties = {
    position: 'absolute',
    inset: '-15%',
    width: '130%',
    height: '130%',
    transformOrigin: 'center',
    willChange: 'transform',
    backgroundImage: [
      'linear-gradient(to right, var(--grid-line) 1px, transparent 1px)',
      'linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
      'linear-gradient(to right, var(--grid-major) 1px, transparent 1px)',
      'linear-gradient(to bottom, var(--grid-major) 1px, transparent 1px)',
    ].join(', '),
    backgroundSize: `${gridSize}px ${gridSize}px, ${gridSize}px ${gridSize}px, ${majorSize}px ${majorSize}px, ${majorSize}px ${majorSize}px`,
  };

  const classes = ['pointer-events-none', 'fixed', 'inset-0', 'overflow-hidden', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-intensity={intensity}
      className={classes}
    >
      <style>{`
        .cb-axes { position: absolute; inset: 0; pointer-events: none; }
        .cb-axes::before,
        .cb-axes::after {
          content: '';
          position: absolute;
          background: var(--axis);
        }
        .cb-axes::before {
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          transform: translateX(-50%);
        }
        .cb-axes::after {
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          transform: translateY(-50%);
        }
        .cb-origin-core {
          filter: drop-shadow(0 0 8px var(--accent-glow));
        }
        .cb-orbit-dot {
          filter: drop-shadow(0 0 6px var(--accent-glow));
        }
        .cb-leading-dot {
          filter: drop-shadow(0 0 10px var(--accent-glow));
        }
        @media (prefers-reduced-motion: reduce) {
          .cb-grid-layer { transform: none !important; }
          .cb-motifs animate,
          .cb-motifs animateTransform,
          .cb-motifs animateMotion { animation-play-state: paused; }
        }
      `}</style>

      <div ref={gridRef} className="cb-grid-layer" style={gridStyle}>
        {intensity === 'showcase' && (
          <svg
            className="cb-motifs"
            viewBox="-720 -450 1440 900"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              overflow: 'visible',
            }}
          >
            {/* Origin pulse rings — dessincronizados (2.6s + 3.8s) */}
            <circle cx="0" cy="0" fill="none" stroke="var(--accent)" strokeWidth="1.2">
              <animate
                attributeName="r"
                values="24;38;24"
                dur="2.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.55;0.08;0.55"
                dur="2.6s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="0" cy="0" fill="none" stroke="var(--accent)" strokeWidth="1">
              <animate
                attributeName="r"
                values="52;78;52"
                dur="3.8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0.04;0.3"
                dur="3.8s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Origin core — ponto sólido + halo */}
            <circle
              className="cb-origin-core"
              cx="0"
              cy="0"
              r="3.5"
              fill="var(--accent)"
            />

            {/* Orbit group — rotação contínua 16s */}
            <g>
              <circle
                cx="0"
                cy="0"
                r="104"
                fill="none"
                stroke="var(--accent-deep)"
                strokeWidth="1"
                strokeDasharray="3 7"
                opacity="0.7"
              />
              <circle
                className="cb-orbit-dot"
                cx="104"
                cy="0"
                r="4"
                fill="var(--accent)"
              />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="16s"
                repeatCount="indefinite"
              />
            </g>

            {/* Dashed trajectory connecting showcase anchors */}
            <path
              id="egg-trajectory"
              d="M 0 0 L -192 -108 L 168 -132 L 216 156 L -240 132 Z"
              fill="none"
              stroke="var(--accent-deep)"
              strokeWidth="1"
              strokeDasharray="3 6"
              opacity="0.55"
            />

            {/* Leading dot — percorre a trajetória em 11s, rotate=auto */}
            <circle className="cb-leading-dot" r="5" fill="var(--accent)">
              <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
                <mpath href="#egg-trajectory" />
              </animateMotion>
            </circle>
          </svg>
        )}
      </div>

      <div className="cb-axes" />
    </div>
  );
};

export default CartesianBackground;
