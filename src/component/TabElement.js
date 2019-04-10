import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LIGHT_BLUE, BLUE } from "../utils/constants";

const TabElement = props => {
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
    color: "#000",
    fontSize: 16,
    fontWeight: "800",
    paddingTop: 12,
    paddingBottom: 12
  },
  linearGradient: {
    backgroundColor : '#fff',
    borderColor: "#000"
  }
};
1;
export { TabElement };
