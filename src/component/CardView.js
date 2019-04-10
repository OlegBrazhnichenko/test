import React from "react";
import { View } from "react-native";

const CardView = props => {
  const { cardStyle } = styles;
  return <View style={[cardStyle, props.style]}>{props.children}</View>;
};

const styles = {
  cardStyle: {
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: "#fff"
  }
};

export { CardView };
