import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from '#root/components/image';

const Wrapper = styled.span`
  border-radius: 50%;
  overflow: hidden;
`;

const Avatar = ({image, ...props}) => {
  return (
    <Wrapper {...props}>
      <Image src={image || '/static/img/avatarDefault.png'} wrapperStyle={{paddingBottom: '100%'}} />
    </Wrapper>
  );
};

Avatar.propTypes = {
  image: PropTypes.string
};

export default Avatar;
