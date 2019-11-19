import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as authActions} from '../../redux/ducks/auth';
import {selectors as loadingSelectors} from '../../redux/ducks/loading';
import {selectors as userSelectors} from '../../redux/ducks/user';
import Checkout from '../../layouts/checkout';
import CheckoutThanks from '../../components/checkoutThanks';
import withAuthSync from '../../components/withAuthSync';
import Loader from '../../components/loader';

class SignupThanks extends Component {
  componentDidMount() {
    const {user} = this.props;
    if (user && !user.get('enrolled')) {
      this.props.actions.ensureEnrolled(this.props.token);
    }
  }

  render() {
    const {loading, user} = this.props;
    return (
      <Checkout full>
        <div className="thanks-page">
          {loading === false && user.get('enrolled') ? (
            <CheckoutThanks />
          ) : (
            <div className="checkout-thanks thanks-page__content ">
              <Loader center loading={loading} width={100} height={100} />
              <h2>{'Hang tight, we\'re creating your account...'}</h2>
            </div>
          )}
        </div>
      </Checkout>
    );
  }
}

SignupThanks.getInitialProps = () => {
  return {
    loading: true
  };
};

SignupThanks.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  token: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: loadingSelectors.getLoading(['ENSURE_ENROLLED'])(state),
  token: userSelectors.getToken(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...authActions
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthSync(SignupThanks));
