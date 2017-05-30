import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import EventEmitter from 'react-native-eventemitter';
import Button from 'react-native-button';

const ErrorView = (props) => {

  const appa = <Image
    source={{uri:'https://i.imgur.com/424SJFg.png'}}
    style={customStyles.img}/>

  const refreshButton = <Button
    containerStyle={customStyles.button}
    style={customStyles.tags}
    onPress={() => {
      EventEmitter.emit('refreshListView')}}>
    Refresh
  </Button>

  if (props.hideAppa) {
    return (
      <View style={customStyles.container}>
        <Text style={customStyles.text}> {props.message} </Text>
        {refreshButton}
      </View>
    );
  } else {
    return (
      <View style={customStyles.container}>
        {appa}
        <Text style={customStyles.text}> {props.message} </Text>
        {refreshButton}
      </View>
    );
  }

};

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F5F9',
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    shadowColor: '#291D56',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  text: {
    fontFamily: 'Gill Sans',
    color: '#6C56BA',
    fontSize: 20,
    lineHeight: 25,
    textAlign: 'center'
  },
  button: {
    padding: 5,
    margin: 5,
    width: 100,
    height: 45,
    overflow:'hidden',
  },
  tags: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    fontWeight:'normal',
    color: '#DA5AA4',
    letterSpacing: -0.03,
    margin: 5,
  },
});

export default ErrorView;
