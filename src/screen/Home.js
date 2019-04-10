

import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import { TextEntryElement, TextElement, ButtonElement } from '../component';


export default class Home extends Component {

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
          this.emailTest(this.state.email);
          this.passwordTest(this.state.password);
        });
      }

  render() {
    return (
      <View style={styles.container}>

        <Image
            style={{ width: 200, height: 200, marginTop: 100, alignSelf: "center" }}
            source={require("./../../images/logo.png")}
            />

            <View style={{flex:1}} />

            <View style = {{flexDirection:"row", marginBottom:100}}>

              <ButtonElement
                style={{ marginRight:5, flex:1 }}
                onPress={() => this.props.navigation.navigate('Login')}
              >
                SIGN IN
              </ButtonElement>

              <ButtonElement
                style={{ marginLeft:5, flex:1 }}
                onPress={() => this.props.navigation.navigate('Signup')}
              >
                SIGN UP
              </ButtonElement>

            </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
