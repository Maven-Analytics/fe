import React from 'react';
import Link from 'next/link';

export const CtaSurvey = () => {
  return (
    <div className="cta-survey">
      <div className="container container--lg">
        <div className="cta-survey__inner">
          <div className="row">
            <div className="col-md-9">
              <h2>Not Sure Which Course or path is right for you?</h2>
              <p>Take our customized survey to find the perfect course & paths for your skill level and learning goals!</p>
            </div>
            <div className="col-md-3">
              <div className="button">
                <Link href="/welcome">
                  <a className="btn">Start Survey</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSurvey;
