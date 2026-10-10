import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Card } from './Card';

describe('Card Primitive', () => {
  it('renders children correctly', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveTextContent('Content');
  });

  it('applies interactive class if passed', () => {
    render(<Card data-testid="card" interactive>Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('interactive');
  });
  
  it('fires onClick when interactive', () => {
    const handleClick = vi.fn();
    render(<Card data-testid="card" interactive onClick={handleClick}>Content</Card>);
    fireEvent.click(screen.getByTestId('card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref to container div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref Card</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges custom className and HTML attributes', () => {
    render(<Card className="custom-test-class" id="card-1">Card with props</Card>);
    const card = screen.getByText('Card with props');
    expect(card.className).toContain('custom-test-class');
    expect(card).toHaveAttribute('id', 'card-1');
  });
});
