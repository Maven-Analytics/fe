import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {state} from '#root/utils/componentHelpers';

import {selectors as errorSelectors} from '../redux/ducks/error';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as responseSelectors} from '../redux/ducks/response';
import {actions as subscribeActions} from '../redux/ducks/subscribe';
import Mailchimp from './mailchimp';

class Subscribe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.email || '',
      hook: 'https://hooks.zapier.com/hooks/catch/4268756/o328kwr/'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.response && !prevProps.response && this.state.email && this.state.email !== '') {
      this.setState({email: ''});
    }
  }

  handleChange(state) {
    return state ? this.setState(state) : null;
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.actions.subscribeSend(this.state);
  }

  render() {
    const {className, helperText, loading, placeholder, response, error} = this.props;

    const classList = ['subscribe'];

    if (className) {
      classList.push(className);
    }

    return (
      <div className={classList.join(' ')}>
        <Mailchimp
          email={this.state.email}
          loading={loading}
          onSubmit={this.handleSubmit.bind(this)}
          onChange={state(this.handleChange.bind(this), 'email')}
          placeholder={placeholder}
        />
        {error ? <small className="form-text error">{error}</small> : null}
        <small className="form-text" style={{display: 'block'}}>
          {response || ''}
        </small>
        {helperText ? <small className="form-text">{helperText}</small> : null}

        {/* <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email address</label>
          <div className="form-group">
            <input
              required
              className="input"
              id="email"
              name="email"
              placeholder="barry@hbo.com"
              type="email"
              onChange={state(this.handleChange, 'email')}
              value={email}
            />
            <button type="submit" className="btn btn--primary">Subscribe</button>
          </div>
          {helperText ? <small className="form-text">{helperText}</small> : null}
        </form> */}
      </div>
    );
  }
}

Subscribe.propTypes = {
  className: PropTypes.string,
  helperText: PropTypes.string,
  email: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  loading: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  response: PropTypes.string
};

const mapStateToProps = state => ({
  loading: loadingSelectors.getLoading(['SUBSCRIBE'])(state),
  error: errorSelectors.getError(['SUBSCRIBE'])(state),
  response: responseSelectors.getResponse(['SUBSCRIBE'])(state)
});

const mapDispatchToProps = function(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...subscribeActions
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
