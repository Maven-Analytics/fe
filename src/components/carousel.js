import React, {Component, createRef} from 'react';
import {createPortal} from 'react-dom';
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
      cellAlign: 'left',
      draggable: true
    };

    this.state = {
      ready: false
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
      // this.initCarousel();
    }

    if (this.flickity) {
      this.flickity.reloadCells();
    }
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
      ...this.props.options,
      on: {
        ready: () => {
          setTimeout(() => {
            if (this.flickity) {
              this.flickity.resize();
            }
          }, 200);
        }
      }
    });

    this.flickity.on('change', index => {
      this.props.onChange(index);
    });

    if (!this.state.ready) {
      this.setState({
        ready: true
      });
    }
  }

  renderPortal() {
    if (!this.el || !this.el.current) {
      return null;
    }

    const mountNode = this.el.current.querySelector('.flickity-slider');

    if (mountNode) {
      return createPortal(this.props.children, mountNode);
    }

    return null;
  }

  render() {
    const {children, className, isStatic} = this.props;

    return (
      <div ref={this.el} className={`carousel ${className}`}>
        {isStatic ? children : this.renderPortal()}
      </div>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.object,
  activeIndex: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func,
  isStatic: PropTypes.bool
};

Carousel.defaultProps = {
  options: {},
  className: '',
  onChange: noop,
  isStatic: false
};

export default Carousel;

