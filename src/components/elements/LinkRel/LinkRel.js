import React from 'react';
import Link from '../Link/Link.js';

export default function LinkRel({ children, ...props }) {
  return (
    <Link rel="nofollow noopener noreferrer" {...props}>
      {children}
    </Link>
  );
}
