import React from "react";
import { View, ActivityIndicator } from "react-native";
import { LIGHT_BLUE, BLUE } from "./../utils/constants";

const Progress = props => {
  return (
    <View style={props.isShow ? styles.viewStyle : styles.viewHide}>
      {props.isShow && (
        <ActivityIndicator
          style={{ alignSelf: "center", alignItems: "center" }}
          size="large"
          color="white"
        />
      )}
    </View>
  );
};
const styles = {
  viewStyle: {
    flex: 1,
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  viewHide: {
    backgroundColor: "green"
  }
};
export { Progress };
