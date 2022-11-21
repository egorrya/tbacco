import React from 'react';
import './checkbox.scss';

export default function CheckBox({ children, ...inputProps }) {
  const { id, ...inputPropsWithoutId } = inputProps;

  return (
    <div className="custom-checkbox">
      <input
        className="custom-checkbox__input"
        type="checkbox"
        id={id}
        {...inputPropsWithoutId}
      />

      <label className="custom-checkbox__label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
}
