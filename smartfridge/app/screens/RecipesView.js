import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  updateIngredient,
  deleteIngredient,
  queryAllIngredients,
  insertNewIngredient,
} from '../models/IngredientSchemas';
import NavigationService from '../navigation/NavigationService.js';
import Recipe from '../components/Recipe';

const screenWidth = Math.round(Dimensions.get('window').width);

class RecipesView extends Component {
  constructor(props) {
    super(props);
    this.navigationWillFocusListener = props.navigation.addListener(
      'willFocus',
      () => {
        console.log('TAPPED');
      },
    );
    this.state = {
      isLoading: true,
      ingredientList: [],
      dataSource: null,
      recipeList: [],
      search: '',
    };
    // this._reloadIngredientData();
    // realm.addListener('change', () => {
    //   console.log('changed in realm');
    //   this._reloadIngredientData();
    // });
  }

  static navigationOptions = {
    title: 'Recipes',
  };

  _reloadIngredientData = () => {
    queryAllIngredients()
      .then(ingredientList => {
        this.setState({ingredientList});
        console.log('load ingredient datas');
      })
      .catch(error => {
        this.setState({ingredientList: []});
        console.log(`Error occurs during reload data: ${error}`);
      });
    console.log('Data reloaded - Recipes View');
  };

  _getIngredientUrl = () => {
    const ingredientList = this.state.ingredientList;

    if (!ingredientList.length) {
      return '';
    }
    let tempStr = '';
    console.log('BEFORE FOR LOOP');
    for (let i = 0; i < ingredientList.length; i++) {
      console.log('DURING THR LOOP');
      tempStr +=
        ingredientList[i] + (i === ingredientList.length - 1 ? '' : '%252C');
    }
    console.log('AFTER THR LOOP');
    return tempStr;
  };

  async componentDidMount() {
    // Temporary Data
    let tempList = [];
    let tempData = {
      id: 1,
      name: 'Roasted Cauliflower With Tahini Yogurt',
      image:
        'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/240933.jpg',
    };
    tempList.push(tempData);

    this.setState({
      isLoading: false,
      recipeList: tempList,
    });

    // Fetch API
    /*
    fetch(
      `https://tasty.p.rapidapi.com/recipes/list?tags=tasty_cookbook&q=${this._getIngredientUrl()}&from=4&sizes=${2}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'tasty.p.rapidapi.com',
          'x-rapidapi-key':
            '8e3a4594f8msh9b01cae7ba74d1ap171ad5jsn0a5db15ae82b',
        },
      },
    )
      // fetch(
      //   'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=tomato%252C%20pork%252C%20apple',
      //   {
      //     method: 'GET',
      //     headers: {
      //       'x-rapidapi-host':
      //         'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      //       'x-rapidapi-key':
      //         '8e3a4594f8msh9b01cae7ba74d1ap171ad5jsn0a5db15ae82b',
      //     },
      //   },
      // )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        // console.log('responseJSON: ', responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
        // let tempDataList = [];
        // console.log(responseJson);
        // for (let i = 0; i < responseJson.results.length; i++) {
        //   const tempData = {
        //     // id: responseJson[i].id,
        //     // name: responseJson[i].title,
        //     // image: responseJson[i].image,
        //     id: responseJson.results[i].id,
        //     name: responseJson.results[i].name,
        //     image: responseJson.results[i].thumbnail_url,
        //   };
        //   tempDataList.push(tempData);
        // }
        // this.setState({recipeList: tempDataList});
      })
      .then(() => {
        for (const data of this.state.dataSource.results) {
          const recipeData = {
            id: data.id,
            name: data.name,
            image: data.thumbnail_url,
          };
          var joined = this.state.recipeList.concat(recipeData);
          this.setState({recipeList: joined});
        }
      })
      .catch(err => {
        console.log(err);
      });
      */
  }

  // findRecipes = search => {
  //   if (search === '') {
  //     // Show all Recipes
  //     this.data.map(recipe => {
  //       this.tempData = this.data;
  //     });
  //   } else {
  //     // Show some Recipes
  //     this.tempData = [];
  //     this.data.map(recipe => {
  //       if (recipe.label.toLowerCase().includes(search.toLowerCase())) {
  //         // console.log(ingredient.label);
  //         this.tempData.push(recipe);
  //       }
  //     });
  //   }
  // };

  updateSearch = search => {
    this.setState({search});
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <Recipe
      id={item.id}
      name={item.name}
      image={item.image}
      ingres={item.ingredients}
      navigation={this.props.navigation}
    />
  );

  render() {
    const {search, isLoading, recipeList} = this.state;
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
        <View>
          <SearchBar
            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
            inputContainerStyle={{backgroundColor: '#eaeaea'}}
            containerStyle={{backgroundColor: 'white'}}
            placeholder="Search for ingredients"
            placeholderTextColor="#cacbcd"
            onChangeText={this.updateSearch}
            value={search}
          />
          <FlatList
            data={recipeList}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            numColumns={1}
          />
        </View>
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
});

export default RecipesView;
