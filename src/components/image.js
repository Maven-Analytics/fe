import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

import {noop} from '../utils/componentHelpers';
import TrackVisibility from './trackVisibility';

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: !props.preload,
      shouldPreload: props.preload
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
    return ((nextProps.preload && nextState.loaded && !this.state.loaded) || (nextProps.style !== this.props.style));
  }

  handleLoad() {
    this.props.onLoad(this.img.current);
    this.setState({loaded: true});
  }

  render() {
    const {src, modifier, alt, srcSet, style, wrapStyle, onlyInView} = this.props;
    const {loaded, shouldPreload} = this.state;
    const Tag = onlyInView ? TrackVisibility : 'div';

    return (
      <Tag className={`image ${shouldPreload ? 'image--preload' : ''} ${loaded ? 'loaded' : ''} ${modifier ? modifier : ''}`} style={wrapStyle}>
        <img ref={this.img} style={style} onLoad={this.handleLoad} src={src} alt={alt} srcSet={srcSet} sizes="100vw"/>
      </Tag>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  modifier: PropTypes.string,
  alt: PropTypes.string,
  preload: PropTypes.bool,
  srcSet: PropTypes.string,
  onLoad: PropTypes.func,
  style: PropTypes.object,
  wrapStyle: PropTypes.object,
  onlyInView: PropTypes.bool
};

Image.defaultProps = {
  preload: false,
  onLoad: noop,
  style: {},
  onlyInView: false
};

export default Image;
