import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Root, AuthRoot } from '../src/router';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: <Root />,
      kind: 'Root',
    }
    // this.retrieveProfile = this.retrieveProfile.bind(this);
  }

  async retrieveProfile() {
    try {
      let savedProfile = await AsyncStorage.getItem('@Profile:key');
      if (savedProfile === null) {
        // savedProfile = JSON.parse(savedProfile);
        // console.log(`profile exists in storage ${JSON.stringify(savedProfile.userId)}`);
        // console.log(`profile exists in storage ${savedProfile.extraInfo.phone_number}`);
        this.setState( { view: <AuthRoot />, kind: 'AuthRoot' } );
      } else {
        this.setState( { view: <AuthRoot />, kind: 'Root' } );
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  componentWillMount() {
    this.retrieveProfile();
  }

  render() {
    if (this.state.kind === 'Root') {
      // console.log('Root');
      return <Root />
    } else {
      // console.log('AuthRoot');
      return <AuthRoot />
    }
    // return this.state.view;
    // return <Root />;
  }
}

export default App;
