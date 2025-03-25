import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { CustomButton } from "../components/CustomButton";

function GameScreen({ onScreenChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Game Mode</Text>
      <CustomButton title="Multiplayer" onPress={() => onScreenChange(5)} />
      <CustomButton title="VS Computer" onPress={() => onScreenChange(4)} />
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
