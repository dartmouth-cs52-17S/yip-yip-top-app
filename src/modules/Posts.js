import React, {Component} from 'react';

import {
    ListView,
    Text,
    View
} from 'react-native';

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  componentDidMount() {
    fetchPosts();
  }

  //TODO
  fetchPosts() {
    return 0;
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
