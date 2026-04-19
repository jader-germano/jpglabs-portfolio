import React, { useMemo } from 'react';

type Intensity = 'ambient' | 'focused' | 'accent';

interface Props {
  intensity?: Intensity;
  className?: string;
  gridSize?: number;
}

/**
 * Background animado do plano cartesiano — identidade visual JPGLabs.
 *
 * intensity:
 *   - 'ambient'  — ideal pra backgrounds amplos (portfolio hero)
 *   - 'focused'  — densidade média (services, downloads)
 *   - 'accent'   — contido, high contrast (chat drawer, modals)
 */
export const CartesianBackground: React.FC<Props> = ({
  intensity = 'ambient',
  className = '',
  gridSize = 48,
}) => {
  const opacityMap: Record<Intensity, number> = {
    ambient: 0.6,
    focused: 0.85,
    accent: 1,
  };

  const lines = useMemo(() => {
    const vLines: number[] = [];
    const hLines: number[] = [];
    for (let x = 0; x <= 1920; x += gridSize) vLines.push(x);
    for (let y = 0; y <= 1080; y += gridSize) hLines.push(y);
    return { vLines, hLines };
  }, [gridSize]);

  return (
    <div
      aria-hidden="true"
      data-intensity={intensity}
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      style={{ opacity: opacityMap[intensity] }}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full animate-grid-pan"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        {lines.vLines.map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1={0}
            x2={x}
            y2={1080}
            stroke={x % (gridSize * 4) === 0 ? 'var(--grid-major)' : 'var(--grid-line)'}
            strokeWidth={x % (gridSize * 4) === 0 ? 1 : 0.5}
          />
        ))}
        {lines.hLines.map((y) => (
          <line
            key={`h-${y}`}
            x1={0}
            y1={y}
            x2={1920}
            y2={y}
            stroke={y % (gridSize * 4) === 0 ? 'var(--grid-major)' : 'var(--grid-line)'}
            strokeWidth={y % (gridSize * 4) === 0 ? 1 : 0.5}
          />
        ))}
        {/* Eixos principais — ressaltam origem visual */}
        <line x1={960} y1={0} x2={960} y2={1080} stroke="var(--axis)" strokeWidth="1.5" />
        <line x1={0} y1={540} x2={1920} y2={540} stroke="var(--axis)" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

export default CartesianBackground;
