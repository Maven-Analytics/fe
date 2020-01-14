import PropTypes from 'prop-types';
import React, {Component} from 'react';
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
    if (!src) {
      return;
    }

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
    const {parallaxController} = this.props;

    // If (parallaxController && parallaxController.update && typeof parallaxController.update === 'function') {
    //   parallaxController.update();
    // }

    setTimeout(() => {
      this.setState({
        loading: false,
        img: src
      });
    }, 100);
  }

  render() {
    const {className, overlay, strength} = this.props;
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
  src: PropTypes.string,
  placeholderColor: PropTypes.string,
  className: PropTypes.string,
  overlay: PropTypes.bool,
  strength: PropTypes.number,
  parallaxController: PropTypes.object
};

ParallaxBg.defaultProps = {
  strength: 0.5
};

export default ParallaxBg;
