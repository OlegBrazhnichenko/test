import React from "react";
import { TextInput, Text, View } from "react-native";
import { BLUE } from "./../utils/constants";

const TextEntryElement = ({
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  keyboardType,
  notEditable,
  errorMessage,
  onBlur,
  textStyle,
  onSubmitEditing
}) => {
  const { inputStyle } = styles;
  return (
    <View>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={[inputStyle, textStyle]}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor="#5c606b"
        underlineColorAndroid="rgba(0,0,0,0)"
        keyboardType={keyboardType}
        editable={!notEditable}
        returnKeyLabel="Done" 
        returnKeyType="done"
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
      />
      {(errorMessage || null !== null) && (
        <Text style={{ color: "red", padding: 3 }}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = {
  inputStyle: {
    padding: 10,
    fontSize: 20,
    alignSelf: "stretch",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: BLUE
  }
};
export { TextEntryElement };
