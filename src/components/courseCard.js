import {Map} from 'immutable';
import Link from 'next/link';
import * as PropTypes from 'prop-types';
import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import {Routes} from '#root/routes';
import {clickAction} from '#root/utils/componentHelpers';

import CourseAuthor from './courseAuthor';
import CourseBanner from './courseBanner';
import CourseHours from './courseHours';
import ImageContentful from './imageContentful';
import MaIcon from './maIcon';
import ProgressMeter from './progressMeter';
import withState from './withState';

const CourseCardBanner = ({match, condensed, recommended, comingSoon}) => {
  if (comingSoon && condensed === false) {
    return (
      <CourseBanner>
        <MaIcon icon="cogs" />
        <span className="text">Coming Soon!</span>
      </CourseBanner>
    );
  }

  if (match && match !== '0%' && condensed === false) {
    return (
      <CourseBanner>
        <span className="text">Match</span>
        <span className="value">{match}</span>
      </CourseBanner>
    );
  }

  if (recommended && condensed === false) {
    return (
      <CourseBanner>
        <MaIcon icon="recommended" />
        <span className="text">{recommended}</span>
      </CourseBanner>
    );
  }

  return null;
};

CourseCardBanner.propTypes = {
  condensed: PropTypes.bool,
  match: PropTypes.string,
  recommended: PropTypes.string,
  comingSoon: PropTypes.bool
};

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
    const {course, condensed, match, recommended, progress, full, actions, state} = this.props;
    let {resumeUrl} = this.props;
    const {loaded} = this.state;
    const thinkificHealthy = state.getIn(['health', 'thinkific']);

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

    if (course.get('comingSoon')) {
      resumeUrl = null;
    } else if (!thinkificHealthy) {
      resumeUrl = Routes.Error;
    }

    const headerImg = <ImageContentful cover onLoad={this.handleImageLoad} image={course.get('thumbnail')} />;

    return (
      <div className={classList.join(' ')}>
        <CourseCardBanner
          comingSoon={course.get('comingSoon')}
          condensed={condensed}
          match={match}
          recommended={recommended}
        />
        <div className="course-card__image">
          {resumeUrl ? (
            <Link prefetch={false} href={resumeUrl}>
              <a>
                {headerImg}
              </a>
            </Link>
          ) : headerImg}
          {condensed === false ? (
            <div className="badge">
              <ImageContentful onLoad={this.handleImageLoad} showLoader={false} image={course.get('badge')} />
            </div>
          ) : null}
        </div>
        <div className="course-card__content">
          <h4>
            {resumeUrl ? (
              <Link prefetch={false} href={resumeUrl}>
                <a>
                  {course.get('title')}
                </a>
              </Link>
            ) : course.get('title')}
          </h4>
          {condensed === false ? <p>{course.get('cardDescription')}</p> : null}
          {progress !== null && progress > -1 ? <ProgressMeter value={progress} title="Progress" /> : <div className="progress-meter"/>}
        </div>
        <div className="course-card__footer">
          <span>
            <button onClick={clickAction(actions.modalOpen, 'courseDrawer', course.get('id'))} className="btn">
              Course Info
            </button>
          </span>
          {condensed === false ? <CourseHours hours={course.get('length')} /> : null}
          <CourseAuthor name={course.getIn(['author', 'name'])} thumbnail={course.getIn(['author', 'thumbnail'])} />
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
  actions: PropTypes.objectOf(PropTypes.func),
  resumeUrl: PropTypes.string,
  state: ImmutablePropTypes.map
};

CourseCard.defaultProps = {
  course: Map(),
  condensed: false,
  state: Map()
};

export default withState(CourseCard);
