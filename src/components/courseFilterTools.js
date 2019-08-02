import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {fromJS, List} from 'immutable';

import ChildCheckbox from './inputs/childCheckbox';
import {stateCheck, check} from '../utils/componentHelpers';
import CourseAuthor from './courseAuthor';
import MaIcon from './maIcon';

class CourseFilterTools extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  getSetValues() {
    return fromJS(this.state)
      .filter(f => f)
      .keySeq()
      .toJS();
  }

  handleChange(val) {
    return checked => {
      if (checked) {
        return this.props.onCheck(val);
      }

      return this.props.onUncheck(val);
    };
  }

  render() {
    const {active, id, label, options} = this.props;

    return (
      <div className="form-group form-group--dark form-group--inline course-filter course-filter--tools">
        <label htmlFor={id}>{label}</label>
        {options.map(option => (
          <ChildCheckbox
            key={option.get('title')}
            checked={active.contains(option.get('id')) || false}
            name={`${id}[${option.get('title')}]`}
            id={`${id}[${option.get('title')}]`}
            onChange={check(this.handleChange(option.get('id')))}
          >
            <div>
              <MaIcon icon={option.get('title').toLowerCase().replace(' ', '-')}/>
            </div>
            <label htmlFor={`${id}[${option.get('title')}]`}>{option.get('title')}</label>
          </ChildCheckbox>
        ))}
      </div>
    );
  }
}

CourseFilterTools.propTypes = {
  active: ImmutablePropTypes.list,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: ImmutablePropTypes.list,
  onCheck: PropTypes.func,
  onUncheck: PropTypes.func
};

CourseFilterTools.defaultProps = {
  active: List()
};

export default CourseFilterTools;
