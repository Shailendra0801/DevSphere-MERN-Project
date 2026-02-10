import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({
  children,
  variant = 'default',
  size = 'medium',
  elevated = false,
  bordered = true,
  className = '',
  ...props
}) => {
  const cardClasses = [
    styles.card,
    styles[`card--${variant}`],
    styles[`card--${size}`],
    elevated && styles['card--elevated'],
    bordered && styles['card--bordered'],
    !bordered && styles['card--noBorder'],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  elevated: PropTypes.bool,
  bordered: PropTypes.bool,
  className: PropTypes.string
};

export default Card;