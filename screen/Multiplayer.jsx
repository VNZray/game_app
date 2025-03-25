import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput } from "react-native";
import { CustomButton } from "../components/CustomButton";
import GameOverScreen from "./GameOverScreen";

function Multiplayer({ onScreenChange }) {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [questionCount, setQuestionCount] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const [modalVisible, setModalVisible] = useState(false);
  const [answerInput, setAnswerInput] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const maxQuestions = 10;

  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ["+", "-", "*", "/"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let answer, questionText;

    switch (operation) {
      case "+":
        answer = num1 + num2;
        questionText = `${num1} + ${num2} = ?`;
        break;
      case "-":
        answer = Math.max(num1, num2) - Math.min(num1, num2);
        questionText = `${Math.max(num1, num2)} - ${Math.min(num1, num2)} = ?`;
        break;
      case "*":
        answer = num1 * num2;
        questionText = `${num1} × ${num2} = ?`;
        break;
      case "/":
        answer = num1;
        questionText = `${num1 * num2} ÷ ${num2} = ?`;
        break;
    }
    return { text: questionText, answer };
  }

  function handlePlayerPress(player) {
    setCurrentPlayer(player);
    setModalVisible(true);
  }

  function handleSubmitAnswer() {
    if (parseFloat(answerInput) === currentQuestion.answer) {
      currentPlayer === "player1"
        ? setPlayer1Score((prev) => prev + 1)
        : setPlayer2Score((prev) => prev + 1);
    }
    setModalVisible(false);
    setAnswerInput("");
    
    if (questionCount < maxQuestions) {
      setCurrentQuestion(generateQuestion());
      setQuestionCount((prev) => prev + 1);
    } else {
      onScreenChange(3, "multiplayer");
    }
  }

  if (questionCount > maxQuestions) {
    return (
      <GameOverScreen
        gameMode="multiplayer"
        onScreenChange={onScreenChange}
        players={[
          { name: "Player 1", score: player1Score },
          { name: "Player 2", score: player2Score },
        ]}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multiplayer Mode</Text>
      <View style={styles.scores}>
        <Text style={styles.score}>Player 1: {player1Score}</Text>
        <Text style={styles.score}>Player 2: {player2Score}</Text>
      </View>
      <Text style={styles.question}>Question {questionCount}: {currentQuestion.text}</Text>
      <CustomButton title="Player 1 Answers" onPress={() => handlePlayerPress("player1")} />
      <CustomButton title="Player 2 Answers" onPress={() => handlePlayerPress("player2")} />
      <CustomButton title="Back to Menu" onPress={() => onScreenChange(1)} />
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{currentPlayer === "player1" ? "Player 1" : "Player 2"}, enter your answer:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={answerInput}
              onChangeText={setAnswerInput}
              placeholder="Enter answer"
            />
            <CustomButton title="Submit" onPress={handleSubmitAnswer} />
            <CustomButton title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Multiplayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scores: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
  },
  question: {
    fontSize: 22,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    marginBottom: 10,
    borderRadius: 5,
    textAlign: "center",
  },
});
