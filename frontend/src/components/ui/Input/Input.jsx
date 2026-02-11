import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import styles from './Input.module.css';

const Input = forwardRef(({
  label,
  error,
  success,
  helperText,
  type = 'text',
  disabled = false,
  fullWidth = false,
  variant = 'default',
  size = 'medium',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onRightIconClick,
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const showToggle = isPassword && !RightIcon;
  
  const inputType = isPassword && showPassword ? 'text' : type;

  const inputClasses = [
    styles.input,
    styles[`input--${variant}`],
    styles[`input--${size}`],
    error && styles['input--error'],
    success && styles['input--success'],
    disabled && styles['input--disabled'],
    fullWidth && styles['input--fullWidth'],
    isFocused && styles['input--focused'],
    className
  ].filter(Boolean).join(' ');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
  };

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {props.required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputContainer}>
        {LeftIcon && (
          <div className={styles.inputIconLeft}>
            <LeftIcon className={styles.inputIcon} />
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          className={inputClasses}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {(RightIcon || showToggle) && (
          <div className={styles.inputIconRight}>
            {showToggle ? (
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className={styles.inputIcon} />
                ) : (
                  <Eye className={styles.inputIcon} />
                )}
              </button>
            ) : (
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={onRightIconClick}
                aria-label="Toggle icon action"
              >
                <RightIcon className={styles.inputIcon} />
              </button>
            )}
          </div>
        )}
      </div>
      
      {(error || success || helperText) && (
        <div className={styles.feedback}>
          {error && (
            <div className={styles.error}>
              <AlertCircle className={styles.feedbackIcon} />
              <span>{error}</span>
            </div>
          )}
          {success && !error && (
            <div className={styles.success}>
              <span>{success}</span>
            </div>
          )}
          {helperText && !error && !success && (
            <div className={styles.helperText}>
              <span>{helperText}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.string,
  helperText: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'filled', 'outlined']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  leftIcon: PropTypes.elementType,
  rightIcon: PropTypes.elementType,
  required: PropTypes.bool,
  className: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onRightIconClick: PropTypes.func
};

export default Input;