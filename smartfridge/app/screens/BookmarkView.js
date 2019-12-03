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
// import SearchBar from 'react-native-dynamic-search-bar';
// import {SearchBar} from 'react-native-elements';
import NavigationService from '../navigation/NavigationService.js';

const screenWidth = Math.round(Dimensions.get('window').width);

class Recipe extends React.PureComponent {
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
  static navigationOptions = {
    title: 'Bookmark',
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

  renderItem = ({item}) => (
    <Recipe
      id={item.id}
      name={item.label}
      image={item.image}
      ingres={item.ingredients}
    />
  );

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          // columnWrapperStyle={{ alignItem: 'flex-start' }}
          style={{flex: 1}}
          data={this.data}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  //   list: {
  //     height: 100,
  //   },
  ingredientContainer: {},

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
