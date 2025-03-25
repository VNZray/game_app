import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useMathDuel } from "../context/GameContext";
import { CustomButton } from "../components/CustomButton";
import GameOverScreen from "./GameOverScreen";

function Computer({ onScreenChange }) {
  const { players, updateScore } = useMathDuel();
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const maxQuestions = 10;

  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ["+", "-", "*", "/"];
    const randomOperation = operations[Math.floor(Math.random() * operations.length)];

    let answer, questionText;

    switch (randomOperation) {
      case "+":
        answer = num1 + num2;
        questionText = `${num1} + ${num2} = ?`;
        break;
      case "-":
        answer = Math.max(num1, num2) - Math.min(num1, num2); // Prevents negative answers
        questionText = `${Math.max(num1, num2)} - ${Math.min(num1, num2)} = ?`;
        break;
      case "*":
        answer = num1 * num2;
        questionText = `${num1} × ${num2} = ?`;
        break;
      case "/":
        answer = num1; // Ensure whole number division
        questionText = `${num1 * num2} ÷ ${num2} = ?`;
        break;
    }

    const wrongAnswer1 = answer + (Math.floor(Math.random() * 5) + 1);
    const wrongAnswer2 = Math.max(1, answer - (Math.floor(Math.random() * 5) + 1));
    const options = [answer, wrongAnswer1, wrongAnswer2].sort(() => Math.random() - 0.5);

    return { text: questionText, answer, options };
  }

  function handlePlayerAnswer(selectedAnswer) {
    const isPlayerCorrect = selectedAnswer === currentQuestion.answer;

    if (isPlayerCorrect) {
      updateScore(0, players[0].score + 1);
    } else {
      const computerChoice =
        Math.random() < 0.5 ? currentQuestion.answer : currentQuestion.options[Math.floor(Math.random() * 3)];

      if (computerChoice === currentQuestion.answer) {
        updateScore(1, players[1].score + 1);
      }
    }

    if (questionCount + 1 < maxQuestions) {
      setQuestionCount((prev) => prev + 1);
      setCurrentQuestion(generateQuestion());
    } else {
      onScreenChange(3, "computer"); // Navigate to GameOverScreen
    }
  }

  if (questionCount >= maxQuestions) {
    return <GameOverScreen gameMode="computer" onScreenChange={onScreenChange} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VS Computer Mode</Text>
      <View style={styles.scores}>
        <Text style={styles.score}>Player: {players[0].score}</Text>
        <Text style={styles.score}>Computer: {players[1].score}</Text>
      </View>
      <Text style={styles.question}>{currentQuestion.text}</Text>
      {currentQuestion.options.map((option, index) => (
        <CustomButton key={index} title={option.toString()} onPress={() => handlePlayerAnswer(option)} />
      ))}
      <CustomButton title="Back to Menu" onPress={() => onScreenChange(1)} />
    </View>
  );
}

export default Computer;

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
});
