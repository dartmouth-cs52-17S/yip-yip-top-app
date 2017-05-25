import React, { Component } from 'react';

import {
  View,
  // Button,
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

  // componentDidMount() {
  //   console.log(JSON.stringify(this.props.navigation));
  //   const currentRoute = this.props.navigation.state.routeName;
  //   console.log(`current route is ${currentRoute}`)
  //   this.props.navigation.addListener('didfocus', (event) => {
  //       //didfocus emit in componentDidMount
  //     if (currentRoute === event.data.route) {
  //       console.log('feed appeared');
  //     } else {
  //       console.log('feed disappeared');
  //     }
  //     console.log(event.data.route);
  //   });
  // }


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
      buttonColor='#FF906F'
      onPress={() => { this.props.navigation.navigate('NewPost')}}          hideShadow={false}
      size={50}
    />

    return (
      <View style={{flex: 1, backgroundColor: '#F4F5F9',}}>
        {segmented}
        <PostsListView />
        {actionButton}
      </View>
    );
  }
}

export default Feed;
