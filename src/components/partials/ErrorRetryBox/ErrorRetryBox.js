import React from 'react';
import Button from '../../elements/Button/Button.js';
import './error-retry-box.scss';

export default function ErrorRetryBox({ handleRetry, msg = null }) {
  return (
    <div className="error-retry-box">
      <div className="error-retry-box__msg">
        Произошла ошибка{msg && `: ${msg}`}
      </div>
      <Button onClick={handleRetry}>Попробовать снова</Button>
    </div>
  );
}
