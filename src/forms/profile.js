import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AccountForm from './accountForm';
import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as profileActions} from '../redux/ducks/profile';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as errorSelectors} from '../redux/ducks/error';
import {selectors as responseSelectors} from '../redux/ducks/response';

class ProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.user.get('email'),
      first_name: props.user.get('first_name'),
      last_name: props.user.get('last_name'),
      country: props.user.get('country'),
      postal_code: props.user.get('postal_code')
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.profileUpdate({
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      country: this.state.country,
      postal_code: this.state.postal_code
    });
  }

  handleChange(state) {
    return state ? this.setState(state) : null;
  }

  render() {
    const {email, first_name, last_name, country, postal_code} = this.state;
    const {error, response, loading} = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="form--light form--account">
        <AccountForm
          showPassword={false}
          email={email}
          first_name={first_name}
          last_name={last_name}
          country={country}
          postal_code={postal_code}
          onChange={this.handleChange}
        />
        {error || response ? (
          <div className="form-message">
            {error ? (
              <p className="form-text small error">{error}</p>
            ) : null}
            {response ? (
              <p className="form-text small success">{response}</p>
            ) : null}
          </div>
        ) : null}
        <div className="form-footer">
          <button type="submit" onClick={this.handleSubmit} disabled={loading} className="btn btn--primary-solid">
            Update
          </button>
        </div>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
  response: PropTypes.string
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state),
  loading: loadingSelectors.getLoading(['PROFILEUPDATE'])(state),
  error: errorSelectors.getError(['PROFILEUPDATE'])(state),
  response: responseSelectors.getResponse(['PROFILEUPDATE'])(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...profileActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
