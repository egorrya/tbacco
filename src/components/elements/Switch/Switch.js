import React from 'react';
import './switch.scss';

export default function Switch({
  leftValue,
  rightValue,
  leftJsx,
  rightJsx,
  selectedValue,
  disabled,
  onSwitch = null,
}) {
  const setSelectedValue = (value) => {
    if (onSwitch) onSwitch(value);
  };

  const getClasses = (value) => {
    const classes = ['custom-switch__element'];
    if (value === selectedValue) {
      classes.push('custom-switch__active');
    }
    if (!disabled) {
      classes.push('custom-switch__enabled');
    }
    return classes.join(' ');
  };

  return (
    <div className="custom-switch">
      <div
        className={getClasses(leftValue)}
        onClick={() => setSelectedValue(leftValue)}
      >
        {leftJsx}
      </div>
      <div
        className={getClasses(rightValue)}
        onClick={() => setSelectedValue(rightValue)}
      >
        {rightJsx}
      </div>
    </div>
  );
}
