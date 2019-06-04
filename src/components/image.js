import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

import {noop} from '../utils/componentHelpers';

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
    const {src, modifier, alt, srcSet, style} = this.props;
    const {loaded, shouldPreload} = this.state;

    return (
      <div className={`image ${shouldPreload ? 'image--preload' : ''} ${loaded ? 'loaded' : ''} ${modifier ? modifier : ''}`}>
        <img ref={this.img} style={style} onLoad={this.handleLoad} src={src} alt={alt} srcSet={srcSet} sizes="100vw"/>
      </div>
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
  style: PropTypes.object
};

Image.defaultProps = {
  preload: false,
  onLoad: noop,
  style: {}
};

export default Image;
