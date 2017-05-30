import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Button from 'react-native-button';

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
    flex: 0.7,
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
  buttonArea: {
    flex: 0.3
  },
  button: {
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
    marginBottom: 5,
  },
});

class AuthIntro extends React.Component {

  onPress(navigation) {
    // console.log('Hello');
    this.props.navigation.navigate('Phone');
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
        <View style={styles.buttonArea}>
          <Button
            containerStyle={{padding:10, width:vw * 0.7, height:50, overflow:'hidden', borderRadius:25, backgroundColor: '#6C56BA'}}
            style={styles.button}
            onPress={this.onPress.bind(this)}>
            LOGIN
          </Button>
        </View>
      </View>
    )
  }
}



export default AuthIntro;
