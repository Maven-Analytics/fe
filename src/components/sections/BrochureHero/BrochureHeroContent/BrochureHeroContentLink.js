import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';

const A = styled.a`
  align-items: center;
  border: none;
  display: inline-flex;
  font-size: 0.88em;
  font-weight: 700;
  margin-top: ${spacingUnit.md};

  ${mediaBreakpointUp('lg')}
    margin-top: ${spacingUnit.l};
  }


  &:not(.btn) {
    &:hover {
      text-decoration: none;
    }
  }

  i {
    &:last-child {
      margin-left: ${spacingUnit.ss};
      margin-top: 2px;
    }
  }
`;

const BrochureHeroContentLink = ({children, href, ...props}) => {
  return (
    <Link href={href}>
      <A {...props} href={href}>
        {children}
      </A>
    </Link>
  );
};

BrochureHeroContentLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  href: PropTypes.string.isRequired
};

export default BrochureHeroContentLink;
