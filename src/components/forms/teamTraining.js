import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {FormSubmissionError, TextBox} from 'maven-ui';
import styled from 'styled-components';

import FormOptions from '../inputs/formOptions';
import FormSuccess from '../shared/FormSuccess';
import zapier from '#root/services/zapier';

const TeamTrainingFormWrap = styled.div`
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
`;

const TeamTrainingForm = () => {
  const [complete, setComplete] = useState(false);
  const {
    errors,
    formState: {isSubmitting},
    handleSubmit,
    register,
    setValue,
    watch
  } = useForm();

  if (complete) {
    return <FormSuccess />;
  }

  const handleFormSubmit = handleSubmit(async data => {
    await zapier({
      data,
      hook: 'https://hooks.zapier.com/hooks/catch/4268756/obkw9mh/'
    });

    setComplete(data);
  });

  return (
    <TeamTrainingFormWrap className="contact-form">
      <form className="form form--light" onSubmit={handleFormSubmit}>
        <TextBox hasError={errors.name} id="name" label="Full name" name="name" ref={register({required: true})} />
        <TextBox hasError={errors.email} id="email" label="Email address" name="email" ref={register({required: true})} />
        <TextBox hasError={errors.company} id="company" label="Company" name="company" ref={register({required: true})} />
        <div className={['form-group', errors.team_size ? 'error' : ''].join(' ')}>
          <label htmlFor="size">Team size</label>
          <input type="hidden" name="team_size" ref={register({required: true})} />
          <FormOptions
            options={['3-5', '5-10', '10-20', '20 or more']}
            onChange={team_size => setValue('team_size', team_size)} // StateVal(this.handleChange, 'team_size')}
            value={watch('team_size')}
          />
        </div>
        <TextBox hasError={errors.message} id="message" label="How can we help you?" name="message" ref={register({required: true})} />

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
              {errors.team_size ? <FormSubmissionError>Your team size is required.</FormSubmissionError> : null}
              {errors.message ? <FormSubmissionError>A message is required.</FormSubmissionError> : null}
            </>
          ) : null}
        </div>
      </form>
    </TeamTrainingFormWrap>
  );
};

export default TeamTrainingForm;
