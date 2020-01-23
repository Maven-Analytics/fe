import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Loader from '#root/components/loader';
import Wysiwyg from '#root/components/wysiwyg';
import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {actions as pageActions, selectors as pageSelectors} from '#root/redux/ducks/pages';

import Modal from './modal';

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
      <Modal open={open} onClose={onClose} className="modal--page" position="top-center">
        <>
          <Loader loading={loading} position="top-center" width={70} height={70} />
          <div className="page-modal">
            {page ? <Wysiwyg content={page.get('body')}/> : null}
          </div>
        </>
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
