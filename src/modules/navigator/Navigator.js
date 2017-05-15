import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

// import CounterViewContainer from '../counter/CounterViewContainer';
// import ColorViewContainer from '../colors/ColorViewContainer';
import FeedViewContainer from '../feed/FeedViewContainer';
import SearchViewContainer from '../search/SearchViewContainer';

const headerColor = '#39babd';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  // Counter: {screen: CounterViewContainer},
  // Color: {screen: ColorViewContainer}
  Local: {screen: FeedViewContainer},
  Tribe: {screen: FeedViewContainer},
  Search: {screen: SearchViewContainer}
}, {
  tabBarOptions: {
    ...Platform.select({
      android: {
        activeTintColor: activeColor,
        indicatorStyle: {backgroundColor: activeColor},
        style: {backgroundColor: headerColor}
      }
    })
  }
});

MainScreenNavigator.navigationOptions = {
  title: 'Yip Yip!',
  header: {
    titleStyle: {color: 'white'},
    style: {
      backgroundColor: headerColor,
      elevation: 0 // disable header elevation when TabNavigator visible
    }
  }
};

// Root navigator is a StackNavigator
// Byrne: I'm not necessarily sure we should be stacking search or just have it as another view
// I think Settings should probably stack, though (haven't made anything for it yet)
const AppNavigator = StackNavigator({
  Home: {screen: MainScreenNavigator},
  SearchStack: {screen: SearchViewContainer}
});

export default AppNavigator;
