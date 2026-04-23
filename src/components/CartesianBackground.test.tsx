import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartesianBackground } from './CartesianBackground';

describe('CartesianBackground', () => {
  it('renders the grid layer with data-intensity="ambient" by default', () => {
    const { container } = render(<CartesianBackground />);
    const root = container.firstChild as HTMLElement;
    expect(root).toBeTruthy();
    expect(root.getAttribute('aria-hidden')).toBe('true');
    expect(root.getAttribute('data-intensity')).toBe('ambient');

    // Grid is now CSS linear-gradient inside .cb-grid-layer (not SVG <line>)
    const gridLayer = container.querySelector('.cb-grid-layer') as HTMLElement | null;
    expect(gridLayer).toBeTruthy();
    expect(gridLayer?.style.backgroundImage).toContain('linear-gradient');

    // Axes rendered via ::before/::after on .cb-axes (presence of the node is enough)
    expect(container.querySelector('.cb-axes')).toBeTruthy();
  });

  it('does NOT render showcase motifs when intensity="ambient"', () => {
    const { container } = render(<CartesianBackground intensity="ambient" />);
    expect(container.querySelector('.cb-motifs')).toBeNull();
    expect(container.querySelector('#egg-trajectory')).toBeNull();
    expect(container.querySelector('animateMotion')).toBeNull();
  });

  it('renders showcase motifs (rings, orbit, trajectory, leading dot) when intensity="showcase"', () => {
    const { container } = render(<CartesianBackground intensity="showcase" />);
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute('data-intensity')).toBe('showcase');

    const motifs = container.querySelector('.cb-motifs');
    expect(motifs).toBeTruthy();

    // Origin pulse rings + core + orbit dot + leading dot => multiple <circle> nodes
    expect(motifs?.querySelectorAll('circle').length).toBeGreaterThanOrEqual(4);

    // Dashed trajectory path (id reused by animateMotion's mpath)
    expect(motifs?.querySelector('#egg-trajectory')).toBeTruthy();

    // Leading dot animated along the path
    expect(motifs?.querySelector('animateMotion')).toBeTruthy();
  });

  it('merges custom className with internal positioning classes', () => {
    const { container } = render(<CartesianBackground className="custom-bg" />);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('custom-bg');
    expect(root.className).toContain('fixed');
    expect(root.className).toContain('inset-0');
  });

  it('honors custom gridSize in background-size', () => {
    const { container } = render(<CartesianBackground gridSize={64} />);
    const gridLayer = container.querySelector('.cb-grid-layer') as HTMLElement | null;
    expect(gridLayer?.style.backgroundSize).toContain('64px 64px');
    // Major grid is gridSize * 4 => 256px
    expect(gridLayer?.style.backgroundSize).toContain('256px 256px');
  });
});
