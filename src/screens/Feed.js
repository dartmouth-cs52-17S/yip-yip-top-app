import React, { Component } from 'react';

import {
  View,
  // Button,
  SegmentedControlIOS,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import PostsListView from '../components/PostsListView';

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'new',
      long: '',
      lat: '',
      sortBy: 'New',
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (p) => {
        console.log('location feed', 'lat:', p.coords.latitude, 'long:', p.coords.longitude);
        this.setState({long: p.coords.longitude, lat: p.coords.latitude})
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  updateSortParam(segmentedVal) {

    this.setState({sortBy: segmentedVal}, () => {
      if (this.child) {
        console.log('feed sort by', this.state.sortBy);
        this.child.triggerRefresh();
      }
    });

  }

  render() {

    const segmented = <SegmentedControlIOS
      values={['New', 'Top', 'Comments']}
      selectedIndex={0}
      margin={10}
      tintColor={'#6C56BA'}
      onValueChange={(val) => {
        this.updateSortParam(val);
      }} />

    // const modalButton = <Button title="Show modal" onPress={() => this.props.navigation.navigate('Settings')} />

    const actionButton = <ActionButton
      buttonColor='#6C56BA'
      onPress={() => { this.props.navigation.navigate('NewPost', { long: this.state.long, lat: this.state.lat })}}
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
          sortBy={this.state.sortBy}
          ref={instance => {this.child = instance}}
        />
        {actionButton}
      </View>
    );
  }
}



export default Feed;
