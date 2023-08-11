// Screen1.js

import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Screen1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen 1</Text>
      <Button
        title="Go to Screen 2"
        onPress={() => navigation.navigate("Screen2")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Screen1;
