import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {click} from '../utils/componentHelpers';

class TabListTopics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(activeTab) {
    this.setState({activeTab});
  }

  render() {
    const {tabs, itemComponent: ItemComponent, title} = this.props;

    return (
      <div className="tab-list-topics">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <div className="tab-list-topics__content">
              <h4 className="tab-list-topics__title">{title}</h4>
              <ul className="tab-list-topics__list">
                {tabs.map((tab, index) => (
                  <li key={tab.get('title')} className={[this.state.activeTab === index ? 'active' : ''].join(' ')}>
                    <button onClick={click(this.handleClick, index)}>{tab.get('title')}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-8">
            <div className="tab-list-topics__active-item">
              <ItemComponent {...tabs.get(this.state.activeTab).toJS()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TabListTopics.propTypes = {
  tabs: ImmutablePropTypes.list,
  title: PropTypes.string.isRequired,
  itemComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

export default TabListTopics;
