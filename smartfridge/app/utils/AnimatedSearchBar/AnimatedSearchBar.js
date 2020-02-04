import React, {Component} from 'react';
import {View} from 'react-native';
import CustomSearchBar from '../AnimatedHeader/CustomSearchBar';

type Props = {
  style?: any,
  backText?: string,
  title?: string,
  renderLeft?: () => React.Component,
  renderRight?: () => React.Component,
  backStyle?: any,
  backTextStyle?: any,
  titleStyle?: any,
  toolbarColor?: string,
  headerMaxHeight?: number,
  disabled?: boolean,
  noBorder?: boolean,
  parallax?: boolean,
  imageSource?: any,
  searchBar?: any,
};

export default class AnimatedSearchBar extends React.PureComponent<Props> {
  _onScroll = e => {
    this.header.onScroll(e);
  };

  render() {
    // const arr = React.Children.toArray(this.props.children);
    // if (arr.length === 0) {
    //   console.error(
    //     'AnimatedHeader must have ScrollView or FlatList as a child',
    //   );
    // }
    if (arr.length > 2) {
      console.error('Invalid child, only 1 child accepted');
    }
    const {headerMaxHeight} = this.props;
    // const child = React.cloneElement(arr[1], {
    //   style: {flex: 1},
    //   ref: r => (this.scrollView = r),
    //   scrollEventThrottle: 16,
    //   onScroll: this._onScroll,
    //   contentContainerStyle: {paddingTop: headerMaxHeight + 30 || 200},
    //   //   contentContainerStyle: {paddingTop: 10},
    // });
    return (
      <View style={this.props.style}>
        {/* {child} */}
        <CustomSearchBar
          {...this.props}
          ref={r => {
            this.header = r;
          }}
        />
      </View>
    );
  }
}
