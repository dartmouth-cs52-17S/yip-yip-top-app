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
  Dimensions,
  Alert,
  Keyboard,
} from 'react-native';

import moment from 'moment';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TouchableBounce from '../modifiedPackages/TouchableBounce';

import { Icon } from 'react-native-elements';
import { getPost, createReport, editPost } from '../api';
import Comment from './Comment';
import ErrorView from '../components/ErrorView';
import EventEmitter from 'react-native-eventemitter';

import banned from '../banned';

const vw = Dimensions.get('window').width;
const CHAR_LIMIT = 90;

class PostDetail extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Herd',
    headerRight: navigation.state.params && navigation.state.params.headerRight ? navigation.state.params.headerRight: <Icon type='font-awesome'
            name='flag'
            color='#6C56BA'
            size={25}
            style={{ marginRight: 10, padding: 5}} />,
    headerTintColor: '#6C56BA',
    headerTitleStyle: {
      fontFamily: 'Gill Sans',
      fontSize: 18
    },
    headerStyle: {
      backgroundColor: '#F4F5F9',
      shadowOpacity: 0
    },
  })

  constructor(props) {
    super(props);
    let params=this.props.navigation.state.params;

    this.state = {
      loading: true,
      empty: false,
      error: false,
      post: '',
      score: params.post.score,
      upvote: false,
      downvote: false,
      commentsLen: params.post.commentsLen,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      text:'',
    };

    this.voteComment = this.voteComment.bind(this);
    this.reportPostPressed = this.reportPostPressed.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.upvotePost = this.upvotePost.bind(this);

    this.deleteComment= this.deleteComment.bind(this);
    this.downvotePost = this.downvotePost.bind(this);
  }

  reportPostPressed() {
    // console.log('report pressed');
    const report = {
      // reporter: this.state.user,
      reporter: 'reporter',
      item: JSON.stringify(this.state.post),
      type: 'POST',
      severity: 2,
      additionalInfo: 'bad-- will come from a text box'
    }

    Alert.alert(
      'Report Post?',
      'Our team will be notified.',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'Report', onPress: () => {
          createReport(report, (callback) => {
          })
        }},
      ]
    )
  }

  componentDidMount() {
    this.fetchPost(this.props.navigation.state.params.post._id);
    this.props.navigation.setParams({
      headerRight: <Icon type='font-awesome'
        name='flag'
        color='#6C56BA'
        size={25}
        onPress={this.reportPostPressed}
        style={{ marginRight: 10, padding: 5}}
      />
    })

  }

  fetchPost(id) {
    let params=this.props.navigation.state.params;

    getPost(id, params.user, (post, error) => {
      console.log('post', post);
      if (error) {
        this.setState({error: true});
      } else {
        const comments = post.comments.map((comm) => {
          return ({
            ...comm,
            posterId: post.user,
          })
        });
        console.log(comments);
        this.setState({ post, loading: false, dataSource: this.state.dataSource.cloneWithRows(comments), score: post.score });
        if (this.state.post.voted === 'UP') {
          this.setState({upvote: true});
          // console.log(this.state);
        } else if (this.state.post.voted === 'DOWN') {
          this.setState({downvote: true});
        }
        if (comments.length === 0) {
          this.setState({empty: true});
        }
      }
    })
  }

  submitComment(input) {
    this.setState({text:''});
    Keyboard.dismiss();
    if (input){
      let safe = true;
      if (input.length < 2) {
        Alert.alert('Cannot Submit Comment', 'This comment is too short.');
        safe = false;
      }
      if (safe){
        for (var i = 0; i < banned.length; i++) {
          if (input.toLowerCase().includes(banned[i])) {
            Alert.alert('Cannot Save Comment', 'Please remove profanity from comment.');
            safe = false;
            break;
          }
        }
      }
      if (safe){
        const fields = {comment: input, user: this.props.navigation.state.params.user};
        editPost(this.props.navigation.state.params.post._id, fields, 'CREATE_COMMENT', (comment, error) => {
          this.fetchPost(this.props.navigation.state.params.post._id);
          this.setState({commentsLen:this.state.commentsLen + 1, empty: false}, () => {
            const newPost = {
              ...this.state.post,
              commentsLen: this.state.commentsLen
            }
            EventEmitter.emit('updatePost', newPost)
          });

        });
      }
    }
  }

  voteComment(commentId, action) {
    const fields = {commentId: commentId, user: this.props.navigation.state.params.user, action}
    editPost(this.props.navigation.state.params.post._id, fields, action, () => {

    });
  }

  deleteComment(commentId, action) {
    const fields = {commentId: commentId, action}
    editPost(this.props.navigation.state.params.post._id, fields, action, () => {
      this.fetchPost(this.props.navigation.state.params.post._id);
      this.setState({commentsLen:this.state.commentsLen - 1, empty: false}, () => {
        const newPost = {
          ...this.state.post,
          commentsLen: this.state.commentsLen
        }
        EventEmitter.emit('updatePost', newPost)
      });
    });
  }

  upvotePost() {
    let params=this.props.navigation.state.params;
    editPost(params.post._id, { user: params.user }, 'UPVOTE_POST', () => {
    });

    let newScore = this.state.score
    this.state.post.voted === 'DOWN' ? newScore += 2 : newScore += 1

    const newPost = {
      ...this.state.post,
      voted: 'UP',
      score: newScore
    }

    EventEmitter.emit('updatePost', newPost);

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

  downvotePost() {
    let params=this.props.navigation.state.params;
    editPost(params.post._id, { user: params.user }, 'DOWNVOTE_POST', () => {
    });

    let newScore = this.state.score
    this.state.post.voted === 'UP' ? newScore -= 2 : newScore -= 1

    const newPost = {
      ...this.state.post,
      voted: 'DOWN',
      score: newScore
    }

    EventEmitter.emit('updatePost', newPost);

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


  renderCommentCell(comment) {
    return (
      <Comment comment={comment} voteComment={(commentId, action) => this.voteComment(commentId, action)}
       deleteComment={(commentId, action) => this.deleteComment(commentId, action)} user={this.props.navigation.state.params.user}/>
    );
  }

  renderPostDetailView() {
    let post = this.state.post;
    const spacerVar = this.props.navigation.state.params.manageProfile ? 0 : -50
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
          <Text style={customStyles.score}> {this.state.score} </Text>
          <TouchableBounce onPress={this.downvotePost}>
            <Icon type="ionicon" name='ios-arrow-down' size={35} color={(this.state.downvote? '#DA5AA4':'#6C56BA')}/>
          </TouchableBounce>
        </View>
      </View>
    );

    const commentListView = (
      <View style={customStyles.commentContainer}>
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={this.renderCommentCell.bind(this)}
        style={customStyles.commentlist}
      />
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

    if (this.state.error) {
      return <ErrorView message={'Error loading post :('} />
    }

    if (!this.state.empty) {
      return (
        <View style={{flex:1, backgroundColor: '#F4F5F9'}}>
        {postDetail}
        <Text style={customStyles.commentCount}> {this.state.commentsLen} Comments </Text>
        {commentListView}
        {newComment}
        <KeyboardSpacer topSpacing={spacerVar}/>
        </View>
      );
    } else {
      return (
        <View style={{flex:1, backgroundColor: '#F4F5F9'}}>
        {postDetail}
        <ErrorView message={'No Comments'} hideAppa={true} />
        {newComment}
        <KeyboardSpacer topSpacing={spacerVar}/>
        </View>
      );
    }
  }

  render() {
    const loadingView = (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={customStyles.loading}>Loading Post...</Text>
        <Image
        source={{uri:'https://i.imgur.com/fdh8TNp.png'}}
        style={customStyles.loadImg}/>
      </View>
    );

    if (this.state.loading) {
      return (
        <View style={{flex:1, backgroundColor: '#F4F5F9'}}>
          {loadingView}
        </View>
      );
    } else {
      return (this.renderPostDetailView());
    }
  }

}

const customStyles = StyleSheet.create({
  loading: {
    fontFamily: 'Gill Sans',
    fontSize: 22,
    color: '#6C56BA',
    margin: 20,
  },
  loadImg: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    shadowColor: '#291D56',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3
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
    fontSize: 20,
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
    fontSize: 14,
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
