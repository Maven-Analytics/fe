import React, {Component, Fragment, createRef} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

import {isElementXPercentInViewport, noop} from '../utils/componentHelpers';

class TrackVisibility extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inView: false
    };

    this.el = createRef();
    this.handleScroll = throttle(this.handleScroll.bind(this), 100);
  }

  componentDidMount() {
    this.addListeners();
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
      if (this.el && this.el.current && isElementXPercentInViewport(this.el.current, 0)) {
        this.removeListeners();

        this.setState({
          inView: true
        });

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

    if (typeof children === 'function') {
      return children(inView);
    }

    return children;
  }
}

TrackVisibility.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
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

