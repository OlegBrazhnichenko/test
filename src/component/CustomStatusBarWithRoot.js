import React from "react";
import { View, StatusBar, Platform } from "react-native";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const CustomStatusBarWithRoot = props => {
  
  return (
    <View style={[styles.viewStyle, props.style]}>
      <MyStatusBar />
      {props.children}
    </View>
  );
};

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 30 : StatusBar.currentHeight;

const styles = {
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: "#f4f9fc"
  },
  viewStyle: {
    flex: 1,
    position: "relative",
    backgroundColor: "#f4f9fc"
  }
};

export { CustomStatusBarWithRoot };
