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
  TextInput,
  Alert,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {
  updateIngredient,
  deleteIngredient,
  queryAllIngredients,
  insertNewIngredient,
} from '../models/IngredientSchemas';
import realm from '../models/IngredientSchemas';
import NavigationService from '../navigation/NavigationService.js';

class AddIngredientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  addIngredientToModel = () => {
    const newIngredient = {
      id: Math.floor(Date.now() / 1000),
      name: this.state.name,
      description: this.state.description,
      creationDate: new Date(),
    };
    insertNewIngredient(newIngredient)
      .then()
      .catch(error => Alert.alert(`Error occurs: ${error}`));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> Add ingdredient </Text>

        <TextInput
          style={styles.textInput}
          placeholder="name"
          onChangeText={text => this.setState({name: text})}
          //   value={value}
        />
        <TextInput
          style={styles.textInput}
          placeholder="description"
          onChangeText={text => this.setState({description: text})}
          //   value={value}
        />
        <Button
          title="Add"
          onPress={() => {
            console.log(this.state.name, this.state.description);
            this.addIngredientToModel();
            this.props.navigation.goBack();
          }}
        />
        <Button title="Cancel" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    paddingLeft: 50,
    paddingRight: 50,
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
  },
});

export default AddIngredientView;
