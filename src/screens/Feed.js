import React, { Component } from 'react';

import {
  View,
  Button,
  SegmentedControlIOS,
} from 'react-native';

import PostsListView from '../components/PostsListView';
import ActionButton from 'react-native-action-button';

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
    }
  }

  showModal() {
    this.props.navigation.navigate('Settings')
  }

  render() {

    const segmented = <SegmentedControlIOS
      values={['New', 'Top', 'Comments']}
      selectedIndex={0}
      tintColor={'#D6573D'}
      onValueChange={(val) => {
        this.setState({
          selectedTab: val
        })
      }} />

    const modalButton = <Button title="Show modal" onPress={() => this.props.navigation.navigate('Settings')} />

    const actionButton = <ActionButton
      buttonColor='#FF906F'
      onPress={() => { this.props.navigation.navigate('NewPost')}}          hideShadow={false}
      size={50}
    />

    return (
      <View style={{flex: 1}}>
        {segmented}
        {modalButton}
        <PostsListView />
        {actionButton}
      </View>
    );
  }
}

export default Feed;
