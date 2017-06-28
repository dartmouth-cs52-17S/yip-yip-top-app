import React from 'react';
import AppIntro from 'react-native-app-intro';
import { Dimensions } from 'react-native';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

class Tutorial extends React.Component {

  onSkipBtnHandle = (index) => {
    // console.log(index);
    this.props.navigation.navigate('Tabs');
  }
  doneBtnHandle = () => {
    this.props.navigation.navigate('Tabs');
  }
  nextBtnHandle = (index) => {
    // console.log(index);
  }
  onSlideChangeHandle = (index, total) => {
    // console.log(index, total);
  }

  render() {
    const pageArray = [{
      title: 'Welcome!',
      description: 'Welcome to Yip Yip, your community message board. Share your thoughts with the people around you.',
      img: 'https://i.imgur.com/gQIYpxd.png',
      imgStyle: {
        height: vh * 0.35,
        width: vw * 0.7,
        resizeMode: 'contain',
        marginTop: 15,
      },
      backgroundColor: '#F4F5F9',
      fontColor: '#3C3559',
      fontFamily: 'Gill Sans',
      level: 15,
    },{
      title: 'Explore',
      description: 'See what the buzz is, around you or at your saved location.',
      img: require('../../screenshots/feed.gif'),
      imgStyle: {
        height: vh * 0.35,
        width: vw * 0.7,
        resizeMode: 'contain',
        marginTop: 15,
      },
      backgroundColor: '#F4F5F9',
      fontColor: '#3C3559',
      level: 10,
    },{
      title: 'Send a Yip',
      description: 'Want to share something? Send a Yip to your location!',
      img: require('../../screenshots/newPost.gif'),
      imgStyle: {
        height: vh * 0.35,
        width: vw * 0.7,
        resizeMode: 'contain',
        marginTop: 15,
      },
      backgroundColor: '#F4F5F9',
      fontColor: '#3C3559',
      level: 10,
    }, {
      title: 'Vote and Comment',
      description: 'You get to shape the buzz, collectively!',
      img: require('../../screenshots/vote.gif'),
      imgStyle: {
        height: vh * 0.35,
        width: vw * 0.7,
        resizeMode: 'contain',
        marginTop: 15,
      },
      backgroundColor: '#F4F5F9',
      fontColor: '#3C3559',
      level: 10,
    }];
    return (
      <AppIntro
        dotColor="#D0CCDF"
        activeDotColor="#6C56BA"
        rightTextColor="#6C56BA"
        leftTextColor="#6C56BA"
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
      />
    );
  }
}

export default Tutorial;
