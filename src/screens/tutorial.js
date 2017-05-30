import React from 'react';
import AppIntro from 'react-native-app-intro';


class Tutorial extends React.Component {

  onSkipBtnHandle = (index) => {
    console.log(index);
    this.props.navigation.navigate('Tabs');
  }
  doneBtnHandle = () => {
    this.props.navigation.navigate('Tabs');
  }
  nextBtnHandle = (index) => {
    console.log(index);
  }
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  }

  render() {
    const pageArray = [{
      title: 'Welcome to Yip Yip,',
      description: 'where you can share your thoughts with the people around you.',
      img: 'https://i.imgur.com/gQIYpxd.png',
      imgStyle: {
        height: 100 * 2,
        width: 100 * 2,
      },
      backgroundColor: '#F4F5F9',
      fontColor: '#3C3559',
      fontFamily: 'Gill Sans',
      level: 15,
    },{
      title: 'Explore',
      description: 'See what the buzz is, around you or at your pinned location.',
      img: 'https://i.imgur.com/TRMNhHg.gif',
      imgStyle: {
        height: 80 * 3,
        width: 100 * 2.5,
      },
      backgroundColor: '#F4F5F9',
      fontColor: '#3C3559',
      level: 10,
    },{
      title: 'Send a Yip',
      description: 'Want to share something? Send a yip to your location!',
      img: 'https://i.imgur.com/yrhpEYc.gif',
      imgStyle: {
        height: 80 * 3,
        width: 100 * 2.5,
      },
      backgroundColor: '#F4F5F9',
      fontColor: '#3C3559',
      level: 10,
    }, {
      title: 'Vote and Comment',
      description: 'You get to shape the buzz, collectively!',
      img: 'https://i.imgur.com/4F7lZmN.gif',
      imgStyle: {
        height: 70 * 3,
        width: 100 * 2.5,
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
