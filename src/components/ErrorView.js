import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import EventEmitter from 'react-native-eventemitter';


const ErrorView = (props) => {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={customStyles.text}> {props.message} </Text>
      <Button color={'#DA5AA4'} title='Refresh' onPress={() => {
        EventEmitter.emit('refreshListView')}} />
    </View>
  );
};

const customStyles = StyleSheet.create({
  text: {
    fontFamily: 'Gill Sans',
    color: '#3C3559',
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center'
  }
});

export default ErrorView;
