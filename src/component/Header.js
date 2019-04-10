import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LIGHT_BLUE } from "../utils/constants";
const backImage = require("./../../images/ic_back.png");

const Header = props => {
  const { textStyle, viewStyle, imageSize } = styles;
  return (
    <View style={viewStyle}>
   
      <TouchableOpacity style={{ flex: 1 }} onPress={props.onBackPress}>
      {(!props.isBackPress &&
        <Image source={backImage} style={imageSize} resizeMode="contain" />
        )}
      </TouchableOpacity>
     
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Text style={[textStyle, props.style]}>{props.children}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity onPress={props.onPress}>
          <Image
            style={{
              width: 15,
              height: 15,
              marginRight: 10,
              marginLeft: "auto",
              alignSelf: "center"
            }}
            source={props.rightImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding:10,
    backgroundColor: "rgba(0, 0, 0,0)"
  },
  textStyle: {
    fontWeight: "900",
    fontSize: 20,
    alignSelf: "center",
    color: "#000"
  },
  textStyleRound: {
    alignSelf: "center",
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "900",
    padding: 10
  },
  imageSize: {
    width: 20,
    height: 20,
    margin: 10
  },
  centerImageSize: {
    width: 50,
    height: 50
  },
  buttonStyle: {
    alignSelf: "stretch",
    backgroundColor: LIGHT_BLUE,
    borderRadius: 30
  }
};

export { Header };
