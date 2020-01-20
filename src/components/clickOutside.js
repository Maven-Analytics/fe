import {fromJS} from 'immutable';
import PropTypes from 'prop-types';
import React, {Component, createRef} from 'react';

import {noop} from '#root/utils/componentHelpers';

class ClickOutside extends Component {
  constructor(props) {
    super(props);

    this.el = createRef();
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.disabled) {
      this.startListening();
    }
  }

  componentWillUnmount() {
    this.endListening();
  }

  componentDidUpdate(prevProps) {
    if (!this.props.disabled && prevProps.disabled) {
      this.startListening();
    }

    if (this.props.disabled && !prevProps.disabled) {
      this.endListening();
    }
  }

  startListening() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  endListening() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(e) {
    const {current: el} = this.el;

    if (!el) {
      return;
    }

    let targetElement = e.target;

    do {
      if (targetElement === el) {
        // This is a click inside. Do nothing, just return.
        return;
      }

      targetElement = targetElement.parentNode;
    } while (targetElement);

    this.props.onClickOutside();
  }

  render() {
    const {children, tag: Tag, ...rest} = this.props;

    return (
      <Tag ref={this.el} {...fromJS(rest).delete('onClickOutside').toJS()}>
        {children}
      </Tag>
    );
  }
}

ClickOutside.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClickOutside: PropTypes.func,
  disabled: PropTypes.bool
};

ClickOutside.defaultProps = {
  tag: 'div',
  onClickOutside: noop
};

export default ClickOutside;
