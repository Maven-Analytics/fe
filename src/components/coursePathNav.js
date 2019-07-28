import React from 'react';
import PropTypes from 'prop-types';

import MaIcon from './maIcon';
import {click} from '../utils/componentHelpers';

const CoursePathNav = ({onFilterClick, onViewChange, activeItem}) => (
  <div className="course-path-nav">
    <button onClick={onFilterClick} className="filter" disabled={activeItem !== 'courses'}>
      <span>
        <MaIcon icon="sliders-h"/>
        Advanced Filter
      </span>
    </button>
    <nav>
      <ul>
        <li>
          <button onClick={click(onViewChange, 'paths')} className={activeItem === 'paths' ? 'active' : ''}><span>Paths</span></button>
        </li>
        <li>
          <button onClick={click(onViewChange, 'courses')} className={activeItem === 'courses' ? 'active' : ''}><span>Courses</span></button>
        </li>
      </ul>
    </nav>
  </div>
);

CoursePathNav.propTypes = {
  onFilterClick: PropTypes.func,
  onViewChange: PropTypes.func,
  activeItem: PropTypes.string
};

export default CoursePathNav;
