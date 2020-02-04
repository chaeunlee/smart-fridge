import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dot from 'react-native-vector-icons/Octicons';
import {human} from 'react-native-typography';
import {
  deleteBookmark,
  deleteAllBookmarks,
  insertNewBookmark,
  queryAllBookmarks,
} from '../models/BookmarkSchemas';
import realm from '../models/BookmarkSchemas';
// import NavigationService from '../navigation/NavigationService.js';

const screenWidth = Math.round(Dimensions.get('window').width);

class Recipe extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isBookmarked: false,
    };
  }

  pressIngredient = () => {
    this.props.navigation.navigate('DetailRecipes', {
      id: this.props.id,
      name: this.props.name,
      image: this.props.image,
    });
    // NavigationService.navigateForRecipesView('DetailRecipes', {
    //   id: this.props.id,
    //   name: this.props.name,
    //   image: this.props.image,
    // });
  };

  tabBookmark = isBookmarkView => {
    const isBookmarked = this.state.isBookmarked;

    if (isBookmarked || isBookmarkView) {
      deleteBookmark(this.props.id)
        .then(console.log(`Deleted ${this.props.id}`))
        .catch(error =>
          console.log(`Error occurs during deleting bookmark\n${error}`),
        );
    } else {
      const newBookmark = {
        id: this.props.id,
        name: this.props.name,
        image: this.props.image,
        creationDate: new Date(),
      };
      insertNewBookmark(newBookmark)
        .then(console.log(newBookmark))
        .catch(error =>
          console.log(`Error occurs during save bookmark\n${error}`),
        );
    }
    this.setState({isBookmarked: !isBookmarked});
  };

  render() {
    const {name, image, forBookmark} = this.props;

    /* For Bookmark View */
    if (forBookmark) {
      return (
        <View style={stylesForBookmark.container}>
          <View style={stylesForBookmark.imageContainer}>
            <Image
              source={{uri: image, cache: 'force-cache'}}
              style={stylesForBookmark.image}
            />
          </View>
          <View style={stylesForBookmark.labelContainer}>
            <Text style={stylesForBookmark.name}>
              {name.length > 11 ? name.substring(0, 9) + '...' : name}
            </Text>
            {/* <TouchableOpacity onPress={() => this.tabBookmark(true)}>
              <Icon
                name="bookmark"
                size={30}
                backgroundColor="transparent"
                // iconStyle={{marginTop: 5}}
                color="#5ccaf0"
              />
            </TouchableOpacity> */}
          </View>
        </View>
      );
    } else {
      /* For Recipe View */
      return (
        <TouchableHighlight
          onPress={this.pressIngredient}
          style={[
            styles.itemContainer,
            name.length > 30 ? {height: 280} : {height: 250},
          ]}
          activeOpacity={1}
          underlayColor="lightgray">
          <View style={styles.item}>
            <View>
              <Image
                style={styles.foodImage}
                source={{uri: image, cache: 'force-cache'}}
              />
              <View style={styles.labelContainer}>
                <View style={styles.foodNameContainer}>
                  <Text style={styles.foodName}>
                    {name}
                    <View style={{width: 10}} />
                    <Dot name="primitive-dot" size={20} color="#5ccaf0" />
                  </Text>
                </View>
                <View style={styles.bookmarkContainer}>
                  {/* <TouchableOpacity onPress={() => this.tabBookmark()}>
                    <Icon
                      name={this.state.isBookmarked ? 'bookmark' : 'bookmark-o'}
                      size={35}
                      backgroundColor="transparent"
                      // iconStyle={{marginTop: 5}}
                      color="#5ccaf0"
                    />
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      );
    }
  }
}

const styles = StyleSheet.create({
  ingredientContainer: {},
  itemContainer: {
    flex: 1,
    marginVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  },
  item: {
    alignItems: 'center',
  },
  foodImage: {
    // width: screenWidth - 20,
    width: screenWidth - 20,
    borderRadius: 10,
    height: 200,
  },
  foodName: {
    fontSize: 25,
    fontWeight: '600',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  labelContainer: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  foodNameContainer: {
    flex: 1,
  },
  bookmarkContainer: {
    flex: 0.15,
  },
});

const stylesForBookmark = StyleSheet.create({
  container: {
    flex: 0.5,
    // backgroundColor: 'red',
    height: 160,
    margin: 5,
  },
  imageContainer: {
    // flex: 1,
    borderRadius: 15,
    height: 120,
    backgroundColor: 'blue',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    aspectRatio: 2,
    // height: '100%',
    // width: '100%',
    borderRadius: 15,
    resizeMode: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    marginHorizontal: 7,
    justifyContent: 'space-between',
  },
  name: {
    ...human.titleObject,
    fontSize: 24,
    fontWeight: '400',
  },
});
export default Recipe;
