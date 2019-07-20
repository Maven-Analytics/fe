import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

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

    this.initCarousel = debounce(this.initCarousel, 150);
  }

  componentDidMount() {
    this.initCarousel();
  }

  componentDidUpdate(prevProps) {
    const {activeIndex} = this.props;

    if (prevProps.activeIndex !== activeIndex) {
      this.goToSlide(activeIndex);
    }

    if (!this.objectsEqual(prevProps.options, this.props.options)) {
      this.initCarousel();
    } /* else if (!prevProps.children.equals(this.props.children)) {
      console.log('children changed')
      this.initCarousel();
    } */
  }

  objectsEqual(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
      return false;
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
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

    if (this.flickity) {
      this.flickity.destroy();
    }

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

