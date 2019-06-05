import React, {Component, createRef} from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import {canUseDOM} from '../utils/componentHelpers';

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

  async initCarousel() {
    if (!canUseDOM()) {
      return;
    }

    const Flickity = require('flickity');

    this.flickity = new Flickity(this.el.current, {
      ...this.defaultOptions,
      ...this.props.options
    });
  }

  render() {
    const {children} = this.props;

    return (
      <div ref={this.el} className="carousel">
        {children}
      </div>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.object
};

Carousel.defaultProps = {
  options: {}
};

export default Carousel;
