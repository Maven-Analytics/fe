import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {FormSubmissionError, TextArea, TextBox} from 'maven-ui';
import styled from 'styled-components';

import FormSuccess from '../shared/FormSuccess';
import zapier from '#root/services/zapier';

const ContactFormWrap = styled.div`
  .input {
    &.error {
      border-width: 2px;
    }
  }

  textarea {
    height: 170px;
  }
`;

const ContactForm = () => {
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
    await zapier('https://hooks.zapier.com/hooks/catch/4268756/obkw25k/', data);

    setComplete(data);
  });

  return (
    <ContactFormWrap className="contact-form">
      <form className="form form--light" onSubmit={handleFormSubmit}>
        <TextBox hasError={Boolean(errors.name)} id="name" label="Full name" name="name" ref={register({required: true})} />
        <TextBox hasError={Boolean(errors.email)} id="email" label="Email address" name="email" ref={register({required: true})} />
        <TextArea hasError={Boolean(errors.message)} id="message" label="Message" name="message" ref={register({required: true})} />

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
              {errors.message ? <FormSubmissionError>A message is required.</FormSubmissionError> : null}
            </>
          ) : null}
        </div>
      </form>
    </ContactFormWrap>
  );
};

export default ContactForm;
