import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {material, human} from 'react-native-typography';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import Ingredient from '../components/Ingredient';
import Step from '../components/Step';
import AnimatedHeader from '../utils/AnimatedHeader';
import {insertNewBookmark} from '../models/BookmarkSchemas';

const screenWidth = Math.round(Dimensions.get('window').width);

class RecipesDetailView extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      isLoading: true,
      isBookmarked: false,
      dataSource: null,
      foodId: navigation.getParam('id'),
      foodImage: navigation.getParam('image'),
      foodName: navigation.getParam('name'),
      ingredients: [],
      steps: [],
    };
  }

  _addBookmarkToModel = () => {
    const newBookmark = {
      id: this.state.foodId,
      name: this.state.foodName,
      image: this.state.foodImage,
      creationDate: new Date(),
    };
    insertNewBookmark(newBookmark)
      .then()
      .catch(error => console.log(`Error occurs: ${error}`));
  };

  static navigationOptions = {
    title: 'Detail Recipe',
  };

  async componentDidMount() {
    // Only for Testing
    let tempIngreList = [];
    let tempStepsList = [];
    tempStepsList.push('Preheat the oven to 425°F (220°C)');
    tempStepsList.push(
      'Remove the large, tough outer leaves from cauliflower, and reserve any smaller, tender leaves. Cut cauliflower into medium florets.',
    );
    tempStepsList.push(
      'In a large bowl, toss the cauliflower florets with the olive oil, salt, pepper, za’atar, and cumin. Spread in an even layer on 2 baking sheets, making sure the florets have some space between them.',
    );
    tempStepsList.push(
      'Remove the large, tough outer leaves from cauliflower, and reserve any smaller, tender leaves. Cut cauliflower into medium florets.',
    );
    tempStepsList.push('Enjoy!');
    tempIngreList.push('Onion');
    tempIngreList.push('Onion');
    tempIngreList.push('Onion');
    tempIngreList.push('Onion');
    tempIngreList.push('Onion');
    tempIngreList.push('Onion');
    tempIngreList.push('Onion');
    tempIngreList.push('Onion');
    tempIngreList.push('Onion');
    tempIngreList.push('Onion');
    tempIngreList.push('Onion');
    this.setState({
      ingredients: tempIngreList,
      steps: tempStepsList,
    });

    // Fetch API
    /*
    const foodId = this.state.foodId;
    console.log('FOODNAME: ' + this.state.foodName);

    // fetch detail recipe from API by using the Id
    console.log('FOODID: ' + foodId);
    fetch(`https://tasty.p.rapidapi.com/recipes/detail?id=${foodId}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'tasty.p.rapidapi.com',
        'x-rapidapi-key': '8e3a4594f8msh9b01cae7ba74d1ap171ad5jsn0a5db15ae82b',
        'content-type': 'application/json',
      },
    })
      .then(response => {
        // console.log(typeof response);
        return response.json();
      })
      .then(responseJson => {
        // console.log('responseJSON: ', responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
        return responseJson;
      })
      .then(responseJson => {
        let tempIngredients = [];
        let tempSteps = [];
        for (const component of responseJson.sections[0].components) {
          tempIngredients.push(component.ingredient.name);
        }

        for (const step of responseJson.instructions) {
          tempSteps.push(step.display_text);
        }

        this.setState({
          ingredients: tempIngredients,
          steps: tempSteps,
        });
      })
      .then(() => {
        console.log('FOODNAME: ' + this.state.foodName);
        console.log('INFO: ' + this.state.foodId);
        // this.state.steps.map(step => {
        //   console.log('STEP');
        //   console.log(step);
        // });
      })
      .catch(err => {
        console.log(err);
      });
      */
  }

  _keyExtractor = (item, index) => item.id;

  _renderIngredients = ({item}) => (
    <Ingredient
      name={item}
      image={require(`../assets/ingredients/tomato.png`)}
      forMyFridgeView={false}
    />
  );

  render() {
    const {foodName, foodImage, ingredients, steps} = this.state;
    // const blu

    return (
      // <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AnimatedHeader
          style={styles.animatedHeader}
          title={foodName}
          titleStyle={styles.largeTitle}
          backTextStyle={styles.smallTitle}
          headerMaxHeight={270}
          imageSource={{uri: foodImage, cache: 'force-cache'}}
          disabled={false}
          noBorder={true}
          tempSpace={50}
          renderLeft={() => (
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={[styles.backButton, styles.shadow]}>
              <Icon
                name="ios-arrow-back"
                size={40}
                // backgroundColor="transparent"
                color="white"
              />
            </TouchableOpacity>
          )}
          renderRight={() => (
            <TouchableOpacity
              onPress={() => {
                this._addBookmarkToModel();
                console.log('Bookmark button tapped');
              }}
              style={[styles.bookmarkButton, styles.shadow]}>
              <Icon2
                // name="bookmark"
                name={this.state.isBookmarked ? 'bookmark' : 'bookmark-o'}
                size={35}
                // backgroundColor="#79c8ec"
                // color="#79c8ec"
                color="white"
              />
            </TouchableOpacity>
          )}>
          <ScrollView>
            {/* <View style={styles.imageContainer}>
              <Image
                style={styles.foodImage}
                source={{uri: foodImage, cache: 'force-cache'}}
              />
            </View> */}
            <View>
              <View style={styles.bodyContainer}>
                {/* <Text style={styles.foodName}>{foodName}</Text> */}
                <View style={styles.ingredientContainer}>
                  <FlatList
                    data={ingredients}
                    renderItem={this._renderIngredients}
                    keyExtractor={(item, index) => index}
                    scrollEnabled={false}
                    numColumns={3}
                  />
                </View>
                <View style={styles.stepListContainer}>
                  {steps.map((step, index) => {
                    return <Step step={step} index={index} />;
                  })}
                </View>
              </View>
            </View>
          </ScrollView>
        </AnimatedHeader>
      </View>
      // {/* </SafeAreaView> */}
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // imageContainer: {
  //   height: 200,
  // },
  bodyContainer: {
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },

  ingredientContainer: {
    flex: 1,
    width: screenWidth - 30,
    paddingTop: 10,
  },
  stepListContainer: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  // foodImage: {
  //   width: screenWidth,
  //   height: 200,
  // },
  foodName: {
    fontSize: 35,
    fontWeight: '500',
  },
  animatedHeader: {
    flex: 1,
  },
  // setting: {
  //   right: 20,
  //   bottom: 10,
  // },
  largeTitle: {
    ...human.largeTitleObject,
    fontSize: 30,
    fontWeight: '600',
    // color: 'white',
    bottom: 20,
    // color: 'black',
    lineHeight: 30,
  },
  smallTitle: {
    fontSize: 20,
    bottom: 0,
    color: '#000',
  },
  backButton: {
    left: 20,
    bottom: 10,
    top: 40,
  },
  bookmarkButton: {
    right: 20,
    bottom: 10,
    top: 40,
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 2, // These can't both be 0
      height: 2, // i.e. the shadow has to be offset in some way
    },
  },
});

export default RecipesDetailView;
