import React from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  findNodeHandle,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

// import {SearchBar} from 'react-native-elements';

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

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.headerHeight = props.headerMaxHeight + 30;
    this.state = {
      scrollOffset: new Animated.Value(0),
      left: 25,
      bottom: 10,
      viewRef: null,
    };
  }

  imageLoaded() {
    this.setState({viewRef: findNodeHandle(this.backgroundImage)});
  }

  onScroll = e => {
    if (this.props.disabled) {
      return;
    }
    this.state.scrollOffset.setValue(e.nativeEvent.contentOffset.y);
    // console.log(e.nativeEvent.contentOffset.y);
    // console.log('scrolloffset: ', this.state.scrollOffset);
    // console.log('left: ', this.state.left);
  };

  onBackLayout = e => {
    const layout = e.nativeEvent.layout;
    const bottom =
      toolbarHeight - layout.y - layout.height - paddingTop - topInset;
    this.setState({bottom: bottom, left: e.nativeEvent.layout.x});
  };

  _getFontSize = () => {
    const {scrollOffset} = this.state;
    const folded = this.headerHeight - toolbarHeight;
    const backFontSize =
      this.props.backTextStyle.fontSize ||
      Header.defaultProps.backTextStyle.fontSize;
    const titleFontSize =
      this.props.titleStyle.fontSize || Header.defaultProps.titleStyle.fontSize;
    return scrollOffset.interpolate({
      inputRange: [0, folded],
      outputRange: [titleFontSize, backFontSize],
      extrapolate: 'clamp',
    });
  };

  _getLeft = () => {
    const {scrollOffset} = this.state;
    const left =
      this.props.titleStyle.left || Header.defaultProps.titleStyle.left;
    const folded = this.headerHeight - toolbarHeight;
    return scrollOffset.interpolate({
      inputRange: [0, folded],
      outputRange: [left, this.state.left],
      extrapolate: 'clamp',
    });
  };

  _getHeight = () => {
    const {scrollOffset} = this.state;
    const folded = this.headerHeight - toolbarHeight;
    const tempSpace = this.props.tempSpace || 0; // for DetailRecipesView's image
    return scrollOffset.interpolate({
      inputRange: [0, folded],
      outputRange: [this.headerHeight, toolbarHeight + tempSpace],
      extrapolate: 'clamp',
    });
  };

  _getBottom = () => {
    const {scrollOffset} = this.state;
    const folded = this.headerHeight - toolbarHeight;
    const bottom =
      this.props.titleStyle.bottom || Header.defaultProps.titleStyle.bottom;
    return scrollOffset.interpolate({
      inputRange: [0, folded],
      outputRange: [bottom, this.state.bottom],
      extrapolate: 'clamp',
    });
  };

  _getOpacity = () => {
    const {scrollOffset} = this.state;
    const folded = this.headerHeight - toolbarHeight;
    return this.props.backText
      ? scrollOffset.interpolate({
          inputRange: [0, folded],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        })
      : 0;
  };

  _getToolbarOpacity = () => {
    const {scrollOffset} = this.state;
    const folded = this.headerHeight - toolbarHeight;
    return scrollOffset.interpolate({
      inputRange: [0, folded - 10, folded],
      outputRange: [1, 0.9, 0],
      extrapolate: 'clamp',
    });
  };

  _getImageOpacity = () => {
    const {scrollOffset} = this.state;
    const folded = this.headerHeight - toolbarHeight;
    return this.props.imageSource
      ? scrollOffset.interpolate({
          inputRange: [0, folded],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        })
      : 0;
  };

  _getTitleColor = () => {
    const {scrollOffset} = this.state;
    const folded = this.headerHeight - toolbarHeight;
    return scrollOffset.interpolate({
      inputRange: [0, 50],
      outputRange: ['white', 'black'],
      extrapolate: 'clamp',
    });
  };

  _getImageScaleStyle = () => {
    if (!this.props.parallax) {
      return undefined;
    }
    const {scrollOffset} = this.state;
    const scale = scrollOffset.interpolate({
      inputRange: [-100, -0],
      outputRange: [1.5, 1],
      extrapolate: 'clamp',
    });

    return {
      transform: [
        {
          scale,
        },
      ],
    };
  };

  render() {
    const {
      imageSource,
      toolbarColor,
      titleStyle,
      onBackPress,
      backStyle,
      backTextStyle,
      title,
    } = this.props;
    const height = this._getHeight();
    const left = this._getLeft();
    const bottom = this._getBottom();
    const opacity = this._getOpacity();
    const opacityForButton = this._getToolbarOpacity();
    const fontSize = this._getFontSize();
    const imageOpacity = this._getImageOpacity();
    const headerStyle = this.props.noBorder
      ? undefined
      : {borderBottomWidth: 0.5, borderColor: '#a7a6ab'};
    const titleColor = this._getTitleColor();
    const {scrollOffset} = this.state;

    return (
      <Animated.View
        style={[
          styles.header,
          headerStyle,
          {
            height: height,
            backgroundColor: toolbarColor,
          },
        ]}>
        {imageSource && (
          <Animated.Image
            style={[
              // StyleSheet.absoluteFill,
              styles.absolute,
              {
                width: null,
                height: null,
                opacity: imageOpacity,
                borderRadius: 20,
              },
              this._getImageScaleStyle(),
            ]}
            resizeMode="cover"
            // blurRadius={5}
            ref={img => {
              this.backgroundImage = img;
            }}
            source={imageSource}
            // style={styles.absolute}
            onLoadEnd={this.imageLoaded.bind(this)}
          />
        )}
        {/* {imageSource && (
          <Animated.View
            style={[
              styles.absolute,
              {
                backgroundColor: 'white',
                opacity: scrollOffset.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0.2, 0],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          />
        )} */}

        {imageSource && (
          <BlurView
            style={styles.absolute}
            viewRef={this.state.viewRef}
            blurType="light"
            blurAmount={3}
          />
        )}
        <View style={styles.toolbarContainer}>
          <View style={styles.statusBar} />
          <Animated.View
            style={[
              styles.toolbar,
              {
                opacity: opacityForButton,
              },
            ]}>
            {this.props.renderLeft && this.props.renderLeft()}
            <TouchableOpacity
              disabled={!onBackPress}
              onPress={onBackPress}
              activeOpacity={0.8}
              style={[styles.titleButton, backStyle]}
              // onLayout={this.onBackLayout}
            >
              <Animated.Text
                style={[
                  backTextStyle,
                  {alignSelf: 'center', opacity: opacity},
                ]}>
                {this.props.backText || ''}
              </Animated.Text>
            </TouchableOpacity>
            <View style={styles.flexView} />
            <Animated.View style={{opacity: opacityForButton}}>
              {this.props.renderRight && this.props.renderRight()}
            </Animated.View>
          </Animated.View>
        </View>
        <Animated.Text
          style={[
            titleStyle,
            {
              position: 'absolute',
              left: left,
              bottom: bottom,
              fontSize,
              color: titleStyle.color || titleColor,
            },
          ]}>
          {title}
        </Animated.Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  toolbarContainer: {
    height: toolbarHeight,
  },
  statusBar: {
    height: topInset + paddingTop,
  },
  toolbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  searchBarArea: {
    position: 'absolute',
    height: 50,
    // top: 0,
    // left: 0,
    // right: 0,
  },
  titleButton: {
    flexDirection: 'row',
  },
  flexView: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

Header.defaultProps = {
  backText: '',
  title: '',
  renderLeft: undefined,
  renderRight: undefined,
  backStyle: {marginLeft: 10},
  backTextStyle: {fontSize: 16},
  titleStyle: {fontSize: 20, left: 20, bottom: 30},
  toolbarColor: '#FFF',
  headerMaxHeight: 200,
  disabled: false,
  imageSource: undefined,
  searchBar: undefined,
};

export default Header;
