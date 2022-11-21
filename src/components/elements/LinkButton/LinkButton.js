import React from 'react';
import './link-button.scss';

export default function LinkButton({ children, node = 'a', ...props }) {
  return React.createElement(
    node,
    { className: 'custom-link-button', ...props },
    children
  );
}
