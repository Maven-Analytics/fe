// Import PropTypes from 'prop-types';
// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';

// import {actions as contactActions} from '#root/redux/ducks/contact';
// import {selectors as errorSelectors} from '#root/redux/ducks/error';
// import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
// import {selectors as responseSelectors} from '#root/redux/ducks/response';

// import {state} from '../../utils/componentHelpers';

import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {FormSubmissionError, TextArea, TextBox} from 'maven-ui';
import styled from 'styled-components';

import FormSuccess from '../shared/FormSuccess';
import zapier from '#root/services/zapier';

const ConsultingFormWrap = styled.div`
  .form-group {
    &.error {
      border: 2px solid ${props => props.theme.outrageousOrange};
    }
  }

  .input {
    &.error {
      border-width: 2px;
    }
  }

  textarea {
    height: 170px;
  }
`;

const ConsultingForm = () => {
  const [complete, setComplete] = useState(false);
  const {
    errors,
    formState: {isSubmitting},
    handleSubmit,
    register
  } = useForm();

  if (complete) {
    return <FormSuccess />;
  }

  const handleFormSubmit = handleSubmit(async data => {
    await zapier('https://hooks.zapier.com/hooks/catch/4268756/obkw5s6/', data);

    setComplete(data);
  });

  return (
    <ConsultingFormWrap className="contact-form">
      <form className="form form--light" onSubmit={handleFormSubmit}>
        <TextBox hasError={Boolean(errors.name)} id="name" label="Full name" name="name" ref={register({required: true})} />
        <TextBox hasError={Boolean(errors.email)} id="email" label="Email address" name="email" ref={register({required: true})} />
        <TextBox hasError={Boolean(errors.company)} id="company" label="Company" name="company" ref={register({required: true})} />
        <TextBox id="phone" label="Phone number (optional)" name="phone" ref={register} />
        <TextArea hasError={Boolean(errors.message)} id="message" label="How can we help you?" name="message" ref={register({required: true})} />

        {/* <div className="form-group">
          <label htmlFor="name">Full name</label>
          <input type="text" name="name" id="name" className={['input', errors.name ? 'error' : ''].join(' ')} ref={register({required: true})} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" id="email" className="input" ref={register({reuired: true})} />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input type="text" name="company" id="company" className="input" ref={register({reuired: true})} />
        </div>
        <div className="form-group">
          <label htmlFor="size">Team size</label>
          <input type="hidden" name="team_size" ref={register({required: true})} />
          <FormOptions
            options={['3-5', '5-10', '10-20', '20 or more']}
            onChange={team_size => setValue('team_size', team_size)} // StateVal(this.handleChange, 'team_size')}
            value={watch('team_size')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">How can we help you?</label>
          <textarea name="message" id="message" className="input" ref={register({reuired: true})} />
        </div> */}

        <div className="form-footer">
          <span className="submit">
            <button className="btn btn--primary-solid" type="submit" value="Login" disabled={isSubmitting}>
              Submit
            </button>
          </span>
          {Object.keys(errors).length ? (
            <>
              {errors.name ? <FormSubmissionError>Your name is required.</FormSubmissionError> : null}
              {errors.email ? <FormSubmissionError>Your email is required.</FormSubmissionError> : null}
              {errors.company ? <FormSubmissionError>Your company is required.</FormSubmissionError> : null}
              {errors.message ? <FormSubmissionError>A message is required.</FormSubmissionError> : null}
            </>
          ) : null}
        </div>
      </form>
    </ConsultingFormWrap>
  );
};

export default ConsultingForm;

// Class ConsultingForm extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       name: '',
//       email: '',
//       company: '',
//       message: '',
//       phone: '',
//       hook: 'https://hooks.zapier.com/hooks/catch/4268756/obkw5s6/'
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(state) {
//     return state ? this.setState(state) : null;
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     this.props.actions.contactSend(this.state);
//   }

//   render() {
//     const {error, loading, response} = this.props;

//     return (
//       <div className="contact-form">
//         <form className="form form--light" onSubmit={this.handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Full name</label>
//             <input type="text" name="name" id="name" className="input" onChange={state(this.handleChange, 'name')} value={this.state.name} required/>
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email address</label>
//             <input type="email" name="email" id="email" className="input" onChange={state(this.handleChange, 'email')} value={this.state.email} required/>
//           </div>
//           <div className="form-group">
//             <label htmlFor="company">Company</label>
//             <input type="text" name="company" id="company" className="input" onChange={state(this.handleChange, 'company')} value={this.state.company} required/>
//           </div>
//           <div className="form-group">
//             <label htmlFor="phone">Phone number (optional)</label>
//             <input type="text" name="phone" id="phone" className="input" onChange={state(this.handleChange, 'phone')} value={this.state.phone}/>
//           </div>
//           <div className="form-group">
//             <label htmlFor="message">How can we help you?</label>
//             <textarea name="message" id="message" className="input" onChange={state(this.handleChange, 'message')} value={this.state.message} required/>
//           </div>
//           {error || response ? (
//             <div className="form-message">
//               {error ? (
//                 <p className="form-text small error">{error}</p>
//               ) : null}
//               {response ? (
//                 <p className="form-text small success">{response}</p>
//               ) : null}
//             </div>
//           ) : null}
//           <div className="form-footer">
//             <span className="submit">
//               <button className="btn btn--primary-solid" type="submit" value="Login" disabled={loading}>Submit</button>
//             </span>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// ConsultingForm.propTypes = {
//   actions: PropTypes.objectOf(PropTypes.func).isRequired,
//   error: PropTypes.string,
//   loading: PropTypes.bool,
//   response: PropTypes.string
// };

// const mapStateToProps = state => ({
//   loading: loadingSelectors.getLoading(['CONTACT_SEND'])(state),
//   error: errorSelectors.getError(['CONTACT_SEND'])(state),
//   response: responseSelectors.getResponse(['CONTACT_SEND'])(state)
// });

// const mapDispatchToProps = function (dispatch) {
//   return {
//     actions: bindActionCreators({
//       ...contactActions
//     }, dispatch)
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ConsultingForm);
