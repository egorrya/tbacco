import React from 'react';
import images from '../../../images.js';
import './logo.scss';

export default function Logo() {
  return (
    <div className="primary-logo">
      <img className="primary-logo__icon" src={images.logo} alt="tbacco" />
      <span className="primary-logo__text">tbacco</span>
    </div>
  );
}
