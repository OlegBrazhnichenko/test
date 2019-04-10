import { NetInfo } from "react-native";
import { Alert, } from "react-native";
// check internet is available or not
export const isInternetActive = async () => {
  return new Promise((resolve, reject) => {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if(connectionInfo.type === "none"){
        resolve(false);
      }else{
        resolve(true);
      }
    });
  });
};
export var isMessageDisplay = false;
export const noInternetMessage = () => {
  if(!isMessageDisplay){
    isMessageDisplay = true;
    Alert.alert(
      "Mesasge",
      "No Internet Connection",
      [
        {text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
        {text: "OK", onPress: () => console.log("OK Pressed")},
      ],
      { cancelable: false }
    );
  }
};

export const noIMessage = () => {

};


export const alertMessage = (message, onPress) => {
 
  Alert.alert(
    "Message",
    message,
    [
      {text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
      {text: "OK", onPress:onPress},
    ],
    { cancelable: false }
  );
};

