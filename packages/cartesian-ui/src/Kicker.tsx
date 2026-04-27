import * as React from 'react';

export type KickerSize = 'xs' | 'sm' | 'md';
export type KickerSpacing = 'tight' | 'normal' | 'wide' | 'loose';
export type KickerColor = 'default' | 'dim' | 'faint' | 'accent' | 'good' | 'bad';

export interface KickerVariantProps {
  size?: KickerSize;
  spacing?: KickerSpacing;
  color?: KickerColor;
}

const BASE = 'font-mono font-bold uppercase';

const SIZE_CLASSES: Record<KickerSize, string> = {
  xs: 'text-[9px]',
  sm: 'text-[10px]',
  md: 'text-[11px]',
};

const SPACING_CLASSES: Record<KickerSpacing, string> = {
  tight: 'tracking-[0.18em]',
  normal: 'tracking-[0.24em]',
  wide: 'tracking-[0.3em]',
  loose: 'tracking-[0.4em]',
};

const COLOR_CLASSES: Record<KickerColor, string> = {
  default: 'text-[var(--text)]',
  dim: 'text-[var(--text-dim)]',
  faint: 'text-[var(--text-faint)]',
  accent: 'text-[var(--accent)]',
  good: 'text-[var(--good)]',
  bad: 'text-[var(--bad)]',
};

export function buildKickerClassName(
  variants: KickerVariantProps,
  extraClass?: string,
): string {
  const { size = 'sm', spacing = 'normal', color = 'dim' } = variants;
  const parts = [
    BASE,
    SIZE_CLASSES[size],
    SPACING_CLASSES[spacing],
    COLOR_CLASSES[color],
  ];
  if (extraClass) parts.push(extraClass);
  return parts.join(' ');
}

type KickerTag = 'p' | 'span' | 'div';

export interface KickerProps extends KickerVariantProps {
  as?: KickerTag;
  className?: string;
  children: React.ReactNode;
}

export function Kicker({
  as: Tag = 'p',
  size,
  spacing,
  color,
  className,
  children,
}: KickerProps): React.ReactElement {
  const classes = buildKickerClassName({ size, spacing, color }, className);
  return React.createElement(Tag, { className: classes }, children);
}
