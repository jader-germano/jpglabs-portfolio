import * as React from 'react';
import {
  buildKickerClassName,
  type KickerProps,
  type KickerVariantProps,
} from './Kicker';

const EYEBROW_DEFAULTS: Required<KickerVariantProps> = {
  size: 'md',
  spacing: 'wide',
  color: 'accent',
};

export function buildEyebrowClassName(
  variants: KickerVariantProps,
  extraClass?: string,
): string {
  return buildKickerClassName(
    {
      size: variants.size ?? EYEBROW_DEFAULTS.size,
      spacing: variants.spacing ?? EYEBROW_DEFAULTS.spacing,
      color: variants.color ?? EYEBROW_DEFAULTS.color,
    },
    extraClass,
  );
}

export type EyebrowProps = KickerProps;

export function Eyebrow({
  as: Tag = 'p',
  size = EYEBROW_DEFAULTS.size,
  spacing = EYEBROW_DEFAULTS.spacing,
  color = EYEBROW_DEFAULTS.color,
  className,
  children,
}: EyebrowProps): React.ReactElement {
  const classes = buildEyebrowClassName({ size, spacing, color }, className);
  return React.createElement(Tag, { className: classes }, children);
}
