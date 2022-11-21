import React from 'react';
import './error-box.scss';

export default function ErrorBox({ msg = null }) {
  return (
    <div className="error-box">
      <div className="error-box__msg">{msg}</div>
    </div>
  );
}
