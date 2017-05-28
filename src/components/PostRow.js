import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native' ;

import moment from 'moment';

import { Icon } from 'react-native-elements';

import { editPost } from '../api'

class PostRow extends Component {

  constructor(props) {
    super(props);

    // TODO: define username from app!!!
    let user = 'You';

    if (this.props.post.upvoters.includes(user)) {
      this.state = {
        score: this.props.post.score,
        upvote: true,
        downvote: false
      }
    } else if (this.props.post.downvoters.includes(user)) {
      this.state = {
        score: this.props.post.score,
        upvote: false,
        downvote: true
      }
    } else {
      this.state = {
        score: this.props.post.score,
        upvote: false,
        downvote: false
      }
    }

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({score: this.props.post.score});
  }

  upVote() {
    editPost(this.props.post, null, 'UPVOTE_POST', () => {
      // this.props.refresh();
      console.log('upvote');
    });
    if (!this.state.upvote) {
      if (this.state.downvote) {
        this.setState({
          upvote: true,
          downvote: false,
          score: this.state.score + 2
        })
      } else {
        this.setState({
          upvote: true,
          score: this.state.score + 1
        })
      }
    }
  }

  downVote() {
    editPost(this.props.post, null, 'DOWNVOTE_POST', () => {
      // this.props.refresh();
      console.log('downvote');
    });
    if (!this.state.downvote) {
      if (this.state.upvote) {
        this.setState({
          upvote: false,
          downvote: true,
          score: this.state.score - 2
        })
      } else {
        this.setState({
          downvote: true,
          score: this.state.score - 1
        })
      }
    }
  }

  render() {
    let timeSince = moment(this.props.post.timestamp).fromNow().split(' ');
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
      <TouchableHighlight underlayColor = '#D0CCDF' backgroundColor = 'F4F5F9'
        /* TODO: Link onPress with post detail */
        onPress={() => {console.log(this.props.post);}}>
        <View style={customStyles.main}>
          <View style={customStyles.content}>
            <Text style={customStyles.mainText}>{this.props.post.text}</Text>
            <Text style={customStyles.tags}>
              {this.props.post.tags.join(' ') /* array.join for space in between tags */ }
            </Text>
            <View style={customStyles.info}>
              <View style={customStyles.infoDetail}>
                <Icon type='font-awesome' name='commenting-o' size={18} color={'#6C56BA'} margin={3} />
                <Text style={customStyles.mainText}>{this.props.post.commentsLen}</Text>
              </View>
              <View style={customStyles.infoDetail}>
                <Icon type='font-awesome' name='hourglass-half' size={15} color={'#6C56BA'} margin={3} />
                <Text style={customStyles.mainText}>{time}</Text>
              </View>
            </View>
          </View>
          <View style={customStyles.vote}>
            <Icon type="ionicon" name='ios-arrow-up' size={35} color={(this.state.upvote? '#DA5AA4':'#6C56BA')} onPress={this.upVote}/>
            <Text style={customStyles.score}> {this.state.score} </Text>
            <Icon type="ionicon" name='ios-arrow-down' size={35} color={(this.state.downvote? '#DA5AA4':'#6C56BA')} onPress={this.downVote}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}


const customStyles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: 340,
    margin: 7,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    shadowColor: '#291D56',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3
  },

  content: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainText: {
    fontFamily: 'Gill Sans',
    color: '#3C3559',
    fontSize: 15,
    letterSpacing: -0.1,
    lineHeight: 20,
    paddingLeft: 5
  },
  tags: {
    fontFamily: 'Gill Sans',
    fontSize: 12,
    color: '#DA5AA4',
    letterSpacing: -0.03,
    margin: 5,
    marginTop: 10
  },

  vote: {
    flex: 1,
    alignItems: 'center'
  },
  score: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    color: '#3C3559',
    letterSpacing: -0.03
  }

});
export default PostRow;
