//  Created by Artem Bogoslavskiy on 7/5/18.

import React from 'react';
// import {MaterialIcons} from '@expo/vector-icons';
import {ifIphoneX, ifAndroid} from '../AnimatedSearchBar/utils';
import {
  View,
  StyleSheet,
  TextInput,
  Animated,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';

const ios = Platform.OS === 'ios';
const {width, height} = Dimensions.get('window');
// from native-base
const isIphoneX = ios && (height === 812 || width === 812);
const iphoneXTopInset = 24;
const initToolbarHeight = ios ? 46 : 56;
// const initToolbarHeight = 200;

const paddingTop = ios ? 18 : 0;
const topInset = isIphoneX ? iphoneXTopInset : 0;

const toolbarHeight = initToolbarHeight + topInset + paddingTop;
// const AnimatedSearchbar = Animated.createAnimatedComponent(SearchBar);

export default class CustomSearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.headerHeight = props.headerMaxHeight + 30;
    this.state = {
      scrollOffset: new Animated.Value(0),
      left: 0,
      bottom: 0,
    };
  }

  blurInputs() {
    this.inputSearch.blur();
    this.inputLocation.blur();
    this.props.changeInputFocus(false);
  }

  onScroll = e => {
    if (this.props.disabled) {
      return;
    }
    this.state.scrollOffset.setValue(e.nativeEvent.contentOffset.y);
    // console.log(e.nativeEvent.contentOffset.y);
    console.log('scrolloffset: ', this.state.scrollOffset);
    // console.log('left: ', this.state.left);
  };

  _getHeight = () => {
    const {scrollOffset} = this.state;
    console.log('SCROLL OFFSET: ', scrollOffset);
    const folded = this.headerHeight - toolbarHeight;
    return scrollOffset.interpolate({
      inputRange: [0, folded],
      outputRange: [this.headerHeight, toolbarHeight],
      extrapolate: 'clamp',
    });
  };

  render() {
    const height = this._getHeight();
    console.log(height);
    console.log(height);
    console.log(height);
    console.log(height);
    console.log(height);
    console.log(height);

    return (
      <Animated.View
        style={[
          styles.searchBarContainer,
          {
            // height: this.headerHeight + 50,
            height: height,
            backgroundColor: 'red',
          },
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  searchBarContainer: {
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    zIndex: 99,
    backgroundColor: '#597fab',
    width: '100%',
    overflow: 'hidden',
    paddingBottom: 10,
    ...ifIphoneX(
      {
        paddingTop: 40,
      },
      {
        paddingTop: 28,
      },
    ),
  },
  arrowMinimizeContainer: {
    position: 'relative',
    top: -3,
  },
  arrowMinimizeIcon: {
    marginLeft: 12,
  },
  searchInput: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: 3,
    height: 45,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
  },
  locationInput: {
    marginTop: 10,
  },
  searchIcon: {
    position: 'absolute',
    left: 13,
    top: 12,
  },
  inputText: {
    display: 'flex',
    ...ifAndroid(
      {
        marginTop: 9,
      },
      {
        marginTop: 13,
      },
    ),
    marginLeft: 43,
    fontSize: 15,
    color: '#999',
  },
});
