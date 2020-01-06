import {List, Map} from 'immutable';
import {withRouter} from 'next/router';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {clickPrevent} from '#root/utils/componentHelpers';

import {
  actions as activeFilterActions,
  selectors as activeFilterSelectors} from '../redux/ducks/activeFilters';
import {actions as courseActions} from '../redux/ducks/courses';
import {selectors as errorSelectors} from '../redux/ducks/error';
import {
  actions as filterActions,
  selectors as filterSelectors} from '../redux/ducks/filters';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {
  actions as stateActions,
  selectors as stateSelectors} from '../redux/ducks/state';
import CourseFilterChecks from './courseFilterChecks';
import CourseFilterTools from './courseFilterTools';
import MinMaxInput from './inputs/minmax';
import Loader from './loader';
import LoggedIn from './loggedIn';
import MaIcon from './maIcon';

class CourseFilters extends Component {
  constructor(props) {
    super(props);

    this.max = 25;

    this.handleCheck = this.handleCheck.bind(this);
    this.handleUncheck = this.handleUncheck.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleMinSet = this.handleMinSet.bind(this);
    this.handleMaxSet = this.handleMaxSet.bind(this);
  }

  componentDidMount() {
    this.props.actions.filtersGet();
  }

  handleFilter() {
    this.props.actions.coursesFilter();
    this.props.actions.offmenuClose('filters');
  }

  handleMinSet(key) {
    return value => {
      if (value > 0) {
        this.props.actions.activeFilterSet({key, value});
      } else {
        this.props.actions.activeFilterUnset({key});
      }
    };
  }

  handleMaxSet(key) {
    return value => {
      if (value < this.max) {
        this.props.actions.activeFilterSet({key, value});
      } else {
        this.props.actions.activeFilterUnset({key});
      }
    };
  }

  handleCheck(key) {
    return filter => {
      this.props.actions.activeFilterAdd({key, filter});
    };
  }

  handleUncheck(key) {
    return filter => {
      this.props.actions.activeFilterRemove({key, filter});
    };
  }

  render() {
    const {
      title,
      className,
      loading,
      filters,
      activeFilters,
      actions,
      state
    } = this.props;

    const open = state.get('filters');
    const classList = ['course-filters'];

    if (className) {
      classList.push(className);
    }

    if (open) {
      classList.push('open');
    }

    return (
      <div className={classList.join(' ')}>
        <div
          className="course-filters__fog"
          onClick={clickPrevent(actions.offmenuToggle, 'filters')}
        />
        <header>
          <div>
            <h4>{title}</h4>
            <button className="close" onClick={clickPrevent(actions.offmenuToggle, 'filters')}>
              {open ? <MaIcon icon="minus" /> : <MaIcon icon="times" />}
            </button>
          </div>
          <button
            className="btn btn--primary-solid"
            onClick={clickPrevent(this.handleFilter)}
          >
            Apply
          </button>
        </header>
        <div className="course-filters__content">
          <div className="course-filters__content-header">
            <button
              className="btn btn--primary-solid"
              onClick={clickPrevent(this.handleFilter)}
            >
              Apply
            </button>
            <button
              className="close"
              onClick={clickPrevent(actions.offmenuToggle, 'filters')}
            >
              {<MaIcon icon="times" />}
            </button>
          </div>
          <div className="course-filters__content-inner">
            {loading ? <Loader loading={loading} /> : null}
            <LoggedIn>
              <CourseFilterChecks
                id="status"
                label="Status"
                valueKey="title"
                onCheck={this.handleCheck('enrollmentFilter')}
                onUncheck={this.handleUncheck('enrollmentFilter')}
                active={activeFilters.get('enrollmentFilter')}
                options={filters.get('Status')}
              />
            </LoggedIn>
            <CourseFilterTools
              id="tools"
              label="Tools"
              onCheck={this.handleCheck('fields.filters.sys.id[in]')}
              onUncheck={this.handleUncheck('fields.filters.sys.id[in]')}
              active={activeFilters.get('fields.filters.sys.id[in]')}
              options={filters.get('Tools')}
            />
            <CourseFilterChecks
              id="paths"
              label="Learning Paths"
              onCheck={this.handleCheck('fields.filters.sys.id[in]')}
              onUncheck={this.handleUncheck('fields.filters.sys.id[in]')}
              active={activeFilters.get('fields.filters.sys.id[in]')}
              options={filters.get('Learning Paths')}
            />
            <CourseFilterChecks
              id="instructors"
              label="Instructors"
              onCheck={this.handleCheck('fields.filters.sys.id[in]')}
              onUncheck={this.handleUncheck('fields.filters.sys.id[in]')}
              active={activeFilters.get('fields.filters.sys.id[in]')}
              options={filters.get('Instructors')}
            />
            <CourseFilterChecks
              id="skills"
              label="Skills"
              onCheck={this.handleCheck('fields.filters.sys.id[in]')}
              onUncheck={this.handleUncheck('fields.filters.sys.id[in]')}
              active={activeFilters.get('fields.filters.sys.id[in]')}
              options={filters.get('Skills')}
            />
            <div className="form-group form-group--dark form-group--inline course-filter">
              <label htmlFor="fields.length[gt]">Course Hours</label>
              <MinMaxInput
                maxWidth={180}
                idMin="fields.length[gt]"
                idMax="fields.length[lt]"
                valueMin={activeFilters.getIn(['fields.length[gt]', 0])}
                valueMax={activeFilters.getIn(['fields.length[lt]', 0])}
                onMinChange={this.handleMinSet('fields.length[gt]')}
                onMaxChange={this.handleMaxSet('fields.length[lt]')}
                max={this.max}
              />
            </div>
          </div>
          <div className="course-filters__footer">
            <button className="btn btn--primary-solid" onClick={clickPrevent(this.handleFilter)}>
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  }
}

CourseFilters.propTypes = {
  title: PropTypes.string,
  filters: ImmutablePropTypes.map,
  router: PropTypes.object,
  activeFilters: ImmutablePropTypes.map,
  actions: PropTypes.objectOf(PropTypes.func),
  loading: PropTypes.bool,
  state: ImmutablePropTypes.map,
  className: PropTypes.string
};

CourseFilters.defaultProps = {
  title: 'Filter Results',
  filters: List(),
  state: Map()
};

const mapStateToProps = state => ({
  filters: filterSelectors.getFilters(state),
  activeFilters: activeFilterSelectors.getActiveFilters(state),
  loading: loadingSelectors.getLoading(['FILTERS_GET'])(state),
  error: errorSelectors.getError(['FILTERS_GET'])(state),
  state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...filterActions,
      ...activeFilterActions,
      ...courseActions,
      ...stateActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CourseFilters));
