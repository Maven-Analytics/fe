import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

import {noop} from '../utils/componentHelpers';
import TrackVisibility from './trackVisibility';

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    this.img = createRef();
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    if (this.img && this.img.current && this.img.current.complete) {
      this.handleLoad();
    } else {
      this.setState({
        shouldPreload: true
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return ((nextState.loaded && !this.state.loaded) || (nextProps.style !== this.props.style));
  }

  handleLoad() {
    this.props.onLoad(this.img.current);
    this.setState({loaded: true});
  }

  getWrapClassList() {
    const {cover, modifier} = this.props;
    const {loaded} = this.state;

    const classList = ['image'];

    if (modifier) {
      classList.push(modifier);
    }

    if (loaded) {
      classList.push('loaded');
    }

    if (cover) {
      classList.push('image--cover');
    }

    return classList.join(' ');
  }

  getWrapStyle() {
    const {wrapStyle, placeholderColor} = this.props;
    const {loaded} = this.state;

    let style = {...wrapStyle};

    if (!loaded) {
      style = {
        ...style,
        backgroundColor: placeholderColor
      };
    }

    return style;
  }

  render() {
    const {src, alt, srcSet, style} = this.props;

    return (
      <TrackVisibility className={this.getWrapClassList()} style={this.getWrapStyle()}>
        <img ref={this.img} style={style} onLoad={this.handleLoad} src={src} alt={alt} srcSet={srcSet}/>
      </TrackVisibility>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  modifier: PropTypes.string,
  alt: PropTypes.string,
  srcSet: PropTypes.string,
  onLoad: PropTypes.func,
  style: PropTypes.object,
  wrapStyle: PropTypes.object,
  cover: PropTypes.bool,
  placeholderColor: PropTypes.string
};

Image.defaultProps = {
  onLoad: noop,
  style: {},
  cover: false,
  placeholderColor: '#F6F6F6'
};

export default Image;
