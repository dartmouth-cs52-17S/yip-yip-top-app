import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import { Button } from 'react-native-elements'
import PostsListView from '../components/PostsListView';


class HerdScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      herdSet: false,
      lat: 0,
      long: 0,
    };

  }

  componentWillMount() {
    this.retreiveLocation((lat,long, err) => {
      if (lat && long) {
        this.setState({
          herdSet: true,
          lat,
          long
        });
      }
    })
  }

  setHerdPressed() {
    navigator.geolocation.getCurrentPosition(
      (p) => {
        this.saveLocation(p.coords.latitude, p.coords.longitude, (lat, long, err) => {
          if (err) {
            console.log('Could not save location');
          } else {
            console.log('Saved location!');
            this.setState({
              herdSet: true,
              lat,
              long
            })
          }
        });
      }
    )
  }

  async retreiveLocation(callback) {
    try {
      const savedLat = await AsyncStorage.getItem('@HerdLong:key');
      const savedLong = await AsyncStorage.getItem('@HerdLat:key');
      if (savedLat !== null && savedLong !== null) {
        callback(savedLat, savedLong, null)
      }
    } catch (error) {
      callback(null, null, error);
    }
  }

  async saveLocation(lat,long, callback) {
    try {
      await AsyncStorage.setItem('@HerdLat:key', lat.toString());
      await AsyncStorage.setItem('@HerdLong:key', long.toString());
      callback(lat, long, null)
    } catch (error) {
      console.log('Count not save key');
      callback(error);
    }
  }


  clearStoragePressed() {

    console.log('About to clear storage');
    this.clearStorage((err) => {
      if (!err) {
        console.log('setting to false');
        this.setState({ herdSet: false});
      } else {
        console.log(err);
      }
    })
  }

  async clearStorage(callback) {
    try {
      await AsyncStorage.clear();
      callback(null);
    } catch (error) {
      callback(error);
    }
  }

  render() {

    const herdNotSavedView = (
      <View style={styles.container}>
        <Text> You have not set your Herd yet! </Text>
        <Button
          raised
          icon={{name: 'map'}}
          borderRadius={50}
          title='Save this location!'
          backgroundColor='red'
          buttonStyle={styles.button}
          containerViewStyle={{backgroundColor: 'transparent'}}
          onPress={() => this.setHerdPressed()}
           />
      </View>
    )

    const herdSavedView = (
      <View style={styles.container}>
        <Text> You have saved your Herd! </Text>
        <Text> Lat {this.state.lat} </Text>
        <Text> Long {this.state.long} </Text>
        <Button title='clear' onPress={() => this.clearStoragePressed()} />
      </View>
    )

    const herdListView = (
      <View style={styles.container}>
        <PostsListView
          long={this.state.lat}
          lat={this.state.long}/>
      </View>
    )

    if (this.state.herdSet) {
      console.log('render herd list');
      return herdListView;
    } else {
      console.log('render save herd button');
      return herdNotSavedView;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F9',
  },
  button: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 50,
    backgroundColor: '#6C56BA',
  }
});

export default HerdScreen;
