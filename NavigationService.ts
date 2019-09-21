// NavigationService.js

import { NavigationActions, NavigationParams } from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(
  routeName: string,
  subName?: string,
  params?: NavigationParams
) {
  let action = subName
    ? NavigationActions.navigate({
        routeName: `${subName}`
      })
    : null;
  console.log(action);
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      action,
      
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator
};
