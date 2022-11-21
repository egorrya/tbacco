import React from 'react';
import { NavLink } from 'react-router-dom';
import Link from '../Link/Link.js';

export default function SoftLink({ children, ...props }) {
  return (
    <Link node={NavLink} {...props}>
      {children}
    </Link>
  );
}
