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
import BookmarkView from '../screens/BookmarkView';
import RecipesDatailView from '../screens/RecipesDetailView';
import NavigationService from './NavigationService';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const RootStack = createStackNavigator(
  {
    Home: BookmarkView,
    DetailRecipes: RecipesDatailView,
  },
  {
    initialRouteName: 'Home',
    // headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);
export default AppContainer;

// export default class App extends Component {
//   render() {
//     return (
//       <AppContainer
//         ref={navigatorRef => {
//           NavigationService.setTopLevelNavigatorForBookmarkView(navigatorRef);
//         }}
//       />
//     );
//   }
// }
