import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Map} from 'immutable';

import {clickAction} from '../utils/componentHelpers';
import ImageContentful from './imageContentful';
import CourseHours from './courseHours';
import CourseAuthor from './courseAuthor';
import CourseBanner from './courseBanner';
import MaIcon from './maIcon';
import ProgressMeter from './progressMeter';
import withState from './withState';

class CourseCard extends Component {
  constructor(props) {
    super(props);

    this.imgCount = 2;

    this.state = {
      loaded: []
    };

    this.handleImageLoad = this.handleImageLoad.bind(this);
  }

  handleImageLoad() {
    this.setState(prevState => {
      return {
        loaded: prevState.loaded.concat([true])
      };
    });
  }

  render() {
    const {course, condensed, match, recommended, progress, full, actions} = this.props;
    const {loaded} = this.state;

    const classList = ['course-card'];

    if (condensed) {
      classList.push('course-card--condensed');
    }

    if (full) {
      classList.push('course-card--full');
    }

    if (loaded.length === this.imgCount) {
      classList.push('loaded');
    }

    return (
      <div className={classList.join(' ')}>
        {match && condensed === false ? (
          <CourseBanner>
            <span className="text">Match</span>
            <span className="value">{match}</span>
          </CourseBanner>
        ) : null}
        {recommended && condensed === false ? (
          <CourseBanner>
            <MaIcon icon="recommended"/>
            <span className="text">{recommended}</span>
          </CourseBanner>
        ) : null}
        <div className="course-card__image">
          <ImageContentful cover onLoad={this.handleImageLoad} image={course.get('thumbnail')}/>
          {condensed === false ? (
            <div className="badge">
              <ImageContentful onLoad={this.handleImageLoad} showLoader={false} image={course.get('badge')}/>
            </div>
          ) : null}
        </div>
        <div className="course-card__content">
          <h4>{course.get('title')}</h4>
          {condensed === false ? (
            <p>{course.get('cardDescription')}</p>
          ) : null}
          {progress > -1 ? <ProgressMeter value={progress} title="Progress"/> : null}
        </div>
        <div className="course-card__footer">
          <span>
            <button onClick={clickAction(actions.modalOpen, 'courseDrawer', course)} className="btn">View Course</button>
          </span>
          {condensed === false ? (
            <CourseHours hours={course.get('length')}/>
          ) : null}
          <CourseAuthor name={course.getIn(['author', 'name'])} thumbnail={course.getIn(['author', 'thumbnail'])}/>
        </div>
      </div>
    );
  }
}

CourseCard.propTypes = {
  course: ImmutablePropTypes.map,
  condensed: PropTypes.bool,
  match: PropTypes.string,
  recommended: PropTypes.string,
  progress: PropTypes.number,
  full: PropTypes.bool,
  actions: PropTypes.objectOf(PropTypes.func)
};

CourseCard.defaultProps = {
  course: Map(),
  condensed: false
};

export default withState(CourseCard);
