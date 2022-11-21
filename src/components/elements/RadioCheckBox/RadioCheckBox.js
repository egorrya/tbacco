import React from 'react';
import CheckBox from '../CheckBox/CheckBox.js';

export default function RadioCheckBox({
  children,
  name,
  value,
  ...inputProps
}) {
  let { id } = inputProps;
  if (!id) {
    id = `${name}-${value}`;
  }

  return (
    <CheckBox {...inputProps} name={name} value={value} type="radio" id={id}>
      {children}
    </CheckBox>
  );
}
