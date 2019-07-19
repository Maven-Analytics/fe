import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {fromJS, List, Map} from 'immutable';
import Router, {withRouter} from 'next/router';
import {bindActionCreators} from 'redux';

import CourseFilterChecks from './courseFilterChecks';
import {selectors as filterSelectors, actions as filterActions} from '../redux/ducks/filters';
import { state } from '../utils/componentHelpers';

class CourseFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: 0,
      max: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLength = this.handleLength.bind(this);
  }

  handleChange(key) {
    return val => {
      const {router, filters, activeFilters} = this.props;

      console.log(val);

      this.props.actions.filtersActiveSet({[key]: val})

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

    this.props.actions.filtersActiveSet({length: [state.min ? parseFloat(state.min) : this.props.filters.getIn(['length', 'active', 0]), state.max ? parseFloat(state.max) : this.props.filters.getIn(['length', 'active', 1])]});

    // const newQuery = activeFilters
    //   .map(a => a.get('active'))
    //   .set('length', fromJS([state.min ? state.min : this.state.min, state.max ? state.max : this.state.max]));

    // Router.push({pathname: `${router.pathname}`, query: newQuery.toJS()});
    // return this.setState(state);
  }

  render() {
    const {title, filters} = this.props;

    return (
      <div className="course-filters">
        <h4>{title}</h4>
        <CourseFilterChecks
          id="skills"
          label="Skills"
          onChange={this.handleChange('skills')}
          active={filters.getIn(['skills', 'active'])}
          options={filters.getIn(['skills', 'options']).map(f => fromJS({value: f, label: f}))}
        />
        <CourseFilterChecks
          id="tools"
          label="Tools"
          onChange={this.handleChange('tools')}
          active={filters.getIn(['tools', 'active'])}
          options={filters.getIn(['tools', 'options']).map(f => fromJS({value: f, label: f}))}
        />
        <CourseFilterChecks
          id="instructors"
          label="Instructors"
          onChange={this.handleChange('instructors')}
          active={filters.getIn(['instructors', 'active'])}
          options={filters.getIn(['instructors', 'options']).map(f => fromJS({value: f, label: f}))}
        />
        <CourseFilterChecks
          id="paths"
          label="Learning Paths"
          onChange={this.handleChange('paths')}
          active={filters.getIn(['paths', 'active'])}
          options={filters.getIn(['paths', 'options']).map(f => fromJS({value: f, label: f}))}
        />
        <input type="range" onChange={state(this.handleLength, 'min')} value={filters.getIn(['length', 'active', 0]) || 0}/>
        <input type="range" onChange={state(this.handleLength, 'max')} value={filters.getIn(['length', 'active', 1]) || 0}/>
      </div>
    );
  }
}

CourseFilters.propTypes = {
  title: PropTypes.string,
  filters: ImmutablePropTypes.map,
  router: PropTypes.object,
  activeFilters: ImmutablePropTypes.map
};

CourseFilters.defaultProps = {
  title: 'Filter Results',
  filters: List()
};

const mapStateToProps = state => ({
  filters: filterSelectors.getFilters(state),
  activeFilters: filterSelectors.getActiveFilters(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...filterActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseFilters));
