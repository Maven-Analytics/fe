import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Image from './image';
import MaIcon from './maIcon';

const CardTrendingCourse = ({title, link, image, difficulty, recommended}) => {
  return (
    <div className="card-trending-course">
      <div className="card-trending-course__image">
        <Image
          cover
          src={image}
          alt={title}
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
          <Link href={link}>
            <a className="btn btn--secondary">View Course</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

CardTrendingCourse.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
  difficulty: PropTypes.number,
  recommended: PropTypes.bool
};

export default CardTrendingCourse;
