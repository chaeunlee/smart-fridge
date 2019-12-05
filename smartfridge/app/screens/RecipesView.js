import React, {Component, PureComponent} from 'react';
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
  TouchableHighlight,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
// import SearchBar from 'react-native-dynamic-search-bar';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  updateIngredient,
  deleteIngredient,
  queryAllIngredients,
  insertNewIngredient,
} from '../models/IngredientSchemas';
import realm from '../models/IngredientSchemas';
import NavigationService from '../navigation/NavigationService.js';

const screenWidth = Math.round(Dimensions.get('window').width);

class Recipe extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isBookmarked: false,
    };
  }

  pressIngredient = () => {
    // this.props.navigation.navigate('IngredientDetailView');
    // NavigationService.navigate('IngredientDetailView');
    NavigationService.navigateForRecipesView('DetailRecipes', {
      id: this.props.id,
      name: this.props.name,
      image: this.props.image,
    });
  };

  tabBookmark = id => {
    this.setState({isBookmarked: !this.state.isBookmarked});
    console.log(`id: ${id}`);
  };

  render() {
    return (
      <TouchableHighlight
        onPress={this.pressIngredient}
        style={styles.itemContainer}
        activeOpacity={1}
        underlayColor="lightgray">
        <View style={styles.item}>
          <View>
            <Image style={styles.foodImage} source={this.props.image} />
            <View style={styles.textBox}>
              <Text style={styles.foodName}>{this.props.name}</Text>
              <TouchableOpacity onPress={() => this.tabBookmark(this.props.id)}>
                <Icon
                  name={
                    this.state.isBookmarked ? 'bookmark' : 'bookmark-border'
                  }
                  size={40}
                  backgroundColor="transparent"
                  iconStyle={{marginTop: 5}}
                  color="#5ccaf0"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

class RecipesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ingredientList: [],
      search: '',
    };
    this._reloadData();
    realm.addListener('change', () => {
      console.log('changed in realm');
      this._reloadData();
    });
  }

  static navigationOptions = {
    title: 'Recipes',
  };

  _reloadData = () => {
    queryAllIngredients()
      .then(ingredientList => {
        this.setState({ingredientList});
      })
      .catch(error => {
        this.setState({ingredientList: []});
        console.log(`Error occurs during reload data: ${error}`);
      });
    console.log('Data reloaded - Recipes View');
  };

  findRecipes = search => {
    if (search === '') {
      // Show all Recipes
      this.data.map(recipe => {
        this.tempData = this.data;
      });
    } else {
      // Show some Recipes
      this.tempData = [];
      this.data.map(recipe => {
        if (recipe.label.toLowerCase().includes(search.toLowerCase())) {
          // console.log(ingredient.label);
          this.tempData.push(recipe);
        }
      });
    }
  };

  updateSearch = search => {
    this.setState({search});
    this.findRecipes(search);
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
    {
      id: 5,
      image: require('../assets/food/vietnamfood.jpg'),
      label: 'Vietnamfood',
      ingredients: ['shrimp', 'garlic', 'olive oil', 'salt'],
    },
  ];

  tempData = this.data;

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
    const {search, isLoading} = this.state;
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SearchBar
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          inputContainerStyle={{backgroundColor: '#eaeaea'}}
          containerStyle={{backgroundColor: 'white'}}
          placeholder="Search for ingredients"
          onChangeText={this.updateSearch}
          value={search}
        />
        <FlatList
          data={this.tempData}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 20,
    paddingTop: 10,
  },
  ingredientContainer: {},
  itemContainer: {
    flex: 1,
    // flexDirection: 'row',
    // width: (screenWidth - 30) / 2,
    // borderRadius: 10,
    height: 250,
    marginVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
    // marginHorizontal: 10,

    // paddingBottom: 5,
  },
  item: {
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  foodImage: {
    // flexDirection: 'row',
    // flex: 1,
    // alignItems: 'center'
    width: screenWidth - 20,
    borderRadius: 10,
    height: 200,
  },
  foodName: {
    fontSize: 35,
    fontWeight: '600',
  },
  textBox: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default RecipesView;
