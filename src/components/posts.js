import React, {Component} from 'react';
import axios from 'axios';
import {
    ListView,
    Text,
    View,
} from 'react-native';

// const ROOT_URL;

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      empty: true,
      error: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  componentWillMount() {
    fetchPosts();
  }

  //TODO
  fetchPosts() {
    axios.get(`${ROOT_URL}/posts`).then((response) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        isLoading: false,
        empty: false,
      });
    }).catch((error) => {
      this.setState({
        error: true,
      })
    });
  }
  renderLoadingView() {
    return (
      <View>
        <Text>
          Loading posts...
        </Text>
      </View>
    );
  }
  renderEmptyView() {
    return (
      <View>
        <Text>
          Ops! There is no post around here.
        </Text>
      </View>
    );
  }
  renderErroriew() {
    return (
      <View>
        <Text>
          Ops! There is an error!
        </Text>
      </View>
    );
  }
  renderPostCell(post) {
    return (
        <View>
            <View>
              //----- TableView Content -----//
              <Text>{post.text}</Text>
              <Text>{post.location}</Text>
              <Text>{post.timeStamp}</Text>
            </View>
          </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    } else if (this.state.empty) {
      return this.renderEmptyView();
    } else if (this.state.error) {
      return this.renderErroriew;
    }
    return (
      <View style={{marginBottom: 150}}>
        // Load the list of posts
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderPostCell.bind(this)}
          />
      </View>
    );

  }
}
module.exports = Posts;
