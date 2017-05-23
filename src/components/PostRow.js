import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native' ;

import { Icon } from 'react-native-elements';


class PostRow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      score: this.props.post.score,
    }

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  // TODO: Link with API
  upVote() {
    console.log('up pressed');
    this.setState({score: this.state.score + 1});
  }

  downVote() {
    // console.log('down pressed');
    this.setState({score: this.state.score - 1});
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor = '#c8c7cc'
        backgroundColor = 'F4F5F9'
        onPress={(rowData) => {
          console.log(rowData);
        }}
      >
        <View style={customStyles.main}>
          <View style={customStyles.content}>
            <Text style={customStyles.mainText}>{this.props.post.text}</Text>
            <Text style={customStyles.tags}>
              {this.props.post.tags.join(' ') /* array.join for space in between tags */ }
            </Text>
            <View style={customStyles.info}>
              <View style={customStyles.infoDetail}>
                <Icon type='ionicon' name='ios-clock-outline' size={20} color={'#6C56BA'} margin={3} />
                <Text>{this.props.post.location.city || 'n/a'}</Text>
              </View>
              <View style={customStyles.infoDetail}>
                <Icon type='ionicon' name='ios-clock-outline' size={20} color={'#6C56BA'} margin={3} />
                <Text>{this.props.post.timestamp}</Text>
              </View>
            </View>
          </View>
          <View style={customStyles.vote}>
            <Icon type="ionicon" name='ios-arrow-up' size={35} color={'#6C56BA'} onPress={this.upVote}/>
            <Text style={customStyles.score}> {this.state.score} </Text>
            <Icon type="ionicon" name='ios-arrow-down' size={35} color={'#6C56BA'} onPress={this.downVote}/>
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
    // TODO: Make the height responsive to the content in case of overflow
    height: 100,
    width: 350,
    margin: 10,
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
    lineHeight: 30
  },
  tags: {
    fontSize: 12,
    color: '#DA5AA4',
    letterSpacing: -0.03,
    margin: 5,
    marginLeft: 0
  },

  vote: {
    flex: 1,
    alignItems: 'center'
  },
  score: {
    fontSize: 18,
    color: '#3C3559',
    letterSpacing: -0.03
  }

});
export default PostRow;
