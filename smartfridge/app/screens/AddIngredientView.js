import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import SelectIngredientIcon from './SelectIngredientIcon';

import {SearchBar} from 'react-native-elements';
import {human} from 'react-native-typography';
import Modal from 'react-native-modal';

import {insertNewIngredient} from '../models/IngredientSchemas';

const screenWidth = Math.round(Dimensions.get('window').width);

class AddIngredientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      name: '',
      description: '',
      search: '',
      isModalVisible: true,
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
        // console.log(ingredients.length);
      })
      .catch(error => {
        console.log(error);
      });
  }

  _onChangeText = (text, isName) => {
    if (isName) {
      this.setState({name: text});
    } else {
      this.setState({description: text});
    }
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

  _toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
    // return <SelectIngredientIcon></SelectIngredientIcon>;
  };

  render() {
    const {name, description} = this.state;
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        style={{
          marginTop: 100,
          marginBottom: 0,
          alignItems: 'center',
          backfaceVisibility: 'hidden',
        }}
        deviceWidth={screenWidth}
        onSwipeComplete={() => {
          this._toggleModal();
          this.props.navigation.goBack();
        }}
        swipeDirection={['down']}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.modalBar} />
            {/* <Button
              style={styles.button}
              title="Cancel"
              onPress={() => {
                // this._selectIngredientIcon();
                this.setState({isModalVisible: false});
                this.props.navigation.goBack();
              }}
            /> */}
            {/* <Button
            style={styles.button}
            title="Add "
            onPress={() => {
              this._addIngredientToModel();
              this.props.navigation.goBack();
            }}
          /> */}
          </View>
          <Text style={styles.title}>Add Ingredients</Text>
          <View style={styles.inputViewContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={{flex: 1}}
                resizeMode="contain"
                source={require('../assets/ingredients/dummy.png')}
              />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.text}>Name*</Text>
              <View style={styles.nameInputView}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => this._onChangeText(text, true)}
                  value={name}
                />
              </View>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.text}>Description</Text>
              <View style={styles.nameInputView}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => this._onChangeText(text, false)}
                  value={description}
                />
              </View>
            </View>
            <Text style={styles.subText}>* required</Text>

            {/* <View style={styles.addButtonContainer}> */}
            <TouchableOpacity
              onPress={() => {
                this._addIngredientToModel();
                this._toggleModal();
                this.props.navigation.goBack();
              }}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this._toggleModal();
                this.props.navigation.goBack();
              }}
              style={styles.cancelButtonContainer}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* </View> */}
          </View>

          {/* <SearchBar
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
        /> */}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    // height: '95%',
    // marginHorizontal: 10,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  header: {
    height: 50,
    flexDirection: 'row',
    paddingTop: 15,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  modalBar: {
    width: 50,
    height: 5,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  title: {
    ...human.titleObject,
    fontSize: 45,
    fontWeight: '600',
    marginHorizontal: 15,
    flex: 0.1,
  },
  inputViewContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    // justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    paddingBottom: 5,
    // color: '#79c8ec',
  },
  imageText: {
    fontSize: 17,
    color: 'white',
  },
  subText: {
    color: 'lightgray',
  },
  imageContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    marginTop: 10,
    height: 80,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  textInput: {
    width: screenWidth - 100,
    height: 50,
    // borderColor: 'black',
    // backgroundColor: 'red',
  },
  // descContainer: {
  //   height: 100,
  //   width: screenWidth,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // backgroundColor: 'green',
  // },
  addButtonContainer: {
    height: 70,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
  },
  nameInputView: {
    width: screenWidth - 60,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
    width: screenWidth - 30,
    backgroundColor: '#79c8ec',
    marginTop: 35,
  },
  cancelButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
    width: screenWidth - 30,
    backgroundColor: 'white',
    // marginTop: 35,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  cancelButtonText: {
    color: '#79c8ec',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default AddIngredientView;
