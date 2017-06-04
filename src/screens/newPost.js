import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  Alert,
  AsyncStorage
} from 'react-native';

// import ActionButton from 'react-native-action-button';
// import { height } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { createPost } from '../api';
import EventEmitter from 'react-native-eventemitter';
import Spinner from 'react-native-loading-spinner-overlay';

import banned from '../banned';

const CHAR_LIMIT = 140;

class NewPostScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'New Post',
    headerRight: navigation.state.params && navigation.state.params.headerRight ? navigation.state.params.headerRight: '',
    headerLeft: <Icon type='font-awesome'
      name='close'
      color='#6C56BA'
      size={20}
      onPress={()=>{ navigation.goBack(null); }}
      style={{ marginLeft: 10, padding: 5}}
    />,
    headerTintColor: '#6C56BA',
    headerTitleStyle: {
      fontFamily: 'Gill Sans',
      fontWeight: 'normal',
      fontSize: 22
    },
    headerStyle: {
      backgroundColor: '#F4F5F9',
      shadowOpacity: 0
    },
  })


  constructor(props) {
    super(props);

    //There's a bug in RN for KeyboardAvoidingView where it doesn't work correctly unless you provide a changing key every time the keyboard appears
    this.state={
      keyboardCounter: 1,
      text: '',
      remainingCharacters: CHAR_LIMIT,
      showLoader: false
    }

    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    this.postSubmitPressed = this.postSubmitPressed.bind(this);
  }

  componentWillMount () {
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    // console.log('setting params');
    // console.log(`banned words are ${JSON.stringify(banned)}`);
    this.props.navigation.setParams({
      headerRight: <Icon type='font-awesome'
        name='send-o'
        color='#6C56BA'
        size={20}
        onPress={this.postSubmitPressed}
        style={{ marginRight: 10, padding: 5}}
      />
    })
  }

  componentWillUnmount () {
    this.keyboardWillHideListener.remove();
  }

  keyboardWillHide () {
    this.setState({
      keyboardCounter: this.state.keyboardCounter + 1
    });
  }

  async isPostTooRecent(callback) {
    try {
      const now = Date.now();
      const lastPost = await AsyncStorage.getItem('@LastPost:key');
      // if (lastPost && now - lastPost < 0) {
      if (lastPost && now - lastPost < 60000) {
        // console.log('bad post', now, lastPost, now - lastPost);
        callback('BAD', null)
      } else {
        await AsyncStorage.setItem('@LastPost:key', now.toString());
        // console.log('good post');
        callback('OK', null)
      }
    } catch (error) {
      // console.log('error post');
      callback(null, error);
    }
  }

  postSubmitPressed() {
    let safe = true;
    if (this.state.text) {
      if (this.state.text.length < 5) {
        Alert.alert('Length Warning', 'This post is too short. Posts must be at least 5 characters');
        safe = false;
      }
      if (safe) {
        for (var i = 0; i < banned.length; i++) {
          if (this.state.text.toLowerCase().includes(banned[i])) {
            this.setState({showLoader: false}, () => {
              Alert.alert('Post Error', 'We have detected some profanity in this post. Please remove it and try again');
            });
            safe = false;
            break;
          }
        }
      }
      if (safe){
        this.isPostTooRecent((res, err) => {
          if (err) {
            Alert.alert('Oh no!', 'Something went really wrong. Sorry about that!');
          } else if (res === 'BAD') {
            Alert.alert('Oops!', 'We only allow one post a minute. Please wait a few seconds and try again.');
          } else {
            this.setState({showLoader: true});
            let tagArray = [];
            if(findHashtags(this.state.text)) tagArray=findHashtags(this.state.text);
            const post = {
              text: this.state.text,
              tags: tagArray,
              coordinates: [this.props.navigation.state.params.long, this.props.navigation.state.params.lat],
              user: this.props.navigation.state.params.user,
            }
            createPost(post, (callback) => {
              // console.log(`callback from create: ${JSON.stringify(callback)}`);
              EventEmitter.emit('refreshListView');
              this.setState({showLoader: false}, () => {
                this.props.navigation.goBack(null);
              });
            })
          }
        })
      }


    }
  }

  render() {

    return (
      <View style={customStyles.main}>
        <Spinner visible={this.state.showLoader} textStyle={{color: '#FFF'}} />
        <KeyboardAvoidingView
          behavior={'height'}
          key={this.state.keyboardCounter}
          style={{flex: 1}}>

          <TextInput
            numberOfLines={5}
            multiline={true}
            maxLength={CHAR_LIMIT}
            placeholder="Send a Yip out to your location! (Add tags using #hashtags)"
            placeholderTextColor="#D0CCDF"
            value={this.state.text}
            onChangeText={(text) => {
              this.setState({
                text,
                remainingCharacters: CHAR_LIMIT - text.length
              });
            }}
            blurOnSubmit={true}
            style={customStyles.textBox}
          />
          <Text style={customStyles.remainCount}> {this.state.remainingCharacters} </Text>
          <Text style={customStyles.bottomText}> Harrassment of any form will not be tolerated. </Text>

        </KeyboardAvoidingView>
      </View>
    );
  }
}

function findHashtags(text) {
  var regexp = /\B\#\w\w+\b/g;
  let result = text.match(regexp);
  if (result) {
    // console.log(result);
    return result;
  } else {
    return false;
  }
}

const customStyles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F5F9'
  },

  textBox: {
    height: '60%',
    fontSize: 24,
    padding: 20,
    paddingTop: 20,
    lineHeight: 33,
    fontFamily: 'Gill Sans',
    color: '#3C3559',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#291D56',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3
  },

  remainCount: {
    fontFamily: 'Gill Sans',
    marginTop: 10,
    fontSize: 20,
    color: '#9C8FC4',
    paddingLeft: 10
  },
  bottomText: {
    fontFamily: 'Gill Sans',
    fontSize: 14,
    color: '#9C8FC4',
    padding: 10,
    paddingTop: 5
  }
});

export default NewPostScreen;
