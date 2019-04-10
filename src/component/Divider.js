import React from "react";
import { View } from "react-native";

const Divider = props => {
  const { cardStyle } = styles;
  return <View style={[cardStyle, props.style]} />;
};

const styles = {
  cardStyle: {
    backgroundColor: "#e5e5e5",
    height: 1
  }
};

export { Divider };
