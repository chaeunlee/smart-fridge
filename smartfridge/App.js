/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
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

const TabNavigator = createBottomTabNavigator({
  MyFridge: MyFridgeNavigationRoot,
  Recipes: RecipesNavigationRoot,
  Bookmark: BookmarkNavigationRoot,
});

export default createAppContainer(TabNavigator);
