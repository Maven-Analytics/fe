import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ParallaxBanner} from 'react-scroll-parallax';

class ParallaxBg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.loadImage(this.props.src);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.loadImage(this.props.src);
    }
  }

  loadImage(src) {
    this.setState({
      loading: true
    });

    const img = new window.Image();
    img.src = src;

    if (img.complete) {
      return this.setState({
        loading: false
      });
    }

    img.onload = () => {
      this.setState({
        loading: false
      });
    };
  }

  render() {
    const {src, className, overlay, strength} = this.props;
    const {loading} = this.state;

    return (
      <div className={['parallax-bg', loading ? 'loading' : '', className].filter(f => f && f !== '').join(' ')}>
        {overlay ? <div className="overlay" /> : null}
        <ParallaxBanner
          // ClassName={[loading ? 'loading' : '']}
          layers={[
            {
              image: src,
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
  strength: PropTypes.number
};

ParallaxBg.defaultProps = {
  strength: 0.5
};

export default ParallaxBg;
