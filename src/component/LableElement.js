import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LIGHT_BLUE, BLUE } from "../utils/constants";

const LableElement = props => {
  const { textStyle, linearGradient } = styles;
  return (
    <View style = { [linearGradient, props.style] }>
        <Text style={[textStyle, props.buttonStyle]}>{props.children}</Text>
    </View>
  );
};

const styles = {
  textStyle: {
    alignSelf: "center",
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12
  },
  linearGradient: {
    borderRadius: 10,
    borderColor : BLUE,
    borderWidth: 2,
    marginTop: 10,
  }
};
1;
export { LableElement };
