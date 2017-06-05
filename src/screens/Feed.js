import React, { Component } from 'react';

import {
  View,
  // Button,
  SegmentedControlIOS,
  AsyncStorage,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import PostsListView from '../components/PostsListView';
import EventEmitter from 'react-native-eventemitter';

class Feed extends Component {


  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Herd',
    headerRight: navigation.state.params && navigation.state.params.headerRight ? navigation.state.params.headerRight: '',
  })


  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'new',
      long: '',
      lat: '',
      user: '',
      sortBy: 'New'
    }
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

  componentWillMount() {
    EventEmitter.on('refreshListView', () => {
      // this.setState({ refreshListView: true });
      if (this.child) {
        this.child.triggerRefresh();
      }
    })

    EventEmitter.on('updatePost', (post) => {
      console.log('update feed list view');
      if (this.child) {
        this.child.updatePost(post);
      }
    })

    this.props.navigation.setParams({
      headerRight:
        <Icon type='font-awesome'
          name='user-circle-o'
          color='#6C56BA'
          size={25}
          onPress={()=>{ this.props.navigation.navigate('Settings', { userId: this.state.user}) }}
          style={{ marginRight: 10, padding: 5}}
        />
    })
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
        // console.log('location feed', 'lat:', p.coords.latitude, 'long:', p.coords.longitude);
        this.setState({long: p.coords.longitude, lat: p.coords.latitude})
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  updateSortParam(segmentedVal) {

    this.setState({sortBy: segmentedVal}, () => {
      if (this.child) {
        this.child.triggerRefresh(true);
      }
    });

  }

  render() {

    const segmented = <SegmentedControlIOS
      values={['New', 'Top', 'Comments']}
      selectedIndex={0}
      margin={12}
      tintColor={'#6C56BA'}
      onValueChange={(val) => {
        this.updateSortParam(val);
      }} />

    // const modalButton = <Button title="Show modal" onPress={() => this.props.navigation.navigate('Settings')} />

    const actionButton = <ActionButton
      buttonColor='#6C56BA'
      onPress={() => { this.props.navigation.navigate('NewPost', { long: this.state.long, lat: this.state.lat, user: this.state.user })}}
      icon={<Icon type='font-awesome' name='plus' size={30} color={'white'}/>}
      hideShadow={false}
      size={60}
    />

    return (
      <View style={{flex: 1, backgroundColor: '#F4F5F9',}}>
        {segmented}
        <PostsListView
          long={this.state.long}
          lat={this.state.lat}
          user={this.state.user}
          sortBy={this.state.sortBy}
          ref={instance => {this.child = instance}}
          navigation={this.props.navigation}
        />
        {actionButton}
      </View>
    );
  }
}



export default Feed;
