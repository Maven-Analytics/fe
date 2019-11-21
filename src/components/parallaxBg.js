import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ParallaxBanner, withController} from 'react-scroll-parallax';

class ParallaxBg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.loadImage(this.props.src, true);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.loadImage(this.props.src, false);
    }
  }

  loadImage(src, setLoading) {
    if (setLoading) {
      this.setState({
        loading: true
      });
    }

    const img = new window.Image();
    img.src = src;

    if (img.complete) {
      this.handleImageLoad(src);
    }

    img.onload = () => {
      this.handleImageLoad(src);
    };
  }

  handleImageLoad(src) {
    this.props.parallaxController.update();
    setTimeout(() => {
      this.setState({
        loading: false,
        img: src
      });
    }, 100);
  }

  render() {
    const {src, className, overlay, strength} = this.props;
    const {loading, img} = this.state;

    return (
      <div className={['parallax-bg', loading ? 'loading' : '', className].filter(f => f && f !== '').join(' ')}>
        {overlay ? <div className="overlay" /> : null}
        <ParallaxBanner
          // ClassName={[loading ? 'loading' : '']}
          layers={[
            {
              image: img,
              amount: strength
            }
          ]}
          style={{
            height: '100%'
          }}
        />
      </div>
    );
  }
}

ParallaxBg.propTypes = {
  src: PropTypes.string.isRequired,
  placeholderColor: PropTypes.string,
  className: PropTypes.string,
  overlay: PropTypes.bool,
  strength: PropTypes.number,
  parallaxController: PropTypes.object.isRequired
};

ParallaxBg.defaultProps = {
  strength: 0.5
};

export default withController(ParallaxBg);
