import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import { MathDuelProvider } from "./context/GameContext";

import AppLoading from "expo-app-loading";
import StartScreen from "./screen/StartScreen";
import GameScreen from "./screen/GameScreen";
import GameOverScreen from "./screen/GameOverScreen";
import Computer from "./screen/Computer";
import Multiplayer from "./screen/Multiplayer";

export default function App() {
  const [screenNum, setScreenNum] = useState(1);
  let screen;

  function changeScreenHandler(num) {
    setScreenNum(num);
  }

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (screenNum === 1) {
    screen = <StartScreen onScreenChange={changeScreenHandler} />;
  }

  if (screenNum === 2) {
    screen = <GameScreen onScreenChange={changeScreenHandler} />;
  }

  if (screenNum === 3) {
    screen = <GameOverScreen onScreenChange={changeScreenHandler} />;
  }
  
  if (screenNum === 4) {
    screen = <Computer onScreenChange={changeScreenHandler} />;
  }

  if (screenNum === 5) {
    screen = <Multiplayer onScreenChange={changeScreenHandler} />;
  }

  return (
    <MathDuelProvider>
      <SafeAreaView style={styles.rootScreen}>
        <StatusBar />
        {screen}
      </SafeAreaView>
    </MathDuelProvider>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
