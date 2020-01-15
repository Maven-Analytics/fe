import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

import userFragment from '#root/api/fragments/user';
import updateUserMutation from '#root/api/mutations/updateUser';
import {selectors as errorSelectors} from '#root/redux/ducks/error';
import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {actions as profileActions} from '#root/redux/ducks/profile';
import {selectors as responseSelectors} from '#root/redux/ducks/response';
import {actions as userActions, selectors as userSelectors} from '#root/redux/ducks/user';
import countries from '#root/utils/countries';

import Select from '../inputs/Select';
import TextBox from '../inputs/TextBox';
import GraphQlError from '../shared/GraphQlError';

// Class ProfileForm extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: props.user.get('email'),
//       first_name: props.user.get('first_name'),
//       last_name: props.user.get('last_name'),
//       country: props.user.get('country'),
//       postal_code: props.user.get('postal_code')
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     this.props.actions.profileUpdate({
//       email: this.state.email,
//       first_name: this.state.first_name,
//       last_name: this.state.last_name,
//       country: this.state.country,
//       postal_code: this.state.postal_code
//     });
//   }

//   handleChange(state) {
//     return state ? this.setState(state) : null;
//   }

//   render() {
//     const {email, first_name, last_name, country, postal_code} = this.state;
//     const {error, response, loading} = this.props;

//     return (
//       <form onSubmit={this.handleSubmit} className="form--light form--account">
//         <AccountForm
//           showPassword={false}
//           email={email}
//           first_name={first_name}
//           last_name={last_name}
//           country={country}
//           postal_code={postal_code}
//           onChange={this.handleChange}
//         />
//         {error || response ? (
//           <div className="form-message">
//             {error ? (
//               <p className="form-text small error">{error}</p>
//             ) : null}
//             {response ? (
//               <p className="form-text small success">{response}</p>
//             ) : null}
//           </div>
//         ) : null}
//         <div className="form-footer">
//           <button type="submit" onClick={this.handleSubmit} disabled={loading} className="btn btn--primary-solid">
//             Update
//           </button>
//         </div>
//       </form>
//     );
//   }
// }

const ProfileForm = ({user}) => {
  const [updateUser, {error}] = useMutation(updateUserMutation);
  const [response, setResponse] = useState(null);
  const {formState: {isSubmitting, isSubmitted}, handleSubmit, register, clearError, errors: formErrors} = useForm({
    defaultValues: user.toJS()
  });
  const dispatch = useDispatch();

  const onSubmit = handleSubmit(async ({email, first_name, last_name, postal_code, country}) => {
    clearError();
    setResponse(null);
    const {data: {updateUser: user}} = await updateUser({
      variables: {email, first_name, last_name, postal_code, country}
    });

    setResponse('Your profile has been updated!');
    dispatch(userActions.userSet(user));
  });

  return (
    <form onSubmit={onSubmit} className="form--light form--account">
      <div className="row">
        <div className="col-sm-12">
          <TextBox
            required
            error={isSubmitted ? formErrors.email : null}
            id="email"
            label="Email Address"
            name="email"
            placeholder="jason@email.com"
            register={register({required: true})}
            type="email"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <TextBox
            required
            error={isSubmitted ? formErrors.first_name : null}
            id="first_name"
            label="First Name"
            name="first_name"
            register={register({required: true})}
          />
        </div>
        <div className="col-sm-6">
          <TextBox
            required
            error={isSubmitted ? formErrors.last_name : null}
            id="last_name"
            label="Last Name"
            name="last_name"
            register={register({required: true})}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <Select
            required
            error={isSubmitted ? formErrors.country : null}
            id="country"
            label="Counrtry"
            options={countries}
            name="country"
            register={register({required: true})}
          />
        </div>
        <div className="col-sm-6">
          <TextBox
            required
            error={isSubmitted ? formErrors.postal_code : null}
            id="postal_code"
            label="Postal Code"
            name="postal_code"
            register={register({required: true})}
          />
        </div>
      </div>
      {error || response ? (
        <div className="form-message">
          {error ? (
            <p className="form-text small error">
              <GraphQlError error={error}/>
            </p>
          ) : null}
          {response ? (
            <p className="form-text small success">{response}</p>
          ) : null}
        </div>
      ) : null}
      <div className="form-footer">
        <button type="submit" onClick={onSubmit} disabled={isSubmitting} className="btn btn--primary-solid">
          Update
        </button>
      </div>
    </form>
  );
};

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
