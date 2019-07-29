import {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {actions as scoreActions, selectors as scoreSelectors} from '../redux/ducks/scores';

class CourseScores extends PureComponent {
  componentDidMount() {
    if (this.props.scores.isEmpty()) {
      this.loadScore();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.courseId !== this.props.courseId && !this.props.loading) {
      this.loadScore();
    }
  }

  loadScore() {
    this.props.actions.scoresGet({course_id: this.props.courseId});
  }

  render() {
    return this.props.children(this.props.loading, this.props.scores);
  }
}

CourseScores.propTypes = {
  courseId: PropTypes.number,
  children: PropTypes.func.isRequired,
  scores: ImmutablePropTypes.map,
  actions: PropTypes.objectOf(PropTypes.func),
  loading: PropTypes.bool
};

const mapStateToProps = (state, props) => ({
  scores: scoreSelectors.getScoreForCourse(state, props.courseId),
  loading: loadingSelectors.getLoading(['SCORES_GET'])(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...scoreActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseScores);
