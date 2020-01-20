import PropTypes from 'prop-types';
import React, {Children, cloneElement, Component, createRef} from 'react';

import {click} from '#root/utils/componentHelpers';

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: props.initialIndex
    };

    this.content = createRef();
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(selectedIndex) {
    this.setState({selectedIndex});
  }

  render() {
    const {selectedIndex} = this.state;
    const {tabs, children} = this.props;
    return (
      <div className="tabs">
        <ul className="tabs__header">
          {tabs.map((tab, index) => (
            <li key={tab} className={selectedIndex === index ? 'active' : ''}>
              <button onClick={click(this.handleTabClick, index)}>{tab}</button>
            </li>
          ))}
        </ul>
        <div ref={this.content} className="tabs__content">
          {Children.map(children, (child, index) => {
            return cloneElement(child, {
              ...child.props,
              key: index,
              active: index === selectedIndex
            });
          })}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  initialIndex: PropTypes.number,
  tabs: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.arrayOf(PropTypes.element)
};

Tabs.defaultProps = {
  initialIndex: 0
};

export default Tabs;
