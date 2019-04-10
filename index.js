/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import Home from './src/screen/Home';
import App from './App';
import Signup from './src/screen/Signup';
import {name as appName} from './app.json';

// const reactNavigationSample = props => ( 
//     <Home navigation={props.navigation} />
//   );
  
//   reactNavigationSample.navigationOptions = {
//     title: ""
//   };
  
//   const SimpleApp = StackNavigator(
//     {
//       reactNavigationSample: { screen: reactNavigationSample },
//       Login: { screen: Login, title: "Login" },
//       Signup: { screen: Signup, title: "Signup" },
//     },
//     { headerMode: "none", navigationOptions: { gesturesEnabled: false } },
//     {
//       transitionConfig: () => ({ screenInterpolator: () => null })
//     }
//   );
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
AppRegistry.registerComponent(appName, () => App);
