import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {fromJS} from 'immutable';

import ChildCheckbox from './inputs/childCheckbox';
import {stateCheck} from '../utils/componentHelpers';
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

  handleChange(state) {
    return this.setState(state, () => {
      this.props.onChange(this.getSetValues());
    });
  }

  render() {
    const {active, id, label, options} = this.props;

    return (
      <div className="form-group form-group--dark form-group--inline course-filter">
        <label htmlFor={id}>{label}</label>
        {options.map(tool => (
          <ChildCheckbox
            key={tool}
            checked={active.contains(tool) || false}
            name={`${id}[${tool}]`}
            id={`${id}[${tool}]`}
            onChange={stateCheck(this.handleChange, tool)}
          >
            <MaIcon icon={tool.toLowerCase().replace(' ', '-')}/>
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
  onChange: PropTypes.func
};

export default CourseFilterTools;
