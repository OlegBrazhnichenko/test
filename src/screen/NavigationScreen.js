


import React, {Component} from 'react';
import {StyleSheet, View, AsyncStorage, Image} from 'react-native';
import { TextEntryElement, TextElement, CustomStatusBarWithRoot, ButtonElement, Header } from '../component';
import { alertMessage } from '../utils/utility';
import {LOGOUT} from '../utils/constants';
import axios from 'axios';

export default class NavigationScreen extends Component {

  constructor(props) {
      super(props);
      console.disableYellowBox = true;
      // const { navigate } = this.props.navigation;
      // navigate('SignUpScreen')
      this.state = {
        email: "",
        password: "",
        emailerror: "",
        passworderror: "",
        emailTouched: false,
        passwordTouched: false,
        isShow: false,
        activeTab: "",
      };
    }

  handleChange(value, field) {
      this.setState({ [field]: value }, () => {
        // this.emailTest(this.state.email);
        // this.passwordTest(this.state.password);
      });
    }

    goBack(){
      this.props.navigation.goBack();
    }
  componentWillMount() {
    this.testAuth();
  }
  async testAuth(){
    const token = await AsyncStorage.getItem("token");
    if(!token) {
      alertMessage("You are unauthorized, please sign in");
      this.props.navigation.navigate("Login");
    }
  }

  async logout() {
    const token = await AsyncStorage.getItem("token");
    const config = {headers: {
      Authorization: "Bearer "+token,
      'Access-Control-Allow-Origin': '*'
    }};
    axios.get(LOGOUT, config).then((response) => {
      if(response.status === 200){
        AsyncStorage.setItem("token", "");
        this.props.navigation.navigate('Login')
      }
    }).catch(() => {
      AsyncStorage.setItem("token", "");
      this.props.navigation.navigate('Login')
    });
  }
  render() {
    return (

      <CustomStatusBarWithRoot>

      <Header isBackPress={true} onBackPress={()=> this.goBack()}>
        Dashboard
      </Header>

      <View style={styles.container}>
        <ButtonElement style={{ marginTop: 10 }} onPress={() => this.props.navigation.navigate('Profile')} >
          Profile
        </ButtonElement>
        <ButtonElement style={{ marginTop: 10 }} onPress={() => this.props.navigation.navigate('ListingMap')} >
          Browse listings
        </ButtonElement>
        <ButtonElement style={{ marginTop: 10 }} onPress={() => {
          this.props.navigation.navigate('ClaimListing')
        }} >
          Claimed listings
        </ButtonElement>
        <ButtonElement style={{ marginTop: 10 }} onPress={() => {this.logout()}} >
          Logout
        </ButtonElement>
      </View>

      </CustomStatusBarWithRoot>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding : 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
