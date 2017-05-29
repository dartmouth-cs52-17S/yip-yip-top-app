import React from 'react';
import { View, TextInput, Text, Image, Alert, StyleSheet, Dimensions } from 'react-native';
import Button from 'react-native-button';

import { codeAuth } from '../api';

const vw = Dimensions.get('window').width;

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
    resizeMode: 'cover'
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

class AuthCode extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  onButtonPress() {
    console.log(this.props.navigation.state.params.phone);
    if (this.state.text.length === 6) {
      codeAuth(this.props.navigation.state.params.phone, this.state.text, (response) => {
        this.props.navigation.navigate('Tabs');
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
            source={{uri:'https://vignette3.wikia.nocookie.net/camphalfbloodroleplay/images/8/89/Tumblr_mpgoldBy461ri41kbo1_500.png'}}
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
      </View>
    )
  }
}



export default AuthCode;
