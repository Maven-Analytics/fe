import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Link from 'next/link';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as credentialActions, selectors as credentialSelectors} from '../redux/ducks/credentials';
import ImageContentful from './imageContentful';
import ProgressMeter from './progressMeter';

class CredentialCard extends Component {
  componentDidMount() {
    // If (this.props.completed) {
    //   this.props.actions.credentialsGet({
    //     query: {
    //       group_id: this.props.accredibleId
    //     }
    //   });
    // }
  }

  render() {
    let {progress, title, image, promoteUrl, credential} = this.props;
    const classList = ['credential-card'];
    const url = credential && credential.has('url') && credential.get('url') !== '' ? credential.get('url') : promoteUrl;

    if (credential) {
      classList.push('completed');
    }

    return (
      <div className={classList.join(' ')}>
        <ImageContentful image={image} />
        <p>{title}</p>
        {url ? (
          <Link href={url}>
            <a className="btn" target="_blank">
              See Badge
            </a>
          </Link>
        ) : (
          <ProgressMeter title="Progress" value={progress} />
        )}
      </div>
    );
  }
}

CredentialCard.propTypes = {
  title: PropTypes.string,
  image: ImmutablePropTypes.map,
  progress: PropTypes.number,
  promoteUrl: PropTypes.string,
  accredibleId: PropTypes.number,
  actions: PropTypes.object,
  credential: ImmutablePropTypes.map
};

CredentialCard.defaultProps = {
  image: Map()
};

const mapStateToProps = (state, props) => ({
  credential: credentialSelectors.getCredentialByGroupId(state, props.accredibleId)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...credentialActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CredentialCard);
