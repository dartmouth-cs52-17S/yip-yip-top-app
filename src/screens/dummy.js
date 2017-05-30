import React, { Component } from 'react';

import {
  Text,
  View,
  Button,
  StatusBar
} from 'react-native';
import ActionButton from 'react-native-action-button';
import styles from '../styles';

class DummyComponent extends Component {

  render() {
    // console.log('in dummy render');
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

export default DummyComponent;
