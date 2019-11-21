import {Component} from 'react';
import PropTypes from 'prop-types';

import {canUseDOM} from '../utils/componentHelpers';

const Breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

export const isSm = () => canUseDOM() ? window.innerWidth > Breakpoints.sm : false;
export const isMd = () => canUseDOM() ? window.innerWidth > Breakpoints.md : false;
export const isLg = () => canUseDOM() ? window.innerWidth > Breakpoints.lg : false;
export const isXl = () => canUseDOM() ? window.innerWidth > Breakpoints.xl : false;

export const isCollapseDown = () => canUseDOM() ? window.innerWidth <= Breakpoints.lg : false;

class MediaQuery extends Component {
  constructor(props) {
    super(props);

    const min = Breakpoints[this.props.min] || null;
    const max = Breakpoints[this.props.max] || null;

    this.state = {
      mediaQuery: this.getMediaQuery(min, max),
      width: null,
      height: null
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    if (this.props.min || this.props.max) {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }
  }

  componentWillUnmount() {
    if (this.props.min || this.props.max) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  getMediaQuery(min, max) {
    let mq = '';

    if (min) {
      mq += `(min-width: ${min}px)`;
    }

    if (max) {
      mq += `${min ? ' and ' : ''}(max-width: ${max}px)`;
    }

    return mq;
  }

  handleResize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  render() {
    const {mediaQuery} = this.state;
    const {children} = this.props;

    if (!canUseDOM()) {
      return null;
    }

    const mm = window.matchMedia(mediaQuery);

    if (!mm.matches) {
      return null;
    }

    return children;
  }
}

MediaQuery.propTypes = {
  children: PropTypes.element.isRequired,
  min: PropTypes.string,
  max: PropTypes.string
};

export default MediaQuery;

