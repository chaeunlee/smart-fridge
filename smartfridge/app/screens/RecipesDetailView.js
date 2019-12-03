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
  Dimensions,
  Image,
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

class RecipesDetailView extends Component {
  state = {
    foodName: '',
    foodImage: '',
    ingredients: [],
    steps: [],
  };
  static navigationOptions = {
    title: 'Detail Recipe',
  };

  _keyExtractor = (item, index) => item.id;

  renderItem = ({item}) => (
    <View style={styles.item}>
      <Image style={styles.ingredientImage} source={item.image} />
      <Text style={styles.ingredientName}>{item.label}</Text>
    </View>
  );

  // renderItem = ({item}) => (
  //   <View style={styles.item}>
  //     <Image style={styles.ingredientImage} source={item.image} />
  //     <Text style={styles.ingredientName}>{item.label}</Text>
  //   </View>
  // );

  data = [
    {
      id: 1,
      image: require('../assets/ingredients/cabbage.png'),
      label: 'Cabbage',
      description: '2 days ago',
    },
    {
      id: 2,
      image: require('../assets/ingredients/bacon.png'),
      label: 'Bacon',
      description: '',
    },

    {
      id: 4,
      image: require('../assets/ingredients/eggs.png'),
      label: 'Eggs',
      description: 'Lidl',
    },
    {
      id: 5,
      image: require('../assets/ingredients/garlic.png'),
      label: 'Garlic',
      description: 'For brother',
    },
    {
      id: 6,
      image: require('../assets/ingredients/meat.png'),
      label: 'Meat',
      description: '',
    },
    {
      id: 7,
      image: require('../assets/ingredients/onion-1.png'),
      label: 'Oninon',
      description: '',
    },
  ];

  recipesData = ['Make noodles', 'Make source', 'Complete'];

  render() {
    const {navigation} = this.props;
    const state = this.state;
    const name = navigation.getParam('name');
    const image = navigation.getParam('image');
    const ingres = navigation.getParam('ingres');
    // this.setState({
    //   state.foodName = name
    // });

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.foodImage} source={image} />
        </View>
        <View style={styles.foodNameContainer}>
          <Text style={styles.foodName}>{name}</Text>
        </View>
        <View style={styles.ingredientContainer}>
          <FlatList
            // columnWrapperStyle={{ alignItem: 'flex-start' }}
            // style={{flex: 1}}
            data={this.data}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
            numColumns={3}
          />
        </View>
        <View style={styles.descriptionContainer}>
          <FlatList
            data={this.recipesData}
            renderItem={this.renderItem}
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
  },
  imageContainer: {
    height: 200,
    // flex: 1,
    alignItems: 'center',
  },
  foodNameContainer: {
    // flex: 1,
    height: 50,
    paddingLeft: 8,
  },
  ingredientContainer: {
    // flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-around',
    width: screenWidth,
    // padding: 10,
  },
  ingredientName: {
    fontSize: 15,
  },
  ingredientImage: {
    // flexDirection: 'row',
    width: 35,
    height: 35,
  },
  descriptionContainer: {
    // alignItems: 'center',
    paddingLeft: 12,
    justifyContent: 'center',
  },
  item: {
    flex: 0.3,
    flexDirection: 'column',
    // width: (screenWidth - 30) / 3,
    height: 70,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodImage: {
    // flexDirection: 'row',
    // flex: 1,
    width: screenWidth - 20,
    borderRadius: 15,
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

export default RecipesDetailView;
