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
import {
  updateIngredient,
  deleteIngredient,
  queryAllIngredients,
  insertNewIngredient,
} from '../models/IngredientSchemas';
import realm from '../models/IngredientSchemas';
import NavigationService from '../navigation/NavigationService.js';

class MyIngredient extends React.PureComponent {
  pressIngredient = () => {
    // this.props.navigation.navigate('IngredientDetailView');
    // NavigationService.navigate('IngredientDetailView');
    NavigationService.navigateForFridgeView('DetailIngredient', {
      id: this.props.id,
      name: this.props.name,
      image: this.props.image,
      desc: this.props.desc,
    });
  };

  render() {
    return (
      <View style={{flex: 0.5}}>
        <TouchableOpacity onPress={this.pressIngredient} style={styles.item}>
          <Image style={styles.ingredientImage} source={this.props.image} />
          <View style={styles.ingredientTextView}>
            <Text style={material.headline}>{this.props.name}</Text>
            <Text style={styles.ingredientDesc}>{this.props.desc}</Text>
          </View>
        </TouchableOpacity>
        <Button
          title="delete(temp)"
          onPress={() =>
            deleteIngredient(this.props.id)
              .then()
              .catch(error => console.log(`Error occurs on deleting: ${error}`))
          }
        />
      </View>
    );
  }
}

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
  static navigationOptions = ({navigation}) => {
    // const {params = {}} = navigation.state;
    return {
      title: 'My Fridge',
      headerRight: (
        <Button
          title="Add"
          onPress={() => {
            console.log('Right Button Tapped');
            NavigationService.navigateForFridgeView('AddIngredient');
          }}
        />
      ),
      // tabBarIcon: <Icon name="fridge" size={40} />,
    };
  };

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
    <MyIngredient
      id={item.id}
      name={item.name}
      // image={item.image}
      image={require(`../assets/ingredients/tomato.png`)}
      desc={item.description}
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
          style={{flex: 1}}
          data={this.state.searchingIngredient}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={2}
        />
        {/* TODO: Make Add Button */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    // flex: 1,
    height: 400,
  },
  ingredientContainer: {},
  item: {
    flex: 0.5,
    flexDirection: 'row',
    // width: (screenWidth - 30) / 2,
    height: 70,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 32,
  },
  ingredientImage: {
    // flexDirection: 'row',
    width: 45,
    height: 45,
  },
  ingredientName: {
    fontSize: 20,
  },
  ingredientDesc: {
    fontSize: 13,
    color: 'gray',
  },
  ingredientTextView: {
    paddingLeft: 10,
    flexDirection: 'column',
  },
});

export default MyFridgeView;
