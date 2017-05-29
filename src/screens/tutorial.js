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
      img: 'https://vignette3.wikia.nocookie.net/camphalfbloodroleplay/images/8/89/Tumblr_mpgoldBy461ri41kbo1_500.png',
      imgStyle: {
        height: 80 * 2.5,
        width: 100 * 2.5,
      },
      backgroundColor: '#F4F5F9',
      fontColor: '#3C3559',
      fontFamily: 'Gill Sans',
      level: 15,
    },{
      title: 'Explore',
      description: 'See what the buzz is, around you or at your pinned location.',
      /* eslint-disable no-undef */
      img: 'http://i.imgur.com/TRMNhHg.gif',   /* eslint-enable */
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
      /* eslint-disable no-undef */
      img: 'http://i.imgur.com/yrhpEYc.gif',   /* eslint-enable */
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
      /* eslint-disable no-undef */
      img: 'http://i.imgur.com/4F7lZmN.gif',   /* eslint-enable */
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
