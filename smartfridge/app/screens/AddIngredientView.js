import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {human} from 'react-native-typography';
import {insertNewIngredient} from '../models/IngredientSchemas';

class AddIngredientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      name: '',
      description: '',
      search: '',
    };
  }

  componentDidMount() {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${this.state.query}&json=1`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        const {products: ingredients} = responseJson;
        this.setState({ingredients});
        console.log(ingredients.length);
      })
      .catch(error => {
        console.log(error);
      });
  }

  _updateSearch = search => {
    this.setState({search});
  };

  _addIngredientToModel = () => {
    const newIngredient = {
      id: Math.floor(Date.now() / 1000),
      name: this.state.name,
      description: this.state.description,
      creationDate: new Date(),
    };
    insertNewIngredient(newIngredient)
      .then()
      .catch(error => console.log(`Error occurs: ${error}`));
  };

  render() {
    const {search} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Button
            style={styles.button}
            title="Cancel"
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Button
            style={styles.button}
            title="Add "
            onPress={() => {
              this._addIngredientToModel();
              this.props.navigation.goBack();
            }}
          />
        </View>
        <Text style={styles.title}>Add Ingredients</Text>
        <SearchBar
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          // showCancel={true}
          cancelButtonTitle=""
          cancelButtonProps={{
            disabled: true,
            buttonStyle: {
              width: 7,
              buttonDisabledTextStyle: 'transparent',
            },
          }}
          inputContainerStyle={{backgroundColor: '#eaeaea'}}
          containerStyle={{backgroundColor: 'white'}}
          placeholder="Search for ingredients"
          placeholderTextColor="#cacbcd"
          onChangeText={this._updateSearch}
          value={search}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  button: {},
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  title: {
    ...human.titleObject,
    fontSize: 45,
    fontWeight: '600',
    marginHorizontal: 10,
  },
});

export default AddIngredientView;
