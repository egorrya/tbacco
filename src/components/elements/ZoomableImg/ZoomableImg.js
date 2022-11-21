import React, { useState } from 'react';
import './zoomable-img.scss';

export default function ZoomableImg({ src, alt }) {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const { width, height } = e.target.getBoundingClientRect();
    const x = (offsetX / width) * 100;
    const y = (offsetY / height) * 100;
    setStyle({
      backgroundImage: `url(${src})`,
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  return (
    <figure
      className="zoomable-img"
      onMouseMove={handleMouseMove}
      onMouseOut={() => setStyle({})}
      style={style}
    >
      <img src={src} alt={alt} />
    </figure>
  );
}
