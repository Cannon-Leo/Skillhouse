import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  inputSize?: 'sm' | 'md' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, rightIcon, fullWidth, inputSize = 'md', disabled, ...props }, ref) => {
    const wrapperClasses = [
      styles.wrapper,
      styles[inputSize],
      error ? styles.error : '',
      disabled ? styles.disabled : '',
      fullWidth ? styles.fullWidth : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses} data-testid="input-wrapper">
        {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
        <input 
          ref={ref}
          className={styles.input}
          disabled={disabled}
          aria-invalid={!!error}
          {...props} 
        />
        {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
