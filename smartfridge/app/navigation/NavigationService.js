// NavigationService.js

import {NavigationActions} from 'react-navigation';

let _navigatorForFridgeView;
let _navigatorForRecipesView;
let _navigatorForBookmarkView;

function setTopLevelNavigatorForFrideView(navigatorRef) {
  _navigatorForFridgeView = navigatorRef;
}

function setTopLevelNavigatorForRecipesView(navigatorRef) {
  _navigatorForRecipesView = navigatorRef;
}

function setTopLevelNavigatorForBookmarkView(navigatorRef) {
  _navigatorForBookmarkView = navigatorRef;
}

function navigateForFridgeView(routeName, params) {
  _navigatorForFridgeView.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function navigateForRecipesView(routeName, params) {
  _navigatorForRecipesView.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function navigateForBookmarkView(routeName, params) {
  _navigatorForBookmarkView.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

// add other navigation functions that you need and export them

export default {
  navigateForRecipesView,
  navigateForFridgeView,
  navigateForBookmarkView,
  setTopLevelNavigatorForFrideView,
  setTopLevelNavigatorForRecipesView,
  setTopLevelNavigatorForBookmarkView,
};
