import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LIGHT_BLUE, BLUE, GREEN } from "./../utils/constants";

const ButtonElement = props => {
  const { textStyle, linearGradient } = styles;
  return (
    <View style = { [linearGradient, props.style] }>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={[textStyle, props.buttonStyle]}>{props.children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  textStyle: {
    alignSelf: "center",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
    paddingTop: 12,
    paddingBottom: 12
  },
  linearGradient: {
    borderRadius: 40,
    backgroundColor : GREEN
  }
};
1;
export { ButtonElement };
