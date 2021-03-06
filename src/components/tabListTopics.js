import {withRouter} from 'next/router';
import PropTypes from 'prop-types';
import React, {Component, createRef} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {canUseDOM, click} from '#root/utils/componentHelpers';

import {actions as stateActions} from '../redux/ducks/state';

class TabListTopics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0
    };

    this.handleClick = this.handleClick.bind(this);

    this.el = createRef();
  }

  componentDidMount() {
    if (canUseDOM() && window.location.hash) {
      const slug = window.location.hash.split('#')[1];
      const topicIndex = this.props.tabs.findIndex(t => t.get('slug') === slug);

      if (topicIndex > -1) {
        // Const topic = this.props.tabs.find(t => t.get('slug') === slug);

        // This.props.actions.modalOpen('video', topic && {video: topic.get('video')});

        this.setState({
          activeTab: topicIndex
        });
      }
    }
  }

  handleClick(activeTab) {
    this.setState({activeTab});
  }

  render() {
    const {tabs, itemComponent: ItemComponent, title} = this.props;

    if (!tabs) {
      return null;
    }

    return (
      <div ref={this.el} className="tab-list-topics">
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
              <ItemComponent item={tabs.get(this.state.activeTab)} />
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
  itemComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  actions: PropTypes.objectOf(PropTypes.func)
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...stateActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TabListTopics));
