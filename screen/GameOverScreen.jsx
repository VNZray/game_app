import { View, Text, StyleSheet } from "react-native";
import { useMathDuel } from "../context/GameContext";
import { CustomButton } from "../components/CustomButton";

function GameOverScreen({ onScreenChange, gameMode}) {
  const { players, resetGame } = useMathDuel();
  const highestScore = Math.max(...players.map(player => player.score));
  const winners = players.filter(player => player.score === highestScore);

  let winnerText; 
  if (gameMode === "computer") {
    winnerText =
      winners.length > 1
        ? "It's a Tie! 🤝"
        : winners[0].name === "Player"
        ? "🏆 Player Wins! 🏆"
        : "🤖 Computer Wins! 🤖";
  } else {
    winnerText =
      winners.length > 1
        ? "It's a Tie! 🤝"
        : winners[0].name === "Player 1"
        ? "🏆 Player 1 Wins! 🏆"
        : "🏆 Player 2 Wins! 🏆";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Game Over 🎉</Text>
      <Text style={styles.winnerText}>{winnerText}</Text>
      <View style={styles.scoreBoard}>
        <Text style={styles.scoreBoardTitle}>Final Scores</Text>
        {players.map((player, index) => (
          <Text
            key={index}
            style={[
              styles.scoreText,
              player.score === highestScore && styles.winningScore,
            ]}
          >
            {gameMode === "computer" && player.name === "Player"
              ? "Player"
              : gameMode === "computer" && player.name === "Computer"
              ? "Computer"
              : player.name}{" "}
            : {player.score} pts
          </Text>
        ))}
      </View>

      <CustomButton title="Exit 🚪" onPress={() => { resetGame(); onScreenChange(1); }} />
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  winnerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 10,
  },
  scoreBoard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  scoreBoardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007bff",
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5a5a5a",
    marginVertical: 5,
  },
  winningScore: {
    color: "#d9534f",
  },
});
