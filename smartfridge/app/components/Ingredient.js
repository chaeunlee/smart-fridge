import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {human, material} from 'react-native-typography';
import {deleteIngredient} from '../models/IngredientSchemas';
import NavigationService from '../navigation/NavigationService.js';

class Ingredient extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  pressIngredient = () => {
    this.props.navigation.navigate('DetailIngredient', {
      id: this.props.id,
      name: this.props.name,
      image: this.props.image,
      desc: this.props.desc,
    });
    // NavigationService.navigate('IngredientDetailView');
    // NavigationService.navigateForFridgeView('DetailIngredient', {
    //   id: this.props.id,
    //   name: this.props.name,
    //   image: this.props.image,
    //   desc: this.props.desc,
    // });
  };

  render() {
    const {image, name, desc, forMyFridgeView} = this.props;

    if (forMyFridgeView) {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.pressIngredient} style={styles.item}>
            <Image style={styles.ingredientImage} source={image} />
            <View style={styles.ingredientTextView}>
              <Text style={styles.ingredientName}>{name}</Text>
              <Text style={styles.ingredientDesc}>{desc}</Text>
            </View>
          </TouchableOpacity>
          <Button
            title="delete(temp)"
            onPress={() =>
              deleteIngredient(this.props.id)
                .then()
                .catch(error =>
                  console.log(`Error occurs on deleting: ${error}`),
                )
            }
          />
        </View>
      );
    } else {
      return (
        <View style={stylesForDetail.container}>
          <View style={stylesForDetail.item}>
            <Image style={stylesForDetail.ingredientImage} source={image} />
            <Text style={stylesForDetail.ingredientName}>{name}</Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  /*  For My Fridge View  */
  container: {
    flex: 0.5,
  },
  item: {
    flex: 0.5,
    flexDirection: 'row',
    height: 70,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  ingredientName: {
    ...human.title2Object,
    fontSize: 20,
    fontWeight: '500',
  },
  ingredientImage: {
    width: 45,
    height: 45,
  },
  ingredientDesc: {
    ...human.body,
    fontSize: 18,
    fontWeight: '400',
    color: 'gray',
  },
  ingredientTextView: {
    paddingLeft: 10,
    flexDirection: 'column',
  },
});

const stylesForDetail = StyleSheet.create({
  /*  For Detail Recipe View  */
  container: {
    flex: 1,
  },
  item: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 10,
    margin: 5,
  },
  ingredientImage: {
    width: 35,
    height: 35,
  },
  ingredientName: {
    fontSize: 20,
    fontWeight: '300',
    paddingLeft: 10,
  },
});

export default Ingredient;
