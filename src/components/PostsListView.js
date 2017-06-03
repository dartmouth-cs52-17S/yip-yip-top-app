import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native' ;

import GiftedListView from 'react-native-gifted-listview';
import GiftedSpinner from 'react-native-gifted-spinner';

import { fetchPosts, searchPosts, getUserPosts } from '../api.js';
import PostRow from './PostRow';
import ErrorView from './ErrorView';

const MIN_SCORE = -5; // also in PostDetail

class PostsListView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numPosts: 0,
      error: false,
      empty: false,
      endOfResults: false,
    }

    this.newPosts = []
    this.topPosts = []
    this.commentPosts = []

    this.useCached = false

    this._onFetch = this._onFetch.bind(this);
    this._renderPaginationWaitingView = this._renderPaginationWaitingView.bind(this);
  }

  triggerRefresh(isSegmentedChange) {
    // console.log('refresh triggered', this.listview);

    let currentPostlist;
    if (this.props.sortBy === 'New') {
      currentPostlist = this.newPosts;
    } else if (this.props.sortBy === 'Top') {
      currentPostlist = this.topPosts;
    } else { currentPostlist = this.commentPosts }

    if (!isSegmentedChange || !currentPostlist) {
      this.useCached = false
    } else if (isSegmentedChange && currentPostlist.length != 0) {
      // console.log(currentPostlist);
      this.useCached = true
    }

    this.setState({error: false, empty: false, endOfResults: false}, () => {
      if (this.listview) {
        this.listview._refresh();
      }
    });
  }


  _onFetch(page = 1, callback, options) {
    if (this.props.searchTags) {
      searchPosts(this.props.long, this.props.lat, this.props.searchTags, page, this.props.user, (posts, error) => {
        if (error) {
          this.setState({error: true});
        } else {
          if (page === 1 && posts.length === 0) {
            this.setState({empty: true});
          } else if (posts.length === 0) {
            this.setState({endOfResults: true});
          }
        }
        callback(posts);
      })
    } else if (this.props.userId) {
      getUserPosts(this.props.userId, page, (posts, error) => {
        if (error) {
          this.setState({error: true});
        } else {
          if (page === 1 && posts.length === 0) {
            this.setState({empty: true});
          } else if (posts.length === 0) {
            this.setState({endOfResults: true})
          }
        }
        callback(posts);
      })
    } else if (this.useCached) {
      callback([])
      if (this.props.sortBy === 'New') {
        callback(this.newPosts)
      } else if (this.props.sortBy === 'Top') {
        callback(this.topPosts)
      } else { callback(this.commentPosts) }

    } else {
      // console.log('list sort by', this.props.sortBy, 'page', page);
      fetchPosts(this.props.long, this.props.lat, this.props.sortBy, page, this.props.user, (posts, error) => {
        callback([])
        if (error) {
          this.setState({error: true});
        } else {
          if (page === 1 && posts.length === 0) {
            this.setState({empty: true});
          } else if (posts.length === 0) {
            this.setState({endOfResults: true});
          }
        }

        if (this.props.sortBy === 'New') {
          page === 1 ? this.newPosts = posts : this.newPosts = this.newPosts.concat(posts)
        } else if (this.props.sortBy === 'Top') {
          page === 1 ? this.topPosts = posts : this.topPosts = this.topPosts.concat(posts)
        } else {
          page === 1 ? this.commentPosts = posts : this.commentPosts = this.commentPosts.concat(posts)
        }

        callback(posts);
      });
    }

    this.useCached = false
  }


  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderRowView(rowData) {
    let numComments = 0
    console.log(rowData)
    for (var comment in rowData.comments) {
      if (rowData.comments[comment].score > MIN_SCORE) {
        numComments += 1;
      }
    }
    rowData.commentsLen = numComments;
    console.log(`num comments after is ${rowData.commentsLen}`)
    return (
      <PostRow key={rowData.id} post={rowData} id={rowData.id} user={this.props.user} navigation={this.props.navigation} refresh={()=> {
        this.listview._refresh();
      }} manageProfile={this.props.manageProfile}/>
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
    if (this.state && this.state.endOfResults) {
      return (
        <View style={customStyles.paginationView}>
          <Text style={customStyles.actionsLabel}>
            End of Results
          </Text>
        </View>
      );
    }
    return (
      <TouchableHighlight
        underlayColor='#D0CCDF'
        onPress={paginateCallback}
        style={customStyles.paginationView}
      >
        <Text style={customStyles.actionsLabel}>
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
      <View style={customStyles.loadingView}>
        <View>
          <Text style={customStyles.loading}>Loading Yips...</Text>
          <Image
            source={{uri: 'https://i.imgur.com/fdh8TNp.png'}}
            style={customStyles.loadImg}/>
        </View>
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

    if (this.state.error) {
      return <ErrorView message={'Error loading Yips'}/>
    }

    if (this.state.empty) {
      return <ErrorView message={'No Yips in this area yet \n You should make one!'} />
    }

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
      <View style={customStyles.loadingView}>
        <Text style={customStyles.loading}>Could not get location</Text>
        <Image
          source={{uri: 'https://i.imgur.com/424SJFg.png'}}
          style={customStyles.loadImg}/>
      </View>
      )}
  }
}


const customStyles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F5F9',
  },
  loading: {
    fontFamily: 'Gill Sans',
    fontSize: 20,
    color: '#6C56BA',
    margin: 20,
  },
  loadImg: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    shadowColor: '#291D56',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3
  },

  refreshableView: {
    height: 50,
    backgroundColor: '#F4F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsLabel: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
    color: '#6C56BA',
    margin: 15,
  },
  paginationView: {
    justifyContent: 'center',
    alignItems: 'center',
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
});

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});


export default PostsListView;
