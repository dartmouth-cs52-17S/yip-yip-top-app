import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

class SearchView extends Component {
  static displayName = 'SearchView';

  static navigationOptions = {
    title: 'Search',
    tabBar: () => ({
      icon: (props) => (
        <Icon name='plus-one' size={24} color={props.tintColor} />
      )
    })
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    searchStateActions: PropTypes.shape({
      reset: PropTypes.func.isRequired
    }).isRequired
  };

  reset = () => {
    this.props.searchStateActions.reset();
  };

  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (
      <View style={styles.container}>

        <TouchableOpacity
          accessible={true}
          accessibilityLabel={'Search bar'}
          style={[styles.counterButton, loadingStyle]}>
          <Text>
            Search
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const circle = {
  borderWidth: 0,
  borderRadius: 40,
  width: 80,
  height: 80
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  counterButton: {
    ...circle,
    backgroundColor: '#349d4a',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  }
});

export default SearchView;
