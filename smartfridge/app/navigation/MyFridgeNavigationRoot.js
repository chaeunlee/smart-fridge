import React, {Component} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   Button,
// } from 'react-native';
import MyFridgeView from '../screens/MyFridgeView';
import IngredientDetailView from '../screens/IngredientDetailView';
import AddIngredientView from '../screens/AddIngredientView';
import NavigationService from './NavigationService';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const RootStack = createStackNavigator(
  {
    Home: MyFridgeView,
    DetailIngredient: IngredientDetailView,
    // TODO: AddingredientView mush be modal
    AddIngredient: AddIngredientView,
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(RootStack);

// export default AppContainer;
export default class App extends Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigatorForFrideView(navigatorRef);
        }}
      />
    );
  }
}
