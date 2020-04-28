import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {mediaBreakpointUp} from '#root/utils/responsive';
import btnFixed from '#root/utils/btnFixed';
import spacingUnit from '#root/utils/spacingUnit';

const Inner = styled.div`
  align-items: center;
  display: flex;
  margin: 0 auto;
  max-width: 270px;
  padding: ${spacingUnit.l} 0;

  ${mediaBreakpointUp('md')} {
    max-width: none;
    padding: ${spacingUnit.ll} 0;
  }
`;

const Wrapper = styled.div`
  background: ${props => props.theme.brandGradient};
  font-size: 1.4rem;
  text-align: center;

  ${mediaBreakpointUp('md')} {
    font-size: 1.6rem;
    text-align: left;
  }

  ${mediaBreakpointUp('lg')} {
    font-size: 1.8rem;
  }

  h2 {
    color: #2b2b2b;
    font-size: 1.66em;
    font-weight: 900;
    line-height: 1.05;
    margin-bottom: 0.8rem;
  }

  p {
    color: #424242;
    margin: 0 0 1.2rem;

    ${mediaBreakpointUp('md')} {
      margin: 0;
    }
  }

  .button {
    ${mediaBreakpointUp('md')} {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: flex-end;
    }
  }

  a {
    ${btnFixed(140, 38, 20.5)};
    border-color: ${props => props.theme.nero};
    border-width: 1px;
    color: ${props => props.theme.nero};
    font-size: 1.3rem;

    ${mediaBreakpointUp('md')} {
      ${btnFixed(218, 50, 25)};
    }
  }
`;

export const CtaSurvey = () => {
  return (
    <Wrapper>
      <div className="container container--lg">
        <Inner>
          <div className="row">
            <div className="col-md-7 col-lg-9">
              <h2>Not Sure Which COURSE or PATH is right for you?</h2>
              <p>Take our customized survey to find the perfect courses & paths for your skill level and goals!</p>
            </div>
            <div className="col-md-5 col-lg-3">
              <div className="button">
                <Link href="/welcome">
                  <a className="btn">Start Survey</a>
                </Link>
              </div>
            </div>
          </div>
        </Inner>
      </div>
    </Wrapper>
  );
};

export default CtaSurvey;
