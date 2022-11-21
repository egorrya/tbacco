import React, { forwardRef } from 'react';
import Carousel from 'react-slick';
import './slider.scss';

const configureSlider = (count) => ({
  dots: false,
  infinite: true,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  speed: 500,
  slidesToShow: Math.min(3, count),
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1260,
      settings: {
        slidesToShow: Math.min(2, count),
      },
    },
    {
      breakpoint: 720,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

const Slider = forwardRef(({ children, ...settings }, ref) => {
  const finalSettings = {
    ...configureSlider(React.Children.count(children)),
    ...settings,
  };

  return (
    <div className="slider">
      <Carousel {...finalSettings} ref={ref}>
        {children}
      </Carousel>
    </div>
  );
});
Slider.displayName = 'Slider';

export default Slider;
