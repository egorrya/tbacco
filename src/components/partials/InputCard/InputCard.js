import React from 'react';
import CardContent from '../CardContent/CardContent.js';
import './input-card.scss';

export default function InputCard({ children, titleJsx, cardClassName = '' }) {
  return (
    <div className={`input-card ${cardClassName}`}>
      {titleJsx && <div className="input-card__title">{titleJsx}</div>}
      <div className="input-card__content">
        <CardContent>{children}</CardContent>
      </div>
    </div>
  );
}
