import React, { Component } from 'react';

import {
  Text,
  View
} from 'react-native';
import styles from '../styles';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('in render');
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Posts page!
        </Text>
      </View>
    );
  }
}

export default Post;
