import React from "react";
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";
import { Overlay } from "react-native-elements";

const Loading = ({ isVisible, text }) => {
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0, 0, 0, 0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#9adbb3" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
};

export default Loading;

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#9adbb3",
    opacity: 0.7,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: 'bold',
    textTransform: "uppercase",
    marginTop: 10,
  },
});
