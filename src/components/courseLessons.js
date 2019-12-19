import React, {useState} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import {click} from '../utils/componentHelpers';
import {List} from 'immutable';
import RichText from './richText';

const CourseLessons = ({lessons, showCount}) => {
  const [activeLesson, setActiveLesson] = useState(null);

  const handleToggleClick = lesson => {
    if (activeLesson === lesson) {
      return setActiveLesson(null);
    }

    return setActiveLesson(lesson);
  };

  return (
    <div className="course-lessons">
      {lessons && lessons.map((lesson, index) => (
        <div key={index} className={['course-lessons__lesson', activeLesson === index ? 'open' : ''].join(' ')}>
          <button
            onClick={click(handleToggleClick, index)}
            id={`lesson-${lesson.get('title')}-toggle`}
            aria-expanded={activeLesson === index}
            aria-controls={`lesson-${lesson.get('title')}-dropdown`}
          >
            {showCount ? <strong>{index + 1}</strong> : null}
            <span>{lesson.get('title')}</span>
          </button>
          <div
            id={`lesson-${lesson.get('title')}-dropdown`}
            role="region"
            hidden={activeLesson !== index}
            aria-labelledby={`lesson-${lesson.get('title')}-toggle`}
          >
            {lesson.has('lessons') ? (
              <ul>
                {lesson.has('lessons') && List.isList(lesson.get('lessons')) && lesson.get('lessons').map(l => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            ) : (
              <ul>
                <li>
                  {lesson.has('content') ? <RichText className="course-lessons__content" content={lesson.get('content')}/> : null}
                </li>
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

CourseLessons.propTypes = {
  lessons: ImmutablePropTypes.list.isRequired,
  showCount: PropTypes.bool
};

CourseLessons.defaultProps = {
  showCount: true
};

export default CourseLessons;
