import React, { Component } from 'react';

import {
  Text,
  StyleSheet,
  View,
  ListView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import moment from 'moment';

import { Icon } from 'react-native-elements';
import { getPost } from '../api';
import Comment from './Comment';

const fakeComment1 = {
  text: ''
}

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
  }

  componentDidMount() {
    this.fetchPost(this.props.navigation.state.params.postId);
  }

  fetchPost(id) {
    getPost(id, (post) => {
      this.setState({ post, loading: false, dataSource: this.state.dataSource.cloneWithRows(['comment 1', 'comment 2']) });
    })
  }
  createComment(input) {

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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCommentCell.bind(this)}
      style={{flex: 1}}
      />
    );
    const newComment = (
       <TextInput
         numberOfLines={2}
         multiline={true}
         maxLength={50}
         placeholder="comment"
         placeholderTextColor="#D0CCDF"
         value={this.state.text}
         onChangeText={(text) => {
           this.setState({
             text,
             remainingCharacters: 100 - text.length
           });
         }}
         blurOnSubmit={true}
         style={customStyles.textBox}
       />
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
  textBox: {
    height: '10%',
    fontSize: 24,
    padding: 20,
    paddingTop: 20,
    lineHeight: 33,
    fontFamily: 'Gill Sans',
    color: '#3C3559',
    marginBottom: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#291D56',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3
  },

});

export default PostDetail;
