import React, { Component } from 'react';

/* eslint-disable no-unused-vars */

import {
  Text,
  Image,
  StyleSheet,
  View,
  ListView,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';

import moment from 'moment';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TouchableBounce from '../modifiedPackages/TouchableBounce';


// import { saveReport } from '../api-sheets';

import { Icon } from 'react-native-elements';
import { getPost, createReport, editPost } from '../api';
import Comment from './Comment';

const vw = Dimensions.get('window').width;
const CHAR_LIMIT = 75;

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      post: '',
      upvote: false,
      downvote: false,
      commentsLen: this.props.navigation.state.params.post.comments.length,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      text:'',
    };
    this.voteComment = this.voteComment.bind(this);
    this.reportPostPressed = this.reportPostPressed.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.upvotePost = this.upvotePost.bind(this);
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
    this.fetchPost(this.props.navigation.state.params.post.id);
  }

  fetchPost(id) {
    getPost(id, (post) => {
      const comments = post.comments;
      console.log('setting post');
      this.setState({ post, loading: false, dataSource: this.state.dataSource.cloneWithRows(comments) });
    })
  }

  submitComment(input) {
    console.log(input)
    if (input){
      const fields = {comment: input, user_id: this.props.navigation.state.params.user};
      editPost(this.props.navigation.state.params.post.id, fields, 'CREATE_COMMENT', (comment) => {
        this.setState({text:''});
        this.setState({commentsLen:this.state.commentsLen + 1});
        this.fetchPost(this.props.navigation.state.params.post.id);
      });
    }
  }
  voteComment(commentId, action) {
    const fields = {commentId: commentId, userId: this.props.navigation.state.params.user, action}
    editPost(this.props.navigation.state.params.post.id, fields, action, () => {
      console.log(action);
      console.log('success');
    });
  }

  upvotePost() {
    console.log('in upvote');
  }

  renderCommentCell(comment) {
    // console.log(comment);
    return (
      <Comment comment={comment} voteComment={(commentId, action) => this.voteComment(commentId, action)} />
    );
  }

  renderPostDetailView(loaded) {
    let post = this.props.navigation.state.params.post;
    const postDetail = (
      <View style={customStyles.postDetail}>
        <View style={customStyles.content}>
          <Text style={customStyles.mainText}>{post.text}</Text>
          <Text style={customStyles.tags}>
            {post.tags.join(' ') /* array.join for space in between tags */ }
          </Text>
          <View style={customStyles.info}>
            <View style={customStyles.infoDetail}>
              <Icon type='font-awesome' name='hourglass-half' size={15} color={'#6C56BA'} margin={3} />
              <Text style={customStyles.infoText}>{moment(post.timestamp).fromNow()}</Text>
            </View>
            {/* <Text style={{ color: '#de1224' }} onPress={() => this.reportPostPressed()}> Report </Text> */}
          </View>
        </View>
        <View style={customStyles.vote}>
          <TouchableBounce onPress={this.upvotePost}>
            <Icon type="ionicon" name='ios-arrow-up' size={35} color={(this.state.upvote? '#DA5AA4':'#6C56BA')} />
          </TouchableBounce>
          <Text style={customStyles.score}> {post.score} </Text>
          <TouchableBounce onPress={() => {this.downvotePost}}>
            <Icon type="ionicon" name='ios-arrow-down' size={35} color={(this.state.downvote? '#DA5AA4':'#6C56BA')}/>
          </TouchableBounce>
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

    const loadingView = (
      <View style={{flex: 4, alignItems: 'center', justifyContent: 'space-around'}}>
        <Text style={customStyles.loading}>Loading Comments...</Text>
        <Image
        source={{uri:'https://vignette3.wikia.nocookie.net/camphalfbloodroleplay/images/8/89/Tumblr_mpgoldBy461ri41kbo1_500.png'}}
        style={{width: '30%', height: '30%', resizeMode: 'contain'}}/>
      </View>
    );

    const newComment = (
      <View style={customStyles.newComment}>
        <TextInput
          placeholder="Add a comment..."
          maxLength={CHAR_LIMIT}
          placeholderTextColor="#D0CCDF"
          multiline={false}
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}
          style={customStyles.textBox}/>
        <TouchableHighlight>
          <Text onPress={() => {this.submitComment(this.state.text)}}
            style={customStyles.postButton}> POST </Text>
        </TouchableHighlight>
      </View>
    );

    if(loaded) {
      return (
        <View style={{flex:1, backgroundColor: '#F4F5F9'}}>
          {postDetail}
          <Text style={customStyles.commentCount}> {this.state.commentsLen} Comments </Text>
          {commentListView}
          {newComment}
          <KeyboardSpacer topSpacing={-50}/>
        </View>
      );
    } else {
      return (
        <View style={{flex:1, backgroundColor: '#F4F5F9'}}>
          {postDetail}
          <Text style={customStyles.commentCount}> {this.state.commentsLen} Comments </Text>
          {loadingView}
          {newComment}
          <KeyboardSpacer topSpacing={-50}/>
        </View>
      );
    }

  }

  render() {
    if (this.state.loading) {
      return (this.renderPostDetailView(false));
    } else {
      console.log(`user in post detail is ${this.props.navigation.state.params.user}`);
      return (this.renderPostDetailView(true));
    }
  }

}

const customStyles = StyleSheet.create({
  loading: {
    fontFamily: 'Gill Sans',
    fontSize: 20,
    color: '#6C56BA',
    margin: 20,
  },

  postDetail: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: 0.9 * vw,
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
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
  },
  mainText: {
    color: '#3C3559',
    fontFamily: 'Gill Sans',
    fontSize: 18,
    letterSpacing: -0.1,
    lineHeight: 20,
    paddingLeft: 5,
    paddingTop: 3,
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
    justifyContent: 'flex-end'
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

  commentContainer: {
    flex: 4,
  },
  commentCount: {
    marginTop: 20,
    marginLeft: 0.05 * vw,
    marginBottom: 5,
    fontSize: 16,
    fontFamily: 'Gill Sans',
    color: '#5C479D',
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
  },

  newComment: {
    display: 'flex',
    flexDirection: 'row',
  },
  textBox: {
    height: 45,
    paddingLeft: 0.07 * vw,
    paddingRight: 5,
    width: vw-100,
    fontSize: 16,
    fontFamily: 'Gill Sans',
    color: '#3C3559',
    backgroundColor: 'white',
    shadowColor: '#291D56',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  postButton: {
    backgroundColor:'#5C479D',
    height: 45,
    width: 100,
    fontFamily: 'Gill Sans',
    color: 'white',
    fontSize: 16,
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14
  }
});

export default PostDetail;
