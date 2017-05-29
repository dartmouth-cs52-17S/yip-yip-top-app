import React, { Component } from 'react';

/* eslint-disable no-unused-vars */

import {
  Text,
  StyleSheet,
  View,
  ListView,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';

import moment from 'moment';

// import { saveReport } from '../api-sheets';

import { Icon } from 'react-native-elements';
import { getPost, createReport } from '../api';
import Comment from './Comment';

const fakeComment1 = {
  text: 'comment 1',
  score: 5,
  time: '1 min ago'
}

const fakeComment2 = {
  text: 'comment 2',
  score: 4,
  time: '5 mins ago'
}
const fakeComment3 = {
  text: 'comment 3',
  score: 6,
  time: '5 mins ago'
}
const fakeComment4 = {
  text: 'comment 4',
  score: 6,
  time: '5 mins ago'
}
const CHAR_LIMIT = 50;
class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      post: '',
      upvote: false,
      downvote: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      text:'',
    };
    this.reportPostPressed = this.reportPostPressed.bind(this);
  }

  reportPostPressed() {
    const report = {
      // reporter: this.state.user,
      reporter: 'reporter',
      item: JSON.stringify(this.state.post),
      type: 'POST',
      severity: 2,
      additionalInfo: 'bad-- will come from a text box'
    }

    // put into a modal add a severity dropdown and a comment box (for 'additionalInfo')
    createReport(report, (callback) => {
      console.log(`callback from create report: ${JSON.stringify(callback)}`);
      // this.props.navigation.goBack(null);
    })
  }

  // should be in Comment.js
  // reportCommentPressed() {
  //   const report = {
  //     reporter: 'reporter',
  //     item: 'this.state.comment',
  //     type: 'COMMENT',
  //     severity: 2,
  //     additionalInfo: 'bad'
  //   }
  //   createReport(report, (callback) => {
  //     console.log(`callback from create: ${JSON.stringify(callback)}`);
  //     this.props.navigation.goBack(null);
  //   })
  // }

  componentDidMount() {
    this.fetchPost(this.props.navigation.state.params.postId);
  }

  fetchPost(id) {
    getPost(id, (post) => {
      this.setState({ post, loading: false, dataSource: this.state.dataSource.cloneWithRows([fakeComment1, fakeComment2, fakeComment3, fakeComment4]) });
    })
  }
  submitCommentPressed(input) {
    console.log(input);
    console.log('creating a comment component');
  }
  renderCommentCell(comment) {
    console.log(comment);
    return (
      <Comment comment={comment} />
    );
  }

  renderPostDetailView(post) {

    const postDetail = (
      <View style={customStyles.main}>
        <View style={customStyles.content}>
          <Text style={customStyles.mainText}>{post.text}</Text>
          <Text style={customStyles.tags}>
            {post.tags.join(' ') /* array.join for space in between tags */ }
          </Text>
          <View style={customStyles.info}>
            <View style={customStyles.infoDetail}>
              <Icon type='font-awesome' name='commenting-o' size={18} color={'#6C56BA'} margin={3} />
              <Text>{post.commentsLen}</Text>
            </View>
            <View style={customStyles.infoDetail}>
              <Icon type='font-awesome' name='hourglass-half' size={15} color={'#6C56BA'} margin={3} />
              <Text>{moment(post.timestamp).fromNow()}</Text>
            </View>
            <View>
              <Text style={{ color: '#de1224' }} onPress={() => this.reportPostPressed()}>report</Text>
            </View>
          </View>
        </View>
        <View style={customStyles.vote}>
          <Icon type="ionicon" name='ios-arrow-up' size={35} color={(this.state.upvote? '#DA5AA4':'#6C56BA')} />
          <Text style={customStyles.score}> {post.score} </Text>
          <Icon type="ionicon" name='ios-arrow-down' size={35} color={(this.state.downvote? '#DA5AA4':'#6C56BA')} onPress={this.downVote}/>
        </View>
      </View>
    );

    const commentListView = (
      <View style={customStyles.commentContainer}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCommentCell.bind(this)}
        style={customStyles.commentlist}
      />
      </View>
    );
    const newComment = (
      <View style={{display: 'flex', flexDirection: 'row', position:'absolute', height: 45, marginTop: 510}}>
              <TextInput
                placeholder="comment"
                placeholderTextColor="#D0CCDF"
                multiline={true}
                style={customStyles.textBox}/>
              <View>
              <Text style={{backgroundColor:'purple', height:45, width: 80, color: 'white', fontSize: 20, textAlign:'center', padding:10}}>Post</Text>
              </View>
      </View>

    );
    return (
        <View style={{flex:1}}>
            {postDetail}
            {commentListView}
            {newComment}
        </View>
    )
  }

  render() {
    if (this.state.loading) {
      return (<Text> {this.props.navigation.state.params.postId} </Text>);
    } else {
      return this.renderPostDetailView(this.state.post);
    }
  }

}

const customStyles = StyleSheet.create({
  main: {
    flex: 2,
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
    shadowRadius: 3,
  },

  content: {
    flex: 2,
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
    color: '#3C3559',
    fontSize: 15,
    letterSpacing: -0.1,
    lineHeight: 20,
    paddingLeft: 5
  },
  tags: {
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
    fontSize: 18,
    color: '#3C3559',
    letterSpacing: -0.03
  },
  commentContainer: {
    flex:4,
  },
  textBox: {
    height: '100%',
    width:'80%',
    fontSize: 24,
    fontFamily: 'Gill Sans',
    color: '#3C3559',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#291D56',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3
  },

});

export default PostDetail;
