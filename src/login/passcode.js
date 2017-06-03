import React from 'react';
import { View, TextInput, Text, Image, Alert, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import Button from 'react-native-button';
import jwtDecode from 'jwt-decode';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { codeAuth } from '../api';

const vw = Dimensions.get('window').width;

class AuthCode extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      buttonDisabled: false,
    };
  }

  async saveLogin(profile, token) {
    try {
      await AsyncStorage.setItem('@Profile:key', profile);
      await AsyncStorage.setItem('@Token:key', token);
      // console.log(`profile is ${JSON.stringify(profile)}`);
      // console.log(`token is ${JSON.stringify(token)}`);
      this.props.navigation.navigate('Tutorial');
    } catch (error) {
      console.log(`Count not save login. ${error}`);
    }
  }

  onButtonPress() {
    if (this.state.text.length === 6) {
      this.setState({buttonDisabled: true});
      codeAuth(this.props.navigation.state.params.phone, this.state.text, (response, error) => {
        if (error) {
          this.setState({buttonDisabled: false});
          console.log(error);
          Alert.alert('Something went wrong');
        } else {
          // console.log(`response is ${JSON.stringify(response)}`);
          //TODO: Save response login information
          const decoded = jwtDecode(response.id_token);
          // console.log(`decoded is ${JSON.stringify(decoded)}`);
          // console.log(`decoded userID is ${decoded.sub}`);
          // console.log(`access token is ${response.access_token}`);
          this.saveLogin(decoded.sub, response.access_token);
        }
      });
    } else {
      Alert.alert('Invalid Passcode', 'Please enter 6 digits for your passcode.');
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
        <Text style={styles.instructions}> Enter your 6-digit code </Text>
        <View style={styles.numArea}>
          <TextInput
            maxLength={6}
            keyboardType='numeric'
            textAlign='center'
            style={styles.textArea}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
        <View style={styles.buttonArea}>
          <Button
            disabled={this.state.buttonDisabled}
            containerStyle={styles.button}
            style={styles.buttonFont}
            onPress={this.onButtonPress.bind(this)}>
            YIP YIP!
          </Button>
          <View style={styles.numArea}>
            <Text style={styles.caption}> Code not received? </Text>
            <Text style={styles.clickCaption} onPress={() => this.props.navigation.goBack()}>
              Re-enter phone number
            </Text>
          </View>
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
    marginBottom: 0,
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
    fontSize: 18,
    fontFamily: 'Gill Sans',
    color: '#9C8FC4',
    margin: 5
  },
  caption: {
    fontSize: 14,
    fontFamily: 'Gill Sans',
    color: '#9C8FC4',
  },
  clickCaption: {
    fontSize: 14,
    fontFamily: 'Gill Sans',
    color: '#DA5AA4',
    textDecorationLine: 'underline',
  },
});

export default AuthCode;
