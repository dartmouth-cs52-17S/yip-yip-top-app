import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native' ;

import { Icon } from 'react-native-elements';


class PostRow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      score: 7
    }

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  upVote() {
    // console.log('up pressed');
    this.setState({score: this.state.score + 1});
  }

  downVote() {
    // console.log('down pressed');
    this.setState({score: this.state.score - 1});
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor='#c8c7cc'
        onPress={(rowData) => {
          console.log(rowData);
        }}
      >
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 4, flexDirection: 'column', justifyContent: 'center', backgroundColor: 'blue'}}>
            <Text>{this.props.post.text}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{ flexDirection: 'row'}}>
                <Icon type='ionicon' name='ios-clock-outline' size={20} color={'white'} />
                <Text>{this.props.post.location.city || 'n/a'}</Text>
              </View>

              <View style={{ flexDirection: 'row'}}>
                <Icon type='ionicon' name='ios-clock-outline' size={20} color={'white'} />
                <Text>{this.props.post.timestamp}</Text>
              </View>

            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Icon type="ionicon" name='ios-arrow-up' size={30} color={'blue'} onPress={this.upVote}/>
            <Text> {this.state.score} </Text>
            <Icon type="ionicon" name='ios-arrow-down' size={30} color={'blue'} onPress={this.downVote}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}

export default PostRow;
