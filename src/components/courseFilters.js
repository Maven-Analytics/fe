import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {fromJS, List, Map} from 'immutable';
import Router, {withRouter} from 'next/router';
import {bindActionCreators} from 'redux';

import CourseFilterChecks from './courseFilterChecks';
import {selectors as filterSelectors, actions as filterActions} from '../redux/ducks/filters';
import {selectors as activeFilterSelectors, actions as activeFilterActions} from '../redux/ducks/activeFilters';
import {selectors as stateSelectors, actions as stateActions} from '../redux/ducks/state';
import {actions as courseActions} from '../redux/ducks/courses';
import {selectors as errorSelectors} from '../redux/ducks/error';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import CourseFilterTools from './courseFilterTools';
import MaIcon from './maIcon';
import {clickPrevent, click} from '../utils/componentHelpers';
import Loader from './loader';

class CourseFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: 0,
      max: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLength = this.handleLength.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleUncheck = this.handleUncheck.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    this.props.actions.filtersGet();
  }

  handleFilter() {
    this.props.actions.coursesFilter();
    this.props.actions.offmenuClose('filters');
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

  handleChange(key) {
    return val => {
      const {router, filters, activeFilters} = this.props;

      // console.log(val);

      console.log(key, val);

      // this.props.actions.filtersActiveSet({[key]: val})

      // console.log(val);

      // let activeForKey = filters
      //   .getIn([key, 'active'])
      //   .reduce((map, value) => map.set(value, true), Map())
      //   .merge(fromJS(val))
      //   .filter(f => f)
      //   .keySeq();

      // const newQuery = activeFilters
      //   .map(a => a.get('active'))
      //   .set(key, activeForKey);

      // Router.push({pathname: `${router.pathname}`, query: newQuery.toJS()});
    };
  }

  handleLength(state) {
    const {router, activeFilters} = this.props;

    // this.props.actions.filtersActiveSet({length: [state.min ? parseFloat(state.min) : this.props.filters.getIn(['length', 'active', 0]), state.max ? parseFloat(state.max) : this.props.filters.getIn(['length', 'active', 1])]});

    // const newQuery = activeFilters
    //   .map(a => a.get('active'))
    //   .set('length', fromJS([state.min ? state.min : this.state.min, state.max ? state.max : this.state.max]));

    // Router.push({pathname: `${router.pathname}`, query: newQuery.toJS()});
    // return this.setState(state);
  }

  render() {
    const {title, className, loading, filters, activeFilters, actions, state} = this.props;

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
        <div className="course-filters__fog" onClick={clickPrevent(actions.offmenuToggle, 'filters')}/>
        <header>
          <h4>{title}</h4>
          <button onClick={clickPrevent(actions.offmenuToggle, 'filters')}>
            {open ? <MaIcon icon="minus"/> : <MaIcon icon="times"/>}
          </button>
        </header>
        <div className="course-filters__content">
          <div className="course-filters__content-header">
            <button onClick={clickPrevent(actions.offmenuToggle, 'filters')}>
              {<MaIcon icon="times"/>}
            </button>
          </div>
          <div className="course-filters__content-inner">
            {loading ? <Loader loading={loading}/> : null}
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
            <CourseFilterChecks
              id="status"
              label="Status"
              valueKey="title"
              onCheck={this.handleCheck('enrollmentFilter')}
              onUncheck={this.handleUncheck('enrollmentFilter')}
              active={activeFilters.get('enrollmentFilter')}
              options={filters.get('Status')}
            />
          </div>
          <div className="course-filters__footer">
            <button className="btn btn--primary-solid" onClick={clickPrevent(this.handleFilter)}>Apply</button>
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
  actions: bindActionCreators({
    ...filterActions,
    ...activeFilterActions,
    ...courseActions,
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseFilters));
