/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, lazy} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
// } from 'react-native';
import MyFridgeNavigationRoot from './app/navigation/MyFridgeNavigationRoot';
import RecipesNavigationRoot from './app/navigation/RecipesNavigationRoot';
import BookmarkNavigationRoot from './app/navigation/BookmarkNavigationRoot';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Home: {
//         screen: HomeScreen,
//         navigationOptions: {
//             tabBarLabel: 'Home',
//             tabBarIcon: ({ tintColor }) => (
//                 <Ionicons name="ios-home" color={tintColor} size={25} />
//             )
//         }
//     },

const TabNavigator = createBottomTabNavigator(
  {
    MyFridge: {
      screen: MyFridgeNavigationRoot,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="fridge" color={tintColor} size={25} />
        ),
      },
    },
    Recipes: {
      screen: RecipesNavigationRoot,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="food" color={tintColor} size={30} />
        ),
      },
    },
    Bookmark: {
      screen: BookmarkNavigationRoot,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="bookmark" color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#5ccaf0',
      inactiveTintColor: 'lightgray',
      showIcon: true,
    },
  },
);

export default createAppContainer(TabNavigator);
