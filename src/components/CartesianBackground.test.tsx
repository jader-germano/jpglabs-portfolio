import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartesianBackground } from './CartesianBackground';

describe('CartesianBackground', () => {
  it('renders a fixed-position grid with accent axes', () => {
    const { container } = render(<CartesianBackground />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(container.querySelectorAll('line').length).toBeGreaterThan(4);
  });

  it('accepts intensity prop to adjust opacity', () => {
    const { container } = render(<CartesianBackground intensity="ambient" />);
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute('data-intensity')).toBe('ambient');
  });
});
