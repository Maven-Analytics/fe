import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {fromJS, List, Map} from 'immutable';
import Router, {withRouter} from 'next/router';

import CourseFilterChecks from './courseFilterChecks';
import {selectors as filterSelectors} from '../redux/ducks/filters';

class CourseFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tools: [],
      paths: [],
      instructors: [],
      skills: [],
      length: [],
      status: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key) {
    return val => {
      const {router, filters, activeFilters} = this.props;

      let activeForKey = filters
        .getIn([key, 'active'])
        .reduce((map, value) => map.set(value, true), Map())
        .merge(fromJS(val))
        .filter(f => f)
        .keySeq();

      const newQuery = activeFilters
        .map(a => a.get('active'))
        .set(key, activeForKey);

      Router.push({pathname: `${router.pathname}`, query: newQuery.toJS()});
    };
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
          values={filters.getIn(['skills', 'active'])}
          options={filters.getIn(['skills', 'options']).map(f => fromJS({value: f, label: f}))}
        />
        <CourseFilterChecks
          id="tools"
          label="Tools"
          onChange={this.handleChange('tools')}
          values={filters.getIn(['tools', 'active'])}
          options={filters.getIn(['tools', 'options']).map(f => fromJS({value: f, label: f}))}
        />
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

export default connect(mapStateToProps)(withRouter(CourseFilters));
