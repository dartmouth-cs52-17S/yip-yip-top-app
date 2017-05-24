import React, {Component} from 'react';
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
          <Text>{post.text}</Text>
          <Text>{post.location}</Text>
          <Text>{post.timeStamp}</Text>
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
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderPostCell.bind(this)}
          />
      </View>
    );

  }
}
export default Posts;
