import React from 'react';
import './link.scss';

export default function Link({ children, node = 'a', ...props }) {
  return React.createElement(
    node,
    { className: 'custom-link', ...props },
    children
  );
}
