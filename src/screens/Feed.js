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
      buttonColor='#6C56BA'
      onPress={() => { this.props.navigation.navigate('NewPost')}}
      icon={<Icon type='ionicon' name='ios-add-outline' size={45} color={'white'}/>}
      hideShadow={false}
      size={65}
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
