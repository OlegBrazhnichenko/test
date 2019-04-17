

import React, {Component} from 'react';
import {StyleSheet, View, Image, AsyncStorage} from 'react-native';
import { TextEntryElement, TextElement, CustomStatusBarWithRoot, ButtonElement, Header, Progress, CardView, ListingItem } from '../component';
import { LOGIN_URL, GET_LISTINGS, GET_WASTES } from '../utils/constants';
import { alertMessage } from '../utils/utility';
import axios from "axios";
import { FlatList } from 'react-native-gesture-handler';
const URLSearchParams = require("form-data");


export default class ClaimListing extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        // const { navigate } = this.props.navigation;
        // navigate('SignUpScreen')
        this.getListing = this.getListing.bind(this);
        this.state = {
          emailerror: "",
          passworderror: "",
          emailTouched: false,
          passwordTouched: false,
          isShow: false,
          activeTab: "",
          loading: false,
          userID:"",
          listingData:[],
        };
      }

    handleChange(value, field) {
        this.setState({ [field]: value }, () => {
          // this.emailTest(this.state.email);
          // this.passwordTest(this.state.password);
        });
      }
      componentDidMount(){
        this.getAsyncData();
        this.testAuth();
      }
      async getAsyncData(){
        this.getListing();
        const token = await AsyncStorage.getItem("token");
        this.setState({
          token: token,
        }, ()=> {
          this.getWastes();
        });
      }
      async testAuth(){
        const token = await AsyncStorage.getItem("token");
        if(!token) {
          alertMessage("You are unauthorized, please sign in");
          this.props.navigation.navigate("Login");
        }
      }
      goBack(){
        this.props.navigation.goBack();
      }
      getListing(){

        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        };

        this.setState({loading:true});
        axios.get(GET_LISTINGS, config )
        .then((response) => {
          this.setState({loading:false});
          if(response.status === 200){
            console.log(response);
            this.setState({listingData: response.data});
          } else {
            alertMessage(response.data.message);
          }
        })
        .catch((error) => {        
          alertMessage(error.message);
          this.setState({loading:false});
          console.log("error",  error.message);
        });
        
      }
      getWastes() {
        const config = {headers: {
          // Authorization: "Bearer "+this.state.token,
          'Access-Control-Allow-Origin': '*'
        }};
        this.setState({loading:true});

        axios.get(GET_WASTES, config)
          .then((response) => {
            this.setState({loading:false});
            if(response.status === 200){
              this.setState({
                wasteTypes: response.data.map((el)=>{return {key: el.id, value:el.name}}),
              });
            } else {
              alertMessage(response.data.message);
            }
          })
          .catch((error) => {
            alertMessage(error.message);
            this.setState({loading:false});
            console.log("error",  error);
          });
      }
      getImage(imageType){
        if(imageType === "coffee"){
          return require("./../../images/coffee_waste.png");
        } else if(imageType === "beer"){
          return require("./../../images/beer_waste.png");
        } else if(imageType === "green"){
          return require("./../../images/green_waste.png");
        } else if(imageType === "food"){
          return require("./../../images/food_waste.png");
        }
          // return require("./../../images/ic_coffee_beat.png");
      }
  render() {
    return (

      <CustomStatusBarWithRoot>

      <Header onBackPress={()=> this.goBack()}>
        Claim Listing
      </Header>

      <View style={styles.container}>

        <FlatList
          data={this.state.listingData}
          renderItem={({item}) => {
            let wasteType = "";
            if(this.state.wasteTypes) {
              wasteType = this.state.wasteTypes.filter(el => el.key === item.waste_id)[0].value;
            }
            return (
              <CardView>
                <ListingItem
                  type={wasteType}
                  image={this.getImage(wasteType)}
                  date={item.expiry_date}
                />
              </CardView>
            )
          }}
        />
      </View>
      <Progress isShow={this.state.loading} />
      </CustomStatusBarWithRoot>
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
