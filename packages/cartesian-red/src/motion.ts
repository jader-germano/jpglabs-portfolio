/**
 * Cartesian Motion — DS primitives.
 *
 * Valores canônicos pra produto (Axis drawer, jpglabs.com.br hero).
 * O showcase HTML usa valores amplificados (BASE_TILT=5, TILT_X_AMP=2.7,
 * TILT_Y_AMP=2.0) porque o viewport inteiro é dedicado ao motif cartesiano.
 * Em produto, use os defaults abaixo.
 */
export const cartesianMotion = {
  /** pixels per cartesian unit */
  UNIT: 12,
  /** base grid tilt in degrees */
  BASE_TILT: 3,
  /** horizontal tilt amplitude per normalized cursor x */
  TILT_X_AMP: 1.6,
  /** vertical tilt amplitude per normalized cursor y */
  TILT_Y_AMP: 1.2,
  /** cursor follower lerp coefficient */
  CURSOR_LERP: 0.12,
  /** parallax grid intensity (opposite direction to cursor) */
  PARALLAX_INTENSITY: -0.03,
} as const;

/**
 * Showcase-tuned overrides — NÃO usar em produto.
 * Apenas pra reconstruir o d9-cartesian-red-showcase.html.
 */
export const cartesianMotionShowcase = {
  BASE_TILT: 5,
  TILT_X_AMP: 2.7,
  TILT_Y_AMP: 2.0,
} as const;

/**
 * Compute the current tilt for a given viewport and normalized cursor pos.
 * px, py ∈ [-0.5, 0.5] (cursor offset from viewport center, normalized by size)
 */
export function computeTilt(
  px: number,
  py: number,
  config: { BASE_TILT: number; TILT_X_AMP: number; TILT_Y_AMP: number } = cartesianMotion
): number {
  return config.BASE_TILT + px * config.TILT_X_AMP - py * config.TILT_Y_AMP;
}

export type CartesianMotionConfig = typeof cartesianMotion;
