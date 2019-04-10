import React from 'react';
import { Animated } from 'react-native';
import { createStackNavigator,createAppContainer } from 'react-navigation';
import Home from './src/screen/Home';
import Login from './src/screen/Login';
import Signup from './src/screen/Signup';
import Profile from './src/screen/Profile';
import ListingMap from './src/screen/ListingMap';
import NavigationScreen from "./src/screen/NavigationScreen"
import ClaimListing from "./src/screen/ClaimListing"

const MediatorScreen = props => (
    <Home navigation={props.navigation} />
);

const navigationStack = createStackNavigator({
    MediatorScreen: { screen: MediatorScreen },
    
    Login: { screen: Login, title: "Login" },
    Signup: { screen: Signup, title: "Signup" },
    Profile: { screen: Profile, title: "Profile" },
    ListingMap: { screen: ListingMap, title: "ListingMap" },
    NavigationScreen: { screen: NavigationScreen, title: "NavigationScreen" },
    ClaimListing: {screen: ClaimListing, title:"ClaimListing"}

}, { headerMode: "none", navigationOptions: { swipeEnabled: false },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
                timing: Animated.timing
            },
        }),},
);

const App = createAppContainer(navigationStack);
export default App;