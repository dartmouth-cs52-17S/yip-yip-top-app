import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      text: '',
      score: 0,
      tags: [],
      location:'',
      timestamp:'',
    }
    this.fetchPost = this.fetchPost.bind(this);
  }

  componentWillMount() {

  }
  render() {
    console.log('in render');
    return (
      <View>
        <Text>
          This is the detail post.
        </Text>
      </View>
    );
  }
}

export default Post;
