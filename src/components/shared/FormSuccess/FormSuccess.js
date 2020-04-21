import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SentIcon from './SentIcon';

const FormSentSuccessContent = styled.div`
  margin-top: 1.9rem;

  p {
    color: #757575;
    line-height: 1.6;
    margin: 0;

    strong {
      color: ${props => props.theme.nero};
      font-weight: 700;
    }
  }
`;

const FormSentSuccessIcon = styled(SentIcon)`
  display: block;
  height: 64px;
  margin: 0 auto;
  width: 85px;
`;

const FormSuccessWrapper = styled.div`
  text-align: center;
`;

const FormSuccess = ({children, ...props}) => {
  return (
    <FormSuccessWrapper {...props}>
      <FormSentSuccessIcon />
      <FormSentSuccessContent>{children}</FormSentSuccessContent>
    </FormSuccessWrapper>
  );
};

FormSuccess.propTypes = {
  children: PropTypes.node
};

FormSuccess.defaultProps = {
  children: (
    <>
      <p>
        <strong>Success! Your message has been sent.</strong>
      </p>
      <p>Our team will be contacting you very soon.</p>
    </>
  )
};

export default FormSuccess;
