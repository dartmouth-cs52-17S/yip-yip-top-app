import React, { Component } from 'react';

import {
  View,
  Button,
  SegmentedControlIOS,
} from 'react-native';
import PostsListView from '../components/PostsListView';

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
        console.log(`changed tab to ${val}`);
        this.setState({
          selectedTab: val
        })
      }} />

    const modalButton = <Button title="Show modal" onPress={() => this.props.navigation.navigate('Settings')} />

    return (
      <View style={{flex: 1}}>
        {segmented}
        {modalButton}
        <PostsListView />
      </View>
    );
  }
}

export default Feed;
