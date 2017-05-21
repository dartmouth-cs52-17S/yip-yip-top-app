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
      title: 'Page 1',
      description: 'Description 1',
      img: 'https://s-media-cache-ak0.pinimg.com/736x/3b/af/59/3baf59084c422852dfed2de3e9fff6f3.jpg',
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Page 2',
      description: 'Description 2',
      img: 'https://s-media-cache-ak0.pinimg.com/originals/cf/e7/32/cfe73233c0e3c7909fe556f78fdee124.png',
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }];
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
      />
    );
  }
}

module.exports = Tutorial;
