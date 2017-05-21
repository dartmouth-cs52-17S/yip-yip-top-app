import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


class Feed extends Component {
  constructor(props) {
    super(props);
  }

  showModal() {
    console.log(this.props.navigation);
    this.props.navigation.navigate('Settings')
  }

  render() {
    console.log("in render");
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Feed;
