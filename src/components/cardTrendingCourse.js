import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Map} from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import ImageContentful from './imageContentful';
import MaIcon from './maIcon';
import DifficultyMeter from './difficultyMeter';

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
          <DifficultyMeter difficulty={difficulty}/>
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
