import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

import Image from './image';
import {canUseDOM, isScrolledIntoView, getNodeHeight, isTouchDevice} from '../utils/componentHelpers';

const strength = 800;

class ParallaxBg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgStyle: {},
      enabled: false
    };

    this.el = createRef();
    this.handleScroll = throttle(this.handleScroll.bind(this), 10);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    if (!isTouchDevice()) {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
      this.handleScroll();

      this.setState({
        enabled: true
      });
    }
  }

  componentWillUnmount() {
    if (!isTouchDevice()) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleScroll() {
    const {current: el} = this.el;

    if (isScrolledIntoView(el, 100, canUseDOM())) {
      window.requestAnimationFrame(this.onScroll.bind(this));
    }
  }

  handleResize() {
    const {current: el} = this.el;

    this.setState(this.updateImgStyle({
      height: el.offsetHeight + strength,
      width: 'auto',
      left: '50%',
      transform: 'translate3d(-50%, 0, 0)',
      WebkitTransformStyle: 'preserve-3d',
      WebkitBackfaceVisibility: 'hidden',
      MozBackfaceVisibility: 'hidden',
      MsBackfaceVisibility: 'hidden'
    }));

    this.handleScroll();
  }

  onScroll() {
    const {current: el} = this.el;

    if (!el) {
      return;
    }

    const perc = this.getRelativePosition(el, canUseDOM());

    const nt = 0 - (perc * strength);

    this.setState(this.updateImgStyle({
      transform: `translate3d(-50%, ${nt}px, 0)`
    }));
  }

  updateImgStyle(imgStyle) {
    return prevState => ({
      ...prevState,
      imgStyle: {
        ...prevState.imgStyle,
        ...imgStyle
      }
    });
  }

  getRelativePosition(node, useDOM) {
    if (!useDOM) {
      return 0;
    }

    if (!node) {
      return 0;
    }

    const element = node;

    const {top, height} = element.getBoundingClientRect();
    const parentHeight = getNodeHeight(useDOM);
    const maxHeight = height > parentHeight ? height : parentHeight;
    const y = Math.round(top > maxHeight ? maxHeight : top);

    return this.getPercentage(-height, maxHeight, y, height);
  }

  getPercentage(startpos, endpos, currentpos) {
    const distance = endpos - startpos;
    const displacement = currentpos - startpos;
    return displacement / distance || 0;
  }

  render() {
    const {src, alt, srcSet, placeholderColor, sources, className} = this.props;
    const {imgStyle, enabled} = this.state;
    const wrapStyle = {overflow: 'hidden', height: '100%', width: '100%'};

    return (
      <div ref={this.el} className={className} style={wrapStyle}>
        <Image
          cover
          placeholderColor={placeholderColor}
          sources={sources}
          src={src}
          alt={alt}
          srcSet={srcSet}
          style={enabled ? imgStyle : {}}
        />
      </div>
    );
  }
}

ParallaxBg.propTypes = {
  src: PropTypes.string.isRequired,
  modifier: PropTypes.string,
  alt: PropTypes.string,
  preload: PropTypes.bool,
  srcSet: PropTypes.string,
  placeholderColor: PropTypes.string,
  sources: PropTypes.array,
  className: PropTypes.string
};

ParallaxBg.defaultProps = {
  preload: false,
  sources: []
};

export default ParallaxBg;
