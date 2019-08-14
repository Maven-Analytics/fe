import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import {click} from '../utils/componentHelpers';
import {List} from 'immutable';
import RichText from './richText';

class CourseLessons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeLesson: null
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick(activeLesson) {
    if (this.state.activeLesson === activeLesson) {
      return this.setState({activeLesson: null});
    }

    return this.setState({activeLesson});
  }

  render() {
    const {lessons, showCount} = this.props;

    return (
      <div className="course-lessons">
        {lessons && lessons.map((lesson, index) => (
          <div key={index} className={['course-lessons__lesson', this.state.activeLesson === index ? 'open' : ''].join(' ')}>
            <button
              onClick={click(this.handleToggleClick, index)}
              id={`lesson-${lesson.get('title')}-toggle`}
              aria-expanded={this.state.activeLesson === index}
              aria-controls={`lesson-${lesson.get('title')}-dropdown`}
            >
              {showCount ? <strong>{index + 1}</strong> : null}
              <span>{lesson.get('title')}</span>
            </button>
            <div
              id={`lesson-${lesson.get('title')}-dropdown`}
              role="region"
              hidden={this.state.activeLesson !== index}
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
  }
}

CourseLessons.propTypes = {
  lessons: ImmutablePropTypes.list.isRequired,
  showCount: PropTypes.bool
};

CourseLessons.defaultProps = {
  showCount: true
};

export default CourseLessons;
