import React, {Component, Fragment, createRef} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

import {isScrolledIntoView, canUseDOM} from '../utils/componentHelpers';

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
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (isScrolledIntoView(this.el.current, 0, canUseDOM())) {
      this.setState({
        inView: true
      });
    }
  }

  render() {
    const {children, className} = this.props;
    const {inView} = this.state;

    return (
      <div ref={this.el} className={className}>
        {inView ? children : null}
      </div>
    );
  }
}

TrackVisibility.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

TrackVisibility.defaultProps = {
  className: ''
};

export default TrackVisibility;

