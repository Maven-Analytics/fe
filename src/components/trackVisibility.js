import React, {Component, Fragment, createRef} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

import {isScrolledIntoView, canUseDOM, noop} from '../utils/componentHelpers';

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
    this.handleScroll();
  }

  removeListeners() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (isScrolledIntoView(this.el.current, this.props.offset, canUseDOM())) {
      this.removeListeners();

      this.setState({
        inView: true
      });

      this.props.onShow();
    }
  }

  render() {
    const {className, alwaysShow} = this.props;
    const {inView} = this.state;

    return (
      <div ref={this.el} className={className}>
        {inView ? this.renderChildren(inView) : alwaysShow ? this.renderChildren(inView) : null}
      </div>
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
  once: PropTypes.bool
};

TrackVisibility.defaultProps = {
  className: '',
  onShow: noop,
  alwaysShow: false,
  offset: 0,
  once: true
};

export default TrackVisibility;

