import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {

  }
  render() {
    console.log('in render');
    return (
      <View>
        <Text>
          This is the comment.
        </Text>
      </View>
    );
  }
}

export default Comment;
