
import React from "react";
import { Text, TouchableOpacity,Image, View } from "react-native";
import { LIGHT_BLUE, BLUE } from "../utils/constants";

const ListingItem = props => {
  const { textStyle, linearGradient } = styles;
  return (
    <View style = { [linearGradient, props.style] }>
    <Image style={{height:50, width:50, alignItems:"center", justifyContent:"center"}} 
      source={props.image}/>
      <View style={{flexDirection:"column", marginLeft:10}}>
        <Text style={[textStyle, props.buttonStyle]}>{props.type}</Text>
        <Text style={[textStyle, props.buttonStyle]}>{props.date}</Text>
      </View>
        
    </View>
  );
};

const styles = {
  textStyle: {
    fontSize: 16,
  },
  linearGradient: {
    borderRadius: 10,
    borderColor : BLUE,
    flexDirection:"row",
    flex:1,
    padding:10,
    borderWidth: 2,
  }
};
1;
export { ListingItem };
