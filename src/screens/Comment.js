import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import moment from 'moment';
import { Icon } from 'react-native-elements';

const vw = Dimensions.get('window').width;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <View style={customStyles.container}>
          <View style={customStyles.icon}>
            <Icon reverse name='ios-american-football' type='ionicon' color='#517fa4' />
          </View>

          <View style={customStyles.content}>
            <Text style={customStyles.comment}> {comm.text} </Text>
            <View style={customStyles.timestamp}>
              <Icon type='font-awesome' name='hourglass-half' size={15} color={'#6C56BA'} margin={3} />
              <Text style={customStyles.time}> {time} </Text>
            </View>
          </View>

          <View style={customStyles.vote}>
            <Icon type="ionicon" name='ios-arrow-up' size={35} color={(this.state.upvote? '#DA5AA4':'#6C56BA')} />
            <Text> {comm.score} </Text>
            <Icon type="ionicon" name='ios-arrow-down' size={35} color={(this.state.downvote? '#DA5AA4':'#6C56BA')} onPress={this.downVote}/>
          </View>
        </View>
    );
  }
}

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: 0.90 * vw,
    margin: 7,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    shadowColor: '#291D56',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  icon: {
    flex: 1,
    justifyContent: 'center',
    margin: 5,
  },

  content: {
    flex: 3,
    height: 70,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 5,
  },
  comment: {
    fontFamily: 'Gill Sans',
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#2E234E',
  },
  timestamp: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  time: {
    fontFamily: 'Gill Sans',
    fontSize: 12,
    color: '#2E234E',
  },
  mainText: {
    color: '#3C3559',
    fontSize: 15,
    letterSpacing: -0.1,
    lineHeight: 20,
    paddingLeft: 5
  },

  vote: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
  score: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    color: '#3C3559',
    letterSpacing: -0.03,
  },

});

export default Comment;
