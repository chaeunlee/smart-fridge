import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../navigation/NavigationService.js';

const screenWidth = Math.round(Dimensions.get('window').width);

class Recipe extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isBookmarked: false,
    };
  }

  pressIngredient = () => {
    NavigationService.navigateForRecipesView('DetailRecipes', {
      id: this.props.id,
      name: this.props.name,
      image: this.props.image,
    });
  };

  tabBookmark = id => {
    this.setState({isBookmarked: !this.state.isBookmarked});
    console.log(`id: ${id}`);
  };

  render() {
    return (
      <TouchableHighlight
        onPress={this.pressIngredient}
        style={[
          styles.itemContainer,
          this.props.name.length > 30 ? {height: 280} : {height: 250},
        ]}
        activeOpacity={1}
        underlayColor="lightgray">
        <View style={styles.item}>
          <View>
            <Image
              style={styles.foodImage}
              source={{uri: this.props.image, cache: 'force-cache'}}
            />
            <View style={styles.labelContainer}>
              <View style={styles.foodNameContainer}>
                <Text style={styles.foodName}>{this.props.name}</Text>
              </View>
              <View style={styles.bookmarkContainer}>
                <TouchableOpacity
                  onPress={() => this.tabBookmark(this.props.id)}>
                  <Icon
                    name={
                      this.state.isBookmarked ? 'bookmark' : 'bookmark-border'
                    }
                    size={40}
                    backgroundColor="transparent"
                    iconStyle={{marginTop: 5}}
                    color="#5ccaf0"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  ingredientContainer: {},
  itemContainer: {
    flex: 1,
    marginVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  },
  item: {
    alignItems: 'center',
  },
  foodImage: {
    width: screenWidth - 20,
    borderRadius: 10,
    height: 200,
  },
  foodName: {
    fontSize: 25,
    fontWeight: '600',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  labelContainer: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  foodNameContainer: {
    flex: 1,
  },
  bookmarkContainer: {
    flex: 0.15,
  },
});

export default Recipe;
