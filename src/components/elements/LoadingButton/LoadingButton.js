import React from 'react';
import Loading from '../../partials/Loading/Loading.js';
import Button from '../Button/Button.js';
import './loading-button.scss';

export default function LoadingButton({
  text,
  loading = false,
  buttonProps = {},
  loadingProps = { color: 'light' },
}) {
  return (
    <Button type="submit" disabled={loading} {...buttonProps}>
      {loading ? (
        <div className="preloader-container">
          <Loading {...loadingProps} />
        </div>
      ) : (
        text
      )}
    </Button>
  );
}
