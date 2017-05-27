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

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
      long: '',
      lat: '',
      user: '',
    }
  }

  async retreiveProfile(callback) {
    try {
      const savedProfile = await AsyncStorage.getItem('@Profile:key');
      if (savedProfile !== null) {
        callback(savedProfile, null)
      }
    } catch (error) {
      callback(null, error);
    }
  }

  componentDidMount() {
    this.retreiveProfile((profile, err) => {
      if (profile) {
        // make an actual to JSON call
        const id = { profile };
        console.log(`in feed here is profile ${id.extraInfo.userId}`)
        this.setState({
          user: id.extraInfo.userId
          // Byrne is "sms|5929b16d961bda2fafde538e"
        });
      }
    })
    navigator.geolocation.getCurrentPosition(
      (p) => {
        console.log('location feed', p.coords.latitude, p.coords.longitude);
        this.setState({long: p.coords.longitude, lat: p.coords.latitude})
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render() {

    const segmented = <SegmentedControlIOS
      values={['New', 'Top', 'Comments']}
      selectedIndex={0}
      margin={10}
      tintColor={'#6C56BA'}
      onValueChange={(val) => {
        this.setState({
          selectedTab: val
        })
      }} />

    // const modalButton = <Button title="Show modal" onPress={() => this.props.navigation.navigate('Settings')} />

    const actionButton = <ActionButton
      buttonColor='#6C56BA'
      onPress={() => { this.props.navigation.navigate('NewPost', { long: this.state.long, lat: this.state.lat, user: this.state.user })}}
      icon={<Icon type='ionicon' name='ios-add-outline' size={45} color={'white'}/>}
      hideShadow={false}
      size={65}
    />

    return (
      <View style={{flex: 1, backgroundColor: '#F4F5F9',}}>
        {segmented}
        <PostsListView
          long={this.state.long}
          lat={this.state.lat}
        />
        {actionButton}
      </View>
    );
  }
}

export default Feed;
