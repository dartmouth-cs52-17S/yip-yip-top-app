import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import FeedView from './FeedView';
import * as FeedStateActions from './FeedState';

export default connect(
  state => ({
    feed: state.getIn(['feed', 'value']),
    loading: state.getIn(['feed', 'loading']),
    location: state.getIn(['feed', 'location'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      feedStateActions: bindActionCreators(FeedStateActions, dispatch)
    };
  }
)(FeedView);
