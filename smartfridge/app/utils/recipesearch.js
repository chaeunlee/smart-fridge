import React from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';

const searchRecipesByIngredients = ingredientList => {};

export default class Source extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Source Listing',
      headerStyle: {backgroundColor: '#fff'},
      headerTitleStyle: {textAlign: 'center', flex: 1},
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      text: null,
    };
  }
  // fetch -> request & response
  componentDidMount() {
    fetch('https://tasty.p.rapidapi.com/tags/list', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'tasty.p.rapidapi.com',
        'x-rapidapi-key': '8e3a4594f8msh9b01cae7ba74d1ap171ad5jsn0a5db15ae82b',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  //request

  //render
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      let count = this.state.dataSource.count;

      return (
        //dealing with data
        <View style={styles.container}>
          <Text>{count}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
