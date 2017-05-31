/* eslint-disable */

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import { Icon } from 'react-native-elements';

import PostsListView from '../components/PostsListView';

class ProfilePage extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'My Posts',
    headerLeft: <Icon type='font-awesome'
      name='close'
      color='#6C56BA'
      size={20}
      onPress={()=>{ navigation.goBack(null); }}
      style={{ marginLeft: 10, padding: 5}}
    />
  })


  render() {
    return (
      <View style={{flex: 1}}>
        <PostsListView
          userId={this.props.navigation.state.params.userId}
          manageProfile={true}
          user={this.props.navigation.state.params.userId}
          navigation={this.props.navigation}
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

module.exports = ProfilePage;
