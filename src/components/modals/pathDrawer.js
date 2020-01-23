import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CloseButton from '#root/components/closeButton';
import ProductDetail from '#root/components/productDetail';
import {selectors as pathSelectors} from '#root/redux/ducks/paths';
import {actions as stateActions, selectors as stateSelectors} from '#root/redux/ducks/state';
import {clickAction} from '#root/utils/componentHelpers';

import Markdown from '../markdown';

const PathDrawer = ({actions, state, paths}) => {
  const isOpen = state.getIn(['pathDrawer', 'open']);
  const path = paths.find(p => p.get('id') === state.getIn(['pathDrawer', 'data']));

  const classList = ['path-drawer'];
  const close = clickAction(actions.modalClose, 'pathDrawer');

  if (isOpen) {
    classList.push('open');
  }

  return (
    <div className={classList.join(' ')} tabIndex={isOpen ? 0 : -1}>
      <div onClick={close} className="path-drawer__fog" />
      <div className="path-drawer__inner">
        <CloseButton onClick={close} />
        <div className="path-drawer__content">
          {path ? (
            <ProductDetail
              productTerm="Path"
              badge={path.get('badge')}
              title={path.get('title')}
              titleTag="h2"
              percentage_completed={path.get('percentage_completed')}
              resumeUrl={path.get('resumeUrl')}
              tools={path.get('tools')}
              match={path.get('match')}
              courseCount={path.get('courses').count()}
              hours={path.get('length')}
              instructors={path.get('instructors')}
              id={path.get('id')}
            >
              {path.get('descriptionFull') && path.get('descriptionFull') !== '' ? <Markdown content={path.get('descriptionFull')} /> : null}
            </ProductDetail>
          ) : null}
        </div>
      </div>
    </div>
  );
};

PathDrawer.propTypes = {
  state: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  user: ImmutablePropTypes.map,
  paths: ImmutablePropTypes.list
};

const mapStateToProps = state => ({
  state: stateSelectors.getState(state),
  paths: pathSelectors.getPaths(state)
});

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
)(PathDrawer);
