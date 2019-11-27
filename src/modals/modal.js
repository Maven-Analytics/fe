import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import {TransitionMotion, spring, presets} from 'react-motion';

import {escape, noop} from '../utils/componentHelpers';
import MaIcon from '../components/maIcon';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalStyle: {},
      innerStyle: {}
    };

    this.getStyles = this.getStyles.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.modal = createRef();
  }

  getStyles() {
    return {
      key: 'modal',
      style: {
        opacity: spring(1),
        position: spring(0)
      }
    };
  }

  willLeave() {
    return {
      opacity: spring(0, presets.stiff),
      position: spring(-10, presets.stiff)
    };
  }

  willEnter() {
    return {
      opacity: 0,
      position: -10
    };
  }

  renderModal(key, style) {
    const {children, position, onClose, size, className} = this.props;

    if (this.modal && this.modal.current && this.modal.current.focus) {
      this.modal.current.focus();
    }

    const classList = ['modal'];

    if (size) {
      classList.push(`modal--${size}`);
    }

    if (className) {
      classList.push(className);
    }

    return (
      <div ref={this.modal} key={key} className={classList.join(' ')} onKeyUp={escape(onClose)}>
        <div
          className="modal__fog"
          onClick={onClose}
          style={{
            opacity: style.opacity
          }}
        />
        <div
          className="modal__inner"
        >
          <div
            data-position={position}
            className="modal__body"
            style={{
              opacity: style.opacity
            }}
          >
            {onClose && onClose !== noop ? <button className="modal__close" onClick={onClose}><MaIcon icon="times"/></button> : null}
            {children}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {open} = this.props;

    // Return open ? this.renderModal('key', {opacity: 1}) : null;

    return (
      <TransitionMotion
        willLeave={this.willLeave}
        willEnter={this.willEnter}
        styles={open ? [this.getStyles()] : []}
      >
        {items => {
          if (items.length) {
            return this.renderModal(items[0].key, items[0].style);
          }

          return <span />;
        }}
      </TransitionMotion>
    );
  }
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.element,
  position: PropTypes.string,
  showClose: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string
};

Modal.defaultProps = {
  position: 'center',
  onClose: noop,
  showClose: false
};

export default Modal;
