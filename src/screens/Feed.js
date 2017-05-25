import React, { Component } from 'react';

import {
  View,
  // Button,
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
      margin={10}
      tintColor={'#6C56BA'}
      onValueChange={(val) => {
        this.setState({
          selectedTab: val
        })
      }} />

    // const modalButton = <Button title="Show modal" onPress={() => this.props.navigation.navigate('Settings')} />

    return (
      <View style={{flex: 1, backgroundColor: '#F4F5F9',}}>
        {segmented}
        <PostsListView navigation={this.props.navigation}/>
      </View>
    );
  }
}

export default Feed;
