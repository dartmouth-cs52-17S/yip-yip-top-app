import React from 'react';
/* eslint-disable no-unused-vars */
import { View, Text, TextInput, Image, Alert, StyleSheet, Dimensions, Keyboard } from 'react-native';
import Button from 'react-native-button';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { startAuth } from '../api';

const vw = Dimensions.get('window').width;

class AuthPhone extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '+1',
      buttonDisabled: false,
    };
  }

  onPress() {
    if (this.state.text.length === 10) {
      this.setState({buttonDisabled: true});
      startAuth('+1'.concat(this.state.text), (data, error) => {
        if (error) {
          this.setState({buttonDisabled: false});
          Alert.alert('Something went wrong', 'We are probably down for maintenance. Please try again later');
        }
        // console.log('auth return');
        // console.log(data);
        this.props.navigation.navigate('Passcode', {phone: this.state.text});
      })
    } else {
      Alert.alert('Invalid Phone Number', 'Please enter your phone number and try again.');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            style={styles.logoImg}
            source={{uri:'https://i.imgur.com/fdh8TNp.png'}}
          />
          <Text style={styles.logoFont}> Yip Yip </Text>
        </View>
        <Text style={styles.instructions}>Enter your phone number</Text>
        <Text style={styles.instructions}>For example: +16036436135</Text>
        <View style={styles.numArea}>
          <TextInput
            maxLength={12}
            keyboardType='numeric'
            style={styles.textArea}
            onChangeText={(text) => this.setState({text})}
            onBlur={() => Keyboard.dismiss()}
            value={this.state.text}
          />
        </View>
        <View style={styles.buttonArea}>
          <Button
            disabled={this.state.buttonDisabled}
            containerStyle={styles.button}
            style={styles.buttonFont}
            onPress={this.onPress.bind(this)}>
            SEND CODE
          </Button>
        </View>
        <KeyboardSpacer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F5F9',
  },
  logo: {
    flex: 0.4,
    justifyContent: 'flex-end'
  },
  logoImg: {
    width: vw * 0.6,
    height: vw * 0.4,
    resizeMode: 'contain',
    shadowColor: '#291D56',
    shadowOffset: {height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 3
  },
  logoFont: {
    fontSize: 45,
    fontFamily: 'Gill Sans',
    color: '#372769',
    textAlign: 'center',
    margin: 20,
    marginBottom: 50,
  },
  numArea: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15
  },
  textArea: {
    fontFamily: 'Gill Sans',
    color: '#372769',
    height: 40,
    width: vw*0.6,
    padding: 5,
    borderColor: '#9C8FC4',
    borderWidth: 0.5
  },
  buttonArea: {
    flex: 0.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    padding:10,
    margin: 10,
    width:vw * 0.7,
    height:50,
    overflow:'hidden',
    borderRadius:25,
    backgroundColor: '#6C56BA'
  },
  buttonFont: {
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: 'Futura',
    color: '#FFFFFF',
  },
  instructions: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Gill Sans',
    color: '#9C8FC4',
    margin: 5
  },
});

export default AuthPhone;
