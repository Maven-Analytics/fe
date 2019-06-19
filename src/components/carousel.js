import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

import {canUseDOM, noop} from '../utils/componentHelpers';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.defaultOptions = {
      contain: true,
      prevNextButtons: false,
      cellSelector: '.carousel-slide',
      cellAlign: 'left'
    };

    this.el = createRef();
  }

  componentDidMount() {
    this.initCarousel();
  }

  componentDidUpdate(prevProps) {
    const {activeIndex} = this.props;

    if (prevProps.activeIndex !== activeIndex) {
      this.goToSlide(activeIndex);
    }

    if (prevProps.options !== this.props.options) {
      this.initCarousel();
    }
  }

  goToSlide(index) {
    if (!this.flickity) {
      return;
    }

    this.flickity.select(index);
  }

  async initCarousel() {
    if (!canUseDOM()) {
      return;
    }

    const Flickity = require('flickity');

    this.flickity = new Flickity(this.el.current, {
      ...this.defaultOptions,
      ...this.props.options
    });

    this.flickity.on('change', index => {
      this.props.onChange(index);
    });
  }

  render() {
    const {children, className} = this.props;

    return (
      <div ref={this.el} className={`carousel ${className}`}>
        {children}
      </div>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.object,
  activeIndex: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func
};

Carousel.defaultProps = {
  options: {},
  className: '',
  onChange: noop
};

export default Carousel;

