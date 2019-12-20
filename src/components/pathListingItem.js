import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MaIcon from './maIcon';

import PathBanner from './pathBanner';
import CourseCarousel from '../sections/courseCarousel';

class PathListingItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      coursesOpen: props.coursesOpen
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(prevState => ({
      coursesOpen: !prevState.coursesOpen
    }));
  }

  render() {
    const {path, toggleText} = this.props;
    const {coursesOpen} = this.state;

    if (!path || path.isEmpty()) {
      return null;
    }

    const id = `path-${path.get('id')}-courses`;

    return (
      <div className="path-listing-item">
        <div className="path-listing-item__banner">
          <PathBanner
            id={path.get('id')}
            slug={path.get('slug')}
            badge={path.get('badge')}
            title={path.get('title')}
            excerpt={path.get('excerpt')}
            courses={path.get('courses') && path.get('courses').count()}
            length={path.get('length')}
            tools={path.get('tools')}
          />
          <button className="path-listing-item__toggle" aria-hidden={coursesOpen === false} aria-controls={id} onClick={this.handleToggle}>
            {coursesOpen ? (
              <Fragment>
                Hide {toggleText}
                <MaIcon icon="chevron-up" />
              </Fragment>
            ) : (
              <Fragment>
                Show {toggleText}
                <MaIcon icon="chevron-down" />
              </Fragment>
            )}
          </button>
        </div>
        <div id={id} hidden={coursesOpen === false} className="path-listing-item__courses">
          {coursesOpen ? <CourseCarousel hideOffscreenSlides courses={path.get('courses')} largeCols={2} /> : null}
        </div>
      </div>
    );
  }
}

PathListingItem.propTypes = {
  coursesOpen: PropTypes.bool,
  path: ImmutablePropTypes.map,
  toggleText: PropTypes.string
};

PathListingItem.defaultProps = {
  toggleText: 'included courses'
};

export default PathListingItem;
