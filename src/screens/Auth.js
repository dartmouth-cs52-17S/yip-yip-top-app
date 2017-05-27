import React from 'react';
import { View } from 'react-native';
import Auth0Lock from 'react-native-lock';

class Auth extends React.Component {

  render() {
    var lock = new Auth0Lock({clientId: 'z84JtDyqbr7VldTci4QupQaaD9akB0rT', domain: 'bhollander823.auth0.com'});
    return (
      <View style={{flex: 1, backgroundColor: '#F4F5F9',}}>
        {lock.show({
          connections: ['sms']
        }, (err, profile, token) => {
          if (err) {
            console.log(err);
            return;
          }
          // Authentication worked!
          console.log('Logged in with Auth0!');
          console.log(`profile is ${JSON.stringify(profile)}`);
          console.log(`token is ${JSON.stringify(token)}`);
        })}
      </View>
    );
  }
}

export default Auth;
