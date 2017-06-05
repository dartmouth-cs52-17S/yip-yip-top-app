import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Alert
} from 'react-native' ;

import moment from 'moment';
import TouchableBounce from '../modifiedPackages/TouchableBounce';
import { Icon } from 'react-native-elements';
import { editPost, deletePost } from '../api';
import EventEmitter from 'react-native-eventemitter';

class PostRow extends Component {

  constructor(props) {
    super(props);

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.del = this.del.bind(this);
  }


  upVote() {
    // console.log(this.props.post._id, this.props.user);
    if (this.props.post.voted === 'UP') { return }

    editPost(this.props.post._id, { user: this.props.user }, 'UPVOTE_POST', () => {
    });

    let newScore = this.props.post.score
    this.props.post.voted === 'DOWN' ? newScore += 2 : newScore += 1

    const newPost = {
      ...this.props.post,
      voted: 'UP',
      score: newScore,
    };

    EventEmitter.emit('updatePost', newPost);
  }

  downVote() {
    if (this.props.post.voted === 'DOWN') { return }

    editPost(this.props.post._id, { user: this.props.user }, 'DOWNVOTE_POST', () => {
    });

    let newScore = this.props.post.score
    this.props.post.voted === 'UP' ? newScore -= 2 : newScore -= 1

    const newPost = {
      ...this.props.post,
      voted: 'DOWN',
      score: newScore,
    };

    EventEmitter.emit('updatePost', newPost);

  }

  del() {
    deletePost(this.props.post._id, () => {
      this.props.refresh();
      EventEmitter.emit('refreshListView');
    });
  }

  render() {
    const time = moment(this.props.post.timestamp).fromNow();
    let del;
    if (this.props.manageProfile) {
      del = <Text style={{fontFamily: 'Gill Sans', color:'#DA5AA4', flex:1, fontSize: 15, marginTop:5}} onPress={() => {
        Alert.alert(
                'Delete Post',
                'Are you sure you want to delete your post?',
          [
                  {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                  {text: 'Delete', onPress: () => this.del()},
          ]
              )
      }}>delete </Text>
    }

    return (
      <TouchableHighlight underlayColor = '#D0CCDF' backgroundColor = 'F4F5F9'
        onPress={() => {
          // console.log('user', this.props.user);
          this.props.navigation.navigate('PostDetail', {post: this.props.post, user: this.props.user, manageProfile: this.props.manageProfile});
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
                <Text style={customStyles.infoText}>{this.props.post.commentsLen} comments</Text>
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
              <Icon type="ionicon" name='ios-arrow-up' size={40} color={(this.props.post.voted === 'UP'? '#DA5AA4':'#6C56BA')}/>
            </TouchableBounce>

            <Text style={customStyles.score}> {this.props.post.score} </Text>
            <TouchableBounce onPress={this.downVote}>
              <Icon type="ionicon" name='ios-arrow-down' size={40} color={(this.props.post.voted === 'DOWN'? '#DA5AA4':'#6C56BA')}/>
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
    margin: 12,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    shadowColor: '#291D56',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    backgroundColor: '#FFF',
    paddingBottom: 5
  },

  content: {
    paddingTop: 5,
    paddingLeft: 5,
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 5,
    height: '100%',
  },
  mainText: {
    paddingTop: 10,
    fontFamily: 'Gill Sans',
    color: '#3C3559',
    fontSize: 18,
    letterSpacing: -0.1,
    lineHeight: 20,
    paddingLeft: 5
  },
  tags: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    color: '#DA5AA4',
    letterSpacing: -0.03,
    margin: 5,
  },

  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoText: {
    fontFamily: 'Gill Sans',
    fontSize: 14,
    color: '#3C3559',
  },

  vote: {
    flex: 1,
    alignItems: 'center'
  },
  score: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
    color: '#3C3559',
    letterSpacing: -0.03
  }

});
export default PostRow;
