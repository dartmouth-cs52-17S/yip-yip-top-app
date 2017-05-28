import React, { Component } from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  ScrollView
} from 'react-native'

import PostsListView from '../components/PostsListView';


const CHAR_LIMIT = 30;

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm:'',
      showSearchResults: false
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (p) => {
        console.log('location search', 'lat:', p.coords.latitude, 'long:', p.coords.longitude);
        this.setState({long: p.coords.longitude, lat: p.coords.latitude})
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  isBackspacing(searchTerm) {
    return searchTerm.length < this.state.searchTerm.length
  }

  parseSearchTerm(searchTerm) {

    if (searchTerm.length < 3) {
      this.setState({showSearchResults: false});
    }

    // don't allow spaces or extra tags
    if (searchTerm.slice(-1) === ' ' || (searchTerm.slice(-1) === '#' && searchTerm.length > 1)) {
      return
    }
    // don't allow user to delete tag when it's not the only character
    if (this.isBackspacing(searchTerm) && (searchTerm.charAt(0) !== '#' && searchTerm.length > 1)) {
      return
    }

    // add the tag when they start typing
    else if (searchTerm.length === 1 && searchTerm !== '#') {
      this.setState({searchTerm: '#'.concat(searchTerm)});
    }

    else {
      this.setState({searchTerm});
    }

  }

  onSubmitPressed() {
    if (this.state.searchTerm && this.state.searchTerm !== '#') {
      this.setState({showSearchResults: true});
      if (this.child) {
        this.child.triggerRefresh();
      }
    } else {
      console.log('error in search entry');
    }
  }

  makeTrendingButtons() {

    //TODO: Get trending tags from api
    const tags = ['#party1', '#HanlonsLawn', '#GreenKey17', '#RickAndMorty']

    return tags.map((tag) => {
      return <Button key={tag} title={tag} onPress={()=> {
        this.setState({searchTerm: tag, showSearchResults: true});
      }} />
    })
  }

  render() {

    const trendingButtons = this.makeTrendingButtons();

    const searchBar = (
      <TextInput
        multiline={false}
        selectTextOnFocus={false}
        maxLength={CHAR_LIMIT}
        clearButtonMode={'while-editing'}
        placeholder="Search by #tag"
        value={this.state.searchTerm}
        returnKeyType='search'
        onChangeText={(searchTerm) => {
          this.parseSearchTerm(searchTerm);
        }}
        onSubmitEditing={() => {this.onSubmitPressed()}}
        style={searchStyle.textBox}
        />
    )

    if (this.state.showSearchResults && (!this.state.lat || !this.state.long)) {
      return (
        <Text> Still waiting for location </Text>
      );
    }

    if (this.state.showSearchResults) {
      return (
        <View style={searchStyle.listContainer}>
          {searchBar}
          <PostsListView
            ref={instance => {this.child = instance; }}
            lat={this.state.lat}
            long={this.state.long}
            searchTags={this.state.searchTerm.substring(1)}
          />
        </View>
      );
    } else {
      return (
        <View style={searchStyle.buttonContainer}>
          {searchBar}
          <Text> #Trending Tags </Text>
          <ScrollView>
            {trendingButtons}
          </ScrollView>
        </View>
      );
    }
  }

}


const searchStyle = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
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
