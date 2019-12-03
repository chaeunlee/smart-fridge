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
import {SearchBar} from 'react-native-elements';
import NavigationService from '../navigation/NavigationService.js';

const screenWidth = Math.round(Dimensions.get('window').width);

class Recipe extends React.PureComponent {
  pressIngredient = () => {
    // this.props.navigation.navigate('IngredientDetailView');
    // NavigationService.navigate('IngredientDetailView');
    NavigationService.navigateForRecipesView('DetailRecipes', {
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

class RecipesView extends Component {
  static navigationOptions = {
    title: 'Recipes',
  };

  state = {
    search: '',
  };

  findRecipes(search) {
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
  }

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
    const {search} = this.state;

    return (
      <View>
        {/* <SearchBar
          placeholder="Search here"
          onChangeText={text => {
            console.log(text);
          }}
          onPressCancel={() => {
            this.filterList('');
          }}
          onPress={() => alert('onPress')}
        /> */}
        <SearchBar
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          inputContainerStyle={{backgroundColor: '#eaeaea'}}
          containerStyle={{backgroundColor: 'white'}}
          placeholder="Search for ingredients"
          onChangeText={this.updateSearch}
          value={search}
        />
        <FlatList
          // columnWrapperStyle={{ alignItem: 'flex-start' }}
          //   style={styles.list}
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
  },
  //   list: {
  //     height: 100,
  //   },
  ingredientContainer: {},
  item: {
    flex: 1,
    // flexDirection: 'row',
    // width: (screenWidth - 30) / 2,
    height: 250,
    marginVertical: 0,
    marginHorizontal: 10,
    // alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  foodImage: {
    // flexDirection: 'row',
    // flex: 1,
    width: screenWidth - 20,
    borderRadius: 10,
    height: 200,
  },
  foodName: {
    fontSize: 35,
    fontWeight: '600',
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default RecipesView;
