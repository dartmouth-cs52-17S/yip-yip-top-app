import React, { Component } from 'react';

import {
  View,
  Button,
  SegmentedControlIOS
} from 'react-native';
// import styles from '../styles';

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
    return (
      <View>
        <SegmentedControlIOS
          values={['New', 'Top', 'Comments']}
          selectedIndex={0}
          tintColor={'#D6573D'}
          onValueChange={(val) => {
            console.log(`changed tab to ${val}`);
            this.setState({
              selectedTab: val
            })
          }} />
        <Button title="Show modal" onPress={() => this.props.navigation.navigate('Settings')} />
      </View>
    );
  }
}

export default Feed;
