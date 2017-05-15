import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import SearchView from './SearchView';
import * as SearchStateActions from './SearchState';

export default connect(
  state => ({
    search: state.getIn(['search', 'value']),
    loading: state.getIn(['search', 'loading'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      searchStateActions: bindActionCreators(SearchStateActions, dispatch)
    };
  }
)(SearchView);
