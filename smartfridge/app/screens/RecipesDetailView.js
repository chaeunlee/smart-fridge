import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

class RecipesDetailView extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      isLoading: true,
      dataSource: null,
      foodId: navigation.getParam('id'),
      foodImage: navigation.getParam('image'),
      foodName: navigation.getParam('name'),
      ingredients: [],
      steps: [],
    };
  }

  static navigationOptions = {
    title: 'Detail Recipe',
  };

  async componentDidMount() {
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
      })
      .catch(err => {
        console.log(err);
      });
  }

  _keyExtractor = (item, index) => item.id;

  _renderIngredients = ({item}) => (
    <View style={{flex: 0.3}}>
      <View style={styles.item}>
        {/* <Image style={styles.ingredientImage} source={item.image} /> */}
        {/* <Text style={styles.ingredientName}>{item.label}</Text> */}
        <Text style={styles.ingredientName}>INGREIDNETN</Text>
      </View>
    </View>
  );

  render() {
    const {foodName, foodImage, ingredients, steps} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              style={styles.foodImage}
              source={{uri: foodImage, cache: 'force-cache'}}
            />
          </View>
          <View
            style={[
              styles.foodNameContainer,
              // foodName.length > 20 ? {height: 90} : {height: 50},
            ]}>
            <Text style={styles.foodName}>{foodName}</Text>
          </View>
          <View style={{flex: 1}}>
            <FlatList
              // style={{flex: 1}}
              data={ingredients}
              renderItem={this._renderIngredients}
              keyExtractor={(item, index) => index}
              scrollEnabled={false}
              numColumns={3}
            />
          </View>
          <View>
            <Text>SFSDFSDFSD</Text>
            <Text>SFSDFSDFSD</Text>
            <Text>SFSDFSDFSD</Text>
            <Text>SFSDFSDFSD</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
//render(){
//      this.state.brandsToCompare.map(brand => <PickerModalContainer brand={brand}/>)
// }
const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

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
    // height: 50,
    width: screenWidth,
    paddingLeft: 8,
    // backgroundColor: 'red',
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
  stepContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 20,
    fontWeight: '300',
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
