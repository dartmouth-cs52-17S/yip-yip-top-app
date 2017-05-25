import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: String,
      timestamp: Date,
      user:String,
      upvoters:[String],
      downvoters:[String],
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
