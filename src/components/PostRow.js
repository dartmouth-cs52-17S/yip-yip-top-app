import React from 'react';

import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native' ;

import { Icon } from 'react-native-elements';


const PostRow = (props) => {

  return (
    <TouchableHighlight
      underlayColor='#c8c7cc'
      onPress={(rowData) => {
        console.log(rowData);
      }}
    >
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 4, flexDirection: 'column', justifyContent: 'center', backgroundColor: 'blue'}}>
          <Text>{props.post.text}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{ flexDirection: 'row'}}>
              <Icon type='ionicon' name='ios-clock-outline' size={20} color={'white'} />
              <Text>{props.post.location.city || 'n/a'}</Text>
            </View>

            <View style={{ flexDirection: 'row'}}>
              <Icon type='ionicon' name='ios-clock-outline' size={20} color={'white'} />
              <Text>{props.post.timestamp}</Text>
            </View>

          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Icon type="ionicon" name='ios-arrow-up' size={30} color={'blue'} onPress={() => {
            console.log('up pressed');
          }} />
          <Text> {props.post.score} </Text>
          <Icon type="ionicon" name='ios-arrow-down' size={30} color={'blue'} onPress={() => {
            console.log('down pressed');
          }}/>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default PostRow;
