import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: !props.preload
    };

    this.img = createRef();
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    if (this.img && this.img.current && this.img.current.complete) {
      this.handleLoad();
    }
  }

  handleLoad() {
    this.setState({loaded: true});
  }

  render() {
    const {src, modifier, alt} = this.props;
    const {loaded} = this.state;

    return (
      <div className={`image ${loaded ? 'loaded' : ''} ${modifier ? modifier : ''}`}>
        <img ref={this.img} onLoad={this.handleLoad} src={src} alt={alt}/>
      </div>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  modifier: PropTypes.string,
  alt: PropTypes.string,
  preload: PropTypes.bool
};

Image.defaultProps = {
  preload: false
};

export default Image;
