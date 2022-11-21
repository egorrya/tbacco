import React, { forwardRef } from 'react';
import './text-input.scss';

const TextInput = forwardRef(({ children, node = 'input', ...props }, ref) =>
  React.createElement(
    node,
    { className: 'custom-text-input', ...props, ref },
    children
  )
);
TextInput.displayName = 'TextInput';

export default TextInput;
