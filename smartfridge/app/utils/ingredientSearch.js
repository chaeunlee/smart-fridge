// import Autocomplete from 'react-native-autocomplete-input';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

class IngredientSearch extends Component {
  static showIng(ing) {
    return (
      <View>
        <Text style={styles.titleText}>{ing.product_name}</Text>
        <Image
          source={{uri: `${ing.image_front_small_url}`}}
          style={{width: 400, height: 400}}
        />
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      query: '',
    };
  }

  componentDidMount() {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${this.state.query}&json=1`;
    fetch(url)
      .then(res => res.json())
      .then(json => {
        const {products: ingredients} = json;
        this.setState({ingredients});
        console.log(ingredients);
      });
  }

  findIngredient(query) {
    if (query === '') {
      return [];
    }

    const ingredients = this.state.ingredients;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return ingredients.filter(
      ingredient => ingredient.product_name.search(regex) >= 0,
    );
  }

  render() {
    const {query} = this.state;
    const ingredients = this.findIngredient(query);
    //const ingredients = this.state.ingredients;
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <View style={styles.container}>
        {/* <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={
            ingredients.length === 1 && comp(query, ingredients[0].product_name)
              ? []
              : ingredients
          }
          defaultValue={query}
          onChangeText={text => {
            this.setState({query: text});
            const url = `https://fr-en.openfoodfacts.org/cgi/search.pl?search_terms=${text}&json=1`;
            fetch(url)
              .then(res => res.json())
              .then(json => {
                const {products: ingredients} = json;
                this.setState({ingredients});
              });
          }}
          placeholder="Search for an ingredient"
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.setState({query: item.product_name})}>
              <Text style={styles.itemText}>{item.product_name}</Text>
            </TouchableOpacity>
          )}
        /> */}
        <View style={styles.descriptionContainer}>
          {ingredients.length > 0 ? (
            HelloWorldApp.showIng(ingredients[0])
          ) : (
            <Text style={styles.infoText}>Search for an ingredient</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25,
  },
  infoText: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  openingText: {
    textAlign: 'center',
  },
});

export default IngredientSearch;
