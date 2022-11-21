import React, { Component } from 'react';
import Slider from '../Slider/Slider.js';

export default class SliderPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainSlider: null,
      previewSlider: null,
    };
  }

  componentDidMount() {
    this.setState({
      mainSliderNav: this.mainSlider,
      previewSliderNav: this.previewSlider,
    });
  }

  render() {
    return (
      <>
        <Slider
          // eslint-disable-next-line no-return-assign
          ref={(slider) => (this.mainSlider = slider)}
          asNavFor={this.state.previewSliderNav}
          arrows={false}
          slidesToShow={1}
          responsive={null}
          className="sp-main-slider"
        >
          {this.props.mainSliderData}
        </Slider>

        <Slider
          // eslint-disable-next-line no-return-assign
          ref={(slider) => (this.previewSlider = slider)}
          asNavFor={this.state.mainSliderNav}
          autoplay={false}
          slidesToShow={Math.min(3, this.props.previewSliderData.length)}
          swipeToSlide={true}
          focusOnSelect={true}
          responsive={null}
          className="sp-preview-slider"
        >
          {this.props.previewSliderData}
        </Slider>
      </>
    );
  }
}
