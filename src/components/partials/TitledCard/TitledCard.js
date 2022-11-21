import React from 'react';
import './titled-card.scss';

export default function TitledCard({
  children,
  titleJsx,
  titleContainerProps = {},
  contentContainerProps = {},
}) {
  return (
    <div className="titled-card">
      <div {...titleContainerProps}>{titleJsx}</div>
      <div {...contentContainerProps}>{children}</div>
    </div>
  );
}
