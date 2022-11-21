import React from 'react';
import './spinbox.scss';

export default function SpinBox({
  containerClassName = null,
  onDecrease = null,
  onIncrease = null,
  ...inputProps
}) {
  return (
    <div className={`custom-spinbox ${containerClassName || ''}`}>
      <button className="custom-spinbox__button" onClick={onDecrease}>
        –
      </button>

      <input type="number" className="custom-spinbox__value" {...inputProps} />

      <button className="custom-spinbox__button" onClick={onIncrease}>
        +
      </button>
    </div>
  );
}
