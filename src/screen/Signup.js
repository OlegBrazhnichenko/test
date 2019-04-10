

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, AsyncStorage} from 'react-native';
import { TextEntryElement, TextElement, ButtonElement, CustomStatusBarWithRoot, Header, Progress, } from '../component';
import { SIGNUP_URL } from '../utils/constants';
import axios from "axios";
import { alertMessage } from '../utils/utility';
const URLSearchParams = require("form-data");

export default class Signup extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        // const { navigate } = this.props.navigation;
        // navigate('SignUpScreen')
        this.state = {
          businessName: "",
          contactName: "",
          address: "",
          phone: "",
          businessType: "",
          email: "",
          password: "",
          password: "",
          confirmPassword: "",
          passworderror: "",
          emailTouched: false,
          passwordTouched: false,
          isShow: false,
          activeTab: "",
          loading:false,
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
  signup(){
    // var params = new URLSearchParams();
    // params.append('email', this.state.email);
    // // params.append('phone', this.state.phone);
    // params.append('password', this.state.password);
    // params.append('c_password', this.state.confirmPassword);

    let params = {
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        c_password: this.state.confirmPassword,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };
    this.setState({loading:true});
    axios.post(SIGNUP_URL,params, config )
    .then((response) => {
      console.log("response", response);
      
      this.setState({loading:false});
      if(response.status === 201){
        AsyncStorage.setItem("token", response.data.access_token);
        this.props.navigation.navigate('NavigationScreen')
      } else {
        alertMessage(response.data.message);
      }
    })
    .catch((error) => {        
      alertMessage("error",error.message);
      this.setState({loading:false});
      console.log("error",  error.message);
    });
  }
  render() {

    const { constainEditText } = styles;

    return (

      <CustomStatusBarWithRoot>
      <View style={styles.container}>

      <Header onBackPress={()=> this.goBack()}>
        Sign up
      </Header>

        <ScrollView>

        <TextElement style={constainEditText}>
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

      <TextElement style={constainEditText}>
      Phone
        </TextElement>

        <TextEntryElement 
        placeholder="Phone"
        errorMessage={
          this.state.emailerror
        }
        keyboardType={"numeric"}
        onChangeText={phone => this.handleChange(phone, "phone")}
        onSubmitEditing={()=> {
          
        }} />

        <TextElement style={constainEditText}>
            Password
        </TextElement>

        <TextEntryElement 
        placeholder="Password"
        errorMessage={
          this.state.passworderror
        }
        secureTextEntry
        onChangeText={password => this.handleChange(password, "password")}
        onSubmitEditing={()=> {
          
        }} />

<TextElement style={constainEditText}>
            Confirm Password
        </TextElement>

        <TextEntryElement 
        placeholder="Confirm Password"
        errorMessage={
          this.state.passworderror
        }
        secureTextEntry
        onChangeText={confirmPassword => this.handleChange(confirmPassword, "confirmPassword")}
        onSubmitEditing={()=> {
          
        }} />

        <ButtonElement
                style={{ marginTop: 30 }}
                onPress={() => this.signup()}
              >
                SIGN UP
              </ButtonElement>

      </ScrollView>

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
  constainEditText: {
    marginTop: 5,
    fontSize: 16,
    padding: 2,
  },
});
