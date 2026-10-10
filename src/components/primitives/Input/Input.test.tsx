import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input Primitive', () => {
  it('renders correctly with placeholder', () => {
    render(<Input placeholder="Search..." />);
    expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText(/disabled input/i);
    expect(input).toBeDisabled();
    
    const wrapper = screen.getByTestId('input-wrapper');
    expect(wrapper.className).toContain('disabled');
  });

  it('handles error state and aria-invalid', () => {
    render(<Input error placeholder="Error input" />);
    const input = screen.getByPlaceholderText(/error input/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    
    const wrapper = screen.getByTestId('input-wrapper');
    expect(wrapper.className).toContain('error');
  });

  it('renders left and right icons', () => {
    render(
      <Input 
        placeholder="With icons" 
        leftIcon={<span data-testid="left">L</span>} 
        rightIcon={<span data-testid="right">R</span>} 
      />
    );
    expect(screen.getByTestId('left')).toBeInTheDocument();
    expect(screen.getByTestId('right')).toBeInTheDocument();
  });

  it('handles user typing and onChange event', () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Type here" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'prompt engineering' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('prompt engineering');
  });

  it('applies fullWidth and inputSize styles', () => {
    render(<Input fullWidth inputSize="lg" placeholder="Large input" />);
    const wrapper = screen.getByTestId('input-wrapper');
    expect(wrapper.className).toContain('fullWidth');
    expect(wrapper.className).toContain('lg');
  });

  it('forwards ref to native input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="With ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
