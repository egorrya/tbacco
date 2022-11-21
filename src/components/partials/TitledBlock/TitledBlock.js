import React from 'react';
import './titled-block.scss';

export default function TitledBlock({ children, titleJsx, containerData }) {
  return (
    <div className="titled-block">
      <div className="titled-block__title">{titleJsx}</div>
      <div {...containerData}>{children}</div>
    </div>
  );
}
