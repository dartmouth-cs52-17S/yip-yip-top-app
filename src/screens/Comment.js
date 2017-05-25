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
    return (
      <View>
        <Text> {this.props.comment} </Text>
      </View>
    );
  }
}

export default Comment;
