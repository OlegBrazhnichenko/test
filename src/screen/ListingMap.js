import React, {Component} from 'react';
import {StyleSheet, View,Dimensions, Image, Modal, AsyncStorage} from 'react-native';
import { TextEntryElement, TextElement, ButtonElement, Header, CustomStatusBarWithRoot, CardView, Progress } from '../component';
import MapView,  { PROVIDER_GOOGLE } from 'react-native-maps';
import { Dropdown } from 'react-native-material-dropdown';
import { Divider } from '../component/Divider';
import { GREEN, GET_LISTING_URL } from '../utils/constants';
import axios from "axios";
const { width, height } = Dimensions.get('window');
const URLSearchParams = require("form-data");
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
export default class ListingMap extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        // const { navigate } = this.props.navigation;
        // navigate('SignUpScreen')
        this.state = {
          email: "",
          title:"",
          volume:"",
          latitude:25.7617,
          longitude:-80.1918,
          password: "",
          emailerror: "",
          passworderror: "",
          emailTouched: false,
          passwordTouched: false,
          isShow: false,
          activeTab: "",
          modalVisible: false,
          isClaim:true,
          listingData:[],
          loading: false,
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
          regian: {
            latitude: 25.7617,
            longitude: -80.1918,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          markers:[
            {
            type:"coffee_beat",
            marker: {
              latitude: 25.7617,
              longitude: -80.1918,
            }},
            {
            type:"beer_waste",
            marker: {
              latitude: 25.772902, 
              longitude: -80.202664,
            }},
            {
            type:"green_waste",
            marker: {
              latitude: 25.7622286,
              longitude: -80.2065544,
            }},
            {
              type:"food_waste",
              marker: {
                latitude: 25.757204, 
                longitude: -80.195054,
          }},
        ]
        };
      }
    setModalVisible() {
      this.setState({ modalVisible: !this.state.modalVisible });
      
    }
    componentDidMount(){
      this.getAsyncData();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // const regian = {
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.longitude,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          // this.setState({regian});
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
     
      }
      async getAsyncData(){
        const userID = await AsyncStorage.getItem("id");
        this.setState({userID}, ()=> {
          this.getListing();
       });  
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
        console.log("response", response.data);
        
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
    handleChange(value, field) {
        this.setState({ [field]: value }, () => {
          this.emailTest(this.state.email);
          this.passwordTest(this.state.password);
        });
      }
    goBack(){
      this.props.navigation.goBack();
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
    
    <View style={styles.container}>
    <Header onBackPress={() => {
        this.goBack();
      }}>Listing Map</Header>
      <View style={{width: SCREEN_WIDTH, padding:10}}>
        <Dropdown
          labelFontSize={14}
          label='Waste type'
          onChangeText={(item) =>{
            this.setState({selectedType: item})
          }}
          dropdownOffset={{top: 10, left: 10}}
          selectedItemColor={GREEN}
          selectedIndex={()=> {
            console.log("item", "call");
          }}
          selectedItem={(item) => {
            console.log("item", item);
            
            this.setState({selectedType: item.key})
          }}
          data={this.state.wasteTypes}
        />
        </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            region = {{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
          {this.state.listingData.map((item, index) => {
                        console.log("this.state.selectedType === item.waste_type",this.state.selectedType + " = "+item.waste_type);
                        
            if((this.state.selectedType === item.waste_type) || !(this.state.selectedType)) {
            return  (
              <MapView.Marker
                onPress={() => {
                  this.state.listingData.splice(index,1);
                  this.setState({title: item.waste_type, volume:item.volume}, () => {
                    this.setModalVisible()
                  });
                }}
                title={item.waste_type}
                image={this.getImage(item.waste_type)}
                description={item.volume}
                coordinate={{
                  latitude: JSON.parse(item.latitude),
                  longitude: JSON.parse(item.longitude),
                  }}
              />
              )
            }
          })}
          </MapView>
      </View>
      
       <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flex:1,
              justifyContent:"center",
              padding:10,
              backgroundColor: "rgba(52, 52, 52, 0.4)"
            }}
          > 
          <CardView>
          <TextElement style={{fontWeight:"900", fontSize:26, padding:10}}>
              Order
            </TextElement>
            <Divider />
            <View style={{padding:10}}>
              <TextElement>
                {this.state.title}
              </TextElement>

              <TextElement>
              {"Volumne : "+this.state.volume}
              </TextElement>
            </View>
            <ButtonElement style={{margin:10}} onPress={() =>{
              this.setState({isClaim:false})
              this.setModalVisible();
            }}>Order Claim</ButtonElement>
          </CardView>
          </View>
          </Modal>
          <Progress isShow={this.state.loading} />
      </CustomStatusBarWithRoot>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    marginTop:20,
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
  },
  map: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
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
