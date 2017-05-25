import React, { Component } from 'react';
import { getPost } from '../api.js';
import {
    Text,
    View
} from 'react-native';
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      score: 0,
      tags: [],
      location:'',
      timestamp:'',
      comments: [],
      upvoters:[],
      downvoters: [],
    }
    this.fetchPost = this.fetchPost.bind(this);
  }

  componentWillMount() {

  }

  fetchPost(id, callback) {
  // let rows = [];
    getPost(id, (post) => {
      callback(post);
    });
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
