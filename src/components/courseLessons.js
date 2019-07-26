import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {click} from '../utils/componentHelpers';
import { List } from 'immutable';

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
    const {lessons} = this.props;

    return (
      <div className="course-lessons">
        {lessons.map((lesson, index) => (
          <div key={index} className={['course-lessons__lesson', this.state.activeLesson === index ? 'open' : ''].join(' ')}>
            <button
              onClick={click(this.handleToggleClick, index)}
              id={`lesson-${lesson.get('title')}-toggle`}
              aria-expanded={this.state.activeLesson === index}
              aria-controls={`lesson-${lesson.get('title')}-dropdown`}
            >
              <strong>{index + 1}</strong>
              <span>{lesson.get('title')}</span>
            </button>
            <div
              id={`lesson-${lesson.get('title')}-dropdown`}
              role="region"
              hidden={this.state.activeLesson !== index}
              aria-labelledby={`lesson-${lesson.get('title')}-toggle`}
            >
              <ul>
                {lesson.has('lessons') && List.isList(lesson.get('lessons')) && lesson.get('lessons').map(l => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

CourseLessons.propTypes = {
  lessons: ImmutablePropTypes.list.isRequired
};

export default CourseLessons;
