import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CustomButton } from "../components/CustomButton";

function StartScreen({ onScreenChange }) {
    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Math Duel</Text>
            <CustomButton title="Multiplayer" onPress={() => onScreenChange(5)} />
            <CustomButton title="VS. Computer" onPress={() => onScreenChange(4)} />
        </View>
    );
}

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
