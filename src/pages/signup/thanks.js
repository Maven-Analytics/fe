import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as contactActions} from '../../redux/ducks/contact';
import Checkout from '../../layouts/checkout';
import CheckoutThanks from '../../components/checkoutThanks';
import {Routes} from '../../routes';
import withAuthSync from '../../components/withAuthSync';

const thanksContent = `
# Welcome to Maven Analytics
## Now Let's Get Started!

Take a quick 2-minute survey, and we’ll match you to the best courses & paths to help you reach your goals.

The survey should take 3-5 minutes to complete and is designed to measure your career goals and create
a customized learning cirriculum.

[Start Survey](${Routes.WelcomeSurvey} "Start Survey")
`;

class SignupThanks extends Component {
  componentDidMount() {
    const {first_name, last_name, email, id} = this.props.user.toJS();

    // this.props.actions.contactSend({
    //   hook: 'https://hooks.zapier.com/hooks/catch/4268756/obkwr87/',
    //   first_name,
    //   last_name,
    //   email,
    //   id
    // });
  }

  render() {
    return (
      <Checkout full>
        <CheckoutThanks content={thanksContent} />
      </Checkout>
    );
  }
}

SignupThanks.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

const mapStateToProps = () => ({});

const mapDispatchToProps = function(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...contactActions
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthSync(SignupThanks));
