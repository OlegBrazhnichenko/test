import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const TextElement = props => {
  const { inputStyle } = styles;
  return (
    <Text style={[inputStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

const styles = {
  inputStyle: {
    color: "#000000",
    fontSize: 20
  }
};
export { TextElement };
