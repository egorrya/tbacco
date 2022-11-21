import React from 'react';

export default function RawHtml({ children, ...props }) {
  return <div dangerouslySetInnerHTML={{ __html: children }} {...props} />;
}
