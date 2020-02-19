import {Loader, Modal} from 'maven-ui';
import {responsive, spacingUnit} from 'maven-ui/lib/helpers';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'styled-components';

import Wysiwyg from '#root/components/wysiwyg';
import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {actions as pageActions, selectors as pageSelectors} from '#root/redux/ducks/pages';

const Inner = styled.div``;

const Wrapper = styled.div`
  background-color: #FFF;
  padding: ${spacingUnit.md}  ${spacingUnit.default};

  ${responsive.mediaBreakpointUp('lg')} {
    min-width: 874px;
  }
`;

class PageModal extends Component {
  componentDidMount() {
    this.getPage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      this.getPage();
    }
  }

  getPage() {
    if (!this.props.slug || (this.props.page && this.props.page.get('slug') === this.props.slug)) {
      return;
    }

    this.props.actions.pagesGet({slug: this.props.slug});
  }

  render() {
    const {open, onClose, page, loading} = this.props;

    return (
      <Modal scroll open={open} onClose={onClose} contentStyle={{margin: `${spacingUnit.l} 0`, maxWidth: 992}}>
        <Wrapper>
          <Loader loading={loading} align="top-center" width={70} height={70} />
          <Inner>
            {page ? <Wysiwyg content={page.get('body')}/> : null}
          </Inner>
        </Wrapper>
      </Modal>
    );
  }
}

PageModal.propTypes = {
  slug: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
  page: ImmutablePropTypes.map,
  loading: PropTypes.bool
};

const mapStateToProps = (state, props) => ({
  page: pageSelectors.getPage(state, props.slug),
  loading: loadingSelectors.getLoading(['PAGES_GET'])(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...pageActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PageModal);
