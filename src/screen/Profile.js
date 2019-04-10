

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity, AsyncStorage, Picker} from 'react-native';
import { TextEntryElement, TextElement, CustomStatusBarWithRoot,Progress, ButtonElement, TabElement, Header, LableElement } from '../component';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown';
import { GREEN, PROFILE_URL, UPDATE_PROFILE_URL, PUBLISH_LISTING_URL } from '../utils/constants';
import axios from "axios";
import { alertMessage } from '../utils/utility';
const URLSearchParams = require("form-data");
var dateFormat = require('dateformat');


export default class Profile extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        // const { navigate } = this.props.navigation;
        // navigate('SignUpScreen')
        this.state = {
          loading:false,
          business_name: "",
          contact_name: "",
          address: "",
          phone: "",
          wasteTypes:[
            {
              key: "coffee_beat",
              value:"Coffee waste",
            },
            {
              key: "beer_waste",
              value:"Beer waste",
            },
            {
              key: "green_waste",
              value:"Green waste",
            },
            {
              key: "food_waste",
              value:"Food waste",
            }
        ],
          userID:"",
          bussiness_type: "",
          email: "",
          latitude: 0.0,
          longitude: 0.0,
          password: "",
          emailerror: "",
          passworderror: "",
          wasteType:"",
          volume:"",
          emailTouched: false,
          passwordTouched: false,
          isShow: false,
          isProfileActive: true,
          isDateTimePickerVisible:false,
          selectedDate:"Select Date/Time",
          
        };
      }
  componentDidMount(){
  this.getAsyncData();

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("wokeeey");
      console.log("wokeeey", position);
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    },
    (error) => this.setState({ error: error.message }),
    { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
  );
  }
  async getAsyncData(){
    // const userID = await AsyncStorage.getItem("id");
      try{
          const token = await AsyncStorage.getItem("token");
          this.setState({
              // userID: userID,
              token: token,
          }, ()=> {
              this.getProfile();
          });
      } catch(error){
        console.log(error);
      }
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
    updateTab(){
      this.setState({isProfileActive: !this.state.isProfileActive})
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  
    _handleDatePicked = (date) => {
      console.log('A date has been picked: ', date);
      
      this.setState({selectedDate:dateFormat(date, "yyyy-mm-dd h:MM:ss")});
      this._hideDateTimePicker();
    };
    updateProfile(){

      let params = {
        email: this.state.email,
        phone: this.state.phone,
        contact_name: this.state.contact_name,
        business_name: this.state.business_name,
        business_type: this.state.bussiness_type,
        address: this.state.address,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: "Bearer " + this.state.token,
        }
      };
      this.setState({loading:true});
      axios.post(PROFILE_URL, JSON.stringify(params), config )
      .then((response) => {
        
        this.setState({loading:false});
        if(response.status === 200){
          alertMessage("Success");
          console.log("success");
        } else {
             console.log(response);
          alertMessage(response);
        }
      })
      .catch((error) => {
        alertMessage("Enter the correct data");
        this.setState({loading:false});
        console.log("error",  error);
      });
      
    }
    publishListing(){
      console.log("this.state.selectedDate",this.state.selectedDate);
      
      let params = new URLSearchParams();
      params.append('waste_type', this.state.selectedType);
      params.append('user_id', this.state.userID);
      params.append('volume', this.state.volume);
      params.append('date', this.state.selectedDate);
      params.append('latitude', this.state.latitude);
      params.append('longitude', this.state.longitude);
  
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      this.setState({loading:true});
      axios.post(PUBLISH_LISTING_URL, params, config )
      .then((response) => {
        console.log("response", response.data);
        
        this.setState({loading:false});
        if(response.data.status === 1){
          this.setState({selectedDate:"Select Date/Time", volume:""});
          alertMessage(response.data.message);
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
    getProfile(){

      const config = {headers: {
        Authorization: "Bearer "+this.state.token.trim(),
          'Access-Control-Allow-Origin': '*'
      }};
      this.setState({loading:true});
      console.log("token",this.state.token);
      axios.get(PROFILE_URL, config)
      .then((response) => {
        console.log("response", response.data);
        
        this.setState({loading:false});
        if(response.status === 200){
          const data = response.data;
          console.log("response", response.data);
          this.setState({
              business_name: data.business_name || "" ,
              contact_name:data.contact_name || "",
              address:data.address || "",
              phone:data.phone || "",
              email:data.email || "",
              bussiness_type: data.business_type || ""
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
  render() {

    const { constainEditText } = styles;

    return (

      <CustomStatusBarWithRoot>

      <Header onBackPress={()=> this.goBack()}>
        {this.state.isProfileActive ? "Profile" : "Listing"}
      </Header>

      <View style = {{flexDirection:"row"}}>

      <TabElement
          style={{ flex:1, backgroundColor: this.state.isProfileActive ? "black" : "white"}}
          buttonStyle={{color: this.state.isProfileActive ? "white" : "black"}}
          onPress={() => this.updateTab()}
          >
            Profile
      </TabElement>

      <TabElement
          style={{ flex:1, backgroundColor: this.state.isProfileActive ? "white" : "black"}}
          buttonStyle={{color: this.state.isProfileActive ? "black" : "white"}}
          onPress={() =>  this.updateTab()}
          >
            Listing
      </TabElement>

      </View>

      <View style={{flex: this.state.isProfileActive ? 1 : 0, height: this.state.isProfileActive ? undefined : 0, backgroundColor: '#F5FCFF',padding : 10 }}>

        <ScrollView>

        <TextElement style={constainEditText}>
          Business name
        </TextElement>

          <TextEntryElement 
            placeholder="Business name"
            errorMessage={this.state.emailerror }
            value={this.state.business_name || ""}
            onChangeText={business_name => this.handleChange(business_name, "business_name")}
            onSubmitEditing={()=> {
        
          }} />

          <TextElement style={constainEditText}>
            Contact name
          </TextElement>

          <TextEntryElement 
            placeholder="Contact name"
            errorMessage={this.state.emailerror}
            value={this.state.contact_name || null}
            onChangeText={contact_name => this.handleChange(contact_name, "contact_name")}
            onSubmitEditing={()=> {
        
          }} />

          <TextElement style={constainEditText}>
            Address
          </TextElement>

          <TextEntryElement 
            placeholder="Address"
            value={this.state.address || null}
            onChangeText={address => this.handleChange(address, "address")}
            onSubmitEditing={()=> {
        
          }} />

          <TextElement style={constainEditText}>
            Phone
          </TextElement>

          <TextEntryElement 
            placeholder="Phone"
            errorMessage={ this.state.emailerror }
            keyboardType={"numeric"}
            value={this.state.phone}
            onChangeText={phone => this.handleChange(phone, "phone")}
            onSubmitEditing={()=> {
        
          }} />


          <TextElement style={constainEditText}>
            Email
          </TextElement>

          <TextEntryElement 
            placeholder="Email"
            errorMessage={  this.state.emailerror}
            value={this.state.email}
            onChangeText={email => this.handleChange(email, "email")}
            onSubmitEditing={()=> {
          }} />


          <TextElement style={constainEditText}>
            Business Type
          </TextElement>

          <TextEntryElement 
            placeholder="Business Type"
            errorMessage={this.state.emailerror}
            value={this.state.bussiness_type || null}
            onChangeText={bussiness_type => this.handleChange(bussiness_type, "bussiness_type")}
            onSubmitEditing={()=> {
          
            }} />

            <ButtonElement
              style={{ marginTop: 30 }}
              onPress={() => {
                this.updateProfile();
              }}
            >
              SAVE
            </ButtonElement>

        </ScrollView>
        
      </View>
      {/* Listing */}
      <View style={{flex: this.state.isProfileActive ? 0 : 1, height: this.state.isProfileActive ? 0 : undefined,backgroundColor: '#F5FCFF',padding : 10 }}>
          <Dropdown
            labelFontSize={14}
            label='Waste type'
            dropdownOffset={{top: 32, left: 10}}
            selectedItemColor={GREEN}
            onChangeText={(item) =>{
              this.setState({selectedType: item})
            }}
            data={this.state.wasteTypes}
          />
          <TextElement style={constainEditText}>
            Volume
          </TextElement>
          <TextEntryElement 
            placeholder="Volume"
            value={this.state.volume}
            errorMessage={this.state.volumeError}
            onChangeText={volume => this.handleChange(volume, "volume")}
            onSubmitEditing={()=> {
          
            }} />
            <TouchableOpacity onPress={this._showDateTimePicker}>
                <LableElement>{this.state.selectedDate}</LableElement>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                mode="datetime"
              />
            <ButtonElement
              style={{ marginTop: 30 }}
              onPress={()=> {
                this.publishListing();
              }}
            >
              Publish
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
    marginTop: 8,
    fontSize: 16,
    padding: 2,
  },
});
