

import React, {Component} from 'react';
import {StyleSheet, View, Image, AsyncStorage} from 'react-native';
import { TextEntryElement, TextElement, CustomStatusBarWithRoot, ButtonElement, Header, Progress, CardView, ListingItem } from '../component';
import { LOGIN_URL, GET_LISTING_URL } from '../utils/constants';
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
      }
      async getAsyncData(){
        const userID = await AsyncStorage.getItem("id");
        this.setState({userID}, ()=> {
          this.getListing();
       });  
      }
      goBack(){
        this.props.navigation.goBack();
      }
      getListing(){
        var params = new URLSearchParams();
        params.append('id', this.state.userID);

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }

        this.setState({loading:true});
        axios.post(GET_LISTING_URL,params, config )
        .then((response) => {
          this.setState({loading:false});
          if(response.data.status === 1){
            this.setState({listingData: response.data.data});
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
      getImage(imageType){
        if(imageType === "Coffee waste"){
          return require("./../../images/coffee_waste.png");
        } else if(imageType === "Beer waste"){
          return require("./../../images/beer_waste.png");
        } else if(imageType === "Green waste"){
          return require("./../../images/green_waste.png");
        } else if(imageType === "Food waste"){
          return require("./../../images/food_waste.png");
        }
          // return require("./../../images/ic_coffee_beat.png");
      }
  render() {
    return (

      <CustomStatusBarWithRoot>

      <Header onBackPress={()=> this.goBack()}>
        Cliam Listing
      </Header>

      <View style={styles.container}>

        <FlatList
          data={this.state.listingData}
          renderItem={({item}) => (
            <CardView>
              <ListingItem 
                type={item.waste_type}
                image={this.getImage(item.waste_type)}
                date={item.date}
                />
            </CardView>
          )}
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
