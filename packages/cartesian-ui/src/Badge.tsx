import * as React from 'react';

export type BadgeTone = 'neutral' | 'good' | 'bad' | 'accent';
export type BadgeSize = 'sm' | 'md';

export interface BadgeVariantProps {
  tone?: BadgeTone;
  size?: BadgeSize;
}

const BASE = 'inline-flex items-center rounded-full border font-mono font-bold uppercase tracking-[0.2em]';

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[9px]',
  md: 'px-3 py-1 text-[10px]',
};

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: 'text-[var(--text-dim)] bg-transparent border-[var(--border)]',
  good: 'text-[var(--good)] bg-[var(--good)]/10 border-[var(--good)]/30',
  bad: 'text-[var(--bad)] bg-[var(--bad)]/10 border-[var(--bad)]/30',
  accent: 'text-[var(--accent)] bg-[var(--accent-soft)] border-[var(--accent-deep)]',
};

export function buildBadgeClassName(
  variants: BadgeVariantProps,
  extraClass?: string,
): string {
  const { size = 'md', tone = 'neutral' } = variants;
  const parts = [BASE, SIZE_CLASSES[size], TONE_CLASSES[tone]];
  if (extraClass) parts.push(extraClass);
  return parts.join(' ');
}

export interface BadgeProps extends BadgeVariantProps {
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  size,
  tone,
  className,
  children,
}: BadgeProps): React.ReactElement {
  return React.createElement(
    'span',
    { className: buildBadgeClassName({ size, tone }, className) },
    children,
  );
}
