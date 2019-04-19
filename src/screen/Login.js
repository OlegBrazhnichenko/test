

import React, {Component} from 'react';
import {StyleSheet, View, Image, AsyncStorage} from 'react-native';
import { TextEntryElement, TextElement, CustomStatusBarWithRoot, ButtonElement, Header, Progress } from '../component';
import { LOGIN_URL } from '../utils/constants';
import { alertMessage } from '../utils/utility';
import axios from "axios";
const URLSearchParams = require("form-data");

export default class Login extends Component {

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
          loading: false,
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
      getLogin(){
        let params = {
          // email: this.state.email,
          // password: this.state.password,
            email: "A@a.a",
            password: 'q',
        };
        const config = {
          headers: {
            'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache',
              'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Authorization'
          }
        };
        console.log("this.state.email",JSON.stringify(params));
        this.setState({loading:true});
        axios.post(LOGIN_URL,JSON.stringify(params), config )
        .then((response) => {

          console.log("response", response);
          this.setState({loading:false});
          if(response.status === 200){
            AsyncStorage.setItem("token", response.data.access_token);
            this.props.navigation.navigate('NavigationScreen')
          } else {
            alertMessage(response.data.message);
          }
        })
        .catch((error) => {        
          alertMessage(error.message);
          this.setState({loading:false});
          console.log("error",error,  error.message);
        });
        
      }
  render() {
    return (

      <CustomStatusBarWithRoot>
      <Header onBackPress={()=> this.goBack()}>
        Sign in
      </Header>
      <View style={styles.container}>

        <Image
            style={{ width: 200, height: 200, alignSelf: "center" }}
            source={require("./../../images/logo.png")}
            />

        <TextElement style={{ fontSize: 16, padding: 2 }}>
            Email
        </TextElement>

        <TextEntryElement 
        placeholder="Email"
        errorMessage={
          this.state.emailerror
        }
        onChangeText={email => this.handleChange(email, "email")}
        onSubmitEditing={()=> {
          
        }} />

        <TextElement style={{ marginTop: 20, fontSize: 16, padding: 2 }}>
            Password
        </TextElement>

        <TextEntryElement 
        placeholder="Password"
        errorMessage={
          this.state.emailerror
        }
        secureTextEntry
        onChangeText={password => this.handleChange(password, "password")}
        onSubmitEditing={()=> {
          
        }} />

        <ButtonElement
                style={{ marginTop: 30 }}
                onPress={() => this.getLogin()}
              >
                SIGN IN
              </ButtonElement>
      </View>
      <Progress isShow={this.state.loading} />
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
