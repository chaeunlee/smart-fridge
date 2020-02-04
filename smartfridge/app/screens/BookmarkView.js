import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Platform,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  insertNewBookmark,
  queryAllBookmarks,
  deleteAllBookmarks,
  deleteBookmark,
} from '../models/BookmarkSchemas';
import realm from '../models/BookmarkSchemas';
import NavigationService from '../navigation/NavigationService.js';
import Recipe from '../components/Recipe';
import AnimatedHeader from '../utils/AnimatedHeader';

const screenWidth = Math.round(Dimensions.get('window').width);

class BookmarkedRecipe extends React.PureComponent {
  pressIngredient = () => {
    // this.props.navigation.navigate('IngredientDetailView');
    // NavigationService.navigate('IngredientDetailView');
    NavigationService.navigateForBookmarkView('DetailRecipes', {
      id: this.props.id,
      name: this.props.name,
      image: this.props.image,
    });
  };

  render() {
    return (
      // <View style={styles.ingredientContainer}>
      <TouchableOpacity onPress={this.pressIngredient} style={styles.item}>
        <Image style={styles.foodImage} source={this.props.image} />
        <View style={styles.textBox}>
          <Text style={styles.foodName}>{this.props.name}</Text>
        </View>
      </TouchableOpacity>
      // </View>
    );
  }
}

class BookmarkView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarkList: [],
    };
    this._reloadData();
    realm.addListener('change', () => {
      console.log('changed in realm');
      this._reloadData();
    });
  }

  static navigationOptions = {
    title: 'Bookmark',
  };

  componentDidMount() {
    deleteAllBookmarks().then(console.log('All bookmarks deleted'));
  }

  _reloadData = () => {
    queryAllBookmarks()
      .then(bookmarkList => {
        this.setState({bookmarkList});
      })
      .catch(error => {
        this.setState({bookmarkList: []});
        console.log(`Error occurs during reload data: ${error}`);
      });
    console.log('Data reloaded - Bookmark View');
  };

  data = [
    {
      id: 1,
      image: require('../assets/food/gambas.jpg'),
      label: 'Gambas',
      ingredients: ['shrimp', 'garlic', 'olive oil', 'salt'],
    },
    {
      id: 2,
      image: require('../assets/food/carbonara.jpg'),
      label: 'Carbonara',
      ingredients: ['shrimp', 'garlic', 'olive oil', 'salt'],
    },
    {
      id: 3,
      image: require('../assets/food/salad.jpg'),
      label: 'Salad',
      ingredients: ['shrimp', 'garlic', 'olive oil', 'salt'],
    },
    {
      id: 4,
      image: require('../assets/food/meat.jpg'),
      label: 'Meat',
      ingredients: ['shrimp', 'garlic', 'olive oil', 'salt'],
    },
  ];

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <Recipe
      id={item.id}
      name={item.name}
      image={item.image}
      forBookmark={true}
    />
  );

  render() {
    const bookmarkList = this.state.bookmarkList;
    console.log(bookmarkList);
    if (bookmarkList.length) {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            // columnWrapperStyle={{ alignItem: 'flex-start' }}
            style={{flex: 1}}
            data={bookmarkList}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            numColumns={2}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.containerForEmpty}>
          <Text style={styles.textForEmpty}>
            You don't have any bookmark yet
          </Text>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
  containerForEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textForEmpty: {
    // ...human.title1Object,
    fontSize: 40,
    color: 'rgba(200, 200, 200, 0.3)',
    fontWeight: '700',
  },
  item: {
    flex: 1,
    // flexDirection: 'row',
    // width: (screenWidth - 30) / 2,
    height: 200,
    marginVertical: 0,
    marginHorizontal: 10,
    // alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  foodImage: {
    // flexDirection: 'row',
    // flex: 1,
    alignItems: 'center',
    width: (screenWidth - 20) / 2,
    borderRadius: 15,
    height: 150,
  },
  foodName: {
    paddingLeft: 5,
    fontSize: 25,
    fontWeight: '500',
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default BookmarkView;
