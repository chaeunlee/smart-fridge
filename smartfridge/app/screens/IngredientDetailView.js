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
// import SearchBar from 'react-native-dynamic-search-bar';
import {SearchBar} from 'react-native-elements';

// var path = require('path');

class IngredientDetailView extends Component {
  static navigationOptions = {
    title: 'Detail Ingredient',
  };

  render() {
    const {navigation} = this.props;
    const id = navigation.getParam('id');
    const name = navigation.getParam('name');
    const image = navigation.getParam('image');
    const desc = navigation.getParam('desc');

    return (
      <View style={styles.container}>
        <Image style={styles.ingredientImage} source={image} />
        <Text style={styles.ingredientName}>{name}</Text>
        <Text style={styles.ingredientDesc}>{desc}</Text>
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
    paddingBottom: 120,
    width: 100,
    height: 100,
  },
  ingredientName: {
    fontSize: 50,
    paddingTop: 50,
    paddingBottom: 50,
  },
  ingredientDesc: {
    fontSize: 30,
    color: 'gray',
  },
  ingredientTextView: {
    paddingLeft: 10,
    flexDirection: 'column',
  },
});

export default IngredientDetailView;
