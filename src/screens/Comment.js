import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';
import moment from 'moment';
import { Icon } from 'react-native-elements';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvote:false,
      downvote:false
    }
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }
  upVote(){
    if (this.state.downvote) {
      this.setState({
        downvote:false
      });
    }
    if (this.state.upvote){
      this.setState({
        upvote:false
      });
      this.props.comment.score -= 1;
    }else {
      this.setState({
        upvote:true
      });
      this.props.comment.score += 1;
    }
  }
  downVote(){
    if (this.state.upvote) {
      this.setState({
        upvote:false
      });
    }
    if (this.state.downvote){
      this.setState({
        downvote:false
      });
      this.props.comment.score += 1;
    }else {
      this.setState({
        downvote:true
      });
      this.props.comment.score -= 1;
    }
  }
  render() {
    const comm = this.props.comment;
    let timeSince = moment(comm.timestamp).fromNow().split(' ');
    timeSince.splice(-1,1);
    if (timeSince[0] === 'an' | timeSince[0] === 'a') {
      timeSince[0] = '1'
    }
    if (timeSince[1] === 'minutes') {
      timeSince[1] = 'mins'
    } else if (timeSince[1] === 'seconds') {
      timeSince[1] = 'secs'
    }
    if (timeSince[2] === 'seconds') {
      timeSince[2] = 'secs'
    }
    const time = timeSince.join(' ');
    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginLeft: 17, marginRight: 17, marginTop: 10, backgroundColor: 'white', borderRadius: 10}}>

            <View style={{flex: 4, backgroundColor: 'transparent', flexDirection: 'row'}}>

              <View style={{flex: 1, justifyContent: 'center'}}>
                <Icon
                  reverse
                  name='ios-american-football'
                  type='ionicon'
                  color='#517fa4'
                />
              </View>
              <View style={{flex: 3, justifyContent: 'center'}}>
                <Text> {comm.text} </Text>
                <Text style={{marginTop: 20, marginLeft: 135, fontSize: 13}}> {time} </Text>
              </View>

            </View>

          <View style={{flex: 1, alignItems: 'center'}}>
            <Icon type="ionicon" name='ios-arrow-up' size={35} color={(this.state.upvote? '#DA5AA4':'#6C56BA')} onPress={this.upVote} />
            <Text> {comm.score} </Text>
            <Icon type="ionicon" name='ios-arrow-down' size={35} color={(this.state.downvote? '#DA5AA4':'#6C56BA')} onPress={this.downVote}/>
          </View>
        </View>
    );
  }
}

export default Comment;
