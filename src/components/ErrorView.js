import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EventEmitter from 'react-native-eventemitter';
import Button from 'react-native-button';

const ErrorView = (props) => {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={customStyles.text}> {props.message} </Text>
      <Button
        containerStyle={customStyles.button}
        style={customStyles.tags}
        onPress={() => {
          EventEmitter.emit('refreshListView')}}>
        REFRESH
      </Button>
    </View>
  );
};

const customStyles = StyleSheet.create({
  text: {
    fontFamily: 'Gill Sans',
    color: '#6C56BA',
    fontSize: 18,
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
