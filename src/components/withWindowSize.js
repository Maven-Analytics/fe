import React, {Component} from 'react';
import debounce from 'lodash.debounce';

import {canUseDOM, getWindowHeight} from '../utils/componentHelpers';

const withWindowSize = BaseComponent => {
  return class WithWindowSize extends Component {
    constructor(props) {
      super(props);

      this.state = {
        ...this.getWindowSize()
      };

      this.handleResize = debounce(this.handleResize.bind(this), 100);
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    getWindowSize() {
      return {
        windowWidth: canUseDOM() ? window.innerWidth : 0,
        windowHeight: canUseDOM() ? window.innerHeight : getWindowHeight(canUseDOM())
      };
    }

    handleResize() {
      this.setState({
        ...this.getWindowSize()
      });
    }

    render() {
      return <BaseComponent {...this.props} {...this.state} />;
    }
  };
};

export default withWindowSize;
