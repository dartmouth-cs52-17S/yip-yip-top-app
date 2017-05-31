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
import AuthIntro from './login/intro';
import AuthPhone from './login/phone';
import AuthCode from './login/passcode';
import DummyComponent from './screens/dummy';
import Settings from './screens/settings';
import Tutorial from './screens/tutorial';
import PostDetail from './screens/PostDetail';
import NewPostScreen from './screens/newPost';
import HerdScreen from './screens/Herd';
import SearchScreen from './screens/Search';
import ProfilePage from './screens/User';

const navBarMainColor='#F4F5F9';
const navBarTintColor='#6C56BA';
const accentColor='#D0CCDF';
const mainColor='#F4F5F9';
const tintColor='#6C56BA';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F5F9',
  },
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export const HerdStack = StackNavigator({
  Herd: {
    screen: HerdScreen,
    navigationOptions: {
      title: 'Herd',
      headerTintColor: '#6C56BA',
      headerTitleStyle: {
        fontFamily: 'Gill Sans',
        fontWeight: 'normal',
        fontSize: 22
      },
    }
  },
  PostDetail: {
    screen: PostDetail,
    navigationOptions: {
      title: 'Details',
      headerTintColor: '#6C56BA',
      headerTitleStyle: {
        fontFamily: 'Gill Sans',
        fontWeight: 'normal',
        fontSize: 22
      }
    }
  },
}, {
  navigationOptions: ({ navigation }) => ({
    gesturesEnabled: false,
    headerStyle: {
      backgroundColor: mainColor,
      shadowOpacity: 0
    },
    headerTitleStyle: {
      fontFamily: 'Gill Sans',
      fontSize: 18
    },
    headerRight:
      <Icon type='font-awesome'
        name='user-circle-o'
        color='#6C56BA'
        size={25}
        onPress={()=>{ navigation.navigate('Settings'); }}
        style={{ marginRight: 10, padding: 5}}
      />
    })
})

export const SearchStack = StackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      title: 'Search',
      headerTintColor: '#6C56BA',
      headerTitleStyle: {
        fontFamily: 'Gill Sans',
        fontWeight: 'normal',
        fontSize: 22
      }
    }
  }
}, {
  navigationOptions: ({ navigation }) => ({
    gesturesEnabled: false,
    headerStyle: {
      backgroundColor: mainColor,
      shadowOpacity: 0
    }
  })
})

export const SettingsStack = StackNavigator({
  Profile: {
    screen: ProfilePage,
    navigationOptions: {
      title: 'My Posts',
      headerTintColor: '#6C56BA',
      headerTitleStyle: {
        fontFamily: 'Gill Sans',
        fontWeight: 'normal',
        fontSize: 22
      },
      headerStyle: {
        backgroundColor: mainColor,
        shadowOpacity: 0
      },
    }
  },
  PostDetail: {
    screen: PostDetail,
    navigationOptions: {
      title: 'Detail',
      headerTintColor: '#6C56BA',
      headerTitleStyle: {
        fontFamily: 'Gill Sans',
        fontSize: 18
      }
    }
  },
})

export const AuthStack = StackNavigator({
  Intro: {
    screen: AuthIntro
  },
  Phone: {
    screen: AuthPhone
  },
  Passcode: {
    screen: AuthCode
  }
}, {
  navigationOptions: ({ navigation }) => ({
    gesturesEnabled: false,
    header: null,
    headerTintColor: mainColor,
    headerStyle: {
      backgroundColor: mainColor,
    },
  })
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
      headerTintColor: '#6C56BA',
      headerTitleStyle: {
        fontFamily: 'Gill Sans',
        fontWeight: 'normal',
        fontSize: 22
      },
      headerStyle: {
        backgroundColor: mainColor,
        shadowOpacity: 0
      },
    }
  },
  PostDetail: {
    screen: PostDetail,
    navigationOptions: {
      title: 'Details',
      headerTintColor: '#6C56BA',
      headerTitleStyle: {
        fontFamily: 'Gill Sans',
        fontWeight: 'normal',
        fontSize: 22
      }
    }
  },
})

export const Tabs = TabNavigator({
  FeedTab: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Icon type='font-awesome' name='map-marker' size={28} color={tintColor} />
    }
  },
  HerdTab: {
    screen: HerdStack,
    navigationOptions: {
      tabBarLabel: 'Herd',
      tabBarIcon: ({ tintColor }) => <Icon type='font-awesome' name='paw' size={28} color={tintColor} />
    }
  },
  SearchTab: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Icon type='font-awesome' name='search' size={28} color={tintColor} />
    }
  },
}, {
  lazy: true,
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

export const AuthRoot = StackNavigator({
  Auth: {
    screen: AuthStack,
  },
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
