import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native' ;

import moment from 'moment';
import TouchableBounce from '../modifiedPackages/TouchableBounce';
import { Icon } from 'react-native-elements';
import { editPost } from '../api'

class PostRow extends Component {

  constructor(props) {
    super(props);

    if (this.props.post.upvoters.includes(this.props.user)) {
      this.state = {
        score: this.props.post.score,
        upvote: true,
        downvote: false
      }
    } else if (this.props.post.downvoters.includes(this.props.user)) {
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
    editPost(this.props.post._id, { user_id: this.props.user }, 'UPVOTE_POST', () => {
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
    editPost(this.props.post._id, { user_id: this.props.user }, 'DOWNVOTE_POST', () => {
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
    if (timeSince[0] === 'an') {
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
    let del = null;
    if (this.props.manageProfile) {
      del = <Text style={{fontFamily: 'Gill Sans', color:'pink', flex:1, fontSize: 15}}>delete</Text>
    }
    return (
      <TouchableHighlight underlayColor = '#D0CCDF' backgroundColor = 'F4F5F9'
        onPress={() => {
          console.log('user', this.props.user);
          this.props.navigation.navigate('PostDetail', {post: this.props.post, user: this.props.user});
        }}>
        <View style={customStyles.main}>
          <View style={customStyles.content}>
            <Text style={customStyles.mainText}>{this.props.post.text}</Text>
            <Text style={customStyles.tags}>
              {this.props.post.tags.join(' ') /* array.join for space in between tags */ }
            </Text>
            <View style={customStyles.info}>
              <View style={customStyles.infoDetail}>
                <Icon type='font-awesome' name='commenting-o' size={18} color={'#6C56BA'} margin={3} />
                <Text style={customStyles.infoText}>{this.props.post.comments.length} comments</Text>
              </View>
              <View>
                {del}
              </View>
              <View style={customStyles.infoDetail}>
                <Icon type='font-awesome' name='hourglass-half' size={15} color={'#6C56BA'} margin={3} />
                <Text style={customStyles.infoText}>{time}</Text>
              </View>
            </View>
          </View>
          <View style={customStyles.vote}>
            <TouchableBounce onPress={this.upVote}>
              <Icon type="ionicon" name='ios-arrow-up' size={35} color={(this.state.upvote? '#DA5AA4':'#6C56BA')}/>
            </TouchableBounce>

            <Text style={customStyles.score}> {this.state.score} </Text>
            <TouchableBounce onPress={this.downVote}>
              <Icon type="ionicon" name='ios-arrow-down' size={35} color={(this.state.downvote? '#DA5AA4':'#6C56BA')}/>
            </TouchableBounce>
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
    width: '90%',
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
  mainText: {
    fontFamily: 'Gill Sans',
    color: '#3C3559',
    fontSize: 17,
    letterSpacing: -0.1,
    lineHeight: 20,
    paddingLeft: 5
  },
  tags: {
    fontSize: 12,
    fontFamily: 'Gill Sans',
    color: '#DA5AA4',
    letterSpacing: -0.03,
    margin: 5,
    marginTop: 10
  },

  info: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoText: {
    fontFamily: 'Gill Sans',
    fontSize: 12,
    color: '#3C3559',
  },

  vote: {
    flex: 1,
    alignItems: 'center'
  },
  score: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    color: '#3C3559',
    letterSpacing: -0.03
  }

});
export default PostRow;
