import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native' ;

import GiftedListView from 'react-native-gifted-listview';
import GiftedSpinner from 'react-native-gifted-spinner';

import { fetchPosts } from '../api.js';
import PostRow from './PostRow';

class PostsListView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numPosts: 0,
    }

    this._onFetch = this._onFetch.bind(this);
  }

  _onFetch(page = 1, callback, options) {
    console.log('fetching posts');
    console.log(typeof this.props.long);
    fetchPosts(this.props.long, this.props.lat, (posts) => {
      this.setState({numPosts: this.state.numPosts + posts.length});
      // TODO: need to make this only the case for the "Load more" option
      console.log('current number of posts: ' + this.state.numPosts);
      callback(posts);
    });
  }

  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderRowView(rowData) {
    return (
      <PostRow post={rowData} id={rowData.id} user={this.props.user} refresh={()=> {
        this.listview._refresh();
      }}/>
    );
  }

  /**
   * Render the refreshable view when fetching
   */
  _renderRefreshableFetchingView() {
    return (
      <View style={customStyles.refreshableView}>
        <GiftedSpinner />
      </View>
    );
  }

  /**
   * Render the pagination view when waiting for touch
   * @param {function} paginateCallback The function to call to load more rows
   */
  _renderPaginationWaitingView(paginateCallback) {
    return (
      <TouchableHighlight
        underlayColor='#D0CCDF'
        onPress={paginateCallback}
        style={customStyles.paginationView}
      >
        <Text style={[customStyles.actionsLabel, {fontSize: 13}]}>
          Load More
        </Text>
      </TouchableHighlight>
    );
  }

  /**
   * Render the pagination view when fetching
   */
  paginationFetchingView() {
    return (
      <View>
       <Text>Loading...</Text>
      </View>
    );
  }

  /**
   * Render the pagination view when end of list is reached
   */
  _renderPaginationAllLoadedView() {
    return (
      <View style={customStyles.paginationView}>
        <Text style={customStyles.actionsLabel}>
          ~
        </Text>
      </View>
    );
  }

  /**
   * Render a view when there is no row to display at the first fetch
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderEmptyView(refreshCallback) {
    return (
      <View style={customStyles.defaultView}>
        <Text style={customStyles.defaultViewTitle}>
          Sorry, there is no content to display
        </Text>

        <TouchableHighlight
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
        >
          <Text>
            ↻
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  /**
   * Render a separator between rows
   */
  _renderSeparatorView() {
    return (
      <View style={customStyles.separator} />
    );
  }

  render() {
    if (this.props.long !== '') {
      return (
        <View style={screenStyles.container}>
          <GiftedListView
            ref={ref => this.listview = ref}
            rowView={this._renderRowView.bind(this)}
            onFetch={this._onFetch}

            pagination={true} // enable infinite scrolling using touch to load more
            refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
            enableEmptySections={true}

            paginationFetchingView={this.paginationFetchingView}
            paginationAllLoadedView={this._renderPaginationAllLoadedView} // view when you reach end of list
            paginationWaitingView={this._renderPaginationWaitingView} // the 'load more' view
            emptyView={this._renderEmptyView}

            renderSeparator={this._renderSeparatorView}
            withSections={false} // enable sections

            PullToRefreshViewAndroidProps={{
              colors: ['#fff'],
              progressBackgroundColor: '#003e82',
            }}

            style={{ backgroundColor: '#F4F5F9'}}

            rowHasChanged={(r1,r2)=>{
              r1.id !== r2.id
            }}
          />
        </View>
      );
    } else {
      return (
      <View>
        <Text>Could not get location</Text>
      </View>
      )}
  }
}


const customStyles = StyleSheet.create({
  separator: {
    height: 0,
    backgroundColor: '#CCC'
  },
  refreshableView: {
    height: 50,
    backgroundColor: '#F4F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsLabel: {
    fontSize: 20,
    color: '#6C56BA',
  },
  paginationView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F5F9',
  },
  defaultView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  defaultViewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    padding: 10,
    height: 44,
  },
  header: {
    backgroundColor: '#50a4ff',
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
  },
});

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  navBar: {
    height: 64,
    backgroundColor: '#007aff',

    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  }
});


export default PostsListView;
