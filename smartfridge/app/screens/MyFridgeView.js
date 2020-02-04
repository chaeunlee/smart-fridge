import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Platform,
  FlatList,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {material, human} from 'react-native-typography';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  updateIngredient,
  deleteIngredient,
  queryAllIngredients,
  insertNewIngredient,
} from '../models/IngredientSchemas';
import realm from '../models/IngredientSchemas';
// import NavigationService from '../navigation/NavigationService.js';
import Ingredient from '../components/Ingredient';
import AnimatedHeader from '../utils/AnimatedHeader';
import CustomSearchBar from '../utils/AnimatedHeader/CustomSearchBar';
// import AnimatedSearchBar from '../utils/AnimatedSearchBar/AnimatedSearchBar';

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
  // static navigationOptions = () => ({
  //   title: 'My Fridge',
  //   // headerTintColor: 'blue',
  //   headerRight: (
  //     <Button
  //       title="Config"
  //       // color="#8bc7e9"
  //       onPress={() => {
  //         console.log('Right Button Tapped');
  //         // NavigationService.navigateForFridgeView('AddIngredient');
  //       }}
  //     />
  //   ),
  // });

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
      image={require('../assets/ingredients/tomato.png')}
      desc={item.description}
      forMyFridgeView={true}
      navigation={this.props.navigation}
    />
  );

  /* Tap (+) button for adding ingredients */
  _addIngredient = type => {
    switch (type) {
      case 'search':
        // NavigationService.navigateForFridgeView('AddIngredient');
        this.props.navigation.navigate('AddIngredient');
        break;
      case 'scan_receipt':
        break;
      case 'scan_barcode':
        break;
    }
  };

  render() {
    const {search} = this.state;
    const actions = [
      {
        text: 'Search',
        // icon: require('../assets/ingredients/tomato.png'),
        name: 'search',
        position: 3,
        color: '#79c8ec',
      },
      {
        text: 'Scan Receipt ',
        // icon: require('../assets/ingredients/tomato.png'),
        name: 'scan_receipt',
        position: 1,
        color: '#79c8ec',
      },
      {
        text: 'Scan Barcode',
        // icon: require('../assets/ingredients/tomato.png'),
        name: 'scan_barcode',
        position: 2,
        color: '#79c8ec',
      },
    ];

    return (
      <SafeAreaView style={styles.container}>
        <AnimatedHeader
          style={styles.animatedHeader}
          title="My Fridge"
          renderRight={() => (
            <TouchableOpacity
              onPress={() => console.log('Setting button tapped')}
              style={styles.setting}>
              <Icon
                name="ios-settings"
                size={40}
                backgroundColor="transparent"
                color="#79c8ec"
              />
            </TouchableOpacity>
          )}
          titleStyle={styles.largeTitle}
          backTextStyle={styles.smallTitle}
          headerMaxHeight={120}
          disabled={false}>
          <FlatList
            // style={{flex: 1}}
            data={this.state.searchingIngredient}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            numColumns={2}
          />
        </AnimatedHeader>
        <FloatingAction
          actions={actions}
          color="#79c8ec"
          shadow={{
            shadowOpacity: 0.1,
            shadowOffset: {width: 0, height: 5},
            shadowColor: '#000000',
            shadowRadius: 3,
          }}
          onPressItem={name => {
            this._addIngredient(name);
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  animatedHeader: {
    flex: 1,
  },
  setting: {
    right: 20,
    bottom: 10,
  },
  largeTitle: {
    ...human.largeTitleObject,
    fontSize: 35,
    fontWeight: '600',
    // left: 20,
    bottom: 20,
    color: '#000',
  },
  smallTitle: {
    fontSize: 20,
    bottom: 20,
  },
});

export default MyFridgeView;
