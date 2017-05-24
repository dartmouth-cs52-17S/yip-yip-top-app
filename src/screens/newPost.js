/* eslint-disable */

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';

import ActionButton from 'react-native-action-button';
import { width, height, totalSize } from 'react-native-dimension';

const CHAR_LIMIT = 50;

class NewPostScreen extends Component {

  constructor(props) {
    super(props);

    //There's a bug in RN for KeyboardAvoidingView where it doesn't work correctly unless you provide a changing key every time the keyboard appears
    this.state={
      keyboardCounter: 1,
      text: '',
      remainingCharacters: CHAR_LIMIT
    }

    this._keyboardWillHide = this._keyboardWillHide.bind(this);
  }

  componentWillMount () {
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount () {
    this.keyboardWillHideListender.remove();
  }

  _keyboardWillHide () {
    console.log("hide");
    this.setState({
      keyboardCounter: this.state.keyboardCounter + 1
    });
  }

  render() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <KeyboardAvoidingView
          behavior={'height'}
          key={this.state.keyboardCounter}
          style={{flex: 1}}>
          <TextInput
            numberOfLines={5}
            multiline={true}
            maxLength={CHAR_LIMIT}
            placeholder="Send a Yip out to your location!\nkjkl\njklj\nlkjj\njlkj"
            value={this.state.text}
            onChangeText={(text) => {
              this.setState({
                text,
                remainingCharacters: CHAR_LIMIT - text.length
              });
            }}
            blurOnSubmit={true}

            style={{height: '65%', backgroundColor: 'blue', fontSize: 30, padding: 20, paddingTop: 30, marginBottom: 20}}
          />
          <Text> {this.state.remainingCharacters} </Text>
          <Text style={{paddingBottom: 50}}> Harrassment will not be tolerated </Text>
        </KeyboardAvoidingView>
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

module.exports = NewPostScreen;
