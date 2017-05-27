import React, { Component } from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button
} from 'react-native'


const CHAR_LIMIT = 30;

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm:'',
      remainingCharacters: CHAR_LIMIT,
      tags: [],
    };
  }

  isBackspacing(searchTerm) {
    return searchTerm.length < this.state.searchTerm.length
  }

  parseSearchTerm(searchTerm) {

    // don't allow spaces or extra tags
    if (searchTerm.slice(-1) === ' ' || (searchTerm.slice(-1) === '#' && searchTerm.length > 1)) {
      return
    }
    // don't allow user to delete tag when it's not the only character
    if (this.isBackspacing(searchTerm) && (searchTerm.charAt(0) !== '#' && searchTerm.length > 1)) {
      return
    }

    // add the tag when they start typing
    if (searchTerm.length === 1 && searchTerm !== '#') {
      this.setState({searchTerm: '#'.concat(searchTerm)});
    } else { this.setState({searchTerm}); }

    this.setState({remainingCharacters: CHAR_LIMIT - this.state.searchTerm.length - 1});
  }

  onSubmitPressed() {
    if (this.state.searchTerm && this.state.searchTerm !== '#') {
      console.log('tag to submit:', this.state.searchTerm.substring(1));
    } else {
      console.log('error in search entry');
    }
  }

  makeTrendingButtons() {
    const tags = ['#party1', '#HanlonsLawn', '#GreenKey17', '#RickAndMorty']

    return tags.map((tag) => {
      return <Button key={tag} title={tag} onPress={()=> {
        this.setState({searchTerm: tag});
      }} />
    })
  }

  render() {

    const trendingButtons = this.makeTrendingButtons();

    return (
      <View style={searchStyle.container}>
        <TextInput
          multiline={false}
          selectTextOnFocus={true}
          maxLength={CHAR_LIMIT}
          placeholder="Search by #tag"
          value={this.state.searchTerm}
          returnKeyType='search'
          onChangeText={(searchTerm) => {
            this.parseSearchTerm(searchTerm);
          }}
          onSubmitEditing={() => {this.onSubmitPressed()}}
          style={searchStyle.textBox}
          />
        <Text> {this.state.remainingCharacters} </Text>
        <Text> #Trending Tags </Text>
        {trendingButtons}
       </View>
    );
  }
}


const searchStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textBox: {
    height: 55,
    fontSize: 20,
    color: '#291D56',
    margin: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'Gill Sans',
    backgroundColor: 'white',
    borderRadius: 6,
    shadowColor: '#291D56',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3
  },

});


export default SearchScreen;
