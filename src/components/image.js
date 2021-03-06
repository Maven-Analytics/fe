import PropTypes from 'prop-types';
import React, {Component, createRef} from 'react';

import {canUseDOM, noop} from '#root/utils/componentHelpers';

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
    return (nextState.loaded && !this.state.loaded) || nextProps.style !== this.props.style || nextProps.src !== this.props.src;
  }

  handleLoad() {
    this.props.onLoad(this.img.current);
    this.setState({loaded: true});
  }

  getWrapClassList() {
    const {className, cover, modifier} = this.props;
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

    if (className) {
      classList.push(className);
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

      return <source key={`sources-${index}`} srcSet={source.srcSet} media={source.media} type={source.type} />;
    });

    // IE9 requires the sources to be wrapped around an <audio> tag.
    if (ieVersion === 9) {
      return <video style={{display: 'none'}}>{mappedSources}</video>;
    }

    return mappedSources;
  }

  render() {
    const {src, alt, srcSet, style, placeholderColor, showLoader, lazyLoad} = this.props;

    const Comp = lazyLoad ? TrackVisibility : 'div';

    return (
      <Comp className={this.getWrapClassList()} style={this.getWrapStyle()}>
        {showLoader ? <div className="loader" style={{backgroundColor: placeholderColor}} /> : null}
        <picture>
          {this.renderSources()}
          {src ? <img ref={this.img} onLoad={this.handleLoad} style={style} src={src} alt={alt} srcSet={srcSet} /> : null}
        </picture>
      </Comp>
    );
  }
}

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  modifier: PropTypes.string,
  alt: PropTypes.string,
  srcSet: PropTypes.string,
  onLoad: PropTypes.func,
  style: PropTypes.object,
  wrapStyle: PropTypes.object,
  cover: PropTypes.bool,
  placeholderColor: PropTypes.string,
  sources: PropTypes.array,
  showLoader: PropTypes.bool,
  lazyLoad: PropTypes.bool
};

Image.defaultProps = {
  onLoad: noop,
  style: {},
  cover: false,
  placeholderColor: '#F6F6F6',
  showLoader: false,
  lazyLoad: true
};

export default Image;
