import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native';

import moment from 'moment';
import { Icon } from 'react-native-elements';
import TouchableBounce from '../modifiedPackages/TouchableBounce';


const vw = Dimensions.get('window').width;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvote: (this.props.comment.voted === 'UP')? true:false,
      downvote: (this.props.comment.voted === 'DOWN')? true:false,
    }
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.del= this.del.bind(this);
  }

  upVote(){
    if (this.state.downvote) {
      this.props.comment.score += 2
    } else if (!this.state.upvote) {
      this.props.comment.score += 1
    }
    this.setState({upvote: true, downvote: false})
    this.props.voteComment(this.props.comment._id, 'UPVOTE_COMMENT');
  }


  downVote(){
    if (this.state.upvote) {
      this.props.comment.score -= 2
    } else if (!this.state.downvote) {
      this.props.comment.score -= 1
    }
    this.setState({upvote: false, downvote: true})
    this.props.voteComment(this.props.comment._id, 'DOWNVOTE_COMMENT');
  }

  del(commentId) {
    this.props.deleteComment(commentId, 'DELETE_COMMENT');
  }

  render() {
    console.log(this.props.comment);
    const comm = this.props.comment;
    const time = moment(comm.timestamp).fromNow();
    let del;
    if (comm.user == this.props.user){
      del = <Text style={{fontFamily: 'Gill Sans', color:'#DA5AA4', flex:1, fontSize: 15}} onPress={() => {
        Alert.alert(
              'Delete Comment',
              'Are you sure you want to delete your comment?',
          [
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'Delete', onPress: () => this.del(comm._id)},
          ]
            )
      }}>
      delete</Text>
    }

    return (
        <View style={this.props.comment.posterId === this.props.comment.user ? customStyles.containerOP : customStyles.container}>
          <View style={customStyles.icon}>
            <Icon reverse name={comm.icon} type='font-awesome' color={comm.color} />
          </View>
          <View style={customStyles.content}>
            <Text style={customStyles.comment}>{comm.text}</Text>
            <View style={customStyles.timestamp}>
              {del}
              <Icon type='font-awesome' name='hourglass-half' size={12} color={'#6C56BA'} margin={3} />
              <Text style={customStyles.time}> {time} </Text>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableBounce onPress={this.upVote}>
              <Icon type="ionicon" name='ios-arrow-up' size={25} color={(this.state.upvote? '#DA5AA4':'#6C56BA')}/>
            </TouchableBounce>

              <Text style={customStyles.score}>{comm.score}</Text>

            <TouchableBounce onPress={this.downVote}>
              <Icon type="ionicon" name='ios-arrow-down' size={25} color={(this.state.downvote? '#DA5AA4':'#6C56BA')}/>
            </TouchableBounce>
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
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    shadowColor: '#291D56',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  containerOP: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: 0.90 * vw,
    margin: 7,
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6C56BA',
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
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 5,
  },
  comment: {
    flex: 1,
    marginTop: 5,
    fontFamily: 'Gill Sans',
    alignSelf: 'flex-start',
    fontSize: 18,
    color: '#3C3559',
  },
  timestamp: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  time: {
    fontFamily: 'Gill Sans',
    fontSize: 14,
    color: '#2E234E',
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
