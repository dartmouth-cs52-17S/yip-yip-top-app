import React from 'react';

/* eslint-disable */

import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import Feed from './screens/Feed';
import DummyComponent from './screens/dummy';
import Settings from './screens/settings';
import Tutorial from './screens/tutorial';
import PostDetail from './screens/PostDetail';
import NewPostScreen from './screens/newPost';

const navBarMainColor='#F4F5F9';
const navBarTintColor='#3C3559';
const accentColor='#D0CCDF';
const mainColor='#F4F5F9';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F5F9',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const DummyHerd = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to DummyHerd!
      </Text>
    </View>
  );
};

const DummySearch = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to DummySearch!
      </Text>
    </View>
  );
};

export const HerdStack = StackNavigator({
  DummyHeard: {
    screen: DummyHerd,
    navigationOptions: {
      title: 'DummyHeard',
    }
  }
})

export const SearchStack = StackNavigator({
  DummySearch: {
    screen: DummySearch,
    navigationOptions: {
      title: 'DummySearch',
    }
  }
})

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    }
  }
})

export const NewPostStack = StackNavigator({
  NewPost: {
    screen: NewPostScreen,
  }
})

export const FeedStack = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Feed',
      headerTintColor: '#3C3559'
    }
  },
  PostDetail: {
    screen: PostDetail,
    navigationOptions: {
      title: 'Detail',
    }
  },
}, {
  navigationOptions: ({ navigation }) => ({
    gesturesEnabled: false,
    headerStyle: {
      backgroundColor: mainColor,
    },
    headerRight:
      <Icon type='ionicon'
        name='ios-glasses-outline'
        color='#3C3559'
        size={30}
        onPress={()=>{ navigation.navigate('Settings'); }}
        style={{ marginRight: 10, padding: 5}}
        underlayColor='yellow'
      />
    })
})

export const Tabs = TabNavigator({
  FeedTab: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Icon type='ionicon' name='ios-navigate-outline' size={30} color={tintColor} />
    }
  },
  HerdTab: {
    screen: HerdStack,
    navigationOptions: {
      tabBarLabel: 'Herd',
      tabBarIcon: ({ tintColor }) => <Icon type='ionicon' name='ios-ionic-outline' size={30} color={tintColor} />
    }
  },
  SearchTab: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Icon type='ionicon' name='ios-search' size={30} color={tintColor} />
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: navBarTintColor,
    inactiveTintColor: accentColor,
    showLabel: false,
    labelStyle: {
      fontSize: 10,
    },
    style: {
      backgroundColor: navBarMainColor,
    },
  }
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Tutorial: {
    screen: Tutorial,
  },
  Settings: {
    screen: SettingsStack,
  },
  NewPost: {
    screen: NewPostStack,
  }
}, {
  mode: 'modal',
  headerMode: 'none',
})
