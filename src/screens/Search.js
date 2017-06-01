import React, { Component } from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  AsyncStorage,
} from 'react-native'

import Button from 'react-native-button';

import PostsListView from '../components/PostsListView';
import { getTrendingTags } from '../api.js';


const CHAR_LIMIT = 30;
const vw = Dimensions.get('window').width;


class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm:'',
      showSearchResults: false,
      trendingTags: [],
      loadingTags: true,
      user:'',
    };
  }

  componentDidMount() {
    this.retrieveProfile((profile, err) => {
      if (profile) {
        // console.log(`in feed here is profile ${profile}`)
        this.setState({
          user: profile
          // Byrne is "sms|5929b16d961bda2fafde538e"
        });
      } else {
        // console.log(`could not get profile in componentDidMount in Feed ${err}. state.user is ${this.state.user}`);
      }
    })
    navigator.geolocation.getCurrentPosition(
      (p) => {
        this.setState({long: p.coords.longitude, lat: p.coords.latitude})
        getTrendingTags(p.coords.longitude, p.coords.latitude, (tags) => {
          this.setState({trendingTags: tags, loadingTags: false});
        })
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  async retrieveProfile(callback) {
    try {
      const savedProfile = await AsyncStorage.getItem('@Profile:key');
      if (savedProfile !== null) {
        callback(savedProfile, null)
      }
    } catch (error) {
      callback(null, error);
    }
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
      // console.log('error in search entry');
    }
  }

  makeTrendingButtons(tags) {

    return tags.map((tag) => {
      return (
        <Button key={tag}
          containerStyle={searchStyle.button}
          style={searchStyle.tags}
          onPress={()=> {
            this.setState({searchTerm: tag, showSearchResults: true})
          }}>
          {tag}
        </Button>
      )
    })
  }

  render() {

    const searchBar = (
      <TextInput
        multiline={false}
        selectTextOnFocus={false}
        maxLength={CHAR_LIMIT}
        clearButtonMode={'always'}
        placeholder="Search by #tag..."
        placeholderTextColor="#D0CCDF"
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
        <Text style={searchStyle.loading}> Still waiting for location... </Text>
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
            searchTags={this.state.searchTerm}
            navigation={this.props.navigation}
            user={this.state.user}
          />
        </View>
      );
    } else if (this.state.loadingTags) {
      return (
        <View style={searchStyle.buttonContainer}>
          {searchBar}
          <Text style={searchStyle.loading}> Loading trending tags... </Text>
        </View>
      )
    }
    else {
      const trendingButtons = this.makeTrendingButtons(this.state.trendingTags);

      return (
        <View style={searchStyle.buttonContainer}>
          {searchBar}
          <Text style={searchStyle.mainText}> #Trending Tags </Text>
          <ScrollView>
            {trendingButtons}
          </ScrollView>
        </View>
      );
    }
  }

}


const searchStyle = StyleSheet.create({
  loading: {
    fontFamily: 'Gill Sans',
    fontSize: 20,
    color: '#6C56BA',
    margin: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F4F5F9',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#F4F5F9',
  },
  textBox: {
    height: 45,
    fontSize: 20,
    color: '#291D56',
    margin: 12,
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
  mainText: {
    fontFamily: 'Gill Sans',
    color: '#DA5AA4',
    fontSize: 25,
    letterSpacing: -0.1,
    lineHeight: 20,
    padding: 35,
  },
  button: {
    padding: 5,
    margin: 5,
    width: vw*0.7,
    height: 45,
    overflow:'hidden',
  },
  tags: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
    fontWeight:'normal',
    color: '#6C56BA',
    letterSpacing: -0.03,
    margin: 5,
  },

});


export default SearchScreen;
