import React from 'react';
import './loading.scss';

const DEFAULT_COLOR = 'primary';

const COLORS = {
  primary: 'preloader__primary',
  light: 'preloader__light',
  red: 'preloader__red',
};

export default function Loading({ color = DEFAULT_COLOR, ...props }) {
  const colorClass = COLORS[color] || COLORS[DEFAULT_COLOR];

  return (
    // <div className="preloader-container" {...props}>
    //   <div className={`preloader ${colorClass}`}>
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //   </div>
    // </div>
    <></>
  );
}
