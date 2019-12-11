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
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {material} from 'react-native-typography';
import {FloatingAction} from 'react-native-floating-action';
import {
  updateIngredient,
  deleteIngredient,
  queryAllIngredients,
  insertNewIngredient,
} from '../models/IngredientSchemas';
import realm from '../models/IngredientSchemas';
import NavigationService from '../navigation/NavigationService.js';
import Ingredient from '../components/Ingredient';

class MyFridgeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientList: [],
      search: '',
      searchingIngredient: [],
    };
    this._reloadData();
    realm.addListener('change', () => {
      console.log('changed in realm');
      this._reloadData();
    });
  }

  /* navigation header */
  static navigationOptions = () => ({
    title: 'My Fridge',
    // headerTintColor: 'blue',
    headerRight: (
      <Button
        title="Add"
        // color="#8bc7e9"
        onPress={() => {
          console.log('Right Button Tapped');
          NavigationService.navigateForFridgeView('AddIngredient');
        }}
      />
    ),
  });

  _reloadData = () => {
    queryAllIngredients()
      .then(ingredientList => {
        this.setState({ingredientList});
        this.setState({searchingIngredient: ingredientList});
      })
      .catch(error => {
        this.setState({ingredientList: []});
        console.log(`Error occurs during reload data: ${error}`);
      });
    console.log('Data reloaded');
  };

  /* Searching Ingredient */
  _findIngredients = search => {
    console.log(`Searching about: ${search}`);
    if (search === '') {
      // Show all ingredients
      this.setState({searchingIngredient: this.state.ingredientList});
    } else {
      // Show some ingredients
      this.setState({searchingIngredient: []});
    }
  };

  _updateSearch = search => {
    this.setState({search});
    this._findIngredients(search);
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <Ingredient
      id={item.id}
      name={item.name}
      // image={item.image}
      image={require(`../assets/ingredients/tomato.png`)}
      desc={item.description}
      forMyFridgeView={true}
    />
  );

  render() {
    const {search} = this.state;

    return (
      <View style={styles.container}>
        <SearchBar
          style={{flex: 1}}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          inputContainerStyle={{backgroundColor: '#eaeaea'}}
          containerStyle={{backgroundColor: 'white'}}
          placeholder="Search for ingredients"
          onChangeText={this._updateSearch}
          value={search}
        />
        <FlatList
          // style={{flex: 1}}
          data={this.state.searchingIngredient}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={2}
        />
        <FloatingAction
          actions={actions}
          color="#8bc7e9"
          overlayColor="transparent"
          onPressItem={name => {
            console.log(`selected button: ${name}`);
          }}
        />
        {/* TODO: Make Add Button */}
      </View>
    );
  }
}

const actions = [
  {
    text: 'Search',
    // icon: require('../assets/ingredients/tomato.png'),
    name: 'bt_accessibility',
    position: 3,
    color: '#8bc7e9',
  },
  {
    text: 'Scan Receipt ',
    // icon: require('../assets/ingredients/tomato.png'),
    name: 'bt_language',
    position: 1,
    color: '#8bc7e9',
  },
  {
    text: 'Scan Barcode',
    // icon: require('../assets/ingredients/tomato.png'),
    name: 'bt_room',
    position: 2,
    color: '#8bc7e9',
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyFridgeView;
