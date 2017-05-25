/* eslint-disable */

import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Button
} from 'react-native';

import ActionButton from 'react-native-action-button';
import { height } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { createPost } from '../api';

const CHAR_LIMIT = 50;

class NewPostScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'New Post',
    headerRight: navigation.state.params && navigation.state.params.headerRight ? navigation.state.params.headerRight: ''
   })


  constructor(props) {
    super(props);

    //There's a bug in RN for KeyboardAvoidingView where it doesn't work correctly unless you provide a changing key every time the keyboard appears
    this.state={
      keyboardCounter: 1,
      text: '',
      remainingCharacters: CHAR_LIMIT
    }

    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    this.postSubmitPressed = this.postSubmitPressed.bind(this);
  }

  componentWillMount () {
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    console.log('setting params');
    this.props.navigation.setParams({
      headerRight: <Icon type='ionicon'
        name='ios-glasses-outline'
        color='#3C3559'
        size={30}
        onPress={this.postSubmitPressed}
        style={{ marginRight: 10, padding: 5}}
      />
    })
  }

  componentDidMount() {

  }

  componentWillUnmount () {
    this.keyboardWillHideListener.remove();
  }

  keyboardWillHide () {
    this.setState({
      keyboardCounter: this.state.keyboardCounter + 1
    });
  }

  postSubmitPressed() {
    if (this.state.text) {
      // need to set up user
      const post = {
        text: this.state.text,
        tags: ['tag', 'another'],
        coordinates: [5, 6],
      }
      createPost(post, (callback) => {
        console.log(`callback from create: ${JSON.stringify(callback)}`);
        this.props.navigation.goBack(null);
      })
    }
  }

  render() {

    const actionButton = (
     <ActionButton
        buttonColor='#FF906F'
        onPress={this.postSubmitPressed}
        hideShadow={false}
        size={50}
        offsetY={height(30)}
        icon={<Icon type='font-awesome' name='send-o' size={20} color={'white'}/>}
       />)

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
            style={{height: '60%', fontSize: 30, padding: 20, paddingTop: 30, marginBottom: 20, backgroundColor: 'blue'}}
          />

          <Text> {this.state.remainingCharacters} </Text>
          <Text style={{paddingBottom: 50}}> Harrassment will not be tolerated </Text>
          {actionButton}

        </KeyboardAvoidingView>
      </View>
    );
  }
}

module.exports = NewPostScreen;
