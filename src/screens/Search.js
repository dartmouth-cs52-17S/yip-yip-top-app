import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native'

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={searchStyle.container}>
        <Text> Search </Text>
      </View>
    );
  }
}


const searchStyle = StyleSheet.create({
  container: {
    flex: 1,
  },

});


export default SearchScreen;
