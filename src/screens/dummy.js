import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar
} from 'react-native';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

class DummyComponent extends Component {

  render() {
    console.log("in dummy render");
    return (
      <View style={styles.container}>
        <StatusBar
        barStyle="light-content"
        />
        <Button title="Push View" color='white' onPress={() => this.props.navigation.navigate('Feed')} />
        <Text style={styles.welcome}>
          Welcome to DummyComponent!
        </Text>
        <ActionButton
          buttonColor='#FF906F'
          onPress={() => { this.props.navigation.navigate('NewPost')}}          hideShadow={false}
          size={50}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333343',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = DummyComponent;
