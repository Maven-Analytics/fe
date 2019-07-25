import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Map} from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import ImageContentful from './imageContentful';
import MaIcon from './maIcon';

const CardTrendingCourse = ({title, slug, thumbnail, difficulty, recommended, onView}) => {
  return (
    <div className="card-trending-course">
      <div className="card-trending-course__image">
        <ImageContentful
          cover
          image={thumbnail}
        />
        <div className="overlay"/>
        {recommended ? (
          <div className="recommended">
            <MaIcon icon="recommended"/>
            Recommended for you
          </div>
        ) : null}
      </div>
      <div className="card-trending-course__inner">
        <h4>{title}</h4>
        <div className="card-trending-course__footer">
          <div className="difficulty">
            <small className="label">Difficulty</small>
            <div className="graphic">
              <span className={difficulty >= 1 ? 'active' : ''} style={{height: 9}}/>
              <span className={difficulty >= 2 ? 'active' : ''} style={{height: 13}}/>
              <span className={difficulty >= 3 ? 'active' : ''} style={{height: 17}}/>
              <span className={difficulty >= 4 ? 'active' : ''} style={{height: 21}}/>
              <span className={difficulty >= 5 ? 'active' : ''} style={{height: 24}}/>
            </div>
          </div>
          <button className="btn btn--secondary" onClick={onView}>View Course</button>
        </div>
      </div>
    </div>
  );
};

CardTrendingCourse.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  thumbnail: ImmutablePropTypes.map,
  difficulty: PropTypes.number,
  recommended: PropTypes.bool,
  onView: PropTypes.func
};

CardTrendingCourse.defaultProps = {
  thumbanil: Map()
};

export default CardTrendingCourse;
