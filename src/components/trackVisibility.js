import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import React, {Component, createRef} from 'react';

import {isElementXPercentInViewport, noop} from '#root/utils/componentHelpers';

class TrackVisibility extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inView: false
    };

    this.interval = null;

    this.el = createRef();
    this.handleScroll = throttle(this.handleScroll.bind(this), 100);
  }

  componentDidMount() {
    this.addListeners();

    // This.interval = setInterval(this.handleScroll, 300);
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
    this.handleScroll();
  }

  removeListeners() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  handleScroll() {
    setTimeout(() => {
      if (this.el && this.el.current && this.el.current.offsetParent && isElementXPercentInViewport(this.el.current, this.props.offset)) {
        this.removeListeners();

        this.setState({
          inView: true
        });

        // ClearInterval(this.interval);
        // this.interval = null;

        this.props.onShow();
      }
    }, this.props.delay);
  }

  render() {
    const {className, alwaysShow, tag: Tag, inViewClass, style} = this.props;
    const {inView} = this.state;

    return (
      <Tag ref={this.el} className={[className, inView ? inViewClass : ''].join(' ')} style={style}>
        {inView ? this.renderChildren(inView) : alwaysShow ? this.renderChildren(inView) : null}
      </Tag>
    );
  }

  renderChildren(inView) {
    const {children} = this.props;

    if (!children) {
      return null;
    }

    if (typeof children === 'function') {
      return children(inView);
    }

    return children;
  }
}

TrackVisibility.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  onShow: PropTypes.func,
  alwaysShow: PropTypes.bool,
  offset: PropTypes.number,
  once: PropTypes.bool,
  tag: PropTypes.string,
  inViewClass: PropTypes.string,
  style: PropTypes.object,
  delay: PropTypes.number
};

TrackVisibility.defaultProps = {
  className: '',
  onShow: noop,
  alwaysShow: false,
  offset: 0,
  once: true,
  tag: 'div',
  delay: 0
};

export default TrackVisibility;

