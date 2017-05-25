
import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet
} from 'react-native';

// import ActionButton from 'react-native-action-button';
// import { height } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { createPost } from '../api';

const CHAR_LIMIT = 50;

class NewPostScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'New Post',
    headerRight: navigation.state.params && navigation.state.params.headerRight ? navigation.state.params.headerRight: '',
    headerLeft: <Icon type='ionicon'
      name='ios-close'
      color='#6C56BA'
      size={40}
      onPress={()=>{ navigation.goBack(null); }}
      style={{ marginLeft: 10, padding: 5}}
    />
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
      headerRight: <Icon type='font-awesome'
        name='send-o'
        color='#6C56BA'
        size={20}
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
    // const actionButton = (
    //  <ActionButton
    //     buttonColor='#FF906F'
    //     onPress={this.postSubmitPressed}
    //     hideShadow={false}
    //     shadowRadius={1}
    //     size={50}
    //     offsetY={height(30)}
    //     icon={<Icon type='font-awesome' name='send-o' size={20} color={'white'}/>}
    //    />)

    return (
      <View style={customStyles.main}>
        <KeyboardAvoidingView
          behavior={'height'}
          key={this.state.keyboardCounter}
          style={{flex: 1}}>

          <TextInput
            numberOfLines={5}
            multiline={true}
            maxLength={CHAR_LIMIT}
            placeholder="Send a Yip out to your location!"
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
