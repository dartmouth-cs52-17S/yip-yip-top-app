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
    fetchPost(this.props._id);
  }
  fetchPost(id) {
    axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
      this.setState({
        text: response.data.text,
        score: response.data.score,
        timestamp: response.data.timestamp,
        tags: response.data.tags,
        location: response.data.location,
      });r
    }).catch((error) => {
      this.setState({
        error: true,
      });
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
