import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';

import { Icon } from 'react-native-elements';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const comm = this.props.comment;
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>

          <View style={{flex: 4, backgroundColor: 'blue', flexDirection: 'row'}}>

            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'orange'}}>
              <Icon
                reverse
                name='ios-american-football'
                type='ionicon'
                color='#517fa4'
              />
            </View>
            <View style={{flex: 3, justifyContent: 'center', backgroundColor: 'yellow'}}>
              <Text> {comm.text} </Text>
              <Text> {comm.time} </Text>
            </View>

          </View>

        <View style={{flex: 1, alignItems: 'center', backgroundColor: 'green'}}>
          <Icon type="ionicon" name='ios-arrow-up' size={35} color={(this.state.upvote? '#DA5AA4':'#6C56BA')} />
          <Text> {comm.score} </Text>
          <Icon type="ionicon" name='ios-arrow-down' size={35} color={(this.state.downvote? '#DA5AA4':'#6C56BA')} onPress={this.downVote}/>
        </View>
      </View>
    );
  }
}

export default Comment;
