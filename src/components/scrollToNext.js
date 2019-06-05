import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MaIcon from './maIcon';

class ScrollToNext extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {target} = this.props;

    const targetEl = document.querySelector(target);

    if (!targetEl) {
      console.error(`Cannnot find element ${target}.`);
      return;
    }

    targetEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  render() {
    const {title} = this.props;

    return (
      <div className="scroll-to-next">
        <button onClick={this.handleClick}>
          {title}
          <MaIcon icon="chevron-down"/>
        </button>
      </div>
    );
  }
}

ScrollToNext.propTypes = {
  target: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default ScrollToNext;
