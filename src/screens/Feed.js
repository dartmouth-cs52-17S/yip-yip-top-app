import React, { Component } from 'react';

import {
  Text,
  View,
  Button
} from 'react-native';
import styles from '../styles';

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  showModal() {
    console.log(this.props.navigation);
    this.props.navigation.navigate('Settings')
  }

  render() {
    console.log('in render');
    return (
      <View style={styles.container}>
        <Button title="Show modal" onPress={() => this.props.navigation.navigate('Settings')} />
        <Text style={styles.welcome}>
          Welcome to FeedView!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

export default Feed;
