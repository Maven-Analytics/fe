import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

import {noop, canUseDOM} from '../utils/componentHelpers';
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
    const {wrapStyle} = this.props;
    const {loaded} = this.state;

    let style = {...wrapStyle};

    if (!loaded) {
      style = {
        ...style
      };
    }

    return style;
  }

  renderSources() {
    const ieVersion = canUseDOM() && document.documentMode ? document.documentMode : -1;
    const {sources} = this.props;

    if (!sources) {
      return null;
    }

    const mappedSources = sources.map((source, index) => {
      if (source.srcSet === null) {
        return null;
      }

      return (
        <source
          key={`sources-${index}`}
          srcSet={source.srcSet}
          media={source.media}
          type={source.type}
        />
      );
    });

    // IE9 requires the sources to be wrapped around an <audio> tag.
    if (ieVersion === 9) {
      return <video style={{display: 'none'}}>{mappedSources}</video>;
    }

    return mappedSources;
  }

  render() {
    const {src, alt, srcSet, style, placeholderColor} = this.props;

    return (
      <TrackVisibility className={this.getWrapClassList()} style={this.getWrapStyle()}>
        <div className="loader" style={{backgroundColor: placeholderColor}}/>
        <picture ref={this.img} onLoad={this.handleLoad}  style={style}>
          {this.renderSources()}
          <img style={style} src={src} alt={alt} srcSet={srcSet}/>
        </picture>
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
  placeholderColor: PropTypes.string,
  sources: PropTypes.array
};

Image.defaultProps = {
  onLoad: noop,
  style: {},
  cover: false,
  placeholderColor: '#F6F6F6'
};

export default Image;
